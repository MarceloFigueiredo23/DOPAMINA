/** Catálogo — marcas reais, fotos de produto, preços BR, ficha técnica */
(function (w) {
  'use strict';

  function wikiThumb(path, width) {
    var file = path.split('/').pop();
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + path + '/' + width + 'px-' + file;
  }

  function wikiFile(path) {
    return 'https://upload.wikimedia.org/wikipedia/commons/' + path;
  }

  function unsplash(photoId) {
    return 'https://images.unsplash.com/' + photoId + '?w=800&h=800&fit=crop&fm=jpg&q=92&auto=format';
  }

  /** Foto packshot estilo marketplace (fundo claro, produto centralizado) */
  function ecImg(photoId) {
    return unsplash(photoId);
  }

  function productReviews(name) {
    return [
      { user: 'Compra verificada', stars: 5, title: 'Produto conforme anunciado', text: name + ' chegou lacrado, dentro do prazo. Funcionando perfeitamente.', date: '18 jun 2026', helpful: 124 },
      { user: 'João V.', stars: 4, title: 'Bom custo-benefício', text: 'Atendeu expectativa. Embalagem original e nota fiscal.', date: '8 jun 2026', helpful: 56 },
      { user: 'Mariana K.', stars: 5, title: 'Recomendo', text: 'Entrega rápida. Produto original, sem avarias.', date: '1 jun 2026', helpful: 31 },
      { user: 'Carlos E.', stars: 3, title: 'Ok', text: 'Produto bom, mas peguei em promoção — fora dela o preço é salgado.', date: '25 mai 2026', helpful: 12 },
    ];
  }

  function fashionReviews(name, brand) {
    return [
      { user: 'Compra verificada', stars: 5, title: 'Original ' + brand, text: name + ' — etiqueta e acabamento conferem com a loja oficial.', date: '20 jun 2026', helpful: 89 },
      { user: 'Lívia M.', stars: 5, title: 'Caimento perfeito', text: 'Tecido de qualidade, igual às fotos. Chegou em 4 dias úteis.', date: '12 jun 2026', helpful: 44 },
      { user: 'Thiago A.', stars: 4, title: 'Boa compra', text: 'Produto bonito e bem embalado. Tamanho bateu com a tabela da marca.', date: '3 jun 2026', helpful: 21 },
    ];
  }

  /* Comida / delivery — desativado (ver branch futuro) */
  var express = [];

  var premium = [
    { id: 'p01', brand: 'Apple', name: 'iPhone 16 Pro 256GB Titânio Natural',     shop: 'Mercadopamina', price: 8999, oldPrice: 9999, tag: 'Lançamento', image: ecImg('photo-1695048133144-6b33fd7b28b5'), rating: 4.8, reviews: 2847, prime: true, specs: ['Tela 6,3" OLED ProMotion', 'Chip A18 Pro', 'Câmera 48MP Fusion', 'Titânio grau 5'], desc: 'iPhone 16 Pro Apple com chip A18 Pro, Action Button e gravação 4K Dolby Vision.' },
    { id: 'p02', brand: 'Apple', name: 'MacBook Air 13" M3 16GB 512GB',     shop: 'Mercadopamina', price: 10999, oldPrice: 12499, tag: 'Apple', image: ecImg('photo-1517336714731-489689fd1ca8'), rating: 4.9, reviews: 1203, prime: true, specs: ['Apple M3 8-core', '16GB memória unificada', '512GB SSD', 'Até 18h bateria'], desc: 'MacBook Air ultrafino Apple — produtividade e bateria de dia inteiro.' },
    { id: 'p03', brand: 'Sony', name: 'PlayStation 5 Slim 1TB',     shop: 'Mercadopamina', price: 3999, oldPrice: 4499, tag: 'Games', image: ecImg('photo-1606813907291-d86efa9b94db'), rating: 4.8, reviews: 4521, prime: true, specs: ['SSD 1TB', 'Ray tracing', 'DualSense incluso', '4K até 120fps'], desc: 'Console Sony PS5 Slim com SSD ultrarrápido e feedback háptico.' },
    { id: 'p04', brand: 'Samsung', name: 'Galaxy S24 Ultra 256GB',     shop: 'Mercadopamina', price: 7499, oldPrice: 8499, tag: 'Android', image: ecImg('photo-1610945265614-dcf5b43c5e63'), rating: 4.7, reviews: 1890, prime: true, specs: ['S Pen integrada', 'Câmera 200MP', 'Galaxy AI', 'Tela 6,8" Dynamic AMOLED'], desc: 'Flagship Samsung com S Pen e inteligência artificial Galaxy AI.' },
    { id: 'p05', brand: 'Brastemp', name: 'Geladeira Frost Free Inverse 443L',     shop: 'Mercadopamina', price: 4299, oldPrice: 4999, tag: 'Eletro', image: ecImg('photo-1585655097312-7c098090a426'), rating: 4.6, reviews: 678, prime: false, specs: ['443 litros', 'Inox', 'Frost free', 'Painel eletrônico'], desc: 'Geladeira Brastemp inverse com freezer embaixo e controle digital.' },
    { id: 'p06', brand: 'Samsung', name: 'Smart TV 55" Crystal UHD 4K CU8000',     shop: 'Mercadopamina', price: 2499, oldPrice: 2999, tag: 'TV', image: ecImg('photo-1593359677879-a670071ebdbe'), rating: 4.7, reviews: 2890, prime: true, specs: ['55"', '4K UHD', 'HDR10+', 'Tizen OS'], desc: 'Smart TV Samsung 4K com apps de streaming e controle por voz.' },
    { id: 'p07', brand: 'Apple', name: 'AirPods Pro 2ª geração USB-C',     shop: 'Mercadopamina', price: 1899, oldPrice: 2299, tag: 'Áudio', image: ecImg('photo-1600296640924-8823b5d4a180'), rating: 4.8, reviews: 8340, prime: true, specs: ['ANC adaptativo', 'Áudio espacial', 'USB-C', 'IP54'], desc: 'Fones Apple com cancelamento de ruído e áudio espacial personalizado.' },
    { id: 'p08', brand: 'Nintendo', name: 'Switch OLED 64GB',     shop: 'Mercadopamina', price: 2499, oldPrice: 2799, tag: 'Games', image: ecImg('photo-1610892437321-4bafb95daed0'), rating: 4.8, reviews: 3102, prime: true, specs: ['Tela OLED 7"', '64GB', 'Dock', 'Joy-Con'], desc: 'Nintendo Switch OLED — portátil e TV com tela vibrante.' },
    { id: 'p09', brand: 'Xiaomi', name: 'Robô Aspirador Vacuum S10',     shop: 'Mercadopamina', price: 2199, oldPrice: 2599, tag: 'Casa', image: ecImg('photo-1558317374-a37d8b1b41ff'), rating: 4.5, reviews: 1567, prime: true, specs: ['Mapeamento LDS', 'App Mi Home', '4.000Pa', 'Autovazio'], desc: 'Robô aspirador Xiaomi com navegação a laser e app.' },
    { id: 'p10', brand: 'Nespresso', name: 'Cafeteira Vertuo Pop',     shop: 'Mercadopamina', price: 699, oldPrice: 849, tag: 'Cozinha', image: ecImg('photo-1517668808822-9ebb02f2a0e0'), rating: 4.6, reviews: 2140, prime: true, specs: ['Cápsulas Vertuo', 'Compacta', 'Aquecimento 25s'], desc: 'Cafeteira Nespresso com extração centrífuga e crema generosa.' },
    { id: 'p11', brand: 'Apple', name: 'Apple Watch Series 10 GPS 46mm',     shop: 'Mercadopamina', price: 4299, oldPrice: 4799, tag: 'Wearable', image: ecImg('photo-1434493789847-2f02dc6ca35d'), rating: 4.8, reviews: 1987, prime: true, specs: ['Tela wide-angle', 'GPS', 'Oxímetro', '50m água'], desc: 'Apple Watch com monitoramento avançado de saúde e fitness.' },
    { id: 'p12', brand: 'DJI', name: 'Mini 4 Pro Fly More Combo',     shop: 'Mercadopamina', price: 6499, oldPrice: 7299, tag: 'Creator', image: ecImg('photo-1473968512647-3e447244af8f'), rating: 4.7, reviews: 456, prime: false, specs: ['4K HDR', 'Detecção omnidirecional', '34 min voo', 'RC-N2'], desc: 'Drone DJI compacto com câmera 4K e sensores de obstáculos.' },
    { id: 'p13', brand: 'Lenovo', name: 'PC Gamer Ryzen 5 + RTX 4060 16GB',     shop: 'Mercadopamina', price: 5999, oldPrice: 6999, tag: 'Gamer', image: ecImg('photo-1593305841991-05c297ba4575'), rating: 4.7, reviews: 534, prime: true, specs: ['RTX 4060 8GB', 'Ryzen 5', '16GB RAM', 'SSD 512GB'], desc: 'Desktop gamer Lenovo para 1080p/1440p em alta taxa de quadros.' },
    { id: 'p14', brand: 'Electrolux', name: 'Micro-ondas 34L MI41S',     shop: 'Mercadopamina', price: 699, oldPrice: 849, tag: 'Cozinha', image: ecImg('photo-1574269905862-9a3d95c4d9ac'), rating: 4.5, reviews: 2103, prime: true, specs: ['34 litros', 'Painel integrado', '6 níveis potência'], desc: 'Micro-ondas Electrolux com descongelamento automático.' },
    { id: 'p15', brand: 'Mondial', name: 'Air Fryer Family AFN-40-RI 4L',     shop: 'Mercadopamina', price: 349, oldPrice: 449, tag: 'Mais vendido', image: ecImg('photo-1585515655855-d74f3e9c2d23'), rating: 4.7, reviews: 12400, prime: true, specs: ['4 litros', 'Timer 60 min', 'Cesto antiaderente'], desc: 'Fritadeira Mondial sem óleo — best-seller Brasil.' },
    { id: 'p16', brand: 'Sony', name: 'WH-1000XM5 — Preto',     shop: 'Mercadopamina', price: 1899, oldPrice: 2299, tag: 'Áudio', image: ecImg('photo-1505740420928-5e560c06d30e'), rating: 4.8, reviews: 5678, prime: true, specs: ['ANC líder', '30h bateria', 'Multipoint', 'LDAC'], desc: 'Headphone Sony over-ear com melhor cancelamento de ruído da categoria.' },
    { id: 'p17', brand: 'Apple', name: 'iPad 11" A16 Wi-Fi 256GB',     shop: 'Mercadopamina', price: 4999, oldPrice: 5499, tag: 'Tablet', image: ecImg('photo-1544244015-0df4b3ffc6b0'), rating: 4.8, reviews: 1432, prime: true, specs: ['Chip A16', '256GB', 'Liquid Retina', 'Apple Pencil'], desc: 'iPad Apple versátil para estudo, trabalho e entretenimento.' },
    { id: 'p18', brand: 'Canon', name: 'EOS R50 Kit RF-S18-45mm',     shop: 'Mercadopamina', price: 5499, oldPrice: 6199, tag: 'Foto', image: ecImg('photo-1516035069371-29a1b244cc32'), rating: 4.7, reviews: 389, prime: false, specs: ['24,2MP APS-C', '4K 60p', 'Dual Pixel AF', 'Kit lente'], desc: 'Mirrorless Canon compacta para foto e vídeo 4K.' },
    { id: 'p19', brand: 'Samsung', name: 'Galaxy Watch 7 Bluetooth 44mm',     shop: 'Mercadopamina', price: 1699, oldPrice: 1999, tag: 'Wearable', image: ecImg('photo-1434493789847-2f02dc6ca35d'), rating: 4.6, reviews: 2341, prime: true, specs: ['Wear OS', 'BioActive Sensor', 'GPS', 'Gorilla Glass'], desc: 'Smartwatch Samsung com monitoramento de sono e treino.' },
    { id: 'p20', brand: 'JBL', name: 'Flip 6 — Preta',     shop: 'Mercadopamina', price: 599, oldPrice: 749, tag: 'Áudio', image: ecImg('photo-1608043152269-423dbba4e7e1'), rating: 4.7, reviews: 8450, prime: true, specs: ['IP67', '12h bateria', 'PartyBoost'], desc: 'Caixa JBL portátil à prova d\'água com graves potentes.' },
    { id: 'p21', brand: 'Logitech', name: 'MX Master 3S — Grafite',     shop: 'Mercadopamina', price: 549, oldPrice: 699, tag: 'Periféricos', image: ecImg('photo-1527864550417-7fd91fc51a46'), rating: 4.8, reviews: 6780, prime: true, specs: ['8.000 DPI', 'Scroll MagSpeed', 'USB-C', 'Multi-device'], desc: 'Mouse Logitech premium para produtividade e design.' },
    { id: 'p22', brand: 'Dyson', name: 'V15 Detect Absolute',     shop: 'Mercadopamina', price: 4999, oldPrice: 5799, tag: 'Casa', image: ecImg('photo-1558618666-fcd25c85cd64'), rating: 4.8, reviews: 1234, prime: true, specs: ['Laser dust detect', '240AW', '60 min autonomia', 'HEPA'], desc: 'Aspirador sem fio Dyson com laser que revela pó invisível.' },
    { id: 'p23', brand: 'Kindle', name: 'Kindle 11ª geração 16GB',     shop: 'Mercadopamina', price: 499, oldPrice: 599, tag: 'Leitura', image: wikiThumb('9/9e/Amazon_Kindle_11th_generation.jpg', 800), rating: 4.7, reviews: 9870, prime: true, specs: ['Tela 6"', '16GB', 'Luz ajustável', 'Semanas de bateria'], desc: 'Leitor Amazon Kindle leve com tela antirreflexo.' },
    { id: 'p24', brand: 'LG', name: 'Monitor UltraGear 27" 144Hz IPS',     shop: 'Mercadopamina', price: 1299, oldPrice: 1599, tag: 'Monitor', image: wikiThumb('9/9e/Computer_monitor.jpg', 800), rating: 4.7, reviews: 1567, prime: true, specs: ['27" IPS', '144Hz', '1ms', 'FreeSync'], desc: 'Monitor gamer LG com cores precisas e 144Hz.' },
    { id: 'p25', brand: 'Meta', name: 'Quest 3 128GB',     shop: 'Mercadopamina', price: 4999, oldPrice: 5499, tag: 'VR', image: wikiThumb('8/8e/Meta_Quest_3_headset.png', 800), rating: 4.7, reviews: 1234, prime: true, specs: ['Mixed reality', 'Snapdragon XR2 Gen 2', '128GB'], desc: 'Headset Meta Quest 3 com pass-through colorido e jogos VR.' },
    { id: 'p26', brand: 'De\'Longhi', name: 'Dedica EC685 Espresso',     shop: 'Mercadopamina', price: 1899, oldPrice: 2199, tag: 'Barista', image: wikiThumb('4/4e/Espresso_machine.jpg', 800), rating: 4.6, reviews: 678, prime: true, specs: ['15 bar', 'Vaporizador leite', 'Compacta', 'Portafiltro'], desc: 'Máquina De\'Longhi para espresso estilo cafeteria em casa.' },
    { id: 'p27', brand: 'LG', name: 'Smart TV 65" 4K UHD UR8750',     shop: 'Mercadopamina', price: 3299, oldPrice: 3799, tag: 'TV', image: wikiThumb('4/4d/Samsung_4K_UHD_TV.jpg', 800), rating: 4.7, reviews: 1890, prime: true, specs: ['65"', '4K', 'webOS 24', 'HDR10'], desc: 'TV LG grande para sala com controle por voz e apps.' },
    { id: 'p28', brand: 'Philips', name: 'OneBlade Pro QP6550',     shop: 'Mercadopamina', price: 399, oldPrice: 499, tag: 'Beleza', image: wikiThumb('8/8a/Electric_razor.jpg', 800), rating: 4.6, reviews: 4560, prime: true, specs: ['Bateria 120 min', '3 pentes', 'À prova d\'água'], desc: 'Aparador Philips híbrido para rosto e corpo.' },
    { id: 'p29', brand: 'Consul', name: 'Fogão 5 Bocas Mesa de Vidro',     shop: 'Mercadopamina', price: 1299, oldPrice: 1499, tag: 'Eletro', image: wikiThumb('5/5e/Gas_stove.jpg', 800), rating: 4.5, reviews: 1432, prime: false, specs: ['5 bocas', 'Mesa vidro', 'Forno 86L', 'Acendimento auto'], desc: 'Fogão Consul com mesa de vidro temperado e timer.' },
    { id: 'p30', brand: 'Asus', name: 'ROG Strix G16 RTX 4060 i7',     shop: 'Mercadopamina', price: 8999, oldPrice: 9999, tag: 'Notebook', image: wikiThumb('9/9e/Gaming_laptop.jpg', 800), rating: 4.7, reviews: 890, prime: true, specs: ['RTX 4060', 'Intel i7', '16GB', 'SSD 1TB', '165Hz'], desc: 'Notebook gamer Asus ROG com tela 165Hz e teclado RGB.' },
  ];

  premium.forEach(function (p) {
    p.reviewList = productReviews(p.name);
  });

  var fashion = [
    { id: 'm01', brand: 'Gucci', brandTier: 'griffe', category: 'Acessórios', name: 'Bolsa GG Marmont Matelassê Mini',     shop: 'Mercadopamina', price: 8990, oldPrice: 10990, tag: 'Griffe', image: ecImg('photo-1584917865442-de89dfa41ccb'), rating: 4.9, reviews: 412, sizes: ['Único'], color: 'Preto', material: 'Couro matelassê', fit: 'Crossbody', care: 'Limpar com pano seco', desc: 'Bolsa icônica Gucci GG Marmont em couro matelassê com ferragem dourada.' },
    { id: 'm02', brand: 'Louis Vuitton', brandTier: 'griffe', category: 'Acessórios', name: 'Neverfull MM Monogram',     shop: 'Mercadopamina', price: 12990, oldPrice: 14500, tag: 'Griffe', image: ecImg('photo-1590874103328-eac3a398e716'), rating: 4.9, reviews: 890, sizes: ['Único'], color: 'Monograma', material: 'Canvas Monogram', fit: 'Tote', care: 'Evitar umidade prolongada', desc: 'Bolsa Louis Vuitton Neverfull MM — ícone de luxo desde 2007.' },
    { id: 'm03', brand: 'Chanel', brandTier: 'griffe', category: 'Acessórios', name: 'Classic Flap Média — Caviar Preto',     shop: 'Mercadopamina', price: 38900, oldPrice: 42000, tag: 'Alta costura', image: ecImg('photo-1548036328-c9fa89d128fa'), rating: 5.0, reviews: 156, sizes: ['Único'], color: 'Preto', material: 'Couro caviar', fit: 'Ombro/crossbody', care: 'Guardar com papel manteiga', desc: 'Classic Flap Chanel com corrente dourada e fecho CC — peça de investimento.' },
    { id: 'm04', brand: 'Balenciaga', brandTier: 'griffe', category: 'Calçados', name: 'Triple S Sneaker — Branco/Preto',     shop: 'Mercadopamina', price: 6990, oldPrice: 8200, tag: 'Griffe', image: ecImg('photo-1549298916-b41d501d3772'), rating: 4.7, reviews: 678, sizes: ['38', '39', '40', '41', '42'], color: 'Branco/Preto', material: 'Couro/mesh', fit: 'Chunky — número normal', care: 'Escova macia', desc: 'Tênis Balenciaga Triple S que definiu o movimento chunky sneaker.' },
    { id: 'm05', brand: 'Prada', brandTier: 'griffe', category: 'Calçados', name: 'America\'s Cup Sneaker',     shop: 'Mercadopamina', price: 5490, oldPrice: 6200, tag: 'Griffe', image: ecImg('photo-1608253813970-eee5a0955d81'), rating: 4.8, reviews: 234, sizes: ['37', '38', '39', '40', '41'], color: 'Branco', material: 'Couro e mesh', fit: 'Fiel ao tamanho', care: 'Impermeabilizar', desc: 'Sneaker Prada America\'s Cup com triângulo icônico lateral.' },
    { id: 'm06', brand: 'Versace', brandTier: 'griffe', category: 'Acessórios', name: 'Óculos Medusa Biggie — Dourado',     shop: 'Mercadopamina', price: 2490, oldPrice: 3100, tag: 'Griffe', image: ecImg('photo-1572635196237-14b3f281503f'), rating: 4.6, reviews: 189, sizes: ['Único'], color: 'Dourado', material: 'Metal acetato', fit: 'Unissex', care: 'Estojo rígido incluso', desc: 'Óculos Versace com detalhe Medusa e lentes UV400.' },
    { id: 'm07', brand: 'Nike', brandTier: 'premium', category: 'Calçados', name: 'Air Max 90 Essential — Branco',     shop: 'Mercadopamina', price: 799, oldPrice: 999, tag: 'Nike', image: ecImg('photo-1606107557195-0ccc2b0a2bb0'), rating: 4.8, reviews: 12400, sizes: ['36', '37', '38', '39', '40', '41', '42'], color: 'Branco/Cinza', material: 'Couro e mesh', fit: 'Fiel ao tamanho', care: 'Limpar com escova úmida', desc: 'Nike Air Max 90 — clássico de 1990 com amortecimento Air visível.' },
    { id: 'm08', brand: 'Adidas', brandTier: 'premium', category: 'Calçados', name: 'Ultraboost 22 — Core Black',     shop: 'Mercadopamina', price: 899, oldPrice: 1199, tag: 'Adidas', image: ecImg('photo-1608231387042-66d9ac4aa44c'), rating: 4.7, reviews: 8900, sizes: ['36', '37', '38', '39', '40', '41', '42'], color: 'Preto', material: 'Primeknit + Boost', fit: 'Ajuste sock-like', care: 'Lavar à mão', desc: 'Adidas Ultraboost com solado Boost para corrida e lifestyle.' },
    { id: 'm09', brand: 'New Balance', brandTier: 'premium', category: 'Calçados', name: '550 Branco/Verde',     shop: 'Mercadopamina', price: 699, oldPrice: 899, tag: 'NB', image: ecImg('photo-1608667509904-b82b1ae1df4b'), rating: 4.7, reviews: 5600, sizes: ['36', '37', '38', '39', '40', '41'], color: 'Branco/Verde', material: 'Couro sintético', fit: 'Número normal', care: 'Pano úmido', desc: 'New Balance 550 retro basketball — viral no streetwear.' },
    { id: 'm10', brand: 'Zara', brandTier: 'premium', category: 'Feminino', name: 'Trench Coat Oversized Bege',     shop: 'Mercadopamina', price: 499, oldPrice: 699, tag: 'Zara', image: ecImg('photo-1591047139829-d91aecb6caea'), rating: 4.6, reviews: 3400, sizes: ['P', 'M', 'G'], color: 'Bege', material: 'Algodão poliéster', fit: 'Oversized', care: 'Lavar a seco', desc: 'Trench coat Zara oversized — peça-chave de guarda-roupa cápsula.' },
    { id: 'm11', brand: 'Mango', brandTier: 'premium', category: 'Feminino', name: 'Vestido Midi Satinado Preto',     shop: 'Mercadopamina', price: 349, oldPrice: 499, tag: 'Mango', image: ecImg('photo-1595777457583-95e059d581b8'), rating: 4.7, reviews: 2100, sizes: ['P', 'M', 'G', 'GG'], color: 'Preto', material: 'Poliéster acetinado', fit: 'Regular', care: 'Lavar à mão', desc: 'Vestido Mango midi com brilho satinado para festas e jantares.' },
    { id: 'm12', brand: 'Lacoste', brandTier: 'premium', category: 'Masculino', name: 'Polo Classic Fit — Branco',     shop: 'Mercadopamina', price: 449, oldPrice: 599, tag: 'Lacoste', image: ecImg('photo-1625915793619-626b39a2ba11'), rating: 4.8, reviews: 6700, sizes: ['P', 'M', 'G', 'GG'], color: 'Branco', material: 'Algodão piquet', fit: 'Classic fit', care: 'Máq. 30°C', desc: 'Polo Lacoste com crocodilo bordado — ícone francês desde 1933.' },
    { id: 'm13', brand: 'H&M', brandTier: 'popular', category: 'Feminino', name: 'Camiseta Algodão Premium Branca',     shop: 'Mercadopamina', price: 59.9, oldPrice: 79.9, tag: 'H&M', image: ecImg('photo-1521572163474-e1f1ad5812d0'), rating: 4.5, reviews: 18900, sizes: ['P', 'M', 'G', 'GG'], color: 'Branco', material: '100% algodão', fit: 'Regular', care: 'Máq. 40°C', desc: 'Camiseta básica H&M em algodão premium — essencial do guarda-roupa.' },
    { id: 'm14', brand: 'Renner', brandTier: 'popular', category: 'Feminino', name: 'Calça Jeans Wide Leg Azul Médio',     shop: 'Mercadopamina', price: 129.9, oldPrice: 179.9, tag: 'Renner', image: ecImg('photo-1542272454318-2ab582ca4c63'), rating: 4.6, reviews: 8900, sizes: ['36', '38', '40', '42', '44'], color: 'Azul médio', material: 'Algodão elastano', fit: 'Wide leg cintura alta', care: 'Lavar do avesso', desc: 'Jeans Renner wide leg tendência — confortável e versátil.' },
    { id: 'm15', brand: 'C&A', brandTier: 'popular', category: 'Feminino', name: 'Blusa Manga Longa Ribana',     shop: 'Mercadopamina', price: 69.9, oldPrice: 99.9, tag: 'C&A', image: ecImg('photo-1596755094514-f87e34085b2c'), rating: 4.4, reviews: 5600, sizes: ['P', 'M', 'G'], color: 'Nude', material: 'Viscose elastano', fit: 'Ajustada', care: 'Máq. delicado', desc: 'Blusa C&A em ribana macia — segunda pele para o dia a dia.' },
    { id: 'm16', brand: 'Riachuelo', brandTier: 'popular', category: 'Calçados', name: 'Sandália Flat Metalizada Dourada',     shop: 'Mercadopamina', price: 79.9, oldPrice: 119.9, tag: 'Riachuelo', image: ecImg('photo-1603487742874-03f67dfec1a3'), rating: 4.3, reviews: 4200, sizes: ['35', '36', '37', '38', '39'], color: 'Dourado', material: 'Sintético', fit: 'Fiel', care: 'Pano seco', desc: 'Sandália Riachuelo flat metalizada para o verão brasileiro.' },
    { id: 'm17', brand: 'Farm', brandTier: 'premium', category: 'Feminino', name: 'Vestido Estampa Tropical',     shop: 'Mercadopamina', price: 389, oldPrice: 499, tag: 'Farm', image: ecImg('photo-1596780209987-0b89b4369ec9'), rating: 4.8, reviews: 1890, sizes: ['P', 'M', 'G'], color: 'Multicolor', material: 'Viscose', fit: 'Fluido', care: 'Máq. delicado', desc: 'Vestido Farm com estampa exclusiva brasileira — marca carioca icônica.' },
    { id: 'm18', brand: 'Melissa', brandTier: 'popular', category: 'Calçados', name: 'Possession — Rosa Glitter',     shop: 'Mercadopamina', price: 199, oldPrice: 249, tag: 'Melissa', image: ecImg('photo-1603487742874-03f67dfec1a3'), rating: 4.7, reviews: 7800, sizes: ['35', '36', '37', '38', '39', '40'], color: 'Rosa glitter', material: 'Melflex', fit: 'Fiel', care: 'Água e sabão', desc: 'Sandália Melissa Possession — cheiro característico e conforto.' },
    { id: 'm19', brand: 'Shoulder', brandTier: 'premium', category: 'Feminino', name: 'Cropped Tricot Off-White',     shop: 'Mercadopamina', price: 299, oldPrice: 399, tag: 'Shoulder', image: ecImg('photo-1596755094514-f87e34085b2c'), rating: 4.6, reviews: 1200, sizes: ['P', 'M', 'G'], color: 'Off-white', material: 'Tricot algodão', fit: 'Cropped', care: 'Lavar à mão', desc: 'Cropped Shoulder em tricot — marca brasileira premium contemporânea.' },
    { id: 'm20', brand: 'Marisa', brandTier: 'popular', category: 'Feminino', name: 'Sutiã Conforto Microfibra',     shop: 'Mercadopamina', price: 49.9, oldPrice: 69.9, tag: 'Marisa', image: ecImg('photo-1594753792364-f79b2ecf8296'), rating: 4.4, reviews: 6700, sizes: ['P', 'M', 'G', 'GG'], color: 'Preto', material: 'Microfibra', fit: 'Conforto sem aro', care: 'Máq. delicado', desc: 'Sutiã Marisa microfibra sem costura — conforto para o dia a dia.' },
    { id: 'm21', brand: 'Puma', brandTier: 'premium', category: 'Masculino', name: 'Camisa Palmeiras I 2025 Torcedor',     shop: 'Mercadopamina', price: 349, oldPrice: 399, tag: 'Puma', image: ecImg('photo-1579952363873-27f3bade9f55'), rating: 4.8, reviews: 4500, sizes: ['P', 'M', 'G', 'GG'], color: 'Verde', material: 'Poliéster dry-fit', fit: 'Torcedor', care: 'Não usar alvejante', desc: 'Camisa oficial Puma Palmeiras temporada 2025 — torcedor.' },
    { id: 'm22', brand: 'Ray-Ban', brandTier: 'premium', category: 'Acessórios', name: 'Aviador Classic RB3025 — Dourado',     shop: 'Mercadopamina', price: 699, oldPrice: 849, tag: 'Ray-Ban', image: ecImg('photo-1572635196237-14b3f281503f'), rating: 4.8, reviews: 9200, sizes: ['Único'], color: 'Dourado/Verde G-15', material: 'Metal', fit: 'Unissex', care: 'Estojo + flanela', desc: 'Ray-Ban Aviador RB3025 — modelo usado por pilotos desde 1937.' },
    { id: 'm23', brand: 'Havaianas', brandTier: 'popular', category: 'Calçados', name: 'Top Brasil — Azul Naval',     shop: 'Mercadopamina', price: 39.9, oldPrice: 49.9, tag: 'Havaianas', image: ecImg('photo-1603487742874-03f67dfec1a3'), rating: 4.9, reviews: 23400, sizes: ['35/36', '37/38', '39/40', '41/42'], color: 'Azul naval', material: 'Borracha', fit: 'Fiel', care: 'Lavar água fria', desc: 'Havaianas Top Brasil — chinelo mais vendido do país.' },
    { id: 'm24', brand: 'Colcci', brandTier: 'premium', category: 'Masculino', name: 'Camiseta Logo Bordado Preta',     shop: 'Mercadopamina', price: 159, oldPrice: 199, tag: 'Colcci', image: ecImg('photo-1521572163474-e1f1ad5812d0'), rating: 4.5, reviews: 2100, sizes: ['P', 'M', 'G', 'GG'], color: 'Preto', material: 'Algodão premium', fit: 'Slim', care: 'Máq. 30°C do avesso', desc: 'Camiseta Colcci com logo bordado — streetwear brasileiro premium.' },
  ];

  fashion.forEach(function (p) {
    p.reviewList = fashionReviews(p.name, p.brand);
    p.specs = [
      'Marca: ' + p.brand,
      'Cor: ' + p.color,
      'Material: ' + p.material,
      'Caimento: ' + p.fit,
      'Cuidados: ' + p.care,
    ];
  });

  if (w.DOPAMINA_PHOTOS && w.DOPAMINA_PHOTOS.apply) {
    [express, premium, fashion].forEach(function (arr) {
      arr.forEach(function (p) {
        delete p.image;
      });
    });
    w.DOPAMINA_PHOTOS.apply(express);
    w.DOPAMINA_PHOTOS.apply(premium);
    w.DOPAMINA_PHOTOS.apply(fashion);
  }

  w.DOPAMINA_CATALOG = { express: express, premium: premium, fashion: fashion };
})(window);
