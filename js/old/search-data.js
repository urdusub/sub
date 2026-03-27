/*!
 * ================================================================
 *  MugiSUB - اردو انیمے سب ٹائٹلز
 *  Website  : https://mugisub.com
 *  Telegram : https://t.me/MugiSUB
 *  Encoder  : ZAB @ MugiSUB
 *  File     : search-data.js — Search Index Data
 *
 *  HOW TO ADD ENTRIES:
 *  Har naya release/post neeche add karo MUGI_SEARCH_DATA array mein.
 *  Har entry mein ye fields hain:
 *
 *    id       — unique number
 *    title    — main title (English)
 *    titleUrdu— Urdu title (optional)
 *    titleAlt — alternate / Japanese title (optional)
 *    type     — "anime" | "movie" | "tv" | "ova" | "special"
 *    genre    — array of genres
 *    tags     — searchable keywords array
 *    year     — release year (number)
 *    season   — "winter" | "spring" | "summer" | "autumn" (optional)
 *    episodes — total episodes count
 *    rating   — rating out of 10 (optional)
 *    poster   — URL of poster image
 *    url      — link to watch page on mugisub.com
 *    subtitle — subtitle language, e.g. "اردو"
 *    status   — "airing" | "finished" | "upcoming"
 *
 *  (c) MugiSUB - All Rights Reserved
 * ================================================================
 */

