(function () {
  'use strict';

  var KEY_USER = 'dopamina_user';
  var KEY_EVENTS = 'dopamina_behavior_events';
  var TERMS_VERSION = '1.0-pilot';

  function loadUser() {
    try {
      return JSON.parse(localStorage.getItem(KEY_USER) || 'null');
    } catch (e) {
      return null;
    }
  }

  function saveUser(user) {
    localStorage.setItem(KEY_USER, JSON.stringify(user));
  }

  function isLoggedIn() {
    var u = loadUser();
    return !!(u && u.email && u.consents && u.consents.terms && u.consents.terms.accepted);
  }

  function register(data) {
    var now = new Date().toISOString();
    var user = {
      id: 'u_' + Date.now(),
      name: String(data.name || '').trim(),
      email: String(data.email || '').trim().toLowerCase(),
      city: String(data.city || '').trim(),
      createdAt: now,
      consents: {
        terms: { accepted: true, at: now, version: TERMS_VERSION },
        marketing: {
          accepted: !!data.marketing,
          at: data.marketing ? now : null,
        },
        aggregatedData: {
          accepted: !!data.aggregatedData,
          at: data.aggregatedData ? now : null,
          layer: 'aggregated_anonymous',
        },
        identifiableData: {
          accepted: false,
          at: null,
          layer: 'identifiable',
          status: 'future',
        },
      },
    };
    saveUser(user);
    if (user.consents.aggregatedData.accepted) {
      logBehaviorEvent('consent_granted', { layer: 'aggregated_anonymous' });
    }
    return user;
  }

  function updateConsents(patch) {
    var user = loadUser();
    if (!user) return null;
    var now = new Date().toISOString();
    if (typeof patch.marketing === 'boolean') {
      user.consents.marketing.accepted = patch.marketing;
      user.consents.marketing.at = patch.marketing ? now : null;
    }
    if (typeof patch.aggregatedData === 'boolean') {
      var was = user.consents.aggregatedData.accepted;
      user.consents.aggregatedData.accepted = patch.aggregatedData;
      user.consents.aggregatedData.at = patch.aggregatedData ? now : null;
      if (patch.aggregatedData && !was) {
        logBehaviorEvent('consent_granted', { layer: 'aggregated_anonymous' });
      }
      if (!patch.aggregatedData && was) {
        logBehaviorEvent('consent_revoked', { layer: 'aggregated_anonymous' });
      }
    }
    saveUser(user);
    return user;
  }

  function logout() {
    localStorage.removeItem(KEY_USER);
  }

  function deleteAccount() {
    logout();
    localStorage.removeItem(KEY_EVENTS);
  }

  function getDisplayName() {
    var u = loadUser();
    return (u && u.name) || 'Visitante';
  }

  function sanitizePayload(payload) {
    if (!payload || typeof payload !== 'object') return {};
    var safe = {};
    var allowed = [
      'tab', 'category', 'productId', 'orderType', 'itemCount',
      'totalBand', 'layer', 'view', 'action',
    ];
    allowed.forEach(function (k) {
      if (payload[k] !== undefined && payload[k] !== null) safe[k] = payload[k];
    });
    return safe;
  }

  function totalBand(total) {
    var n = Number(total) || 0;
    if (n < 50) return '0-50';
    if (n < 150) return '50-150';
    if (n < 500) return '150-500';
    if (n < 2000) return '500-2000';
    return '2000+';
  }

  function logBehaviorEvent(eventType, payload) {
    var user = loadUser();
    if (!user || !user.consents.aggregatedData || !user.consents.aggregatedData.accepted) return;
    var events;
    try {
      events = JSON.parse(localStorage.getItem(KEY_EVENTS) || '[]');
    } catch (e) {
      events = [];
    }
    events.push({
      at: new Date().toISOString(),
      sessionHash: user.id.slice(-8),
      type: eventType,
      payload: sanitizePayload(payload),
    });
    if (events.length > 800) events = events.slice(-800);
    localStorage.setItem(KEY_EVENTS, JSON.stringify(events));
  }

  function getBehaviorEvents() {
    try {
      return JSON.parse(localStorage.getItem(KEY_EVENTS) || '[]');
    } catch (e) {
      return [];
    }
  }

  function getAggregatedSummary() {
    var events = getBehaviorEvents();
    var byType = {};
    events.forEach(function (ev) {
      byType[ev.type] = (byType[ev.type] || 0) + 1;
    });
    return { total: events.length, byType: byType };
  }

  window.DOPAMINA_AUTH = {
    TERMS_VERSION: TERMS_VERSION,
    loadUser: loadUser,
    saveUser: saveUser,
    isLoggedIn: isLoggedIn,
    register: register,
    updateConsents: updateConsents,
    logout: logout,
    deleteAccount: deleteAccount,
    getDisplayName: getDisplayName,
    logBehaviorEvent: logBehaviorEvent,
    getBehaviorEvents: getBehaviorEvents,
    getAggregatedSummary: getAggregatedSummary,
    totalBand: totalBand,
  };
})();
