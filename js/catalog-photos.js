/**
 * Fotos de produto — prioridade: arquivo local → Unsplash/Wikimedia → backup.
 *
 * Coloque suas fotos em: dopamina/img/products/{id}.webp
 */
(function (w) {
  'use strict';

  var IMG_VER = '40';

  function wiki(path, width) {
    var file = path.split('/').pop();
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + path + '/' + width + 'px-' + file;
  }

  function uns(id) {
    return 'https://images.unsplash.com/' + id + '?w=1000&h=1000&fit=contain&bg=ffffff&fm=jpg&q=90&auto=format';
  }

  function local(id) {
    return 'img/products/' + id + '.webp?v=' + IMG_VER;
  }

  function P(id, primary, backup, remoteOnly) {
    return {
      id: id,
      local: remoteOnly ? null : local(id),
      primary: primary,
      backup: backup || primary,
      remoteOnly: !!remoteOnly,
    };
  }

  var PHOTOS = {
    /* Parte 1 — eletrônicos curados (webp local 1000×1000) */
    p01: P('p01', uns('photo-1592899677977-9c10ca588bbd'), uns('photo-1511702033304-f8f02fdda238')),
    p06: P('p06', uns('photo-1593784991095-a205069470b6'), uns('photo-1593359677879-a670071ebdbe')),
    p13: P('p13', uns('photo-1593305841991-05c297ba4575'), uns('photo-1587202372775-e229f346b9b7')),
    p16: P('p16', uns('photo-1505740420928-5e560c06d30e'), uns('photo-1572569511254-d8f795e3431f')),
    p30: P('p30', uns('photo-1588872657578-7efd1f1555ed'), uns('photo-1496181133206-80ce9ccb4a7e')),

    /* Parte 3 — eletrônicos curados (webp local 1000×1000) */
    p02: P('p02', uns('photo-1517336714731-489689fd1ca8'), uns('photo-1611186871348-b1ce696e52ba')),
    p03: P('p03', uns('photo-1606813907291-d86efa9b94db'), uns('photo-1606144042614-b241699e99f8')),
    p04: P('p04', uns('photo-1556656793-08538906a9f8'), uns('photo-1592899677977-9c10ca588bbd')),
    p05: P('p05', wiki('8/8a/Refrigerator.jpg', 900), wiki('5/5e/Refrigerator_interior.jpg', 900)),
    p07: P('p07', uns('photo-1590658268037-6bf12165a8df'), uns('photo-1505740420928-5e560c06d30e')),
    p08: P('p08', uns('photo-1621259182978-fbf93132d53d'), uns('photo-1578303512595-81e6cc240f37')),
    p09: P('p09', wiki('c/c0/Robot_vacuum_cleaner.jpg', 900), wiki('5/5f/IRobot_Roomba.jpg', 900)),
    p10: P('p10', wiki('4/4e/Espresso_machine.jpg', 900), wiki('1/1f/Coffee_capsule_machine.jpg', 900)),
    /* Parte 4 — um de cada categoria (webp local 1000×1000) */
    p11: P('p11', uns('photo-1434493789847-2f02dc6ca35d'), uns('photo-1579586337278-3befd40fd17a')),
    /* Parte 5 — sequência categorias (webp local 1000×1000) */
    p12: P('p12', uns('photo-1473968512647-3e447244af8f'), uns('photo-1520862549827-de9ffee4191f')),
    p14: P('p14', wiki('8/8e/Microwave_oven.jpg', 900), wiki('7/7a/Microwave_oven_2.jpg', 900)),
    p15: P('p15', uns('photo-1626082927389-6cd097cdc6ec'), uns('photo-1585515655855-d74f3e9c2d23')),
    p17: P('p17', uns('photo-1544244015-0df4b3ffc6b0'), uns('photo-1561154464-82e9adf32764')),
    p18: P('p18', wiki('9/9e/Canon_EOS_R50.jpg', 900), wiki('3/3f/Canon_EOS_R10.jpg', 900)),
    p19: P('p19', wiki('5/5a/Apple_Watch_Series_9.png', 900), wiki('3/3a/Apple_Watch_Series_8.png', 900)),
    p20: P('p20', uns('photo-1608043152269-423dbba4e7e1'), uns('photo-1613689043014-7eacd122af21')),
    p21: P('p21', wiki('9/9e/Logitech_MX_Master_3S.jpg', 900), wiki('8/8d/Computer_mouse.jpg', 900)),
    p22: P('p22', wiki('5/5f/Dyson_V15_Detect.jpg', 900), wiki('4/4b/Vacuum_cleaner.jpg', 900)),
    p23: P('p23', wiki('9/9e/Amazon_Kindle_11th_generation.jpg', 900), wiki('8/8a/Amazon_Kindle_Paperwhite_(5th_generation).jpg', 900)),
    p24: P('p24', wiki('9/9e/Computer_monitor.jpg', 900), wiki('4/4e/Computer_monitor_2.jpg', 900)),
    p25: P('p25', wiki('8/8e/Meta_Quest_3_headset.png', 900), wiki('9/9e/Oculus_Quest_2.jpg', 900)),
    p26: P('p26', wiki('4/4e/Espresso_machine.jpg', 900), wiki('1/1f/Coffee_capsule_machine.jpg', 900)),
    p27: P('p27', wiki('4/4d/Samsung_4K_UHD_TV.jpg', 900), wiki('9/9e/Computer_monitor.jpg', 900)),
    p28: P('p28', uns('photo-1503951914875-452162b0f3f1'), uns('photo-1585751112414-ef2634080a0f')),
    p29: P('p29', wiki('5/5e/Gas_stove.jpg', 900), wiki('8/8e/Kitchen_stove.jpg', 900)),

    /* Parte 2 — moda curada (webp local 1000×1000) */
    m01: P('m01', uns('photo-1548036328-c9fa89d128fa'), uns('photo-1584917865442-de89dfa41ccb')),
    m02: P('m02', uns('photo-1566150905458-1bf1fc113f0d'), uns('photo-1548036328-c9fa89d128fa')),
    m03: P('m03', wiki('4/4e/Chanel_2.55_bag.jpg', 900), wiki('8/8a/Handbag.jpg', 900)),
    m04: P('m04', wiki('8/8d/Balenciaga_Triple_S.jpg', 900), wiki('4/4e/Sneakers.jpg', 900)),
    m05: P('m05', wiki('4/4e/Sneakers.jpg', 900), wiki('8/8d/Sneakers_white.jpg', 900)),
    m06: P('m06', wiki('9/9e/Sunglasses.jpg', 900), wiki('7/7a/Sunglasses_2.jpg', 900)),
    m07: P('m07', uns('photo-1542291026-7eec264c27ff'), uns('photo-1606107557195-0ccc2b0a2bb0')),
    m08: P('m08', uns('photo-1600185365926-3a2ce3cdb9eb'), uns('photo-1608231387042-66d9ac4aa44c')),
    m09: P('m09', wiki('8/8d/New_Balance_550.jpg', 900), wiki('4/4e/Sneakers.jpg', 900)),
    m10: P('m10', wiki('8/8a/Trench_coat.jpg', 900), wiki('9/9e/Coat.jpg', 900)),
    m11: P('m11', uns('photo-1595777457583-95e059d581b8'), uns('photo-1566174053879-31528523f8ae')),
    m12: P('m12', uns('photo-1621072156002-e2fccdc0b176'), uns('photo-1586799887386-5de905939b20')),
    m13: P('m13', uns('photo-1576566588028-4147f3842f27'), uns('photo-1521572163474-e1f1ad5812d0')),
    m14: P('m14', uns('photo-1624378439575-d8705ad7ae80'), uns('photo-1541099644245-14f3c6c7d9e5')),
    m15: P('m15', wiki('9/9e/Blouse.jpg', 900), wiki('8/8a/T-shirt.jpg', 900)),
    m16: P('m16', wiki('8/8a/Sandals.jpg', 900), wiki('9/9e/High-heeled_shoes.jpg', 900)),
    m17: P('m17', wiki('9/9e/Summer_dress.jpg', 900), wiki('9/9e/Dress.jpg', 900)),
    m18: P('m18', wiki('8/8a/Flip-flops.jpg', 900), wiki('8/8a/Sandals.jpg', 900)),
    m19: P('m19', wiki('8/8a/Knitwear.jpg', 900), wiki('9/9e/T-shirt.jpg', 900)),
    m20: P('m20', wiki('8/8a/Lingerie.jpg', 900), wiki('9/9e/Underwear.jpg', 900)),
    m21: P('m21', wiki('8/8d/Football_shirt.jpg', 900), wiki('9/9e/T-shirt.jpg', 900)),
    m22: P('m22', uns('photo-1572635196237-14b3f281503f'), uns('photo-1511499767150-a48a237f0083')),
    m23: P('m23', wiki('8/8a/Flip-flops.jpg', 900), wiki('8/8a/Sandals.jpg', 900)),
    m24: P('m24', wiki('9/9e/T-shirt.jpg', 900), wiki('8/8d/Polo_shirt.jpg', 900)),

    /* Expansão catálogo 100+ — fotos Unsplash (sem webp local) */
    p31: P('p31', uns('photo-1556656793-08538906a9f8'), uns('photo-1511702033304-f8f02fdda238'), true),
    p32: P('p32', uns('photo-1556656793-08538906a9f8'), uns('photo-1511702033304-f8f02fdda238'), true),
    p33: P('p33', uns('photo-1556656793-08538906a9f8'), uns('photo-1511702033304-f8f02fdda238'), true),
    p34: P('p34', uns('photo-1606813907291-d86efa9b94db'), uns('photo-1511702033304-f8f02fdda238'), true),
    p35: P('p35', uns('photo-1606813907291-d86efa9b94db'), uns('photo-1511702033304-f8f02fdda238'), true),
    p36: P('p36', uns('photo-1621259182978-fbf93132d53d'), uns('photo-1511702033304-f8f02fdda238'), true),
    p37: P('p37', uns('photo-1527864550417-7fd91fc51a46'), uns('photo-1511702033304-f8f02fdda238'), true),
    p38: P('p38', uns('photo-1527864550417-7fd91fc51a46'), uns('photo-1511702033304-f8f02fdda238'), true),
    p39: P('p39', uns('photo-1590658268037-6bf12165a8df'), uns('photo-1511702033304-f8f02fdda238'), true),
    p40: P('p40', uns('photo-1590658268037-6bf12165a8df'), uns('photo-1511702033304-f8f02fdda238'), true),
    p41: P('p41', uns('photo-1608043152269-423dbba4e7e1'), uns('photo-1511702033304-f8f02fdda238'), true),
    p42: P('p42', uns('photo-1516035069371-29a1b244cc32'), uns('photo-1511702033304-f8f02fdda238'), true),
    p43: P('p43', uns('photo-1516035069371-29a1b244cc32'), uns('photo-1511702033304-f8f02fdda238'), true),
    p44: P('p44', uns('photo-1516035069371-29a1b244cc32'), uns('photo-1511702033304-f8f02fdda238'), true),
    p45: P('p45', uns('photo-1503951914875-452162b0f3f1'), uns('photo-1511702033304-f8f02fdda238'), true),
    p46: P('p46', uns('photo-1503951914875-452162b0f3f1'), uns('photo-1511702033304-f8f02fdda238'), true),
    p47: P('p47', uns('photo-1503951914875-452162b0f3f1'), uns('photo-1511702033304-f8f02fdda238'), true),
    p48: P('p48', uns('photo-1503951914875-452162b0f3f1'), uns('photo-1511702033304-f8f02fdda238'), true),
    p49: P('p49', uns('photo-1556656793-08538906a9f8'), uns('photo-1511702033304-f8f02fdda238'), true),
    p50: P('p50', uns('photo-1556656793-08538906a9f8'), uns('photo-1511702033304-f8f02fdda238'), true),
    p51: P('p51', uns('photo-1556656793-08538906a9f8'), uns('photo-1511702033304-f8f02fdda238'), true),
    p52: P('p52', uns('photo-1556656793-08538906a9f8'), uns('photo-1511702033304-f8f02fdda238'), true),
    p53: P('p53', uns('photo-1585655097312-7c098090a426'), uns('photo-1511702033304-f8f02fdda238'), true),
    p54: P('p54', uns('photo-1585655097312-7c098090a426'), uns('photo-1511702033304-f8f02fdda238'), true),
    p55: P('p55', uns('photo-1626082927389-6cd097cdc6ec'), uns('photo-1511702033304-f8f02fdda238'), true),
    p56: P('p56', uns('photo-1585655097312-7c098090a426'), uns('photo-1511702033304-f8f02fdda238'), true),
    m25: P('m25', uns('photo-1548036328-c9fa89d128fa'), uns('photo-1576566588028-4147f3842f27'), true),
    m26: P('m26', uns('photo-1566150905458-1bf1fc113f0d'), uns('photo-1576566588028-4147f3842f27'), true),
    m27: P('m27', uns('photo-1548036328-c9fa89d128fa'), uns('photo-1576566588028-4147f3842f27'), true),
    m28: P('m28', uns('photo-1542291026-7eec264c27ff'), uns('photo-1576566588028-4147f3842f27'), true),
    m29: P('m29', uns('photo-1576566588028-4147f3842f27'), uns('photo-1576566588028-4147f3842f27'), true),
    m30: P('m30', uns('photo-1576566588028-4147f3842f27'), uns('photo-1576566588028-4147f3842f27'), true),
    m31: P('m31', uns('photo-1542291026-7eec264c27ff'), uns('photo-1576566588028-4147f3842f27'), true),
    m32: P('m32', uns('photo-1600185365926-3a2ce3cdb9eb'), uns('photo-1576566588028-4147f3842f27'), true),
    m33: P('m33', uns('photo-1542291026-7eec264c27ff'), uns('photo-1576566588028-4147f3842f27'), true),
    m34: P('m34', uns('photo-1603487742874-03f67dfec1a3'), uns('photo-1576566588028-4147f3842f27'), true),
    m35: P('m35', uns('photo-1603487742874-03f67dfec1a3'), uns('photo-1576566588028-4147f3842f27'), true),
    m36: P('m36', uns('photo-1624378439575-d8705ad7ae80'), uns('photo-1576566588028-4147f3842f27'), true),
    m37: P('m37', uns('photo-1621072156002-e2fccdc0b176'), uns('photo-1576566588028-4147f3842f27'), true),
    m38: P('m38', uns('photo-1576566588028-4147f3842f27'), uns('photo-1576566588028-4147f3842f27'), true),
    m39: P('m39', uns('photo-1503951914875-452162b0f3f1'), uns('photo-1576566588028-4147f3842f27'), true),
    m40: P('m40', uns('photo-1503951914875-452162b0f3f1'), uns('photo-1576566588028-4147f3842f27'), true),
    m41: P('m41', uns('photo-1503951914875-452162b0f3f1'), uns('photo-1576566588028-4147f3842f27'), true),
    m42: P('m42', uns('photo-1621072156002-e2fccdc0b176'), uns('photo-1576566588028-4147f3842f27'), true),
    m43: P('m43', uns('photo-1591047139829-d91aecb6caea'), uns('photo-1576566588028-4147f3842f27'), true),
    m44: P('m44', uns('photo-1591047139829-d91aecb6caea'), uns('photo-1576566588028-4147f3842f27'), true),
    m45: P('m45', uns('photo-1576566588028-4147f3842f27'), uns('photo-1576566588028-4147f3842f27'), true),
    m46: P('m46', uns('photo-1576566588028-4147f3842f27'), uns('photo-1576566588028-4147f3842f27'), true),
    m47: P('m47', uns('photo-1595777457583-95e059d581b8'), uns('photo-1576566588028-4147f3842f27'), true),
    m48: P('m48', uns('photo-1572635196237-14b3f281503f'), uns('photo-1576566588028-4147f3842f27'), true),
    m49: P('m49', uns('photo-1434493789847-2f02dc6ca35d'), uns('photo-1576566588028-4147f3842f27'), true),
    m50: P('m50', uns('photo-1611591437281-460bfbe1220a'), uns('photo-1576566588028-4147f3842f27'), true),
  };

  function applyProductPhotos(items) {
    items.forEach(function (p) {
      var ph = PHOTOS[p.id];
      if (!ph) return;
      if (ph.remoteOnly || !ph.local) {
        p.image = ph.primary;
        p.imageFallback = ph.backup;
        p.imageAltFallback = ph.primary;
        return;
      }
      p.image = ph.local;
      p.imageFallback = ph.primary;
      p.imageAltFallback = ph.backup;
    });
  }

  w.DOPAMINA_PHOTOS = {
    apply: applyProductPhotos,
    map: PHOTOS,
    localPath: function (id) { return local(id); },
    version: IMG_VER,
  };
})(window);
