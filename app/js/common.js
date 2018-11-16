window.addEventListener('load', () => {
	// preloader
	const preloader = document.getElementById('preloader');
	if (preloader) {
		setTimeout(() => {
			preloader.classList.add('active');
			document.body.style.overflow = 'visible';
		}, 1000);
	}
	// END Preloader

	const sliderContainer = document.querySelector('.js-hero-slider');
	const blogSlider = document.querySelector('.blog-slider');
	const newsSlider = document.querySelector('.news-slider');
	const mapContainer = document.getElementById('map');

	const link = document.querySelector('.js-header-info__writeToUs-link');
	const popup = document.querySelector('.modal');
	const close = popup.querySelector('.modal-close__btn');
	const login = popup.querySelector('[name=login]');

	const wrapperMenu = document.querySelector('.wrapper-menu');
	const sidenav = document.querySelector('.js-sidenav');
	const overlay = document.querySelector('.sidenav-overlay');

	const acc = document.getElementsByClassName('acc-header');

	const testimonialsSlider = document.querySelector('.testimonials-slider');

	const gallery = document.querySelector('.gallery');

	const nav = document.querySelector('#nav-main');

	// Modal
	let modal = () => {
		const overlay = document.querySelector('.modal-overlay');
		link.addEventListener('click', event => {
			event.preventDefault();
			popup.classList.toggle('modal-show');
			overlay.classList.toggle('show');
			login.focus();
		});
		close.addEventListener('click', event => {
			event.preventDefault();
			popup.classList.remove('modal-show');
			overlay.classList.toggle('show');
		});
		document.addEventListener('click', e => {
			if (e.target.classList.contains('modal-overlay')) {
				popup.classList.remove('modal-show');
				overlay.classList.toggle('show');
			}
		});
	};
	modal();
	// END Modal

	// Sliders
	if (sliderContainer) {
		const mySwiper = new Swiper('.swiper-container', {
			loop: true,
			parallax: true,
			autoplay: {
				delay: 5000,
			},
			speed: 1000,
			mousewheelControl: true,
		});
	}
	if (blogSlider) {
		const swiper = new Swiper('.blog-slider', {
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
			},
		});
	}
	if (newsSlider) {
		const newsSwiper = new Swiper('.news-slider', {
			effect: 'coverflow',
			grabCursor: true,
			loop: false,
			centeredSlides: false,
			keyboard: true,
			spaceBetween: 10,
			slidesPerView: '4',
			speed: 300,
			coverflowEffect: {
				rotate: 0,
				stretch: 0,
				depth: 0,
				modifier: 1,
				slideShadows: false,
			},
			breakpoints: {
				1230: {
					slidesPerView: 3,
				},
				900: {
					slidesPerView: 2,
				},
				650: {
					slidesPerView: 1,
					spaceBetween: 0,
					centeredSlides: true,
				},
			},
			simulateTouch: true,
			navigation: {
				nextEl: '.news-slider-next',
				prevEl: '.news-slider-prev',
			},
			pagination: {
				el: '.news-slider__pagination',
				clickable: true,
			},
		});
	}
	if (testimonialsSlider) {
		const feedSwiper = new Swiper(testimonialsSlider, {
			autoHeight: true,
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}
	// END Sliders

	// Map
	if (mapContainer) {
		function init() {
			const myMap = new ymaps.Map('map', {
				center: [47.5396, 42.0151],
				controls: [
					'typeSelector',
					'fullscreenControl',
					'geolocationControl',
					'rulerControl',
					'routeButtonControl',
				],
				zoom: 16,
			});
			const control = myMap.controls.get('routeButtonControl');
			control.routePanel.state.set('from', 'Романовская союзный 97а');
			const myPlacemark = new ymaps.Placemark(
				[47.5398, 42.0153], {
					hintContent: 'Ул. Союзная 97а',
					balloonContent: 'Поликлиника',
				}, {
					preset: 'islands#blueMedicalIcon',
				},
			);
			myMap.geoObjects.add(myPlacemark);
		}
		ymaps.ready(init);
	}
	// END Map

	// Time to footer
	function addTimeFooter() {
		const date = new Date();
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};
		const container = document.querySelector('.js-footer-info__date');
		container.innerHTML = date.toLocaleString('ru', options);
	}
	setTimeout(addTimeFooter, 100);
	// END Time to footer

	// Sidemenu
	if (wrapperMenu)
		wrapperMenu.addEventListener('click', () => {
			wrapperMenu.classList.toggle('open');
			sidenav.classList.toggle('show');
			overlay.classList.toggle('show');
		});
	document.addEventListener('click', e => {
		if (e.target.classList.contains('sidenav-overlay')) {
			wrapperMenu.classList.toggle('open');
			sidenav.classList.toggle('show');
			overlay.classList.toggle('show');
		}
	});
	// END Sidemenu

	// accordion
	for (let i = 0; i < acc.length; i++) {
		acc[i].addEventListener('click', function (e) {
			/* Toggle between adding and removing the "active" class,
			to highlight the button that controls the panel */
			e.preventDefault();
			this.classList.toggle('active');

			/* Toggle between hiding and showing the active panel */
			const panel = this.nextElementSibling;
			panel.classList.toggle('active');
		});
	}
	// END Accordion

	// peopleCard
	function peopleCard() {
		const peopleCard = document.querySelectorAll('.material-card > .mc-btn-action');
		for (let i = 0; i < peopleCard.length; i++) {
			peopleCard[i].addEventListener('click', function () {
				const card = this.parentNode;
				const icon = this.querySelector('i');
				icon.classList.add('fa-spin-fast');
				if (card.classList.contains('mc-active')) {
					card.classList.remove('mc-active');

					setTimeout(() => {
						icon.classList.remove('fa-arrow-left');
						icon.classList.remove('fa-spin-fast');
						icon.classList.add('fa-bars');
					}, 800);
				} else {
					card.classList.add('mc-active');

					setTimeout(() => {
						icon.classList.remove('fa-bars');
						icon.classList.remove('fa-spin-fast');
						icon.classList.add('fa-arrow-left');
					}, 800);
				}
			});
		}
	}
	peopleCard();
	// END PeopleCard

	// Gallery
	if (gallery) {
		baguetteBox.run('.gallery-wrap', {
			async: true,
		});
	}
	// END Gallery
	// FormSubmit
	const forms = document.querySelectorAll('form');
	for (let i = 0; i < forms.length; i++) {
		forms[i].onsubmit = event => {
			event.preventDefault();
			forms[i].classList.add('signed');
		};
	}
	// END FormSubmit

	// FixedNav
	let topOfNav = nav.offsetTop;

	function fixNav() {
		if (window.scrollY >= topOfNav) {
			document.body.style.paddingTop = nav.offsetHeight + 'px';
			nav.classList.add('fixed-nav');
		} else {
			nav.classList.remove('fixed-nav');
			document.body.style.paddingTop = 0;
		}
	}

	window.addEventListener('scroll', fixNav);
	// END FixedNav

	// scroll-down
	var btnScrollDown = document.querySelector('.scroll-down');

	function scrollDown() {
		var windowCoords = document.documentElement.clientHeight - 50;
		console.log(windowCoords);

		(function scroll() {
			if (window.pageYOffset < windowCoords) {
				window.scrollBy(0, 10);
				setTimeout(scroll, 0);
			}
			if (window.pageYOffset > windowCoords) {
				window.scrollTo(0, windowCoords);
			}
		})();
	}
	if (btnScrollDown) {
		btnScrollDown.addEventListener('click', scrollDown);
	}
	// END scroll-down

	// Menu dropdown
	const dropdownItems = document.querySelectorAll('.fixed-width');
	for (let i = 0; i < dropdownItems.length; i++) {
		dropdownItems[i].addEventListener('keyup', event => {
			if (event.keyCode === 13) {
				let subMenu = dropdownItems[i].querySelector('.menu');
				dropdownItems[i].classList.toggle('fixed-width--show');
				subMenu.addEventListener('blur', () => {
					subMenu.style.display = 'none';
				});
			}
		});
	}
	// END Menu dropdown

	// Blind
	const blindtrigger = document.querySelector('.js-starblind-trigger');
	const mainWrapper = document.querySelector('.main-wrapper');
	blindtrigger.addEventListener(
		'click', () => {
			mainWrapper.classList.toggle('starblind');
			document.roo
		});
});
// var htmlElement = document.body.parentNode;
// htmlElement.style.fontSize = '28px'
// console.log(htmlElement);
(() => {
	const backTop = document.getElementsByClassName('js-cd-top')[0];

	const offset = 300;

	const offsetOpacity = 1200;

	const scrollDuration = 700;
	let scrolling = false;
	if (backTop) {
		window.addEventListener('scroll', event => {
			if (!scrolling) {
				scrolling = true;
				!window.requestAnimationFrame ?
					setTimeout(checkBackToTop, 250) :
					window.requestAnimationFrame(checkBackToTop);
			}
		});
		//smooth scroll to top
		backTop.addEventListener('click', event => {
			event.preventDefault();
			!window.requestAnimationFrame ? window.scrollTo(0, 0) : scrollTop(scrollDuration);
		});
	}

	function checkBackToTop() {
		const windowTop = window.scrollY || document.documentElement.scrollTop;
		windowTop > offset ?
			addClass(backTop, 'cd-top--show') :
			removeClass(backTop, 'cd-top--show', 'cd-top--fade-out');
		windowTop > offsetOpacity && addClass(backTop, 'cd-top--fade-out');
		scrolling = false;
	}

	function scrollTop(duration) {
		const start = window.scrollY || document.documentElement.scrollTop;
		let currentTime = null;

		const animateScroll = timestamp => {
			if (!currentTime) currentTime = timestamp;
			const progress = timestamp - currentTime;
			const val = Math.max(Math.easeInOutQuad(progress, start, -start, duration), 0);
			window.scrollTo(0, val);
			if (progress < duration) {
				window.requestAnimationFrame(animateScroll);
			}
		};

		window.requestAnimationFrame(animateScroll);
	}

	Math.easeInOutQuad = (t, b, c, d) => {
		t /= d / 2;
		if (t < 1) return (c / 2) * t * t + b;
		t--;
		return (-c / 2) * (t * (t - 2) - 1) + b;
	};

	//class manipulations - needed if classList is not supported
	function hasClass(el, className) {
		if (el.classList) return el.classList.contains(className);
		else return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
	}

	function addClass(el, className) {
		const classList = className.split(' ');
		if (el.classList) el.classList.add(classList[0]);
		else if (!hasClass(el, classList[0])) el.className += ` ${classList[0]}`;
		if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
	}

	function removeClass(el, className) {
		const classList = className.split(' ');
		if (el.classList) el.classList.remove(classList[0]);
		else if (hasClass(el, classList[0])) {
			const reg = new RegExp(`(\\s|^)${classList[0]}(\\s|$)`);
			el.className = el.className.replace(reg, ' ');
		}
		if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
	}
})();
