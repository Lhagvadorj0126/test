/**
 * CINEVERSE - Ultra-Modern Movie Platform Logic
 * Core Engine & Interactive Features
 */

// Comprehensive Movie Database
const MOVIES_DATABASE = [
    {
        id: "dune-2",
        title: "Dune: Part Two",
        originalTitle: "Dune: Part Two (2024)",
        year: "2024",
        duration: "2цаг 46мин",
        rating: 8.6,
        quality: "4K HDR",
        age: "13+",
        audio: "Монгол дуу оруулалт",
        subtitles: "Монгол / Англи хадмал",
        category: "action",
        genres: ["Тулаант", "Ш/У зөгнөлт", "Адал явдал"],
        director: "Denis Villeneuve",
        cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem"],
        overview: "Пол Атрейдес өөрийн гэр бүлийг сүйрүүлсэн хуйвалдагчдаас өшөө авахын тулд Чани болон Фрементэй нэгдэн тэмцэнэ. Тэрээр амьдралынхаа хайр ба мэдэгдэж буй ертөнцийн хувь заяаны хооронд хүндхэн сонголт хийх шаардлагатай болно.",
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
        trailerId: "Way9Dexny3w",
        isHeroFeatured: true,
        isTrending: true,
        isTop10: 1,
        isMongolian: false,
        isSeries: false
    },
    {
        id: "baran-mn",
        title: "Баран",
        originalTitle: "Baran (Mongolian Feature Film)",
        year: "2024",
        duration: "1цаг 52мин",
        rating: 8.9,
        quality: "4K UHD",
        age: "18+",
        audio: "Монгол эх хувилбар",
        subtitles: "English Subtitles",
        category: "mongolian",
        genres: ["Монгол кино", "Гэмт хэрэг", "Драм", "Триллэр"],
        director: "Б.Амарсайхан",
        cast: ["Б.Амарсайхан", "Б.Ганчулуун", "О.Дөлгөөн", "Э.Батхүү"],
        overview: "Нийгмийн далд сүлжээ, шударга бус явдал ба өшөө авалтын тухай өгүүлэх сэтгэл түгшээсэн Монголын цоо шинэ гэмт хэрэг, триллэр төрлийн шилдэг кино бүтээл.",
        poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1600&auto=format&fit=crop&q=80",
        trailerId: "kXYiU_JCYtU",
        isHeroFeatured: true,
        isTrending: true,
        isTop10: 2,
        isMongolian: true,
        isSeries: false
    },
    {
        id: "oppenheimer",
        title: "Oppenheimer",
        originalTitle: "Oppenheimer (2023)",
        year: "2023",
        duration: "3цаг 00мин",
        rating: 8.9,
        quality: "4K HDR",
        age: "16+",
        audio: "Монгол дуу оруулалт",
        subtitles: "Монгол / Англи",
        category: "drama",
        genres: ["Түүхэн", "Драм", "Намтарчилсан"],
        director: "Christopher Nolan",
        cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
        overview: "Америкийн эрдэмтэн Ж.Роберт Оппенгеймер ба Дэлхийн II дайны үеэр дэлхийг өөрчилсөн цөмийн зэвсэг бүтээх 'Манхэттэн' төслийн түүх.",
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80",
        trailerId: "uYPbbksJxIg",
        isHeroFeatured: true,
        isTrending: true,
        isTop10: 3,
        isMongolian: false,
        isSeries: false
    },
    {
        id: "shogun",
        title: "Shōgun (Шогүн)",
        originalTitle: "Shōgun (TV Series 2024)",
        year: "2024",
        duration: "10 Анги",
        rating: 8.8,
        quality: "4K HDR",
        age: "18+",
        audio: "Монгол дуу оруулалт",
        subtitles: "Монгол / Англи",
        category: "series",
        genres: ["Цуврал", "Түүхэн", "Адал явдал", "Драм"],
        director: "Rachel Kondo, Justin Marks",
        cast: ["Hiroyuki Sanada", "Cosmo Jarvis", "Anna Sawai", "Tadanobu Asano"],
        overview: "1600-аад оны Японд иргэний дайны ирмэг дээр Лорд Ёшии Торанага өөрийн амь насыг хамгаалахын тулд тэмцэж байх үед нууцлаг Европын хөлөг онгоц ойролцоох загасчдын тосгонд гацдаг.",
        poster: "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop&q=80",
        trailerId: "yAN5uspYo8I",
        isHeroFeatured: true,
        isTrending: true,
        isTop10: 4,
        isMongolian: false,
        isSeries: true,
        episodes: [
            { num: 1, title: "Анги 1: Аньжин", duration: "58мин", thumb: "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=400&q=80" },
            { num: 2, title: "Анги 2: Үйлчлэгчийн тангараг", duration: "54мин", thumb: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80" },
            { num: 3, title: "Анги 3: Маргаашийн манан", duration: "61мин", thumb: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80" },
            { num: 4, title: "Анги 4: Осакагийн сүүдэр", duration: "55мин", thumb: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80" }
        ]
    },
    {
        id: "zura-3",
        title: "Зура 3: Цэвэрлэгээ",
        originalTitle: "Zura 3: The Cleansing (2023)",
        year: "2023",
        duration: "2цаг 05мин",
        rating: 8.5,
        quality: "FHD 1080p",
        age: "18+",
        audio: "Монгол хэл",
        subtitles: "English",
        category: "mongolian",
        genres: ["Монгол кино", "Тулаант", "Гэмт хэрэг"],
        director: "Б.Тамир",
        cast: ["Б.Тамир", "С.Болд-Эрдэнэ", "Ц.Төмөрбаатар", "Э.Одбаяр"],
        overview: "Зура киноны 3-р анги. Гэмт хэргийн бүлэглэл ба төрийн өндөр албан тушаалтнуудын хууль бус ажиллагааг таслан зогсоох ширүүн тулааны тухай өгүүлнэ.",
        poster: "https://images.unsplash.com/photo-1579830341094-14df47714ef3?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
        trailerId: "7L_8LgH1kYg",
        isHeroFeatured: false,
        isTrending: true,
        isTop10: 5,
        isMongolian: true,
        isSeries: false
    },
    {
        id: "interstellar",
        title: "Interstellar",
        originalTitle: "Interstellar (2014)",
        year: "2014",
        duration: "2цаг 49мин",
        rating: 8.7,
        quality: "4K HDR",
        age: "13+",
        audio: "Монгол дуу оруулалт",
        subtitles: "Монгол / English",
        category: "scifi",
        genres: ["Ш/У зөгнөлт", "Драм", "Адал явдал"],
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        overview: "Хүн төрөлхтний оршин тогтнох хугацаа дуусаж байх үед судлаачдын баг хүн төрөлхтөнд амьдрах шинэ гарц олохын тулд сансрын өтний нүхээр аялна.",
        poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=80",
        trailerId: "zSWdZVtXT7E",
        isHeroFeatured: false,
        isTrending: true,
        isTop10: 6,
        isMongolian: false,
        isSeries: false
    },
    {
        id: "demon-slayer-arc",
        title: "Demon Slayer: Hashira Training",
        originalTitle: "Kimetsu no Yaiba (2024)",
        year: "2024",
        duration: "8 Анги",
        rating: 8.7,
        quality: "4K HDR",
        age: "16+",
        audio: "Монгол / Япон эх",
        subtitles: "Монгол хадмал",
        category: "anime",
        genres: ["Анимэ", "Тулаант", "Уран зөгнөлт"],
        director: "Haruo Sotozaki",
        cast: ["Natsuki Hanae", "Akari Kito", "Hiro Shimono"],
        overview: "Танжиро болон түүний нөхөд Хашира нарын удирдлага дор сүүлчийн шийдвэрлэх тулаанд бэлтгэх хатуу дасгал сургуулилалтад орно.",
        poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
        trailerId: "19hL3fR_O70",
        isHeroFeatured: false,
        isTrending: true,
        isTop10: 7,
        isMongolian: false,
        isSeries: true,
        episodes: [
            { num: 1, title: "Хаширагийн сургалт эхэллээ", duration: "48мин", thumb: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80" },
            { num: 2, title: "Усны Хашира Томиокагийн нууц", duration: "24мин", thumb: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80" }
        ]
    },
    {
        id: "john-wick-4",
        title: "John Wick: Chapter 4",
        originalTitle: "John Wick: Chapter 4 (2023)",
        year: "2023",
        duration: "2цаг 49мин",
        rating: 7.7,
        quality: "4K UHD",
        age: "18+",
        audio: "Монгол дуу оруулалт",
        subtitles: "Монгол / Англи",
        category: "action",
        genres: ["Тулаант", "Триллэр", "Гэмт хэрэг"],
        director: "Chad Stahelski",
        cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård", "Laurence Fishburne"],
        overview: "Жон Уик High Table байгууллагыг ялах арга замыг олж илрүүлнэ. Гэвч эрх чөлөөгөө олж авахаас өмнө дэлхийн хамгийн аюултай алуурчидтай нүүр тулна.",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
        trailerId: "qEVUtrk8_B4",
        isHeroFeatured: false,
        isTrending: true,
        isTop10: 8,
        isMongolian: false,
        isSeries: false
    },
    {
        id: "surguuliin-nuuts",
        title: "Сургуулийн Нууц",
        originalTitle: "School Secret (MN TV Series)",
        year: "2024",
        duration: "16 Анги",
        rating: 8.4,
        quality: "FHD 1080p",
        age: "16+",
        audio: "Монгол хэл",
        subtitles: "Монгол хадмал",
        category: "mongolian",
        genres: ["Монгол кино", "Цуврал", "Өсвөр нас", "Драм"],
        director: "Г.Анхбаяр",
        cast: ["Т.Билгүүн", "М.Номин", "О.Энхжин", "Б.Эрдэнэ"],
        overview: "Элит дунд сургуульд болсон гэнэтийн хэргийн учир шалтгааныг олж илрүүлэхээр хичээж буй сурагчдын нөхөрлөл, хайр дурлал, нууцын сүлжээ.",
        poster: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&auto=format&fit=crop&q=80",
        trailerId: "kJQP7kiw5Fk",
        isHeroFeatured: false,
        isTrending: true,
        isTop10: 9,
        isMongolian: true,
        isSeries: true,
        episodes: [
            { num: 1, title: "1-р анги: Шилжиж ирсэн сурагч", duration: "45мин", thumb: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80" },
            { num: 2, title: "2-р анги: Шүүгээний захидал", duration: "42мин", thumb: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80" }
        ]
    },
    {
        id: "spider-verse",
        title: "Spider-Man: Across the Spider-Verse",
        originalTitle: "Spider-Man: Across the Spider-Verse (2023)",
        year: "2023",
        duration: "2цаг 20мин",
        rating: 8.7,
        quality: "4K HDR",
        age: "PG",
        audio: "Монгол дуу оруулалт",
        subtitles: "Монгол / Англи",
        category: "anime",
        genres: ["Анимэйшн", "Тулаант", "Ш/У зөгнөлт"],
        director: "Joaquim Dos Santos, Kemp Powers",
        cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
        overview: "Майлз Моралес олон хэмжээст ертөнцөөр аялан бусад Хүн-Аалзуудтай нэгдэн шинэ аюул заналын эсрэг тэмцэх боловч баатрын үүрэг хариуцлагын талаар зөрчилдөөн үүснэ.",
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1600&auto=format&fit=crop&q=80",
        trailerId: "cqGjhVJWtEg",
        isHeroFeatured: false,
        isTrending: true,
        isTop10: 10,
        isMongolian: false,
        isSeries: false
    },
    {
        id: "batman-2022",
        title: "The Batman",
        originalTitle: "The Batman (2022)",
        year: "2022",
        duration: "2цаг 56мин",
        rating: 7.8,
        quality: "4K HDR",
        age: "16+",
        audio: "Монгол дуу оруулалт",
        subtitles: "Монгол / Англи",
        category: "action",
        genres: ["Тулаант", "Гэмт хэрэг", "Драм", "Детектив"],
        director: "Matt Reeves",
        cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Colin Farrell"],
        overview: "Готхам хотын дээд зиндааны улстөрчдийг онилсон цуврал алуурчин гарч ирэхэд Бэтмен хотын далд завхралыг илрүүлэх мөрдлөгт орно.",
        poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
        trailerId: "mqqft2x_Aa4",
        isHeroFeatured: false,
        isTrending: false,
        isTop10: null,
        isMongolian: false,
        isSeries: false
    },
    {
        id: "arcane",
        title: "Arcane: League of Legends",
        originalTitle: "Arcane (Netflix Series)",
        year: "2024",
        duration: "Season 2 Ирж байна",
        rating: 9.0,
        quality: "4K HDR",
        age: "16+",
        audio: "Монгол дуу оруулалт",
        subtitles: "Монгол / English",
        category: "anime",
        genres: ["Анимэйшн", "Ш/У зөгнөлт", "Драм"],
        director: "Christian Linke, Alex Yee",
        cast: ["Hailee Steinfeld", "Ella Purnell", "Kevin Alejandro"],
        overview: "Пилтовер болон Заун хотуудын хоорондох ширүүн зөрчил, хоёр эгч дүү Вай, Жинкс нарын эсрэг тэсрэг хувь тавилангийн түүх.",
        poster: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1600&auto=format&fit=crop&q=80",
        trailerId: "fXmAurh012s",
        isHeroFeatured: false,
        isTrending: true,
        isTop10: null,
        isMongolian: false,
        isSeries: true
    },
    {
        id: "stranger-things",
        title: "Stranger Things (Хачин Зүйлс)",
        originalTitle: "Stranger Things (Season 4)",
        year: "2024",
        duration: "4 Улирал",
        rating: 8.7,
        quality: "4K HDR",
        age: "16+",
        audio: "Монгол дуу оруулалт",
        subtitles: "Монгол / English",
        category: "series",
        genres: ["Цуврал", "Аймшиг", "Ш/У зөгнөлт", "Нууцлаг"],
        director: "The Duffer Brothers",
        cast: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour", "Winona Ryder"],
        overview: "1980-аад оны Индиана мужийн жижиг хотод нэгэн хүү нууцлаг байдлаар алга болсноор хотынхон ер бусын хүч, нууц лаборатори, өөр ертөнцийн аюултай учирна.",
        poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80",
        trailerId: "b9EkMc79ZSU",
        isHeroFeatured: false,
        isTrending: true,
        isTop10: null,
        isMongolian: false,
        isSeries: true
    },
    {
        id: "gartsgui",
        title: "Гарцгүй",
        originalTitle: "No Exit (Mongolian Thriller)",
        year: "2023",
        duration: "1цаг 48мин",
        rating: 8.3,
        quality: "FHD 1080p",
        age: "18+",
        audio: "Монгол эх",
        subtitles: "Монгол / English",
        category: "mongolian",
        genres: ["Монгол кино", "Аймшиг", "Сэтгэл зүйн триллэр"],
        director: "Ч.Ганзориг",
        cast: ["М.Баярбат", "Э.Цолмонбаяр", "Н.Яруу"],
        overview: "Цасан шуурганаар бөглүү уулын байшинд гацсан хэсэг хүмүүс бие биенийхээ нууцыг дэлгэж, амьд гарахын төлөөх харгис тоглоомд татагдан орно.",
        poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1600&auto=format&fit=crop&q=80",
        trailerId: "kXYiU_JCYtU",
        isHeroFeatured: false,
        isTrending: false,
        isTop10: null,
        isMongolian: true,
        isSeries: false
    },
    {
        id: "conjuring-4",
        title: "The Conjuring: Last Rites",
        originalTitle: "The Conjuring Universe",
        year: "2024",
        duration: "1цаг 58мин",
        rating: 7.6,
        quality: "4K HDR",
        age: "18+",
        audio: "Монгол дуу оруулалт",
        subtitles: "Монгол / English",
        category: "horror",
        genres: ["Аймшиг", "Сүнстэй", "Нууцлаг"],
        director: "Michael Chaves",
        cast: ["Patrick Wilson", "Vera Farmiga"],
        overview: "Чөтгөр судлаач Эд болон Лорейн Уоррен нарын хамгийн аюултай сүүлчийн хараалт хэргийн мөрдлөгийн түүх.",
        poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
        trailerId: "h9Q4zZS2v1k",
        isHeroFeatured: false,
        isTrending: false,
        isTop10: null,
        isMongolian: false,
        isSeries: false
    },
    {
        id: "jujutsu-kaisen-0",
        title: "Jujutsu Kaisen 0",
        originalTitle: "Jujutsu Kaisen The Movie",
        year: "2022",
        duration: "1цаг 45мин",
        rating: 8.5,
        quality: "4K HDR",
        age: "16+",
        audio: "Монгол / Япон",
        subtitles: "Монгол хадмал",
        category: "anime",
        genres: ["Анимэ", "Уран зөгнөлт", "Тулаант"],
        director: "Sunghoo Park",
        cast: ["Megumi Ogata", "Kana Hanazawa", "Yuichi Nakamura"],
        overview: "Юүта Оккоцу бага насандаа нас барсан найз Рикагийнхаа хүчирхэг хараалд автаж, Токиогийн Илбийн сургуульд элсэн орж тэмцэнэ.",
        poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
        trailerId: "2DoCEZTe5No",
        isHeroFeatured: false,
        isTrending: false,
        isTop10: null,
        isMongolian: false,
        isSeries: false
    }
];

// App State Management
const AppState = {
    currentHeroIndex: 0,
    heroMovies: [],
    heroTimer: null,
    currentFilter: "all",
    currentSort: "featured",
    searchQuery: "",
    watchlist: JSON.parse(localStorage.getItem("cineverse_watchlist") || "[]"),
    activeMovie: null
};

// DOM References
const DOM = {
    navbar: document.querySelector(".navbar"),
    searchInput: document.getElementById("searchInput"),
    searchClear: document.getElementById("searchClear"),
    watchlistCount: document.getElementById("watchlistCount"),
    watchlistDrawer: document.getElementById("watchlistDrawer"),
    watchlistBackdrop: document.getElementById("drawerBackdrop"),
    watchlistItemsContainer: document.getElementById("watchlistItems"),
    
    heroBackdrop: document.getElementById("heroBackdropImg"),
    heroTag: document.getElementById("heroTag"),
    heroTitle: document.getElementById("heroTitle"),
    heroMeta: document.getElementById("heroMeta"),
    heroDesc: document.getElementById("heroDesc"),
    heroPlayBtn: document.getElementById("heroPlayBtn"),
    heroTrailerBtn: document.getElementById("heroTrailerBtn"),
    heroWatchlistBtn: document.getElementById("heroWatchlistBtn"),
    heroIndicators: document.getElementById("heroIndicators"),
    
    genrePills: document.querySelectorAll(".genre-pill"),
    sortSelect: document.getElementById("sortSelect"),
    
    top10Track: document.getElementById("top10Track"),
    latestTrack: document.getElementById("latestTrack"),
    mongolianTrack: document.getElementById("mongolianTrack"),
    seriesTrack: document.getElementById("seriesTrack"),
    animeTrack: document.getElementById("animeTrack"),
    
    searchResultsSection: document.getElementById("searchResultsSection"),
    searchResultsGrid: document.getElementById("searchResultsGrid"),
    searchQueryDisplay: document.getElementById("searchQueryDisplay"),
    mainCarouselsWrapper: document.getElementById("mainCarouselsWrapper"),
    
    movieModalBackdrop: document.getElementById("movieModalBackdrop"),
    modalPlayerContainer: document.getElementById("modalPlayerContainer"),
    modalTitle: document.getElementById("modalTitle"),
    modalMeta: document.getElementById("modalMeta"),
    modalTags: document.getElementById("modalTags"),
    modalOverview: document.getElementById("modalOverview"),
    modalDirector: document.getElementById("modalDirector"),
    modalCast: document.getElementById("modalCast"),
    modalQuality: document.getElementById("modalQuality"),
    modalAudio: document.getElementById("modalAudio"),
    modalEpisodesSection: document.getElementById("modalEpisodesSection"),
    modalEpisodesGrid: document.getElementById("modalEpisodesGrid"),
    modalCloseBtn: document.getElementById("modalCloseBtn"),
    modalWatchlistBtn: document.getElementById("modalWatchlistBtn"),
    
    vipModalBackdrop: document.getElementById("vipModalBackdrop"),
    vipModalCloseBtn: document.getElementById("vipModalCloseBtn"),
    openVipBtns: document.querySelectorAll(".open-vip-btn"),
    toastContainer: document.getElementById("toastContainer")
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    setupHeroSpotlight();
    renderCarousels();
    updateWatchlistCount();
    setupEventListeners();
    setupScrollEffects();
}

/* ==========================================================================
   Hero Spotlight Management
   ========================================================================== */
function setupHeroSpotlight() {
    AppState.heroMovies = MOVIES_DATABASE.filter(m => m.isHeroFeatured);
    if (AppState.heroMovies.length === 0) AppState.heroMovies = MOVIES_DATABASE.slice(0, 4);

    // Render indicators
    if (DOM.heroIndicators) {
        DOM.heroIndicators.innerHTML = AppState.heroMovies.map((_, idx) => `
            <div class="hero-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
        `).join('');

        DOM.heroIndicators.querySelectorAll(".hero-dot").forEach(dot => {
            dot.addEventListener("click", (e) => {
                const idx = parseInt(e.target.dataset.index);
                setHeroSlide(idx);
                resetHeroTimer();
            });
        });
    }

    setHeroSlide(0);
    startHeroTimer();
}

function setHeroSlide(index) {
    AppState.currentHeroIndex = index;
    const movie = AppState.heroMovies[index];
    if (!movie) return;

    // Animate fade out & update
    if (DOM.heroBackdrop) {
        DOM.heroBackdrop.style.opacity = '0.3';
        setTimeout(() => {
            DOM.heroBackdrop.src = movie.backdrop;
            DOM.heroBackdrop.style.opacity = '1';
        }, 200);
    }

    if (DOM.heroTag) {
        DOM.heroTag.innerHTML = `<i class="fas fa-fire"></i> ${movie.isMongolian ? 'Монголын Шилдэг Кино' : 'Онцлох Бүтээл 2024'}`;
    }

    if (DOM.heroTitle) DOM.heroTitle.textContent = movie.title;
    if (DOM.heroDesc) DOM.heroDesc.textContent = movie.overview;

    if (DOM.heroMeta) {
        DOM.heroMeta.innerHTML = `
            <span class="badge badge-rating"><i class="fas fa-star"></i> ${movie.rating} IMDB</span>
            <span class="badge badge-4k">${movie.quality}</span>
            <span class="badge badge-age">${movie.age}</span>
            <span>${movie.year}</span>
            <span class="hero-meta-divider">•</span>
            <span>${movie.duration}</span>
            <span class="hero-meta-divider">•</span>
            <span style="color: var(--accent-cyan)"><i class="fas fa-volume-up"></i> ${movie.audio}</span>
        `;
    }

    if (DOM.heroPlayBtn) {
        DOM.heroPlayBtn.onclick = () => openMovieModal(movie, true);
    }
    if (DOM.heroTrailerBtn) {
        DOM.heroTrailerBtn.onclick = () => openMovieModal(movie, true);
    }
    if (DOM.heroWatchlistBtn) {
        const inList = isMovieInWatchlist(movie.id);
        DOM.heroWatchlistBtn.innerHTML = inList ? '<i class="fas fa-check"></i> Хадгалсан' : '<i class="fas fa-plus"></i> Жагсаалтад нэмэх';
        DOM.heroWatchlistBtn.className = inList ? 'btn btn-secondary active' : 'btn btn-secondary';
        DOM.heroWatchlistBtn.onclick = () => {
            toggleWatchlist(movie);
            const nowInList = isMovieInWatchlist(movie.id);
            DOM.heroWatchlistBtn.innerHTML = nowInList ? '<i class="fas fa-check"></i> Хадгалсан' : '<i class="fas fa-plus"></i> Жагсаалтад нэмэх';
            DOM.heroWatchlistBtn.className = nowInList ? 'btn btn-secondary active' : 'btn btn-secondary';
        };
    }

    // Update dot indicators
    if (DOM.heroIndicators) {
        DOM.heroIndicators.querySelectorAll(".hero-dot").forEach((dot, idx) => {
            dot.classList.toggle("active", idx === index);
        });
    }
}

function startHeroTimer() {
    AppState.heroTimer = setInterval(() => {
        let nextIndex = (AppState.currentHeroIndex + 1) % AppState.heroMovies.length;
        setHeroSlide(nextIndex);
    }, 6500);
}

function resetHeroTimer() {
    clearInterval(AppState.heroTimer);
    startHeroTimer();
}

/* ==========================================================================
   Movie Carousels & Grid Rendering
   ========================================================================== */
function renderCarousels() {
    // 1. Top 10 Today
    if (DOM.top10Track) {
        const top10List = MOVIES_DATABASE.filter(m => m.isTop10 !== null).sort((a, b) => a.isTop10 - b.isTop10);
        DOM.top10Track.innerHTML = top10List.map(movie => `
            <div class="top10-card" onclick="openMovieModalById('${movie.id}')">
                <span class="top10-rank">${movie.isTop10}</span>
                <div class="top10-poster-wrap">
                    <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                    <div class="movie-badges-top">
                        <span class="badge badge-4k">${movie.quality}</span>
                        ${movie.isMongolian ? '<span class="badge badge-mn">MN</span>' : ''}
                    </div>
                    <div class="play-hover-icon"><i class="fas fa-play"></i></div>
                </div>
            </div>
        `).join('');
    }

    // 2. Latest Releases
    if (DOM.latestTrack) {
        const latest = MOVIES_DATABASE.filter(m => m.year === "2024" || m.year === "2023");
        DOM.latestTrack.innerHTML = latest.map(createMovieCardHTML).join('');
    }

    // 3. Mongolian Cinema & Series
    if (DOM.mongolianTrack) {
        const mongolian = MOVIES_DATABASE.filter(m => m.isMongolian);
        DOM.mongolianTrack.innerHTML = mongolian.map(createMovieCardHTML).join('');
    }

    // 4. TV Series
    if (DOM.seriesTrack) {
        const series = MOVIES_DATABASE.filter(m => m.isSeries);
        DOM.seriesTrack.innerHTML = series.map(createMovieCardHTML).join('');
    }

    // 5. Anime & Animation
    if (DOM.animeTrack) {
        const anime = MOVIES_DATABASE.filter(m => m.category === "anime");
        DOM.animeTrack.innerHTML = anime.map(createMovieCardHTML).join('');
    }

    attachCardQuickActionListeners();
}

function createMovieCardHTML(movie) {
    const inList = isMovieInWatchlist(movie.id);
    return `
        <div class="movie-card" data-id="${movie.id}">
            <div class="movie-poster-wrap" onclick="openMovieModalById('${movie.id}')">
                <img class="movie-poster" src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <div class="movie-badges-top">
                    <span class="badge badge-rating"><i class="fas fa-star"></i> ${movie.rating}</span>
                    <span class="badge badge-hd">${movie.quality}</span>
                    ${movie.isMongolian ? '<span class="badge badge-mn">MN</span>' : ''}
                </div>
                <div class="movie-quick-actions" onclick="event.stopPropagation()">
                    <button class="quick-btn ${inList ? 'active' : ''}" title="Хадгалах" onclick="handleCardWatchlistClick(event, '${movie.id}')">
                        <i class="fas ${inList ? 'fa-check' : 'fa-plus'}"></i>
                    </button>
                    <button class="quick-btn" title="Дэлгэрэнгүй" onclick="openMovieModalById('${movie.id}')">
                        <i class="fas fa-info"></i>
                    </button>
                </div>
                <div class="play-hover-icon"><i class="fas fa-play"></i></div>
            </div>
            <div class="movie-card-info" onclick="openMovieModalById('${movie.id}')">
                <h4 class="movie-card-title" title="${movie.title}">${movie.title}</h4>
                <div class="movie-card-meta">
                    <span>${movie.year}</span>
                    <span>${movie.genres[0] || 'Кино'}</span>
                    <span>${movie.duration}</span>
                </div>
            </div>
        </div>
    `;
}

function attachCardQuickActionListeners() {
    // Smooth horizontal scroll for carousel buttons
    document.querySelectorAll(".carousel-nav-btn").forEach(btn => {
        btn.onclick = () => {
            const targetId = btn.getAttribute("data-target");
            const direction = btn.getAttribute("data-dir") === "left" ? -400 : 400;
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollBy({ left: direction, behavior: "smooth" });
            }
        };
    });
}

/* ==========================================================================
   Filter & Search System
   ========================================================================== */
function handleFilterOrSearch() {
    let results = [...MOVIES_DATABASE];

    // Filter by Genre / Category
    if (AppState.currentFilter !== "all") {
        if (AppState.currentFilter === "mongolian") {
            results = results.filter(m => m.isMongolian);
        } else if (AppState.currentFilter === "series") {
            results = results.filter(m => m.isSeries);
        } else if (AppState.currentFilter === "anime") {
            results = results.filter(m => m.category === "anime");
        } else if (AppState.currentFilter === "action") {
            results = results.filter(m => m.genres.some(g => g.includes("Тулаант") || g.includes("Адал явдал")));
        } else if (AppState.currentFilter === "scifi") {
            results = results.filter(m => m.genres.some(g => g.includes("Ш/У") || g.includes("зөгнөлт")));
        } else if (AppState.currentFilter === "horror") {
            results = results.filter(m => m.genres.some(g => g.includes("Аймшиг") || g.includes("Триллэр")));
        } else if (AppState.currentFilter === "drama") {
            results = results.filter(m => m.genres.some(g => g.includes("Драм") || g.includes("Түүхэн")));
        }
    }

    // Filter by Search Query
    if (AppState.searchQuery.trim()) {
        const q = AppState.searchQuery.toLowerCase().trim();
        results = results.filter(m => 
            m.title.toLowerCase().includes(q) ||
            m.originalTitle.toLowerCase().includes(q) ||
            m.director.toLowerCase().includes(q) ||
            m.cast.some(c => c.toLowerCase().includes(q)) ||
            m.genres.some(g => g.toLowerCase().includes(q))
        );
    }

    // Sort Results
    if (AppState.currentSort === "rating") {
        results.sort((a, b) => b.rating - a.rating);
    } else if (AppState.currentSort === "newest") {
        results.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } else if (AppState.currentSort === "popular") {
        results.sort((a, b) => (b.isTop10 ? 10 - b.isTop10 : 0) - (a.isTop10 ? 10 - a.isTop10 : 0));
    }

    // Render Results or Show Carousels
    const isSearching = AppState.searchQuery.trim().length > 0 || AppState.currentFilter !== "all";

    if (isSearching) {
        DOM.mainCarouselsWrapper.style.display = "none";
        DOM.searchResultsSection.style.display = "block";
        DOM.searchQueryDisplay.textContent = AppState.searchQuery.trim() ? `"${AppState.searchQuery}" хайлтын үр дүн` : `Шүүлт: ${getFilterName(AppState.currentFilter)}`;

        if (results.length > 0) {
            DOM.searchResultsGrid.innerHTML = results.map(createMovieCardHTML).join('');
        } else {
            DOM.searchResultsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fas fa-film"></i>
                    <h3>Илэрц олдсонгүй</h3>
                    <p>Та хайлтын үгээ өөрчлөх эсвэл шүүлтүүрээ дахин сонгож үзнэ үү.</p>
                </div>
            `;
        }
    } else {
        DOM.mainCarouselsWrapper.style.display = "block";
        DOM.searchResultsSection.style.display = "none";
    }
}

function getFilterName(filterKey) {
    const map = {
        all: "Бүх Кино",
        action: "Тулаант & Адал явдалт",
        scifi: "Ш/У Зөгнөлт",
        mongolian: "Монгол Бүтээлүүд",
        series: "Цуврал Кинонууд",
        anime: "Анимэ & Анимэйшн",
        horror: "Аймшиг & Триллэр",
        drama: "Драм & Түүхэн"
    };
    return map[filterKey] || filterKey;
}

/* ==========================================================================
   Movie Detail & Video Player Modal
   ========================================================================== */
function openMovieModalById(movieId) {
    const movie = MOVIES_DATABASE.find(m => m.id === movieId);
    if (movie) openMovieModal(movie);
}

function openMovieModal(movie, autoPlayVideo = false) {
    AppState.activeMovie = movie;

    // Fill Title & Meta
    DOM.modalTitle.textContent = movie.title;
    DOM.modalMeta.innerHTML = `
        <span class="badge badge-rating"><i class="fas fa-star"></i> ${movie.rating} IMDB</span>
        <span class="badge badge-4k">${movie.quality}</span>
        <span class="badge badge-age">${movie.age}</span>
        <span>${movie.year}</span>
        <span class="hero-meta-divider">•</span>
        <span>${movie.duration}</span>
        ${movie.isMongolian ? '<span class="badge badge-mn">Монгол Эх Хувилбар</span>' : ''}
    `;

    DOM.modalTags.innerHTML = movie.genres.map(g => `<span class="modal-tag">${g}</span>`).join('');
    DOM.modalOverview.textContent = movie.overview;
    DOM.modalDirector.textContent = movie.director;
    DOM.modalCast.textContent = movie.cast.join(", ");
    DOM.modalQuality.textContent = movie.quality;
    DOM.modalAudio.textContent = `${movie.audio} (${movie.subtitles})`;

    // Video Player or Cover Setup
    setupModalPlayer(movie, autoPlayVideo);

    // Series Episodes Tab
    if (movie.isSeries && movie.episodes && movie.episodes.length > 0) {
        DOM.modalEpisodesSection.style.display = "block";
        DOM.modalEpisodesGrid.innerHTML = movie.episodes.map(ep => `
            <div class="episode-card" onclick="playEpisode('${movie.id}', ${ep.num})">
                <div class="episode-thumb">
                    <img src="${ep.thumb}" alt="${ep.title}">
                    <span class="episode-duration">${ep.duration}</span>
                </div>
                <div class="episode-info">
                    <span class="episode-num">Анги ${ep.num}</span>
                    <h5 class="episode-name">${ep.title}</h5>
                </div>
            </div>
        `).join('');
    } else {
        DOM.modalEpisodesSection.style.display = "none";
    }

    // Modal Watchlist Button
    updateModalWatchlistBtn(movie.id);

    // Open Modal
    DOM.movieModalBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
}

function setupModalPlayer(movie, autoPlay = false) {
    if (autoPlay) {
        DOM.modalPlayerContainer.innerHTML = `
            <iframe 
                src="https://www.youtube-nocookie.com/embed/${movie.trailerId}?autoplay=1&rel=0&modestbranding=1" 
                title="${movie.title} Trailer" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
        `;
    } else {
        DOM.modalPlayerContainer.innerHTML = `
            <div class="player-cover-banner" style="background-image: url('${movie.backdrop}')" onclick="startModalVideo('${movie.trailerId}', '${movie.title}')">
                <div class="player-start-btn">
                    <i class="fas fa-play"></i>
                </div>
            </div>
        `;
    }
}

function startModalVideo(trailerId, title) {
    DOM.modalPlayerContainer.innerHTML = `
        <iframe 
            src="https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1" 
            title="${title} Trailer" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
        </iframe>
    `;
}

function playEpisode(movieId, epNum) {
    const movie = MOVIES_DATABASE.find(m => m.id === movieId);
    if (!movie) return;
    showToast(`🎬 "${movie.title}" - Анги ${epNum} тоглуулж байна...`, "info");
    startModalVideo(movie.trailerId, `${movie.title} Ep ${epNum}`);
}

function closeMovieModal() {
    DOM.movieModalBackdrop.classList.remove("open");
    DOM.modalPlayerContainer.innerHTML = ""; // Stop video playback
    document.body.style.overflow = "auto";
    AppState.activeMovie = null;
}

function updateModalWatchlistBtn(movieId) {
    if (!DOM.modalWatchlistBtn) return;
    const inList = isMovieInWatchlist(movieId);
    DOM.modalWatchlistBtn.innerHTML = inList ? '<i class="fas fa-check"></i> Жагсаалтад нэмэгдсэн' : '<i class="fas fa-plus"></i> Жагсаалтад нэмэх';
    DOM.modalWatchlistBtn.className = inList ? 'btn btn-secondary active' : 'btn btn-secondary';
    DOM.modalWatchlistBtn.onclick = () => {
        if (AppState.activeMovie) {
            toggleWatchlist(AppState.activeMovie);
            updateModalWatchlistBtn(AppState.activeMovie.id);
        }
    };
}

/* ==========================================================================
   Watchlist Management (LocalStorage)
   ========================================================================== */
function isMovieInWatchlist(movieId) {
    return AppState.watchlist.some(id => id === movieId);
}

function toggleWatchlist(movie) {
    const index = AppState.watchlist.indexOf(movie.id);
    if (index > -1) {
        AppState.watchlist.splice(index, 1);
        showToast(`❌ "${movie.title}" киног жагсаалтаас хаслаа.`, "info");
    } else {
        AppState.watchlist.unshift(movie.id);
        showToast(`✅ "${movie.title}" киног таны жагсаалтад нэмлээ!`, "success");
    }
    localStorage.setItem("cineverse_watchlist", JSON.stringify(AppState.watchlist));
    updateWatchlistCount();
    renderWatchlistDrawer();
    renderCarousels(); // Update quick buttons
}

function handleCardWatchlistClick(event, movieId) {
    event.stopPropagation();
    const movie = MOVIES_DATABASE.find(m => m.id === movieId);
    if (movie) toggleWatchlist(movie);
}

function updateWatchlistCount() {
    if (DOM.watchlistCount) {
        DOM.watchlistCount.textContent = AppState.watchlist.length;
    }
}

function openWatchlistDrawer() {
    renderWatchlistDrawer();
    DOM.watchlistDrawer.classList.add("open");
    DOM.watchlistBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeWatchlistDrawer() {
    DOM.watchlistDrawer.classList.remove("open");
    DOM.watchlistBackdrop.classList.remove("open");
    document.body.style.overflow = "auto";
}

function renderWatchlistDrawer() {
    if (!DOM.watchlistItemsContainer) return;

    if (AppState.watchlist.length === 0) {
        DOM.watchlistItemsContainer.innerHTML = `
            <div class="empty-state">
                <i class="far fa-bookmark"></i>
                <h4>Таны жагсаалт хоосон байна</h4>
                <p style="font-size: 0.85rem; margin-top: 0.4rem;">Өөрийн дуртай киног + товч даран энд хадгалж аваарай.</p>
            </div>
        `;
        return;
    }

    const savedMovies = AppState.watchlist
        .map(id => MOVIES_DATABASE.find(m => m.id === id))
        .filter(Boolean);

    DOM.watchlistItemsContainer.innerHTML = savedMovies.map(movie => `
        <div class="watchlist-item">
            <div class="watchlist-item-thumb" onclick="closeWatchlistDrawer(); openMovieModalById('${movie.id}')">
                <img src="${movie.poster}" alt="${movie.title}">
            </div>
            <div class="watchlist-item-details">
                <div>
                    <h5 class="watchlist-item-title" onclick="closeWatchlistDrawer(); openMovieModalById('${movie.id}')">${movie.title}</h5>
                    <div class="watchlist-item-meta">
                        <span>${movie.year}</span> • <span>${movie.quality}</span> • <span style="color: var(--accent-gold);"><i class="fas fa-star"></i> ${movie.rating}</span>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                    <button class="btn btn-primary" style="padding: 0.3rem 0.8rem; font-size: 0.78rem;" onclick="closeWatchlistDrawer(); openMovieModalById('${movie.id}')">
                        <i class="fas fa-play"></i> Үзэх
                    </button>
                    <button class="watchlist-remove-btn" title="Хасах" onclick="toggleWatchlist(MOVIES_DATABASE.find(m => m.id === '${movie.id}'))">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   VIP Modal Management
   ========================================================================== */
function openVipModal() {
    DOM.vipModalBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeVipModal() {
    DOM.vipModalBackdrop.classList.remove("open");
    document.body.style.overflow = "auto";
}

/* ==========================================================================
   Toast Notification Generator
   ========================================================================== */
function showToast(message, type = "success") {
    if (!DOM.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = message;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/* ==========================================================================
   Event Listeners & Global Handlers
   ========================================================================== */
function setupEventListeners() {
    // Sticky Nav on Scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            DOM.navbar.classList.add("scrolled");
        } else {
            DOM.navbar.classList.remove("scrolled");
        }
    });

    // Search Input
    if (DOM.searchInput) {
        DOM.searchInput.addEventListener("input", (e) => {
            AppState.searchQuery = e.target.value;
            DOM.searchClear.classList.toggle("active", e.target.value.length > 0);
            handleFilterOrSearch();
        });

        DOM.searchClear.addEventListener("click", () => {
            DOM.searchInput.value = "";
            AppState.searchQuery = "";
            DOM.searchClear.classList.remove("active");
            handleFilterOrSearch();
        });
    }

    // Genre Filter Pills
    DOM.genrePills.forEach(pill => {
        pill.addEventListener("click", () => {
            DOM.genrePills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            AppState.currentFilter = pill.getAttribute("data-genre");
            handleFilterOrSearch();
        });
    });

    // Sort Dropdown
    if (DOM.sortSelect) {
        DOM.sortSelect.addEventListener("change", (e) => {
            AppState.currentSort = e.target.value;
            handleFilterOrSearch();
        });
    }

    // Watchlist Drawer Controls
    const openWatchlistBtn = document.getElementById("openWatchlistBtn");
    const closeWatchlistBtn = document.getElementById("closeWatchlistBtn");
    if (openWatchlistBtn) openWatchlistBtn.onclick = openWatchlistDrawer;
    if (closeWatchlistBtn) closeWatchlistBtn.onclick = closeWatchlistDrawer;
    if (DOM.watchlistBackdrop) DOM.watchlistBackdrop.onclick = closeWatchlistDrawer;

    // Modal Close
    if (DOM.modalCloseBtn) DOM.modalCloseBtn.onclick = closeMovieModal;
    if (DOM.movieModalBackdrop) {
        DOM.movieModalBackdrop.onclick = (e) => {
            if (e.target === DOM.movieModalBackdrop) closeMovieModal();
        };
    }

    // VIP Modal Controls
    DOM.openVipBtns.forEach(btn => {
        btn.onclick = openVipModal;
    });
    if (DOM.vipModalCloseBtn) DOM.vipModalCloseBtn.onclick = closeVipModal;
    if (DOM.vipModalBackdrop) {
        DOM.vipModalBackdrop.onclick = (e) => {
            if (e.target === DOM.vipModalBackdrop) closeVipModal();
        };
    }

    // Rating Star Picker in Modal
    const starIcons = document.querySelectorAll(".stars-picker i");
    starIcons.forEach((star, index) => {
        star.onclick = () => {
            starIcons.forEach((s, idx) => {
                s.classList.toggle("active", idx <= index);
                s.className = idx <= index ? "fas fa-star active" : "far fa-star";
            });
            showToast(`⭐ Та ${index + 1} од үнэлгээ өглөө! Баярлалаа.`, "success");
        };
    });

    // Keyboard Shortcuts (Esc to close modal, Ctrl+K for search)
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMovieModal();
            closeWatchlistDrawer();
            closeVipModal();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            if (DOM.searchInput) {
                DOM.searchInput.focus();
                window.scrollTo({ top: 300, behavior: "smooth" });
            }
        }
    });
}

function setupScrollEffects() {
    // Smooth scrolling for navigation links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            const targetSectionId = link.getAttribute("data-scroll");
            if (targetSectionId) {
                e.preventDefault();
                const target = document.getElementById(targetSectionId);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });
}
