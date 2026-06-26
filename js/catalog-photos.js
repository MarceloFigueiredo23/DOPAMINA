/**
 * Fotos de produto — prioridade: arquivo local → packshot Wikimedia → backup.
 *
 * Coloque suas fotos em: dopamina/img/products/{id}.webp
 * Ex.: p01.webp = iPhone, m07.webp = Nike Air Max
 */
(function (w) {
  'use strict';

  var IMG_VER = '29';

  function wiki(path, width) {
    var file = path.split('/').pop();
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + path + '/' + width + 'px-' + file;
  }

  function local(id) {
    return 'img/products/' + id + '.webp?v=' + IMG_VER;
  }

  function P(id, primary, backup) {
    return { id: id, local: local(id), primary: primary, backup: backup || primary };
  }

  var PHOTOS = {
    /* ── Eletrônicos — fotos reais de produto (Wikimedia / packshot) ── */
    p01: P('p01', wiki('c/cf/IPhone_15_Pro_Max_Blue_Titanium.png', 900), wiki('f/f5/IPhone_15_Pro_Natural_Titanium.png', 900)),
    p02: P('p02', wiki('3/3a/MacBook_Air_(M2,_2022).jpg', 900), wiki('9/9e/MacBook_Air_(M2,_2022)_on_desk.jpg', 900)),
    p03: P('p03', wiki('7/77/PlayStation_5_and_DualSense_controller.png', 900), wiki('4/4e/PlayStation_5.svg', 900)),
    p04: P('p04', wiki('1/1e/Samsung_Galaxy_S23_Ultra.png', 900), wiki('a/a8/Samsung_Galaxy_S24_Ultra.png', 900)),
    p05: P('p05', wiki('8/8a/Refrigerator.jpg', 900), wiki('5/5e/Refrigerator_interior.jpg', 900)),
    p06: P('p06', wiki('4/4d/Samsung_4K_UHD_TV.jpg', 900), wiki('9/9e/Computer_monitor.jpg', 900)),
    p07: P('p07', wiki('2/2e/AirPods_Pro_2nd_generation.png', 900), wiki('e/e8/AirPods_Pro.png', 900)),
    p08: P('p08', wiki('1/1e/Nintendo-Switch-OLED-model.png', 900), wiki('8/8d/Nintendo_Switch_console.png', 900)),
    p09: P('p09', wiki('c/c0/Robot_vacuum_cleaner.jpg', 900), wiki('5/5f/IRobot_Roomba.jpg', 900)),
    p10: P('p10', wiki('4/4e/Espresso_machine.jpg', 900), wiki('1/1f/Coffee_capsule_machine.jpg', 900)),
    p11: P('p11', wiki('5/5a/Apple_Watch_Series_9.png', 900), wiki('3/3a/Apple_Watch_Series_8.png', 900)),
    p12: P('p12', wiki('4/4b/DJI_Mini_3_Pro_drone.jpg', 900), wiki('8/8d/Quadcopter.jpg', 900)),
    p13: P('p13', wiki('2/27/GeForce_RTX_4090_Founders_Edition_FL.jpg', 900), wiki('9/9e/Gaming_laptop.jpg', 900)),
    p14: P('p14', wiki('8/8e/Microwave_oven.jpg', 900), wiki('7/7a/Microwave_oven_2.jpg', 900)),
    p15: P('p15', wiki('3/3a/Air_fryer.jpg', 900), wiki('8/8f/Deep_fryer.jpg', 900)),
    p16: P('p16', wiki('8/8a/Sony_WH-1000XM5_(cropped).jpg', 900), wiki('5/5c/Sony_WH-1000XM4.jpg', 900)),
    p17: P('p17', wiki('4/4e/IPad_10th_generation.png', 900), wiki('9/9e/IPad_Pro_11-inch_(4th_generation).png', 900)),
    p18: P('p18', wiki('9/9e/Canon_EOS_R50.jpg', 900), wiki('3/3f/Canon_EOS_R10.jpg', 900)),
    p19: P('p19', wiki('5/5a/Apple_Watch_Series_9.png', 900), wiki('3/3a/Apple_Watch_Series_8.png', 900)),
    p20: P('p20', wiki('8/8d/JBL_Flip_6.jpg', 900), wiki('6/6a/Bluetooth_speaker.jpg', 900)),
    p21: P('p21', wiki('9/9e/Logitech_MX_Master_3S.jpg', 900), wiki('8/8d/Computer_mouse.jpg', 900)),
    p22: P('p22', wiki('5/5f/Dyson_V15_Detect.jpg', 900), wiki('4/4b/Vacuum_cleaner.jpg', 900)),
    p23: P('p23', wiki('9/9e/Amazon_Kindle_11th_generation.jpg', 900), wiki('8/8a/Amazon_Kindle_Paperwhite_(5th_generation).jpg', 900)),
    p24: P('p24', wiki('9/9e/Computer_monitor.jpg', 900), wiki('4/4e/Computer_monitor_2.jpg', 900)),
    p25: P('p25', wiki('8/8e/Meta_Quest_3_headset.png', 900), wiki('9/9e/Oculus_Quest_2.jpg', 900)),
    p26: P('p26', wiki('4/4e/Espresso_machine.jpg', 900), wiki('1/1f/Coffee_capsule_machine.jpg', 900)),
    p27: P('p27', wiki('4/4d/Samsung_4K_UHD_TV.jpg', 900), wiki('9/9e/Computer_monitor.jpg', 900)),
    p28: P('p28', wiki('8/8a/Electric_razor.jpg', 900), wiki('7/7a/Shaving_razor.jpg', 900)),
    p29: P('p29', wiki('5/5e/Gas_stove.jpg', 900), wiki('8/8e/Kitchen_stove.jpg', 900)),
    p30: P('p30', wiki('9/9e/Gaming_laptop.jpg', 900), wiki('2/27/GeForce_RTX_4090_Founders_Edition_FL.jpg', 900)),

    /* ── Moda — packshot / produto isolado ── */
    m01: P('m01', wiki('9/9e/Gucci_bag.jpg', 900), wiki('8/8a/Handbag.jpg', 900)),
    m02: P('m02', wiki('8/8a/Louis_Vuitton_Neverfull.jpg', 900), wiki('8/8a/Handbag.jpg', 900)),
    m03: P('m03', wiki('4/4e/Chanel_2.55_bag.jpg', 900), wiki('8/8a/Handbag.jpg', 900)),
    m04: P('m04', wiki('8/8d/Balenciaga_Triple_S.jpg', 900), wiki('4/4e/Sneakers.jpg', 900)),
    m05: P('m05', wiki('4/4e/Sneakers.jpg', 900), wiki('8/8d/Sneakers_white.jpg', 900)),
    m06: P('m06', wiki('9/9e/Sunglasses.jpg', 900), wiki('7/7a/Sunglasses_2.jpg', 900)),
    m07: P('m07', wiki('8/8d/Nike_Air_Max_90.jpg', 900), wiki('4/4e/Sneakers.jpg', 900)),
    m08: P('m08', wiki('4/4e/Adidas_Ultraboost.jpg', 900), wiki('4/4e/Sneakers.jpg', 900)),
    m09: P('m09', wiki('8/8d/New_Balance_550.jpg', 900), wiki('4/4e/Sneakers.jpg', 900)),
    m10: P('m10', wiki('8/8a/Trench_coat.jpg', 900), wiki('9/9e/Coat.jpg', 900)),
    m11: P('m11', wiki('9/9e/Dress.jpg', 900), wiki('8/8a/Evening_dress.jpg', 900)),
    m12: P('m12', wiki('8/8d/Polo_shirt.jpg', 900), wiki('9/9e/T-shirt.jpg', 900)),
    m13: P('m13', wiki('9/9e/T-shirt.jpg', 900), wiki('8/8d/Polo_shirt.jpg', 900)),
    m14: P('m14', wiki('8/8a/Jeans.jpg', 900), wiki('9/9e/Denim_jeans.jpg', 900)),
    m15: P('m15', wiki('9/9e/Blouse.jpg', 900), wiki('8/8a/T-shirt.jpg', 900)),
    m16: P('m16', wiki('8/8a/Sandals.jpg', 900), wiki('9/9e/High-heeled_shoes.jpg', 900)),
    m17: P('m17', wiki('9/9e/Summer_dress.jpg', 900), wiki('9/9e/Dress.jpg', 900)),
    m18: P('m18', wiki('8/8a/Flip-flops.jpg', 900), wiki('8/8a/Sandals.jpg', 900)),
    m19: P('m19', wiki('8/8a/Knitwear.jpg', 900), wiki('9/9e/T-shirt.jpg', 900)),
    m20: P('m20', wiki('8/8a/Lingerie.jpg', 900), wiki('9/9e/Underwear.jpg', 900)),
    m21: P('m21', wiki('8/8d/Football_shirt.jpg', 900), wiki('9/9e/T-shirt.jpg', 900)),
    m22: P('m22', wiki('9/9e/Ray-Ban_Aviator.jpg', 900), wiki('9/9e/Sunglasses.jpg', 900)),
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
