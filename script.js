/**
 * ملف البرمجة الأساسي - يتحكم في جلب البيانات، البحث، والمفضلة
 */

document.addEventListener('DOMContentLoaded', () => {
    // العناصر من DOM
    const moviesGrid = document.getElementById('movies-grid');
    const searchInput = document.getElementById('search');
    const loader = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const sectionTitle = document.getElementById('section-title');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.getElementById('navbar');
    const favCountSpan = document.getElementById('fav-count');

    // عناصر المودال
    const modal = document.getElementById('movie-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalRating = document.getElementById('modal-rating');
    const modalOverview = document.getElementById('modal-overview');
    const addFavBtn = document.getElementById('add-fav-btn');
    const trailerBtn = document.getElementById('trailer-btn');

    let currentMovies = [];
    let favorites = JSON.parse(localStorage.getItem('favMovies')) || [];

    // تحديث عداد المفضلة عند البدء
    updateFavCount();

    // جلب الأفلام عند تحميل الصفحة
    fetchMovies('popular');

    // تغيير الفئات (Popular, Top Rated, Upcoming)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.id === 'favorites-link') {
                e.preventDefault();
                showFavorites();
                return;
            }
            
            const category = link.getAttribute('data-category');
            if (category) {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                const titles = {
                    'popular': 'أفلام شائعة',
                    'top_rated': 'الأعلى تقييماً',
                    'upcoming': 'أفلام قادمة'
                };
                sectionTitle.textContent = titles[category];
                fetchMovies(category);
            }
        });
    });

    // البحث عن الأفلام
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearTimeout(searchTimeout);
        
        if (query.length > 2) {
            searchTimeout = setTimeout(() => {
                searchMovies(query);
            }, 500);
        } else if (query.length === 0) {
            fetchMovies('popular');
        }
    });

    // تغيير خلفية النافبار عند التمرير
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /**
     * وظيفة جلب الأفلام من API أو استخدام البيانات المحلية
     */
    async function fetchMovies(type) {
        showLoader(true);
        errorMessage.style.display = 'none';
        
        try {
            // محاولة الجلب من API إذا كان المفتاح موجوداً
            if (CONFIG.API_KEY !== 'YOUR_TMDB_API_KEY_HERE') {
                const response = await fetch(`${CONFIG.BASE_URL}/movie/${type}?api_key=${CONFIG.API_KEY}&language=ar-SA`);
                if (!response.ok) throw new Error('فشل الاتصال بـ API');
                const data = await response.json();
                currentMovies = data.results;
            } else {
                // استخدام البيانات المحلية إذا لم يتوفر مفتاح API
                console.warn('تنبيه: يتم استخدام البيانات المحلية لعدم توفر مفتاح API');
                currentMovies = OFFLINE_MOVIES;
            }
            
            displayMovies(currentMovies);
        } catch (error) {
            console.error('Error:', error);
            // في حال الخطأ نستخدم البيانات المحلية كخيار بديل
            currentMovies = OFFLINE_MOVIES;
            displayMovies(currentMovies);
        } finally {
            showLoader(false);
        }
    }

    /**
     * وظيفة البحث عن الأفلام
     */
    async function searchMovies(query) {
        showLoader(true);
        sectionTitle.textContent = `نتائج البحث عن: ${query}`;
        
        try {
            if (CONFIG.API_KEY !== 'YOUR_TMDB_API_KEY_HERE') {
                const response = await fetch(`${CONFIG.BASE_URL}/search/movie?api_key=${CONFIG.API_KEY}&query=${encodeURIComponent(query)}&language=ar-SA`);
                const data = await response.json();
                currentMovies = data.results;
            } else {
                // بحث محلي بسيط في البيانات المتوفرة
                currentMovies = OFFLINE_MOVIES.filter(m => m.title.includes(query));
            }
            displayMovies(currentMovies);
        } catch (error) {
            errorMessage.style.display = 'block';
        } finally {
            showLoader(false);
        }
    }

    /**
     * عرض الأفلام في الشبكة
     */
    function displayMovies(movies) {
        moviesGrid.innerHTML = '';
        
        if (movies.length === 0) {
            moviesGrid.innerHTML = '<p class="no-results">عذراً، لم يتم العثور على نتائج.</p>';
            return;
        }

        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            
            // تحديد مسار الصورة (من API أو محلي)
            const posterPath = movie.poster_path.startsWith('images/') 
                ? movie.poster_path 
                : (movie.poster_path ? CONFIG.IMG_URL + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Image');

            movieCard.innerHTML = `
                <img src="${posterPath}" alt="${movie.title}" loading="lazy">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span class="rating-badge">${movie.vote_average.toFixed(1)}</span>
                </div>
            `;
            
            movieCard.addEventListener('click', () => openMovieModal(movie));
            moviesGrid.appendChild(movieCard);
        });
    }

    /**
     * فتح المودال لعرض تفاصيل الفيلم
     */
    function openMovieModal(movie) {
        const posterPath = movie.poster_path.startsWith('images/') 
            ? movie.poster_path 
            : (movie.poster_path ? CONFIG.IMG_URL + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Image');

        modalImg.src = posterPath;
        modalTitle.textContent = movie.title;
        modalDate.textContent = `تاريخ الإصدار: ${movie.release_date}`;
        modalRating.textContent = `التقييم: ${movie.vote_average.toFixed(1)} / 10`;
        modalOverview.textContent = movie.overview || 'لا يوجد وصف متاح لهذا الفيلم حالياً.';
        
        // تحديث زر المفضلة
        updateFavBtnUI(movie.id);

        // إعداد زر الإعلان
        trailerBtn.onclick = () => {
            window.open(`${CONFIG.YOUTUBE_URL}${encodeURIComponent(movie.title + ' trailer')}`, '_blank');
        };

        // إعداد زر الإضافة للمفضلة
        addFavBtn.onclick = () => toggleFavorite(movie);

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
    }

    // إغلاق المودال
    closeModal.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    /**
     * إدارة المفضلة
     */
    function toggleFavorite(movie) {
        const index = favorites.findIndex(f => f.id === movie.id);
        
        if (index === -1) {
            favorites.push(movie);
            console.log('تمت الإضافة للمفضلة');
        } else {
            favorites.splice(index, 1);
            console.log('تمت الإزالة من المفضلة');
        }
        
        localStorage.setItem('favMovies', JSON.stringify(favorites));
        updateFavCount();
        updateFavBtnUI(movie.id);
    }

    function updateFavBtnUI(movieId) {
        const isFav = favorites.some(f => f.id === movieId);
        if (isFav) {
            addFavBtn.innerHTML = '<i class="fas fa-heart"></i> إزالة من المفضلة';
            addFavBtn.classList.add('btn-red');
            addFavBtn.classList.remove('btn-outline');
        } else {
            addFavBtn.innerHTML = '<i class="far fa-heart"></i> إضافة للمفضلة';
            addFavBtn.classList.add('btn-outline');
            addFavBtn.classList.remove('btn-red');
        }
    }

    function updateFavCount() {
        favCountSpan.textContent = favorites.length;
    }

    function showFavorites() {
        sectionTitle.textContent = 'أفلامي المفضلة';
        navLinks.forEach(l => l.classList.remove('active'));
        document.getElementById('favorites-link').classList.add('active');
        displayMovies(favorites);
    }

    function showLoader(show) {
        loader.style.display = show ? 'block' : 'none';
        if (show) moviesGrid.innerHTML = '';
    }
});
