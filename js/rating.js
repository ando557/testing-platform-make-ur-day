document.addEventListener('DOMContentLoaded', () => {
    const ratingModal = document.getElementById('rating-modal');
    if (!ratingModal) return; 

    const openModalBtns = document.querySelectorAll('#rate-project-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const ratingForm = document.getElementById('rating-form');
    const ratingMessage = document.getElementById('rating-message');
    const ratingUserInput = document.getElementById('rating-user');

    const FORMSPREE_URL = "https://formspree.io/f/xdkwdovk"; 
    

    const showModal = () => {
        ratingModal.classList.remove('rating-modal-hidden');
        ratingModal.classList.add('rating-modal-visible');
        document.body.style.overflow = 'hidden';
        
        if (ratingForm) ratingForm.reset();
        if (ratingMessage) {
            ratingMessage.textContent = '';
            ratingMessage.className = 'text-center min-h-[24px] pt-2';
        }
        
        if (window.currentUser) {
            if(ratingUserInput) ratingUserInput.value = window.currentUser.username;
        }
        
        if (window.lucide) {
            lucide.createIcons();
        }
    };

    const hideModal = () => {
        ratingModal.classList.remove('rating-modal-visible');
        ratingModal.classList.add('rating-modal-hidden');
        document.body.style.overflow = '';
    };

    openModalBtns.forEach(btn => btn.addEventListener('click', showModal));
    if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
    
    window.addEventListener('click', (event) => {
        if (event.target === ratingModal) hideModal();
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && ratingModal.classList.contains('rating-modal-visible')) {
            hideModal();
        }
    });

    if (ratingForm) {
        ratingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const lang = window.currentUser?.lang || 'ru';
            const langPack = window.translations[lang];
            const formData = new FormData(this);
            const selectedRating = formData.get('rating');

            if (!selectedRating) {
                ratingMessage.textContent = langPack.feedbackSelectRating;
                ratingMessage.style.color = "#f87171"; // red-400
                return;
            }
            
            ratingMessage.textContent = langPack.feedbackSending;
            ratingMessage.style.color = "#fbbf24"; // amber-400

            try {
                const response = await fetch(FORMSPREE_URL, {
                    method: 'POST',
                    body: formData,
                    headers: { 
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    ratingMessage.textContent = langPack.feedbackThanks;
                    ratingMessage.style.color = "#34d399"; // green-400
                    
                    setTimeout(() => {
                        hideModal();
                        if (window.currentUser) {
                            localStorage.setItem(`projectRated_${window.currentUser.username}`, 'true');
                        }
                    }, 2000);
                } else {
                    const data = await response.json();
                    throw new Error(data.error || 'Network error.');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                ratingMessage.textContent = langPack.feedbackError;
                ratingMessage.style.color = "#f87171"; // red-400
            }
        });
    }
    
    function setupUserDependentFeatures() {
        const currentUser = window.currentUser;
        if (currentUser && (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) && 
            !localStorage.getItem(`projectRated_${currentUser.username}`)) {
            
            setTimeout(() => {
                if (currentUser.usage && currentUser.usage.count > 2) {
                    if(ratingModal.classList.contains('rating-modal-hidden')) {
                       showModal();
                    }
                }
            }, 30000); // 30 seconds
        }
    }
    
    // Wait for the main script to load the user data
    const checkUserInterval = setInterval(() => {
        if (window.currentUser !== undefined) {
            clearInterval(checkUserInterval);
            setupUserDependentFeatures();
        }
    }, 100);

});  