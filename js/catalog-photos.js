/**
 * Fotos de produto — prioridade: arquivo local → Unsplash/Wikimedia → backup.
 *
 * Coloque suas fotos em: dopamina/img/products/{id}.webp
 */
(function (w) {
  'use strict';

  var IMG_VER = '38';

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

  function P(id, primary, backup) {
    return { id: id, local: local(id), primary: primary, backup: backup || primary };
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
    p12: P('p12', wiki('4/4b/DJI_Mini_3_Pro_drone.jpg', 900), wiki('8/8d/Quadcopter.jpg', 900)),
    p14: P('p14', wiki('8/8e/Microwave_oven.jpg', 900), wiki('7/7a/Microwave_oven_2.jpg', 900)),
    p15: P('p15', uns('photo-1626082927389-6cd097cdc6ec'), uns('photo-1585515655855-d74f3e9c2d23')),
    p17: P('p17', wiki('4/4e/IPad_10th_generation.png', 900), wiki('9/9e/IPad_Pro_11-inch_(4th_generation).png', 900)),
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
    p28: P('p28', wiki('8/8a/Electric_razor.jpg', 900), wiki('7/7a/Shaving_razor.jpg', 900)),
    p29: P('p29', wiki('5/5e/Gas_stove.jpg', 900), wiki('8/8e/Kitchen_stove.jpg', 900)),

    /* Parte 2 — moda curada (webp local 1000×1000) */
    m01: P('m01', uns('photo-1548036328-c9fa89d128fa'), uns('photo-1584917865442-de89dfa41ccb')),
    m02: P('m02', uns('photo-1566150905458-1bf1fc113f0d'), uns('photo-1548036328-c9fa89d128fa')),
    m03: P('m03', wiki('4/4e/Chanel_2.55_bag.jpg', 900), wiki('8/8a/Handbag.jpg', 900)),
    m04: P('m04', wiki('8/8d/Balenciaga_Triple_S.jpg', 900), wiki('4/4e/Sneakers.jpg', 900)),
    m05: P('m05', wiki('4/4e/Sneakers.jpg', 900), wiki('8/8d/Sneakers_white.jpg', 900)),
    m06: P('m06', wiki('9/9e/Sunglasses.jpg', 900), wiki('7/7a/Sunglasses_2.jpg', 900)),
    m07: P('m07', uns('photo-1542291026-7eec264c27ff'), uns('photo-1606107557195-0ccc2b0a2bb0')),
    m08: P('m08', wiki('4/4e/Adidas_Ultraboost.jpg', 900), wiki('4/4e/Sneakers.jpg', 900)),
    m09: P('m09', wiki('8/8d/New_Balance_550.jpg', 900), wiki('4/4e/Sneakers.jpg', 900)),
    m10: P('m10', wiki('8/8a/Trench_coat.jpg', 900), wiki('9/9e/Coat.jpg', 900)),
    m11: P('m11', uns('photo-1595777457583-95e059d581b8'), uns('photo-1566174053879-31528523f8ae')),
    m12: P('m12', wiki('8/8d/Polo_shirt.jpg', 900), wiki('9/9e/T-shirt.jpg', 900)),
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
  };

  function applyProductPhotos(items) {
    items.forEach(function (p) {
      var ph = PHOTOS[p.id];
      if (!ph) return;
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
