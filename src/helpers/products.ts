//import { IProduct } from "@/interfaces/IProduct";

import type { IOurServices, IProduct } from "~/interfaces/IProduct";

export const servicesToPreLoad: IOurServices[] = [
  {
    id: 1,
    name: "Video Games",
    price: 25,
    description:
      "Wide variety of video games from digital copies to great classics in physical.",
    imageUrl:
      "https://preview.redd.it/your-favorite-game-from-2011-v0-t2cheorxu5ic1.jpeg?width=640&crop=smart&auto=webp&s=42c11a4521b601562b3afa41e8f77b90a767c0ac",
  },
  {
    id: 2,
    name: "Consoles",
    price: 19,
    description: "Wide range of consoles",
    imageUrl:
      "https://erikstore.com/blog/wp-content/uploads/2024/04/BannerBlog_CONSOLAS_EVOLUCION.webp",
  },
  {
    id: 3,
    name: "Accessories",
    price: 21,
    description:
      "Large selection of accessories that enhance the gaming experience on any platform.",
    imageUrl:
      "https://www.gamerpoint.com.mx/cdn/shop/collections/accesorios_y_consolas.webp?v=1655923939&width=2048",
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
    developer: "24 Entertainment",
    date: "11 AGO 2021",
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
    developer: "Respawn",
    date: "4 NOV 2020",
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
    developer: "Bungie",
    date: "1 OCT 2019",
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
    developer: "Digital Xtremes",
    date: "25 MAR 2013",
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
    developer: "Digital Xtremes",
    date: "25 MAR 2013",
    genreId: 8,
    stock: 10,
  },
  {
    id: 9,
    name: "Silent Hill 2",
    price: 17,
    description:
      "Disfruta de una clase magistral de terror psicológico. Aclamada como la mejor entrega de la serie, descubre en el último hardware escalofriantes imágenes y un sonido visceral.",
    imageUrl:
      "https://sm.ign.com/t/ign_es/cover/s/silent-hil/silent-hill-2-remake_ktez.300.jpg",
    developer: "Bloober Team SA",
    date: "7 OCT 2024",
    genreId: 9,
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
    developer: "NCSOFT",
    date: "1 OCT 2024",
    genreId: 10,
    stock: 10,
  },
];

export const categoriesBrowser = [
  { id: 1, name: "Action", imageUrl: "https://sm.ign.com/t/ign_es/screenshot/default/wallpapersden_rasy.1200.jpg?height=300&width=400" },
  { id: 2, name: "Adventure", imageUrl: "https://media.revistagq.com/photos/645dde361c98f4b147443172/16:9/w_2560%2Cc_limit/100%2520mejores%2520videojuegos%2520gq.png?height=300&width=400" },
  { id: 3, name: "RPG", imageUrl: "https://intef.es/wp-content/uploads/2021/05/03_RPG.jpg?height=300&width=400" },
  { id: 4, name: "Strategy", imageUrl: "https://e.rpp-noticias.io/xlarge/2020/04/14/265926_927757.jpg?height=300&width=400" },
]
