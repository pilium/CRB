document.addEventListener("DOMContentLoaded", function () {
    // preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('active');
            document.body.style.overflow = 'visible';
        }, 3000);
    }
    // END Preloader

    const container = document.querySelector('.header-actions__search');
    const search = container.querySelector('.icon-magnifier-tool');
    const input = container.querySelector("[type=text]");

    const sliderContainer = document.querySelector('.swiper-container');
    const blogSlider = document.querySelector('.blog-slider');
    const newsSlider = document.querySelector('.news-slider');
    const mapContainer = document.getElementById('map');

    const link = document.querySelector(".js-header-info__writeToUs-link");
    const popup = document.querySelector(".modal");
    const close = popup.querySelector(".modal-close__btn");
    const login = popup.querySelector("[name=login]");

    let search_toggle = () => {
        search.addEventListener('click', function () {
            toggle_search_class();
            input.focus();
        });
        document.addEventListener("keydown", function (event) {
            if (event.keyCode == 27) {
                if (container.classList.contains("active")) {
                    container.classList.remove("active");
                }
            }
        });
        document.addEventListener('click', (e) => {
            let target = e.target;
            let its_container = target == container || container.contains(target);
            let search_is_active = container.classList.contains('active');
            if (!its_container && search_is_active) {
                toggle_search_class();
            }
        })
        let toggle_search_class = () => {
            container.classList.toggle('active');
        };
    }

    let modal = () => {
        const overlay = document.querySelector('.modal-overlay');
        link.addEventListener("click", function (event) {
            event.preventDefault();
            popup.classList.toggle("modal-show");
            overlay.classList.toggle('show');
            login.focus();
        });
        close.addEventListener("click", function (event) {
            event.preventDefault();
            popup.classList.remove("modal-show");
            overlay.classList.toggle('show');
        });
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('modal-overlay')) {
                popup.classList.remove("modal-show");
                overlay.classList.toggle('show');
            }
        })

    }
    // if (sliderContainer) {
    //     new Glide(sliderContainer, {
    //     type: 'slider',
    //     autoplay: 8000,
    //     keybord: true,
    //     hoverpause: true,
    //     rewind: true,
    //     rewindDuration: 1000,
    //     animationTimingFunc: 'bounce'
    // }).mount();
    // }
    if (sliderContainer) {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            parallax: true,
            autoplay: {
                delay: 5000,
            },
            speed: 1000,
            mousewheelControl: true
        })
    }
    if (blogSlider) {
        var swiper = new Swiper('.blog-slider', {
            spaceBetween: 30,
            effect: 'fade',
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 7000,
            },
            // autoHeight: true,
            pagination: {
                el: '.blog-slider__pagination',
                clickable: true,
            }
        });
    }
    if (mapContainer) {
        function init() {
            var myMap = new ymaps.Map("map", {
                center: [47.5396, 42.0151],
                controls: ['typeSelector', 'fullscreenControl', 'geolocationControl', 'rulerControl', 'routeButtonControl'],
                zoom: 16
            });
            var control = myMap.controls.get('routeButtonControl');
            control.routePanel.state.set('from', 'Романовская союзный 97а');
            var myPlacemark = new ymaps.Placemark([47.5398, 42.0153], {
                hintContent: 'Ул. Союзная 97а',
                balloonContent: 'Поликлиника'
            }, {
                preset: 'islands#blueMedicalIcon',
            });
            myMap.geoObjects.add(myPlacemark);
        }
        ymaps.ready(init);
    }



    function addTimeFooter() {
        const date = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const container = document.querySelector('.js-footer-info__date');
        container.innerHTML = date.toLocaleString("ru", options);
    }

    // Hamburger
    var wrapperMenu = document.querySelector('.wrapper-menu');
    var sidenav = document.querySelector('.sidenav');
    var overlay = document.querySelector('.sidenav-overlay');

    wrapperMenu.addEventListener('click', function () {
        wrapperMenu.classList.toggle('open');
        sidenav.classList.toggle('show');
        overlay.classList.toggle('show');
    })
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('sidenav-overlay')) {
            wrapperMenu.classList.toggle('open');
            sidenav.classList.toggle('show');
            overlay.classList.toggle('show');
        }
    })

    // accordion
    var acc = document.getElementsByClassName("collapsible-header");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function (e) {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            e.preventDefault();
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            panel.classList.toggle('active')
        });
    }

    setTimeout(addTimeFooter, 100);
    search_toggle();
    modal();


    // swiper slidertest

    if (newsSlider) {
        var swiper = new Swiper('.news-slider', {
            effect: 'coverflow',
            grabCursor: true,
            loop: false,
            centeredSlides: true,
            keyboard: true,
            spaceBetween: 0,
            slidesPerView: '3',
            speed: 300,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 3,
                slideShadows: false
            },
            breakpoints: {
                1024: {
                    slidesPerView: 2
                },
                800: {
                    slidesPerView: 1
                },
                480: {
                    spaceBetween: 0,
                    centeredSlides: true
                }
            },
            simulateTouch: true,
            navigation: {
                nextEl: '.news-slider-next',
                prevEl: '.news-slider-prev'
            },
            pagination: {
                el: '.news-slider__pagination',
                clickable: true
            }
        });
    }

    // peopleCard
    function peopleCard() {
        const peopleCard = document.querySelectorAll('.material-card > .mc-btn-action');
        for (let i = 0; i < peopleCard.length; i++) {
            peopleCard[i].addEventListener('click', function() {
                var card = this.parentNode;
                var icon = this.querySelector('i');
                icon.classList.add('fa-spin-fast');
                if (card.classList.contains('mc-active')) {
                    card.classList.remove('mc-active');
    
                    setTimeout(function() {
                        icon.classList.remove('fa-arrow-left')
                        icon.classList.remove('fa-spin-fast')
                        icon.classList.add('fa-bars');
    
                    }, 800);
                } else {
                    card.classList.add('mc-active');
    
                    setTimeout(function() {
                        icon.classList.remove('fa-bars')
                        icon.classList.remove('fa-spin-fast')
                        icon.classList.add('fa-arrow-left');
    
                    }, 800);
                }      
            })
            
        }
        
    };
    peopleCard();
});