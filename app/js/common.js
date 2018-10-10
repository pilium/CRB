document.addEventListener("DOMContentLoaded", function () {
    
    const container = document.querySelector('.header-actions__search');
    const search = container.querySelector('.icon-magnifier-tool');
    const input = container.querySelector("[type=text]");

    const sliderContainer = document.querySelector('.main-slider');
    const mapContainer = document.getElementById('map');

    const link = document.querySelector(".js-header-info__writeToUs-link");
    const popup = document.querySelector(".modal");
    const close = popup.querySelector(".modal-close__btn");
    const login = popup.querySelector("[name=login]");

    let search_toggle = ()=> {
        search.addEventListener('click', function() {
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
        let toggle_search_class = ()=> {
            container.classList.toggle('active');
        };
    }

    let modal = () => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            popup.classList.toggle("modal-show");
            login.focus();
        });
        close.addEventListener("click", function (event) {
            event.preventDefault();
            popup.classList.remove("modal-show");
        });

    }
    if (sliderContainer) {
        new Glide(sliderContainer, {
        type: 'slider',
        autoplay: 8000,
        keybord: true,
        hoverpause: true,
        rewind: true,
        rewindDuration: 1000,
        animationTimingFunc: 'cubic-bezier(0.665, 0.340, 0.740, 1.000)'
    }).mount();
    }
    
    if(mapContainer) {
        function init(){
        var myMap = new ymaps.Map("map", {
            center: [47.5396,42.0151],
            controls: ['typeSelector','fullscreenControl','geolocationControl','rulerControl','routeButtonControl'],
            zoom: 16
        });
        var control = myMap.controls.get('routeButtonControl');
        control.routePanel.state.set('from', 'Романовская союзный 97а');
        var myPlacemark = new ymaps.Placemark([47.5398,42.0153], {
            hintContent: 'Ул. Союзная 97а',
            balloonContent: 'Поликлиника'
        },{
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
        container.innerHTML= date.toLocaleString("ru", options);
    }
    setTimeout(addTimeFooter, 100);
    search_toggle();
    modal();
    
    
});