/**
 * ملف الإعدادات - يحتوي على مفتاح API وعناوين الروابط الأساسية
 * ملاحظة أمنية: في بيئة الإنتاج الحقيقية، يجب عدم تخزين المفاتيح في الواجهة الأمامية
 */

const CONFIG = {
    // يرجى وضع مفتاح TMDB API الخاص بك هنا
    // يمكنك الحصول عليه مجاناً من https://www.themoviedb.org/settings/api
    API_KEY: 'YOUR_TMDB_API_KEY_HERE', 
    BASE_URL: 'https://api.themoviedb.org/3',
    IMG_URL: 'https://image.tmdb.org/t/p/w500',
    BACKDROP_URL: 'https://image.tmdb.org/t/p/original',
    YOUTUBE_URL: 'https://www.youtube.com/results?search_query='
};

// بيانات تجريبية (Fallback) لاستخدامها في حال عدم توفر مفتاح API أو فشل الاتصال
const OFFLINE_MOVIES = [
    { id: 1, title: "دراغون بول دايما", poster_path: "images/movie1.jpg", vote_average: 8.5, release_date: "2024-10-11", overview: "مغامرة جديدة لغوكو وأصدقائه في عالم غامض." },
    { id: 2, title: "بياض الثلج", poster_path: "images/movie2.jpg", vote_average: 7.2, release_date: "2025-03-21", overview: "إعادة تخيل حية لقصة ديزني الكلاسيكية." },
    { id: 3, title: "ثاندر بولتز", poster_path: "images/movie3.jpg", vote_average: 7.8, release_date: "2025-05-02", overview: "مجموعة من الأبطال الخارقين غير التقليديين في مهمة حكومية." },
    { id: 4, title: "أعظم رجل استعراض", poster_path: "images/movie4.jpg", vote_average: 8.0, release_date: "2017-12-20", overview: "قصة بي تي بارنوم وكيف بدأ عالم السيرك." },
    { id: 5, title: "توب غان", poster_path: "images/movie5.jpg", vote_average: 7.5, release_date: "1986-05-16", overview: "طيار مقاتل متمرد في مدرسة النخبة للبحرية الأمريكية." },
    { id: 6, title: "توب غان: مافريك", poster_path: "images/movie6.jpg", vote_average: 8.3, release_date: "2022-05-27", overview: "مافريك يعود لتدريب جيل جديد من طياري التوب غان." },
    { id: 7, title: "فرانكنشتاين", poster_path: "images/movie7.jpg", vote_average: 7.0, release_date: "2025-01-01", overview: "رؤية سينمائية جديدة للوحش الكلاسيكي." },
    { id: 8, title: "ميكي 17", poster_path: "images/movie8.jpg", vote_average: 8.1, release_date: "2025-01-31", overview: "رجل يتم إرساله في مهمة استعمارية في الفضاء." },
    { id: 9, title: "باتمان", poster_path: "images/movie9.jpg", vote_average: 8.2, release_date: "2022-03-04", overview: "بروس واين في عامه الثاني كحامي لمدينة غوثام." },
    { id: 10, title: "بين النجوم", poster_path: "images/movie10.jpg", vote_average: 8.7, release_date: "2014-11-07", overview: "رحلة عبر الثقب الدودي للبحث عن موطن جديد للبشرية." },
    { id: 11, title: "استهلال", poster_path: "images/movie11.jpg", vote_average: 8.8, release_date: "2010-07-16", overview: "لص يسرق الأسرار من خلال الدخول إلى أحلام الناس." },
    { id: 12, title: "فارس الظلام", poster_path: "images/movie12.jpg", vote_average: 9.0, release_date: "2008-07-18", overview: "باتمان يواجه الجوكر في صراع من أجل روح غوثام." },
    { id: 13, title: "كثيب: الجزء الثاني", poster_path: "images/movie13.jpg", vote_average: 8.9, release_date: "2024-03-01", overview: "بول أتريدس يواصل رحلته الأسطورية مع الفريمن." },
    { id: 14, title: "الجوكر", poster_path: "images/movie14.jpg", vote_average: 8.4, release_date: "2019-10-04", overview: "قصة أصل العدو اللدود لباتمان في غوثام السبعينات." },
    { id: 15, title: "المنتقمون: نهاية اللعبة", poster_path: "images/movie15.jpg", vote_average: 8.4, release_date: "2019-04-26", overview: "المعركة النهائية للأبطال الخارقين ضد ثانوس." }
];
