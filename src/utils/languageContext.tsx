// src/contexts/LanguageContext.tsx

import React, {
  useState, createContext, useContext, ReactNode, useMemo, useCallback,
} from 'react';

type Language = 'en' | 'ru';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  hello: {
    en: 'Hello',
    ru: 'Привет',
  },
  headerConstructor: {
    en: 'Constructor',
    ru: 'Конструктор',
  },
  headerFeed: {
    en: 'Order feed',
    ru: 'Лента заказов',
  },
  headerProfile: {
    en: 'Profile',
    ru: 'Личный кабинет',
  },
  assembleBurger: {
    en: 'Create your burger',
    ru: 'Соберите бургер',
  },
  buns: {
    en: 'Buns',
    ru: 'Булки',
  },
  sauces: {
    en: 'Sauces',
    ru: 'Соусы',
  },
  fillings: {
    en: 'Fillings',
    ru: 'Начинки',
  },
  tabBuns: {
    en: 'Buns',
    ru: 'Булки',
  },
  tabSauces: {
    en: 'Sauces',
    ru: 'Соусы',
  },
  tabFillings: {
    en: 'Fillings',
    ru: 'Начинки',
  },
  'Краторная булка N-200i': {
    en: 'Crater Bun N-200i',
    ru: 'Краторная булка N-200i',
  },
  'Краторная булка N-200i text': {
    en: 'Crater Bun N-200i is a visually unique and flavorful addition to any meal, inspired by the rugged lunar surface.',
    ru: 'Краторная булка N-200i - это визуально уникальное и вкусное дополнение к любому блюду, вдохновленное суровой лунной поверхностью.',
  },

  'Флюоресцентная булка R2-D3': {
    en: 'Fluorescent Bun R2-D3',
    ru: 'Флюоресцентная булка R2-D3',
  },
  'Флюоресцентная булка R2-D3 text': {
    en: 'Fluorescent Bun R2-D3 is a visually stunning addition to any meal, glowing with a unique and appetizing allure.',
    ru: 'Флюоресцентная булка R2-D3 - это визуально поразительное дополнение к любому блюду, светящееся уникальным и аппетитным привлекательностью.',
  },
  'Соус Spicy-X': {
    en: 'Spicy-X Sauce',
    ru: 'Соус Spicy-X',
  },
  'Соус Spicy-X text': {
    en: 'Spicy-X Sauce is a fiery explosion of flavor, ideal for those who crave an intense heat with their meals.',
    ru: 'Соус Spicy-X - это огненный взрыв вкуса, идеально подходящий для тех, кто жаждет интенсивной остроты в своих блюдах.',
  },
  'Соус фирменный Space Sauce': {
    en: 'Signature Space Sauce',
    ru: 'Соус фирменный Space Sauce',
  },
  'Соус фирменный Space Sauce text': {
    en: 'Signature Space Sauce is a stellar blend of unique flavors, perfect for adding a touch of the cosmos to any meal.',
    ru: 'Соус фирменный Space Sauce - это звездное сочетание уникальных вкусов, идеально подходящее для добавления космического штриха в любое блюдо.',
  },
  'Соус традиционный галактический': {
    en: 'Traditional Galactic Sauce',
    ru: 'Соус традиционный галактический',
  },
  'Соус традиционный галактический text': {
    en: 'Traditional Galactic Sauce combines classic and cosmic flavors, creating a universal appeal in each savory drop.',
    ru: 'Соус традиционный галактический сочетает классические и космические вкусы, создавая универсальное привлекательность в каждой ароматной капле.',
  },
  'Соус с шипами Антарианского плоскоходца': {
    en: 'Sauce with Spikes of Antarian Flatfish',
    ru: 'Соус с шипами Антарианского плоскоходца',
  },
  'Соус с шипами Антарианского плоскоходца text': {
    en: 'Sauce with Spikes of Antarian Flatfish is an adventurous blend, offering a sharp, distinctive flavor, ideal for elevating any dish.',
    ru: 'Соус с шипами Антарианского плоскоходца - это смелое сочетание, предлагающее острый, отличительный вкус, идеально подходящее для улучшения любого блюда.',
  },
  'Биокотлета из марсианской Магнолии': {
    en: 'Bio-patty from Martian Magnolia',
    ru: 'Биокотлета из марсианской Магнолии',
  },
  'Биокотлета из марсианской Магнолии text': {
    en: 'The Bio-patty from Martian Magnolia is a sustainable, futuristic treat, blending Martian flora with rich, savory flavors.',
    ru: 'Биокотлета из марсианской Магнолии - устойчивое, футуристическое угощение, сочетающее марсианскую флору с богатыми, ароматными вкусами.',
  },
  'Филе Люминесцентного тетраодонтимформа': {
    en: 'Filet of Luminescent Tetraodontimform',
    ru: 'Филе Люминесцентного тетраодонтимформа',
  },
  'Филе Люминесцентного тетраодонтимформа text': {
    en: "The Filet of Luminescent Tetraodontimform is a rare delicacy, glowing with a unique flavor that captures the essence of the ocean's depths.",
    ru: 'Филе Люминесцентного тетраодонтимформа - редкое лакомство, светящееся уникальным вкусом, улавливающим суть глубин океана.',
  },
  'Мясо бессмертных моллюсков Protostomia': {
    en: 'Meat of Immortal Molluscs',
    ru: 'Мясо бессмертных моллюсков Protostomia',
  },
  'Мясо бессмертных моллюсков Protostomia text': {
    en: 'Meat of Immortal Protostomia Molluscs offers a unique, age-defying flavor, perfect for those seeking a taste of the eternal mysteries of the sea.',
    ru: 'Мясо бессмертных моллюсков Protostomia предлагает уникальный, превосходящий время вкус, идеально подходящий для тех, кто ищет вкус вечных тайн моря.',
  },
  'Говяжий метеорит (отбивная)': {
    en: 'Beef Meteorite (steak)',
    ru: 'Говяжий метеорит (отбивная)',
  },
  'Говяжий метеорит (отбивная) text': {
    en: 'Beef Meteorite (steak) is a cosmic take on the classic steak, known for its rich flavor '
      + 'and tender texture, making it a stellar choice for meat lovers.',
    ru: 'Говяжий метеорит (отбивная) - это космический взгляд на классический стейк, известный '
      + 'своим богатым вкусом и нежной текстурой, делая его звездным выбором для любителей мяса',
  },
  'Хрустящие минеральные кольца': {
    en: 'Crunchy Mineral Rings',
    ru: 'Хрустящие минеральные кольца',
  },
  'Хрустящие минеральные кольца text': {
    en: 'Crunchy Mineral Rings are a unique ingredient, offering a blend of earthy and mineral flavors with a satisfying '
      + 'crunch, perfect for adventurous palates seeking a taste of space-derived ingredients.',
    ru: 'Хрустящие минеральные кольца - это уникальный ингредиент, предлагающий смесь земных и минеральных '
      + 'вкусов с приятным хрустом, идеально подходящий для любителей необычных вкусов, желающих попробовать '
      + 'ингредиенты, происходящие из космоса.',
  },
  'Плоды Фалленианского дерева': {
    en: 'Fruits of the Fallen Tree',
    ru: 'Плоды Фалленианского дерева',
  },
  'Плоды Фалленианского дерева text': {
    en: 'Fallenian Tree Fruits are an exotic delicacy, renowned for their unique sweet and tangy flavor, a true '
      + 'treat for those seeking to savor the diverse tastes of the universe.',
    ru: 'Плоды Фалленианского дерева - это экзотическое лакомство, известное своим уникальным '
      + 'сладко-кислым вкусом, настоящий дар для тех, кто стремится насладиться разнообразными вкусами вселенной.',
  },
  'Кристаллы марсианских альфа-сахаридов': {
    en: 'Martian Alpha-Saccharides Crystals',
    ru: 'Кристаллы марсианских альфа-сахаридов',
  },
  'Кристаллы марсианских альфа-сахаридов text': {
    en: 'Martian Alpha-Saccharides Crystals are a culinary marvel, offering a unique blend of '
      + 'sweetness and energy, perfect for enhancing any dish with a touch of Martian innovation.',
    ru: 'Кристаллы марсианских альфа-сахаридов - это кулинарное чудо, предлагающее уникальное '
      + 'сочетание сладости и энергии, идеальное для придания любому блюду оттенка марсианского новаторства.',
  },
  'Мини-салат Экзо-Плантаго': {
    en: 'Mini Exo-Plantago Salad',
    ru: 'Мини-салат Экзо-Плантаго',
  },
  'Мини-салат Экзо-Плантаго text': {
    en: 'Mini Exo-Plantago Salad is a refreshing and nutritious choice, featuring exotic greens '
      + 'from distant worlds, ideal for a light yet flavor-packed meal.',
    ru: 'Мини-салат Экзо-Плантаго - это освежающий и питательный выбор, включающий экзотические '
      + 'зелени с далеких миров, идеальный для легкого, но насыщенного вкусом блюда.',
  },
  'Сыр с астероидной плесенью': {
    en: 'Cheese with Asteroid Mold',
    ru: 'Сыр с астероидной плесенью',
  },
  'Сыр с астероидной плесенью text': {
    en: 'Cheese with Asteroid Mold is a bold, flavorful delicacy, combining rich cheese '
      + 'with unique asteroid-sourced mold for an out-of-this-world taste experience.',
    ru: 'Сыр с астероидной плесенью - смелое, ароматное лакомство, сочетающее'
      + ' богатый сыр с уникальной астероидной плесенью для внеземного вкусового опыта.',
  },
  calories: {
    en: 'Calories, kcal',
    ru: 'Калории,ккал',
  },
  proteins: {
    en: 'Proteins, g',
    ru: 'Белки, г',
  },
  fat: {
    en: 'Fats, g',
    ru: 'Жиры, г',
  },
  carbohydrates: {
    en: 'Carbohydrates, g',
    ru: 'Углеводы, г',
  },
  ingredientDetails: {
    en: 'Ingredient Details',
    ru: 'Детали ингредиента',
  },
  createOrder: {
    en: 'Create order',
    ru: 'Оформить заказ',
  },
  readyOrders: {
    en: 'Ready',
    ru: 'Готовы',
  },
  inProgressOrders: {
    en: 'In progress',
    ru: 'В работе',
  },
  allTimeCompleted: {
    en: 'Completed over all time:',
    ru: 'Выполнено за все время:',
  },
  completedToday: {
    en: 'Completed today:',
    ru: 'Выполнено за сегодня:',
  },
  'Традиционный-галактический бургер': {
    en: 'Traditional Galactic Burger',
    ru: 'Традиционный-галактический бургер',
  },
  'Био-марсианский люминесцентный флюоресцентный бургер': {
    en: 'Bio-Martian Luminescent Fluorescent Burger',
    ru: 'Био-марсианский люминесцентный флюоресцентный бургер',
  },
  'Био-марсианский флюоресцентный бургер': {
    en: 'Bio-Martian Fluorescent Burger',
    ru: 'Био-марсианский флюоресцентный бургер',
  },
  'Экзо-плантаго spicy альфа-сахаридный минеральный бессмертный люминесцентный флюоресцентный бургер': {
    en: 'Exo-Plantago Spicy Alpha-Saccharide Mineral Immortal Luminescent Fluorescent Burger',
    ru: 'Экзо-плантаго spicy альфа-сахаридный минеральный бессмертный люминесцентный флюоресцентный бургер',
  },
  'Антарианский space флюоресцентный метеоритный бургер': {
    en: 'Antarian Space Fluorescent Meteorite Burger',
    ru: 'Антарианский space флюоресцентный метеоритный бургер',
  },
  'Антарианский space флюоресцентный метеоритный бургер text': {
    en: 'The Antarian Space Fluorescent Meteorite Burger is a cosmic delicacy that marries the exotic'
      + ' flavors of Antarian cuisine with the mystique of fluorescent meteorites. This burger is'
      + ' a tantalizing blend of otherworldly spices and the unique, radiant beauty of space rocks.'
      + ' Its glowing appearance is as mesmerizing as its taste, offering a sensory feast that\'s'
      + ' both visually and gastronomically out of this world. The Antarian Space Fluorescent'
      + ' Meteorite Burger is a must-try for those seeking an extraordinary dining experience'
      + ' that transcends the ordinary boundaries of flavor and presentation.',
    ru: 'Антарианский space флюоресцентный метеоритный бургер - это космическая деликатесность, сочетающая '
      + 'экзотические вкусы антарианской кухни с таинством флюоресцентных метеоритов. Этот бургер - '
      + 'завораживающее сочетание не с этого мира специй и уникальной, сияющей красоты космических '
      + 'камней. Его светящийся вид так же завораживающ, как и его вкус, предлагая сенсорный праздник, '
      + 'который как визуально, так и вкусово выходит за пределы обыденного мира. Антарианский space '
      + 'флюоресцентный метеоритный бургер - это блюдо, которое стоит попробовать тем, кто ищет '
      + 'необычный обеденный опыт, преодолевающий обычные границы вкуса и презентации.',
  },
  'Spicy флюоресцентный метеоритный бургер': {
    en: 'Spicy Fluorescent Meteorite Burger',
    ru: 'Spicy флюоресцентный метеоритный бургер',
  },
  'Spicy флюоресцентный метеоритный бургер text': {
    en: 'The Spicy Fluorescent Meteorite Burger is a celestial culinary creation that combines the fiery heat'
      + ' of spices with the enchanting glow of fluorescent meteorite elements. This burger offers a daring taste'
      + ' experience, where the spicy flavors are enhanced by the mysterious, cosmic qualities of meteorites. The'
      + ' vibrant fluorescence adds a visually stunning aspect, making each bite not just a taste adventure but'
      + ' also a visual delight. The Spicy Fluorescent Meteorite Burger is perfect for those who crave a meal'
      + ' that\'s as visually spectacular as it is tantalizingly hot.',
    ru: 'Spicy флюоресцентный метеоритный бургер - это небесное кулинарное творение, сочетающее жгучую остроту '
      + 'специй с очаровательным свечением флюоресцентных метеоритных элементов. Этот бургер предлагает смелый'
      + ' вкусовой опыт, где острые вкусы усилены таинственными, космическими качествами метеоритов. Яркая '
      + 'флюоресценция добавляет визуально поразительный аспект, делая каждый укус не просто вкусовым'
      + ' приключением, но и визуальным удовольствием. Spicy флюоресцентный метеоритный бургер '
      + ' для тех, кто жаждет блюда, которое так же визуально эффектно, как и пикантно остро.',
  },
  'Био-марсианский краторный space бургер': {
    en: 'Bio-Martian Crater Space Burger',
    ru: 'Био-марсианский краторный space бургер',
  },
  'Био-марсианский краторный space бургер text': {
    en: 'The Bio-Martian Crater Space Burger is a fusion of Martian-inspired bio-culinary techniques'
      + ' and the stark beauty of crater landscapes. This burger is a gastronomic innovation, featuring'
      + ' bio-engineered ingredients from Mars that offer a taste both unfamiliar and intriguing. The'
      + ' crater-like texture adds a unique dimension to the burger, creating a sensory experience '
      + 'that is as visually impressive as it is delicious. The Bio-Martian Crater Space Burger isn\'t '
      + 'just a meal; it\'s a journey through the flavors of the Red Planet, blending science and nature '
      + 'in an extraordinary way.',
    ru: 'Био-марсианский краторный space бургер - это сочетание марсианских био-кулинарных техник и'
      + ' строгой красоты кратерных ландшафтов. Этот бургер является гастрономической инновацией, '
      + 'включая био-инженерные ингредиенты с Марса, которые предлагают вкус, одновременно необычный '
      + 'и интригующий. Кратероподобная текстура добавляет уникальное измерение бургеру, создавая'
      + ' сенсорный опыт, который так же визуально впечатляющий, как и вкусный. Био-марсианский '
      + 'краторный space бургер - это не просто еда; это путешествие через вкусы Красной планеты,'
      + ' смешивающее науку и природу необычайным образом.',
  },
  'Экзо-плантаго space астероидный spicy флюоресцентный бургер': {
    en: 'Exo-Plantago Space Asteroid Spicy Fluorescent Burger',
    ru: 'Экзо-плантаго space астероидный spicy флюоресцентный бургер',
  },
  'Экзо-плантаго space астероидный spicy флюоресцентный бургер text': {
    en: 'The Exo-Plantago Space Asteroid Spicy Fluorescent Burger is an interstellar culinary wonder, '
      + 'combining exotic vegetation with the fiery zest of asteroid spices and a captivating fluorescent glow. '
      + 'This burger is a symphony of bold flavors, with Exo-Plantago bringing a unique, otherworldly greenery touch.'
      + ' The spicy kick, reminiscent of asteroid heat, is balanced by the burger\'s luminous appearance, making it'
      + ' a favorite for those who seek a thrilling and visually stunning dining experience. The Exo-Plantago Space'
      + ' Asteroid Spicy Fluorescent Burger is not just a meal, but a galactic adventure in every bite. ',
    ru: 'Экзо-плантаго space астероидный spicy флюоресцентный бургер - это межзвездное кулинарное чудо,'
      + ' сочетающее экзотическую растительность с острым вкусом астероидных специй и завораживающим'
      + ' флюоресцентным свечением. Этот бургер - симфония смелых вкусов, где Экзо-Плантаго приносит'
      + ' уникальное, не с этого мира ощущение зелени. Острый вкус, напоминающий тепло астероида,'
      + ' уравновешивается светящимся видом бургера, что делает его фаворитом для тех, кто ищет'
      + ' захватывающий и визуально потрясающий обеденный опыт. Экзо-плантаго space астероидный'
      + ' spicy флюоресцентный бургер - это не просто еда, это галактическое приключение в каждом укусе.',
  },
  'Минеральный люминесцентный краторный space бургер': {
    en: 'Mineral Luminescent Crater Space Burger',
    ru: 'Минеральный люминесцентный краторный space бургер',
  },
  'Минеральный люминесцентный краторный space бургер text': {
    en: 'The Mineral Luminescent Crater Space Burger is a culinary masterpiece that captures the essence of celestial'
      + ' geology. This innovative burger combines the rich, earthy flavors of minerals with the ethereal glow of '
      + 'luminescence, reminiscent of a starlit crater landscape. Each ingredient is carefully selected to evoke '
      + 'the feel of a lunar expedition, making every bite a discovery in itself. The Mineral Luminescent Crater '
      + 'Space Burger isn\'t just food; it\'s an exploration of taste, texture, and the wonders of the cosmos.',
    ru: 'Минеральный люминесцентный краторный space бургер - это кулинарный шедевр, который улавливает суть'
      + ' небесной геологии. Этот инновационный бургер сочетает в себе богатые, земные вкусы минералов с'
      + ' эфирным свечением люминесценции, напоминающим звездное кратерное ландшафт. Каждый ингредиент'
      + ' тщательно подобран, чтобы вызвать ощущение лунной экспедиции, делая каждый укус самооткрытием.'
      + ' Минеральный люминесцентный краторный space бургер - это не просто еда; это исследование вкуса,'
      + ' текстуры и чудес космоса.',
  },
  'Антарианский краторный space бургер': {
    en: 'Antarian Crater Space Burger',
    ru: 'Антарианский краторный space бургер',
  },
  'Антарианский краторный space бургер text': {
    en: 'The Antarian Crater Space Burger is a cosmic fusion of interstellar flavors and terrestrial textures. '
      + 'This extraordinary burger brings together the exotic taste of Antarian spices with the earthy, rugged '
      + 'essence of crater-like textures. Perfectly balancing the unfamiliar and familiar, it\'s a culinary '
      + 'exploration of the universe, satisfying those with an adventurous palate. The Antarian Crater Space '
      + 'Burger is more than a dish; it\'s an intergalactic journey, blending the wonders of distant worlds '
      + 'with the comforts of home.',
    ru: 'Антарианский краторный space бургер - это космическое сочетание межзвездных вкусов и земных текстур. '
      + 'Этот выдающийся бургер сочетает в себе экзотический вкус антарианских специй с земным, суровым сущностями '
      + 'кратероподобных текстур. Идеально уравновешивая необычное с привычным, это кулинарное исследование вселенной,'
      + ' удовлетворяющее тех, у кого приключенческий вкус. Антарианский краторный space бургер - это не просто блюдо;'
      + ' это межгалактическое путешествие, сочетающее чудеса далеких миров с уютом дома.',
  },
  'Краторный бургер': {
    en: 'Crater Burger',
    ru: 'Краторный бургер',
  },
  'Краторный бургер text': {
    en: 'The Crater Burger is a unique culinary creation that captures the essence of lunar landscapes. '
      + 'This burger is famous for its deep, rich flavors and distinctive texture, reminiscent of the craggy '
      + 'surface of moon craters. Crafted with ingredients that symbolize the ruggedness of the lunar terrain, '
      + 'it offers a dining experience that\'s both hearty and out of this world. The Crater Burger is not just '
      + 'a meal; it\'s a taste of the moon\'s mysterious and untouched beauty.',
    ru: 'Краторный бургер - это уникальное кулинарное изобретение, которое улавливает суть лунных пейзажей. '
      + 'Этот бургер знаменит своими глубокими, насыщенными вкусами и особенной текстурой, напоминающей неровную '
      + 'поверхность лунных кратеров. Приготовленный с ингредиентами, символизирующими суровость лунного ландшафта, '
      + 'он предлагает питательный и в то же время необычный обеденный опыт. Краторный бургер - это не просто еда;'
      + ' это вкус таинственной и нетронутой красоты Луны.',
  },
  'Альфа-сахаридный флюоресцентный space бургер': {
    en: 'Alpha-Saccharide Fluorescent Space Burger',
    ru: 'Альфа-сахаридный флюоресцентный space бургер',
  },
  'Альфа-сахаридный флюоресцентный space бургер text': {
    en: 'Exceptional Martian Alpha-Saccharides Crystals, '
      + 'a revolutionary ingredient for premium space burgers, are '
      + 'gaining universal popularity. These crystals, sourced from the '
      + 'depths of Martian terrain, add an otherworldly sweetness and '
      + 'texture that elevate the culinary experience to new cosmic heights.',
    ru: 'Исключительные кристаллы марсианских альфа-сахаридов, революционный '
      + 'ингредиент для премиальных космических бургеров, набирают популярность во всей вселенной. '
      + 'Эти кристаллы, добываемые из глубин марсианской поверхности, добавляют неземную сладость и '
      + 'текстуру, поднимая кулинарный опыт на новые космические высоты.',
  },
  'Антарианский флюоресцентный space бургер': {
    en: 'Antarian Fluorescent Space Burger',
    ru: 'Антарианский флюоресцентный space бургер',
  },
  'Антарианский флюоресцентный space бургер text': {
    en: 'The Antarian Fluorescent Space Burger is a cosmic delight, rapidly gaining fame across the galaxy. '
      + 'Infused with the luminescent essence of Antarian ingredients, this burger not only tantalizes the taste '
      + 'buds but also offers a visual feast with its radiant glow. A favorite among space travelers and gourmet '
      + 'aficionados, it\'s a true culinary masterpiece from another world.',
    ru: 'Антарианский флюоресцентный space бургер - это космическое удовольствие, быстро набирающее славу по всей галактике.'
      + ' Пропитанный светящейся сущностью антарианских ингредиентов, этот бургер не только ласкает вкусовые рецепторы, '
      + 'но и предлагает визуальное наслаждение своим сияющим светом. Являясь любимым блюдом космических путешественников и '
      + 'гурманов, он представляет собой настоящий кулинарный шедевр из другого мира.',
  },
  'Люминесцентный метеоритный бургер': {
    en: 'Luminescent Meteorite Burger',
    ru: 'Люминесцентный метеоритный бургер',
  },
  'Люминесцентный метеоритный бургер text': {
    en: 'The Luminescent Meteorite Burger is a stellar delicacy that combines the awe-inspiring beauty of meteorites '
      + 'with culinary innovation. Infused with the luminescent qualities of rare cosmic materials, this burger offers a'
      + ' dazzling visual experience alongside its extraordinary taste. Each bite takes you on a gastronomic journey '
      + 'through space, blending the intense, rich flavors of meteorites with a subtle, glowing allure. The Luminescent'
      + ' Meteorite Burger is not just a meal; it\'s an otherworldly adventure for your taste buds.',
    ru: 'Люминесцентный метеоритный бургер - это звездное угощение, сочетающее в себе восхищающую красоту метеоритов'
      + ' с кулинарным новаторством. Насыщенный люминесцентными свойствами редких космических материалов, этот бургер'
      + ' предлагает ослепительный визуальный опыт наряду с его необыкновенным вкусом. Каждый кусок переносит вас'
      + ' в гастрономическое путешествие по космосу, сочетая интенсивные, насыщенные вкусы метеоритов с тонким,'
      + ' светящимся притяжением. Люминесцентный метеоритный бургер - это не просто еда; это сверхземное приключение'
      + ' для ваших вкусовых рецепторов.',
  },
  'Астероидный space бургер': {
    en: 'Asteroid Space Burger',
    ru: 'Астероидный space бургер',
  },
  'Астероидный space бургер text': {
    en: 'The Asteroid Space Burger is an out-of-this-world culinary experience, capturing the essence of the '
      + 'cosmos in every bite. Inspired by the rugged, mysterious nature of asteroids, this burger is known for '
      + 'its rich, robust flavors and unique texture. Its ingredients, sourced from asteroid-like environments, '
      + 'bring a sense of cosmic adventure to the dining table. The Asteroid Space Burger is not just a meal, but'
      + ' a journey through the stars, offering a taste of the universe in a truly innovative way.',
    ru: 'Астероидный space бургер - это космический кулинарный опыт, улавливающий суть космоса в каждом укусе. '
      + 'Вдохновленный суровой, таинственной природой астероидов, этот бургер известен своими богатыми, насыщенными'
      + ' вкусами и уникальной текстурой. Его ингредиенты, добываемые в условиях, напоминающих астероиды, приносят '
      + 'ощущение космического приключения на обеденный стол. Астероидный space бургер - это не просто еда, '
      + 'это путешествие по звездам, предлагающее попробовать вкус вселенной по-настоящему новаторским способом.',
  },
  'Традиционный-галактический флюоресцентный space бургер': {
    en: 'Traditional Galactic Fluorescent Space Burger',
    ru: 'Традиционный-галактический флюоресцентный space бургер',
  },
  'Традиционный-галактический флюоресцентный space бургер text': {
    en: 'The Traditional Galactic Fluorescent Space Burger blends age-old culinary traditions with the mystique '
      + 'of the cosmos. It\'s a classic burger reinvented with a space-age twist, featuring a fluorescent glow that'
      + ' adds an extraordinary visual appeal. This burger combines familiar, comforting flavors with a hint of galactic'
      + ' wonder, making it a hit among both traditionalists and futuristic foodies. It\'s where tradition meets '
      + 'innovation in a dazzling interstellar culinary creation.',
    ru: 'Традиционный-галактический флюоресцентный space бургер сочетает в себе вековые кулинарные традиции'
      + ' и таинственность космоса. Это классический бургер, переосмысленный в космическом стиле, с флюоресцентным'
      + ' свечением, добавляющим необыкновенную визуальную привлекательность. Этот бургер сочетает в себе знакомые,'
      + ' утешительные вкусы с намеком на галактическое чудо, делая его популярным как среди консерваторов,'
      + ' так и среди поклонников футуристической еды. Здесь традиция встречается с инновациями в захватывающем'
      + ' межзвездном кулинарном творении.',
  },
  'Флюоресцентный space бургер': {
    en: 'Fluorescent Space Burger',
    ru: 'Флюоресцентный space бургер',
  },
  'Флюоресцентный space бургер text': {
    en: 'The Fluorescent Space Burger is a cosmic culinary creation that glows with an otherworldly charm. This burger,'
      + ' illuminated with a fluorescent hue, offers a unique visual and taste experience. Infused with ingredients that '
      + 'radiate light, it\'s a favorite among adventurous diners seeking a meal that\'s as visually stunning as it is '
      + 'delicious. The Fluorescent Space Burger is more than just food; it\'s an interstellar spectacle on a plate.',
    ru: 'Флюоресцентный space бургер - это космическое кулинарное творение, сияющее неземным очарованием.'
      + ' Этот бургер, озаренный флюоресцентным оттенком, предлагает уникальный визуальный и вкусовой опыт. '
      + 'Пропитанный ингредиентами, излучающими свет, он является фаворитом среди авантюрных гурманов, ищущих '
      + 'блюдо, которое так же визуально поразительно, как и вкусно. Флюоресцентный space бургер - это не просто'
      + ' еда; это межзвездное зрелище на тарелке.',
  },
  'Краторный space бургер': {
    en: 'Crater Space Burger',
    ru: 'Краторный space бургер',
  },
  'Краторный space бургер text': {
    en: 'The Crater Space Burger is an intergalactic sensation, renowned for its bold flavors and extraterrestrial '
      + 'origins. Crafted from ingredients harvested from lunar craters, this burger offers a taste that\'s truly out '
      + 'of this world. Its unique texture and rich, savory profile make it a must-try for culinary explorers and space '
      + 'food enthusiasts alike. The Crater Space Burger is not just a meal, it\'s an experience that takes your taste '
      + 'buds on a journey through the cosmos.',
    ru: 'Краторный space бургер - это межгалактическое сенсационное блюдо, известное своими смелыми вкусами и '
      + 'внеземным происхождением. Сделанный из ингредиентов, собранных в лунных кратерах, этот бургер предлагает '
      + 'вкус, действительно не с этого мира. Его уникальная текстура и богатый, ароматный профиль делают его '
      + 'обязательным к пробованию для кулинарных исследователей и любителей космической еды. Краторный space '
      + 'бургер - это не просто еда, это опыт, который уносит ваши вкусовые рецепторы в путешествие по космосу.',
  },
  'Space астероидный альфа-сахаридный бессмертный флюоресцентный бургер': {
    en: 'Space Asteroid Alpha-Saccharide Immortal Fluorescent Burger',
    ru: 'Space астероидный альфа-сахаридный бессмертный флюоресцентный бургер',
  },
  'Space астероидный альфа-сахаридный бессмертный флюоресцентный бургер text': {
    en: 'The Space Asteroid Alpha-Saccharide Immortal Fluorescent Burger is a gastronomic marvel of the cosmos.'
      + ' This extraordinary burger blends the mystical qualities of asteroid-derived alpha-saccharides with a timeless,'
      + ' fluorescent charm. Its unique composition guarantees an unforgettable taste experience, captivating food lovers'
      + ' who crave interstellar adventures. The luminous and enduring flavors make it a sought-after delicacy'
      + ' among star-bound epicureans.',
    ru: 'Space астероидный альфа-сахаридный бессмертный флюоресцентный бургер - это кулинарное чудо космоса. '
      + 'Этот выдающийся бургер сочетает в себе мистические качества альфа-сахаридов, полученных из астероидов, с'
      + ' вечным флюоресцентным очарованием. Его уникальный состав гарантирует незабываемый вкусовой опыт,'
      + ' пленяющий любителей еды, жаждущих межзвездных приключений. Сияющие и долговечные вкусы делают его '
      + 'вожделенной деликатесностью среди эпикурейцев, стремящихся к звездам.',
  },
  done: {
    en: 'Done',
    ru: 'Выполнен',
  },
  pending: {
    en: 'In progress',
    ru: 'Готовится',
  },
  created: {
    en: 'Created',
    ru: 'Создан',
  },
  ingredients: {
    en: 'Ingredients:',
    ru: 'Состав:',
  },
  today: {
    en: 'Today',
    ru: 'Сегодня',
  },
  login: {
    en: 'Login',
    ru: 'Войти',
  },
  loginTitle: {
    en: 'Login',
    ru: 'Вход',
  },
  name: {
    en: 'Name',
    ru: 'Имя',
  },
  password: {
    en: 'Password',
    ru: 'Пароль',
  },
  newUserQuestion: {
    en: 'New to Space Burger?',
    ru: 'Вы — новый пользователь?',
  },
  forgotPasswordQuestion: {
    en: 'Forgot password?',
    ru: 'Забыли пароль?',
  },
  registerLink: {
    en: 'Register',
    ru: 'Зарегистрироваться',
  },
  resetPasswordLink: {
    en: 'Reset password',
    ru: 'Восстановите пароль',
  },
  registerTitle: {
    en: 'Registration',
    ru: 'Регистрация',
  },
  registerLinkQuestion: {
    en: 'Already have an account?',
    ru: 'Уже зарегистрированы?',
  },
  resetPasswordTitle: {
    en: 'Reset password',
    ru: 'Восстановление пароля',
  },
  enterEmail: {
    en: 'Enter your e-mail',
    ru: 'Укажите e-mail',
  },
  recover: {
    en: 'Recover',
    ru: 'Восстановить',
  },
  rememberedPassword: {
    en: 'Remembered your password?',
    ru: 'Вспомнили пароль?',
  },
  enterPassword: {
    en: 'Enter new password',
    ru: 'Введите новый пароль',
  },
  enterCode: {
    en: 'Enter code from email',
    ru: 'Введите код из письма',
  },
  logout: {
    en: 'Logout',
    ru: 'Выйти',
  },
  profile: {
    en: 'Profile',
    ru: 'Профиль',
  },
  orderHistory: {
    en: 'Order history',
    ru: 'История заказов',
  },
  profilePS1: {
    en: 'In this section you can',
    ru: 'В этом разделе вы можете',
  },
  profilePS2: {
    en: 'change your personal information',
    ru: 'изменить свои персональные данные',
  },
  orderNumber: {
    en: 'order number',
    ru: 'идентификатор заказа',
  },
  orderStarted: {
    en: 'Your order has started being prepared',
    ru: 'Ваш заказ начали готовить',
  },
  waitForReady: {
    en: 'Wait for your order to be ready at the orbital station',
    ru: 'Дождитесь готовности на орбитальной станции',
  },
  moveTheBun: {
    en: 'Move the bun to the right side of the screen',
    ru: 'Перенесите булку в правую часть экрана',
  },
  addIngredientMobile: {
    en: 'Add ingredient',
    ru: 'Добавить',
  },
  seeOrder: {
    en: 'View order',
    ru: 'Посмотреть заказ',
  },
};

interface LanguageContextType {
  language: Language;
  switchLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const getDefaultLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'ru' ? 'ru' : 'en';
  };

  const [language, setLanguage] = useState<Language>(getDefaultLanguage());

  const switchLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []); // Empty dependencies array, as this function does not depend on any external values

  const t = useCallback((key: string): string => translations[key][language]
    || key, [language]); // Dependency array with 'language'

  const value = useMemo(() => ({ language, switchLanguage, t }), [language, switchLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
