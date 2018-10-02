document.addEventListener("DOMContentLoaded", function() {

    const container = document.querySelector('.header-actions__search');
    const search = container.querySelector('.icon-magnifier-tool');
    const input = container.querySelector("[type=text]");

    const link = document.querySelector(".js-header-info__writeToUs-link");
    const popup = document.querySelector(".modal");
    const close = popup.querySelector(".modal-circle-btn");
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

search_toggle();
modal();
});