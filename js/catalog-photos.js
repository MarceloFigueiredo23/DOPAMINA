/**
 * Fotos por produto — Unsplash primário (CDN estável) + backup único por item.
 * Cada par primary/backup corresponde ao nome e categoria do produto no catálogo.
 */
(function (w) {
  'use strict';

  function uns(id) {
    return 'https://images.unsplash.com/' + id + '?w=800&h=800&fit=crop&fm=jpg&q=88&auto=format';
  }

  function P(primary, backup) {
    return { primary: primary, backup: backup || primary };
  }

  var PHOTOS = {
    /* ── Eletrônicos e casa (p01–p30) ── */
    p01: P(uns('photo-1695048133144-6b33fd7b28b5'), uns('photo-1511702033304-f8f02fdda238')),
    p02: P(uns('photo-1517336714731-489689fd1ca8'), uns('photo-1496180940759-8522db4f9b27')),
    p03: P(uns('photo-1606813907291-d86efa9b94db'), uns('photo-1486401899868-0e037ed01fc6')),
    p04: P(uns('photo-1610945265614-dcf5b43c5e63'), uns('photo-1511702033304-f8f02fdda238')),
    p05: P(uns('photo-1585655097312-7c098090a426'), uns('photo-1571172964276-91e9d7d2b0a6')),
    p06: P(uns('photo-1593359677879-a670071ebdbe'), uns('photo-1593784991095-a205069470b6')),
    p07: P(uns('photo-1600296640924-8823b5d4a180'), uns('photo-1572569511254-d8f795e3431f')),
    p08: P(uns('photo-1610892437321-4bafb95daed0'), uns('photo-1578303492595-0436d4f1c825')),
    p09: P(uns('photo-1558317374-a37d8b1b41ff'), uns('photo-1558618666-fcd25c85cd64')),
    p10: P(uns('photo-1517668808822-9ebb02f2a0e0'), uns('photo-1495474472287-4d71bcdd2085')),
    p11: P(uns('photo-1434493789847-2f02dc6ca35d'), uns('photo-1523275335684-37898b6baf30')),
    p12: P(uns('photo-1473968512647-3e447244af8f'), uns('photo-1506947411479-110234fb7bca')),
    p13: P(uns('photo-1593305841991-05c297ba4575'), uns('photo-1587202372775-e229f346b9b7')),
    p14: P(uns('photo-1574269905862-9a3d95c4d9ac'), uns('photo-1585655097312-7c098090a426')),
    p15: P(uns('photo-1585515655855-d74f3e9c2d23'), uns('photo-1574269905862-9a3d95c4d9ac')),
    p16: P(uns('photo-1505740420928-5e560c06d30e'), uns('photo-1572569511254-d8f795e3431f')),
    p17: P(uns('photo-1544244015-0df4b3ffc6b0'), uns('photo-1505740420928-5e560c06d30e')),
    p18: P(uns('photo-1516035069371-29a1b244cc32'), uns('photo-1502920917128-1aa500764cbd')),
    p19: P(uns('photo-1579586337278-3befd40f17da'), uns('photo-1434493789847-2f02dc6ca35d')),
    p20: P(uns('photo-1608043152269-423dbba4e7e1'), uns('photo-1608043152269-423dbba4e7e1')),
    p21: P(uns('photo-1527864550417-7fd91fc51a46'), uns('photo-1615663240917-5fb0a1e0b8d2')),
    p22: P(uns('photo-1558618666-fcd25c85cd64'), uns('photo-1558317374-a37d8b1b41ff')),
    p23: P(uns('photo-1544947950-fa07a98d237f'), uns('photo-1481627834876-b7833e8f5570')),
    p24: P(uns('photo-1527443224154-e4bbfbb1d50f'), uns('photo-1585792180293-4d2a0a9311a8')),
    p25: P(uns('photo-1622979135224-d2a1098f6d8b'), uns('photo-1592478412203-6159e4c4a8eb')),
    p26: P(uns('photo-1495474472287-4d71bcdd2085'), uns('photo-1517668808822-9ebb02f2a0e0')),
    p27: P(uns('photo-1593784991095-a205069470b6'), uns('photo-1593359677879-a670071ebdbe')),
    p28: P(uns('photo-1621607512210-7f9a3af37531'), uns('photo-1585751119457-1df9a073b83d')),
    p29: P(uns('photo-1556911220-bff31c812dba'), uns('photo-1556911220-e6b98d3dfc18')),
    p30: P(uns('photo-1496181133206-80ce9ccb4a7e'), uns('photo-1593305841991-05c297ba4575')),

    /* ── Moda (m01–m24) ── */
    m01: P(uns('photo-1584917865442-de89dfa41ccb'), uns('photo-1548039257-fcc5c4b4d4b0')),
    m02: P(uns('photo-1590874103328-eac3a398e716'), uns('photo-1584917865442-de89dfa41ccb')),
    m03: P(uns('photo-1548036328-c9fa89d128fa'), uns('photo-1594938291221-94f3130a4f6a')),
    m04: P(uns('photo-1549298916-b41d501d3772'), uns('photo-1606107557195-0ccc2b0a2bb0')),
    m05: P(uns('photo-1608253813970-eee5a0955d81'), uns('photo-1608231387042-66d9ac4aa44c')),
    m06: P(uns('photo-1572635196237-14b3f281503f'), uns('photo-1511499767150-a48a237f0083')),
    m07: P(uns('photo-1606107557195-0ccc2b0a2bb0'), uns('photo-1542291026-7eec264c27ff')),
    m08: P(uns('photo-1608231387042-66d9ac4aa44c'), uns('photo-1549298916-b41d501d3772')),
    m09: P(uns('photo-1608667509904-b82b1ae1df4b'), uns('photo-1606107557195-0ccc2b0a2bb0')),
    m10: P(uns('photo-1591047139829-d91aecb6caea'), uns('photo-1539533012597-729a07ea54c4')),
    m11: P(uns('photo-1595777457583-95e059d581b8'), uns('photo-1566174053879-31528523f8ae')),
    m12: P(uns('photo-1625915793619-626b39a2ba11'), uns('photo-1586363104862-3a5e2ab60d99')),
    m13: P(uns('photo-1521572163474-e1f1ad5812d0'), uns('photo-1581655353564-d7837ba3d566')),
    m14: P(uns('photo-1542272454318-2ab582ca4c63'), uns('photo-1541099649105-f69ad21f3246')),
    m15: P(uns('photo-1596755094514-f87e34085b2c'), uns('photo-1434389677669-e08b4cac3105')),
    m16: P(uns('photo-1543163521-1bf539c55dd2'), uns('photo-1603487742874-03f67dfec1a3')),
    m17: P(uns('photo-1596780209987-0b89b4369ec9'), uns('photo-1572804013309-59a88b7e92f1')),
    m18: P(uns('photo-1460353589961-50baa6b3213a'), uns('photo-1543163521-1bf539c55dd2')),
    m19: P(uns('photo-1582533568508-15b51c79e77b'), uns('photo-1596755094514-f87e34085b2c')),
    m20: P(uns('photo-1594753792364-f79b2ecf8296'), uns('photo-1585487003860-7926c430f7d8')),
    m21: P(uns('photo-1579952363873-27f3bade9f55'), uns('photo-1522778119026-d647f0596c20')),
    m22: P(uns('photo-1511499767150-a48a237f0083'), uns('photo-1572635196237-14b3f281503f')),
    m23: P(uns('photo-1603487742874-03f67dfec1a3'), uns('photo-1543163521-1bf539c55dd2')),
    m24: P(uns('photo-1581655353564-d7837ba3d566'), uns('photo-1521572163474-e1f1ad5812d0')),
  };

  function applyProductPhotos(items) {
    items.forEach(function (p) {
      var ph = PHOTOS[p.id];
      if (!ph) return;
      p.image = ph.primary;
      p.imageFallback = ph.backup;
    });
  }

  w.DOPAMINA_PHOTOS = { apply: applyProductPhotos, map: PHOTOS };
})(window);
