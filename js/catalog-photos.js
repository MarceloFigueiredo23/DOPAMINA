/**
 * Fotos por produto — URL primária + backup únicos (Wikimedia / Unsplash).
 * Evita imagens repetidas e fallbacks genéricos iguais para todos.
 */
(function (w) {
  'use strict';

  function wikiThumb(path, width) {
    var file = path.split('/').pop();
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + path + '/' + width + 'px-' + file;
  }

  function wikiFile(path) {
    return 'https://upload.wikimedia.org/wikipedia/commons/' + path;
  }

  function uns(id) {
    return 'https://images.unsplash.com/' + id + '?w=800&h=800&fit=crop&fm=jpg&q=90&auto=format';
  }

  function P(primary, backup) {
    return { primary: primary, backup: backup || primary };
  }

  var PHOTOS = {
    /* ── AIFOOD (prato real + backup food) ── */
    f01: P(wikiThumb('8/85/Burger_King_Whopper.jpg', 800), uns('photo-1568901348915-4f738b0cf8fb')),
    f02: P(wikiThumb('a/a3/Pizza_Hut_Pizza.jpg', 800), uns('photo-1513104890138-7c749659a591')),
    f03: P(wikiThumb('4/4f/McDonald%27s_Big_Mac_hamburger.jpg', 800), uns('photo-1550547660-22aa7fe61265')),
    f04: P(wikiThumb('2/2e/KFC_Original_Recipe_fried_chicken.jpg', 800), uns('photo-1626082927389-7114cbd1651e')),
    f05: P(wikiThumb('5/57/Subway_sandwich.jpg', 800), uns('photo-1614430049513-ead22937d3d0')),
    f06: P(wikiThumb('4/4e/Esfiha.jpg', 800), uns('photo-1604908178846-bf7191421916')),
    f07: P(wikiThumb('6/6e/Bobs_hamburger.jpg', 800), uns('photo-1550317138-10000687a491')),
    f08: P(wikiThumb('5/5e/Frappuccino.jpg', 800), uns('photo-1461023058948-939a962d824f')),
    f09: P(wikiThumb('4/4f/Picanha_na_chapa.jpg', 800), uns('photo-1546834050-0b07584eeda2')),
    f10: P(wikiThumb('9/9d/Brownie_with_ice_cream.jpg', 800), uns('photo-1606313564204-e75d5efcc254')),
    f11: P(wikiThumb('3/3f/Plated_steak_with_rice_and_beans.jpg', 800), uns('photo-1600891964092-4316c3000326')),
    f12: P(wikiThumb('6/60/Sushi_platter.jpg', 800), uns('photo-1579584425558-2fafd2377920')),
    f13: P(wikiThumb('9/94/Ramen_Tonkotsu.jpg', 800), uns('photo-1569718212165-3a285874eb36')),
    f14: P(wikiThumb('7/7a/Acai_bowl_with_fruit.jpg', 800), uns('photo-1590301159386-806fc9ca48d9')),
    f15: P(wikiThumb('a/ae/Pepperoni_pizza.jpg', 800), uns('photo-1565299624946-b28f40a0ae38')),
    f16: P(wikiThumb('8/8a/Coxinha_Brasil.jpg', 800), uns('photo-1606755962773-d324e0a8f6c5')),
    f17: P(wikiThumb('6/6d/Cheeseburger.jpg', 800), uns('photo-1586192440005-356cdb5d7b9a')),
    f18: P(wikiThumb('4/4e/Poke_bowl.jpg', 800), uns('photo-1546069901-ba2a88c258df')),
    f19: P(wikiThumb('b/ba/Lasagna_-_Freshly_baked.jpg', 800), uns('photo-1628845242799-f419d2a72d7c')),
    f20: P(wikiThumb('7/73/Tacos_de_carne_asada.jpg', 800), uns('photo-1565291663046-7827f18908b')),
    f21: P(wikiThumb('4/4c/Hot_dog_with_mustard.jpg', 800), uns('photo-1619745252086-a7bd21f0449f')),
    f22: P(wikiThumb('9/9a/Pastel_brasileiro.jpg', 800), uns('photo-1630914442700-2112a4d2c3ad')),
    f23: P(wikiThumb('3/31/Doughnuts_in_a_box.jpg', 800), uns('photo-1551024506-0bccd828d307')),
    f24: P(wikiThumb('6/6b/Pao_de_queijo.jpg', 800), uns('photo-1488477181941-7818ad7b4329')),
    f25: P(wikiThumb('0/0a/Yakisoba.jpg', 800), uns('photo-1617096714-7cfb-640695373e9')),
    f26: P(wikiThumb('1/1a/Crepes_with_Nutella_and_strawberries.jpg', 800), uns('photo-1519678823-1cd43b937165')),
    f27: P(wikiThumb('2/2e/Ice_cream_cone.jpg', 800), uns('photo-1563805042235-50e725903d57')),
    f28: P(wikiThumb('9/9f/Bubble_tea_taro.jpg', 800), uns('photo-1525385130511-4e37dd1de1cb')),
    f29: P(wikiThumb('9/91/Penne_quattro_formaggi.jpg', 800), uns('photo-1621996346565-e3dbc646d9a9')),
    f30: P(wikiThumb('3/3a/Waffles_with_strawberries.jpg', 800), uns('photo-1562376552-29d0c16b86fb')),

    /* ── AMAZOOM — eletrônicos reais (Wikimedia) ── */
    p01: P(wikiFile('f/f5/IPhone_16_Pro_Max.png'), uns('photo-1695048133144-6b33fd7b28b5')),
    p02: P(wikiThumb('1/1b/MacBook_Air_M3_2024.jpg', 800), uns('photo-1517336714731-489689fd1ca8')),
    p03: P(wikiFile('1/1b/PlayStation_5_and_DualSense_with_transparent_background.png'), uns('photo-1606813907291-d86efa9b94db')),
    p04: P(wikiThumb('8/8e/Samsung_Galaxy_S24_Ultra_%28cropped%29.png', 800), uns('photo-1610945265614-dcf5b43c5e63')),
    p05: P(wikiThumb('9/9e/Refrigerator.jpg', 800), uns('photo-1585655097312-7c098090a426')),
    p06: P(wikiThumb('4/4d/Samsung_4K_UHD_TV.jpg', 800), uns('photo-1593359677879-a670071ebdbe')),
    p07: P(wikiThumb('3/3b/AirPods_Pro_2nd_generation.png', 800), uns('photo-1600296640924-8823b5d4a180')),
    p08: P(wikiThumb('8/8d/Nintendo-Switch-OLED-White-Flap-Open.jpg', 800), uns('photo-1610892437321-4bafb95daed0')),
    p09: P(wikiThumb('c/c0/Robot_vacuum_cleaner.jpg', 800), uns('photo-1558317374-a37d8b1b41ff')),
    p10: P(wikiThumb('9/9a/Nespresso_Vertuo.jpg', 800), uns('photo-1517668808822-9ebb02f2a0e0')),
    p11: P(wikiThumb('1/1a/Apple_Watch_Series_10_46mm.jpg', 800), uns('photo-1523275335684-37898b6baf30')),
    p12: P(wikiThumb('4/4d/DJI_Mini_3_drone.jpg', 800), uns('photo-1473968512647-3e447244af8f')),
    p13: P(wikiThumb('8/8e/Gaming_computer.jpg', 800), uns('photo-1593305841991-05c297ba4575')),
    p14: P(wikiThumb('2/2f/Microwave_oven.jpg', 800), uns('photo-1574269905862-9a3d95c4d9ac')),
    p15: P(wikiThumb('9/9a/Air_fryer.jpg', 800), uns('photo-1585515655855-d74f3e9c2d23')),
    p16: P(wikiThumb('1/1d/Sony_WH-1000XM5_%28cropped%29.png', 800), uns('photo-1505740420928-5e560c06d30e')),
    p17: P(wikiThumb('9/9a/IPad_11th_generation.png', 800), uns('photo-1544244015-0df4b3ffc6b0')),
    p18: P(wikiThumb('9/9f/Canon_EOS_R50.jpg', 800), uns('photo-1516035069371-29a1b244cc32')),
    p19: P(wikiThumb('8/8a/Samsung_Galaxy_Watch_7.jpg', 800), uns('photo-1579586337278-3befd40f17da')),
    p20: P(wikiThumb('a/a1/JBL_Flip_5.jpg', 800), uns('photo-1608043152269-423dbba4e7e1')),
    p21: P(wikiThumb('5/5a/Logitech_MX_Master_3.png', 800), uns('photo-1527864550417-7fd91fc51a46')),
    p22: P(wikiThumb('d/d1/Dyson_V15_Detect.jpg', 800), uns('photo-1558618666-fcd25c85cd64')),
    p23: P(wikiThumb('9/9e/Amazon_Kindle_11th_generation.jpg', 800), uns('photo-1544947950-fa07a98d237f')),
    p24: P(wikiThumb('9/9e/Computer_monitor.jpg', 800), uns('photo-1527443224154-e4bbfbb1d50f')),
    p25: P(wikiThumb('8/8e/Meta_Quest_3_headset.png', 800), uns('photo-1622979135224-d2a1098f6d8b')),
    p26: P(wikiThumb('4/4e/Espresso_machine.jpg', 800), uns('photo-1495474472287-4d71bcdd2085')),
    p27: P(uns('photo-1593784991095-a205069470b6'), wikiThumb('4/4d/Samsung_4K_UHD_TV.jpg', 800)),
    p28: P(wikiThumb('8/8a/Electric_razor.jpg', 800), uns('photo-1621607512210-7f9a3af37531')),
    p29: P(wikiThumb('5/5e/Gas_stove.jpg', 800), uns('photo-1556911220-bff31c812dba')),
    p30: P(wikiThumb('9/9e/Gaming_laptop.jpg', 800), uns('photo-1496181133206-80ce9ccb4a7e')),

    /* ── SHENIM — moda (marca real no Wikimedia quando possível) ── */
    m01: P(wikiThumb('4/4e/Gucci_GG_Marmont_bag.jpg', 800), uns('photo-1584917865442-de89dfa41ccb')),
    m02: P(wikiThumb('6/67/Louis_Vuitton_Neverfull.jpg', 800), uns('photo-1590874103328-eac3a398e716')),
    m03: P(wikiThumb('5/5e/Chanel_2.55_flap_bag.jpg', 800), uns('photo-1594938291221-94f3130a4f6a')),
    m04: P(wikiThumb('8/8d/Balenciaga_Triple_S.jpg', 800), uns('photo-1549298916-b41d501d3772')),
    m05: P(wikiThumb('3/3a/Prada_sneakers.jpg', 800), uns('photo-1608253813970-eee5a0955d81')),
    m06: P(wikiThumb('5/5a/Sunglasses.jpg', 800), uns('photo-1572635196237-14b3f281503f')),
    m07: P(wikiFile('3/37/Nike_Air_Max_90.png'), uns('photo-1606107557195-0ccc2b0a2bb0')),
    m08: P(wikiThumb('5/57/Adidas_Ultra_Boost_4.0.jpg', 800), uns('photo-1608231387042-66d9ac4aa44c')),
    m09: P(wikiThumb('4/4e/New_Balance_550.jpg', 800), uns('photo-1608667509904-b82b1ae1df4b')),
    m10: P(wikiThumb('9/9e/Trench_coat.jpg', 800), uns('photo-1591047139829-d91aecb6caea')),
    m11: P(wikiThumb('6/6e/Black_dress.jpg', 800), uns('photo-1595777457583-95e059d581b8')),
    m12: P(wikiThumb('2/2e/Lacoste_polo_shirt.jpg', 800), uns('photo-1625915793619-626b39a2ba11')),
    m13: P(wikiThumb('2/2f/White_T-shirt.jpg', 800), uns('photo-1521572163474-e1f1ad5812d0')),
    m14: P(wikiThumb('4/4c/Blue_jeans.jpg', 800), uns('photo-1542272454318-2ab582ca4c63')),
    m15: P(wikiThumb('8/8a/Long_sleeve_shirt.jpg', 800), uns('photo-1596755094514-f87e34085b2c')),
    m16: P(wikiThumb('5/5e/Sandals.jpg', 800), uns('photo-1543163521-1bf539c55dd2')),
    m17: P(wikiThumb('7/7a/Summer_dress.jpg', 800), uns('photo-1596780209987-0b89b4369ec9')),
    m18: P(wikiThumb('6/6e/Melissa_sandals.jpg', 800), uns('photo-1460353589961-50baa6b3213a')),
    m19: P(wikiThumb('9/9a/Crop_top.jpg', 800), uns('photo-1582533568508-15b51c79e77b')),
    m20: P(wikiThumb('3/3a/Bra_lingerie.jpg', 800), uns('photo-1594753792364-f79b2ecf8296')),
    m21: P(wikiThumb('4/4f/Football_jersey.jpg', 800), uns('photo-1579952363873-27f3bade9f55')),
    m22: P(uns('photo-1511499767150-a48a237f0083'), wikiThumb('5/5a/Sunglasses.jpg', 800)),
    m23: P(wikiThumb('6/6d/Havaianas_flip_flops.jpg', 800), uns('photo-1603487742874-03f67dfec1a3')),
    m24: P(wikiThumb('2/2f/Black_T-shirt.jpg', 800), uns('photo-1581655353564-d7837ba3d566')),
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
