//import { IProduct } from "@/interfaces/IProduct";

import type { IOurServices, IProduct } from "~/interfaces/IProduct";

export const servicesToPreLoad: IOurServices[] = [
  {
    id: 1,
    name: "Video Games",
    price: 25,
    description:
      "Juega gratis a PUBG: BATTLEGROUNDS. Aterriza en posiciones estratégicas, saquea armas y suministros, y sobrevive para que vuestro equipo sea el único en pie en los distintos y variados campos de batalla.",
    imageUrl:
      "https://static.ivory.getloconow.com/games/0aee9f18-58fd-41c9-9c24-35266aa22262/square_cover/94929c57-6130-4108-ac1d-42274fec2092.png",
    type: "PUBG Corporation",
    genreId: 1,
    stock: 10,
  },
  {
    id: 2,
    name: "Consoles",
    price: 19,
    description:
      "Black Myth: Wukong es un RPG de acción inspirado en la mitología china. Encarnarás al Predestinado, que ha de embarcarse en un viaje repleto de peligros y maravillas para descubrir la verdad oculta acerca de una gloriosa leyenda del pasado.",
    imageUrl:
      "https://sm.ign.com/t/ign_ap/cover/b/black-myth/black-myth-wukong_fmws.300.jpg",
    type: "Game Science",
    genreId: 2,
    stock: 10,
  },
  {
    id: 3,
    name: "Accessories",
    price: 21,
    description:
      "Cada día, millones de jugadores de todo el mundo entran en batalla como uno de los más de cien héroes de Dota. Y no importa si es su décima hora de juego o la milésima, siempre hay algo nuevo que descubrir.",
    imageUrl:
      "https://static.getloconow.com/onboarding-categories-images/DOTA-2.png",
    type: "Valve",
    genreId: 3,
    stock: 10,
  },
  {
    id: 4,
    name: "Cards",
    price: 21,
    description:
      "Large selection of accessories that enhance the gaming experience on any platform.",
    imageUrl: "https://gameflip.com/img/front/overview_giftcards_header.webp",
  },
];

export const productsToPreLoad: IProduct[] = [
  {
    id: 4,
    name: "Naraka: Bladepoint",
    price: 20,
    description:
      "NARAKA: BLADEPOINT es una experiencia de combate y acción para hasta 60 jugadores con enfrentamientos cuerpo a cuerpo basados en las artes marciales, movimientos que desafían la gravedad, héroes personalizables dotados de habilidades épicas.",
    imageUrl:
      "https://i0.wp.com/achievementunlocker.com/wp-content/uploads/2022/08/1837410971.png",
    type: "24 Entertainment",
    genreId: 4,
    stock: 10,
  },
  {
    id: 5,
    name: "Apex Legends",
    price: 28,
    description:
      "Apex Legends es el galardonado juego gratuito de acción en primera persona de Respawn Entertainment. Domina un elenco creciente de leyendas con potentes habilidades. Juego estratégico basado en pelotones y jugabilidad innovadora en la nueva evolución.",
    imageUrl:
      "https://www.clavecd.es/wp-content/uploads/buy-apex-legends-loba-edition-cd-key-compare-prices.png",
    type: "Respawn",
    genreId: 5,
    stock: 10,
  },
  {
    id: 6,
    name: "Destiny 2",
    price: 18,
    description:
      "Destiny 2 es un MMO de acción con un mundo único y dinámico al que tus amigos y tú os podéis unir en cualquier momento y desde cualquier lugar de forma totalmente gratuita.",
    imageUrl:
      "https://data.xxlgamer.com/bundle-products/4900/FMm4JQuJq0OGHb.png",
    type: "Bungie",
    genreId: 6,
    stock: 10,
  },
  {
    id: 7,
    name: "Warframe",
    price: 14,
    description:
      "Despierta como un guerrero imparable y lucha junto a tus amigos en este juego de acción gratuito en línea y basado en historias.",
    imageUrl:
      "https://www.zonammorpg.com/wp-content/uploads/2023/11/warframe-300x300.png",
    type: "Digital Xtremes",
    genreId: 7,
    stock: 10,
  },
  {
    id: 8,
    name: "Counter-Strike 2",
    price: 16,
    description:
      "Durante las dos últimas décadas, Counter Strike ha proporcionado una experiencia competitiva de primer nivel para los millones de jugadores de todo el mundo que contribuyeron a darle forma. Ahora el próximo capítulo en la historia de CS está a punto de comenzar. Hablamos de Counter Strike 2.",
    imageUrl:
      "https://sm.ign.com/t/ign_fr/game/c/counter-st/counter-strike-2_7kag.300.png",
    type: "Digital Xtremes",
    genreId: 8,
    stock: 10,
  },
  {
    id: 9,
    name: "Silent Hill 2",
    price: 17,
    description:
      "Disfruta de una clase magistral de terror psicológico. Aclamada como la mejor entrega de la serie, descubre en el último hardware escalofriantes imágenes y un sonido visceral.",
    imageUrl: "",
    category: 9,
    stock: 10,
  },
  {
    id: 10,
    name: "Throne And Liberty",
    price: 20,
    description:
      "Esto es THRONE AND LIBERTY, un juego de rol multijugador masivo en línea gratuito para varias plataformas. Explora entornos en constante evolución, libra batallas JcJcE de gran escala y metamorfoséate en criaturas para luchar por tierra, mar y aire.",
    imageUrl:
      "https://img.xboxachievements.com/images/2024/09/26/icon/106e47839e800bacc7b0dec003499296-l.png",
    type: "NCSOFT",
    genreId: 10,
    stock: 10,
  },
];
