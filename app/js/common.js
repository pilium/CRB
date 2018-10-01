const container = document.querySelector('.header-actions__search');
const search = container.querySelector('.icon-magnifier-tool');
const input = container.querySelector("[type=text]");

let toggle_search_class = ()=> {
    container.classList.toggle('active');
};
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
}

search_toggle();