document.addEventListener("DOMContentLoaded", function () {

    // const search = {
    //     container: document.querySelector('.header-actions__search'),
    //     trigger: document.querySelector('.icon-magnifier-tool'),
    //     input: document.querySelector(".header-actions__search-input"),
    //     showClass: 'active'
    // }

    // const modal = {
    //     container: document.querySelector(".modal"),
    //     trigger: document.querySelector(".js-header-info__writeToUs-link"),
    //     input: document.querySelector(".modal-user__login-input"),
    //     close: document.querySelector(".modal-close__btn"),
    //     showClass: 'modal-show'
    // }
    // console.log(search);
    // console.log(modal);

    
    const container = document.querySelector('.header-actions__search');
    const search = container.querySelector('.icon-magnifier-tool');
    const input = container.querySelector("[type=text]");

    const link = document.querySelector(".js-header-info__writeToUs-link");
    const popup = document.querySelector(".modal");
    const close = popup.querySelector(".modal-close__btn");
    const login = popup.querySelector("[name=login]");

    // function toggle_class(trigger, container, input, showClass) {
    //     trigger.addEventListener('click', function () {
    //         container.classList.toggle(showClass);
    //         if (input) {
    //             input.focus();
    //         }
    //     })
    //     document.addEventListener("keydown", function (event) {
    //         if (event.keyCode == 27) {
    //             if (container.classList.contains(showClass)) {
    //                 container.classList.remove(showClass);
    //             }
    //         }
    //     });
    //     document.addEventListener('click', (e) => {
    //         e.preventDefault()
    //         let target = e.target;
    //         let its_container = target == container || container.contains(target);
    //         let search_is_active = container.classList.contains(showClass);
    //         if (!its_container && search_is_active) {
    //             container.classList.toggle(showClass);
    //         }
    //     })
    // }

    // toggle_class(search.trigger, search.container, search.input,search.showClass);
    // toggle_class(modal.trigger, modal.container, modal.input,modal.showClass);


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

    search_toggle();
    modal();
    
    new Glide('.main-slider', {
        type: 'slider',
        autoplay: 8000,
        keybord: true,
        hoverpause: true,
        rewind: true,
        rewindDuration: 1000,
        animationTimingFunc: 'cubic-bezier(0.665, 0.340, 0.740, 1.000)'
    }).mount();
    new Glide('.organizations-slider', {
        type: 'carousel',
        startAt: 1,
        perView: 6
    }).mount();
});