var MUGI_SEARCH_DATA = [

  /* ===================== ANIME ===================== */
  {
    id       : 1,
    title    : "Peaky Blinders",
    titleUrdu: "پیکی بلائنڈرز",
    titleAlt : "",
    type     : "tv",
    genre    : ["Crime", "Historical", "Gangsters", "Thriller", "Action"],
    tags     : ["peaky blinders", "shelby", "gangster", "crime", "british", "birmingham", "tommy"],
    year     : 2013,
    episodes : 6,
    rating   : 8.8,
    poster   : "https://upload.wikimedia.org/wikipedia/en/f/fd/Tommy_Shelby.jpg",
    url      : "/watch/peaky-blinders",
    subtitle : "اردو",
    status   : "finished"
  },
  {
    id       : 2,
    title    : "One Piece",
    titleUrdu: "ون پیس",
    titleAlt : "One Piece 2021",
    type     : "anime",
    genre    : ["Adventure", "Action", "Fantasy", "Comedy"],
    tags     : ["one piece", "luffy", "pirate", "zoro", "nami", "sanji", "straw hat", "mugiwara"],
    year     : 2021,
    episodes : 12,
    rating   : 4.24,
    poster   : "https://mugisub.com/images/150/304738.jpg",
    url      : "/watch/one-piece",
    subtitle : "اردو",
    status   : "airing"
  },
  {
    id       : 3,
    title    : "Bleach",
    titleUrdu: "بلیچ",
    titleAlt : "Bleach: Thousand-Year Blood War",
    type     : "anime",
    genre    : ["Action", "Supernatural", "Adventure"],
    tags     : ["bleach", "ichigo", "soul reaper", "zanpakuto", "quincy", "shinigami", "thousand year blood war"],
    year     : 2022,
    episodes : 13,
    rating   : 9.1,
    poster   : "https://mugisub.com/images/bleach.jpg",
    url      : "/watch/bleach-tybw",
    subtitle : "اردو",
    status   : "airing"
  },
  {
    id       : 4,
    title    : "Prison Break",
    titleUrdu: "پریزن بریک",
    titleAlt : "",
    type     : "tv",
    genre    : ["Action", "Crime", "Drama", "Thriller"],
    tags     : ["prison break", "michael scofield", "lincoln burrows", "fox river", "escape", "tattoo"],
    year     : 2005,
    episodes : 22,
    rating   : 8.3,
    poster   : "https://mugisub.com/images/prison-break.jpg",
    url      : "/watch/prison-break",
    subtitle : "اردو",
    status   : "finished"
  },
  {
    id       : 5,
    title    : "The Flash",
    titleUrdu: "دی فلیش",
    titleAlt : "",
    type     : "tv",
    genre    : ["Action", "Sci-Fi", "Superhero"],
    tags     : ["flash", "barry allen", "speedster", "dc", "superhero", "central city"],
    year     : 2014,
    episodes : 23,
    rating   : 7.8,
    poster   : "https://mugisub.com/images/the-flash.jpg",
    url      : "/watch/the-flash",
    subtitle : "اردو",
    status   : "finished"
  },
  {
    id       : 6,
    title    : "The 100",
    titleUrdu: "دی ہنڈریڈ",
    titleAlt : "",
    type     : "tv",
    genre    : ["Sci-Fi", "Drama", "Post-Apocalyptic"],
    tags     : ["the 100", "clarke", "bellamy", "grounders", "post apocalyptic", "ark", "survival"],
    year     : 2014,
    episodes : 13,
    rating   : 7.7,
    poster   : "https://mugisub.com/images/the-100.jpg",
    url      : "/watch/the-100",
    subtitle : "اردو",
    status   : "finished"
  },
  {
    id       : 7,
    title    : "Katsute Mahou Shoujo to Aku wa Tekitai Shite Ita.",
    titleUrdu: "",
    titleAlt : "Once I Was a Magical Girl",
    type     : "anime",
    genre    : ["Comedy", "Action", "Magical Girl"],
    tags     : ["mahou shoujo", "magical girl", "aku", "tekitai", "katsute"],
    year     : 2024,
    season   : "summer",
    episodes : 12,
    rating   : 4.36,
    poster   : "https://mugisub.com/images/150/305913.jpg",
    url      : "/watch/katsute-mahou-shoujo",
    subtitle : "اردو",
    status   : "airing"
  },
  {
    id       : 8,
    title    : "Kono Sekai wa Fukanzen Sugiru",
    titleUrdu: "",
    titleAlt : "This World Is Incomplete",
    type     : "anime",
    genre    : ["Fantasy", "Romance", "Drama"],
    tags     : ["kono sekai", "fukanzen", "fantasy", "manga adaptation"],
    year     : 2024,
    season   : "summer",
    episodes : 13,
    rating   : 3.85,
    poster   : "https://mugisub.com/images/150/300804.jpg",
    url      : "/watch/kono-sekai-fukanzen",
    subtitle : "اردو",
    status   : "airing"
  },
  {
    id       : 9,
    title    : "Go-Toubun no Hanayome",
    titleUrdu: "",
    titleAlt : "The Quintessential Quintuplets",
    type     : "movie",
    genre    : ["Romance", "Comedy", "Harem"],
    tags     : ["quintuplets", "5toubun", "go toubun", "nakano", "harem", "romance", "movie"],
    year     : 2024,
    season   : "autumn",
    episodes : 1,
    rating   : 7.5,
    poster   : "https://mugisub.com/images/150/306682.jpg",
    url      : "/watch/go-toubun-movie",
    subtitle : "اردو",
    status   : "upcoming"
  },
  {
    id       : 10,
    title    : "Atashinchi Next",
    titleUrdu: "",
    titleAlt : "My Home Next",
    type     : "anime",
    genre    : ["Comedy", "Slice of Life", "Family"],
    tags     : ["atashinchi", "family", "comedy", "shin-ei", "web anime"],
    year     : 2024,
    season   : "summer",
    episodes : 5,
    poster   : "https://mugisub.com/images/150/304129.jpg",
    url      : "/watch/atashinchi-next",
    subtitle : "اردو",
    status   : "airing"
  }

  /*
   * -------------------------------------------------------
   *  ADD MORE ENTRIES HERE — copy the block above and paste
   * -------------------------------------------------------
   *  {
   *    id       : 11,
   *    title    : "Naruto Shippuden",
   *    titleUrdu: "ناروٹو شیپوڈن",
   *    titleAlt : "",
   *    type     : "anime",
   *    genre    : ["Action","Adventure","Ninja"],
   *    tags     : ["naruto","sasuke","sakura","ninja","hokage","akatsuki"],
   *    year     : 2007,
   *    episodes : 500,
   *    rating   : 8.6,
   *    poster   : "https://mugisub.com/images/naruto.jpg",
   *    url      : "/watch/naruto-shippuden",
   *    subtitle : "اردو",
   *    status   : "finished"
   *  },
   */

];
