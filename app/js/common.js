window.addEventListener('load', () => {
	// // preloader
	// const preloader = document.getElementById('preloader');
	// if (preloader) {
	// 	setTimeout(() => {
	// 		preloader.classList.add('active');
	// 		document.body.style.overflow = 'visible';
	// 	}, 100);
	// }
	// // END Preloader

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

	const gallery = document.querySelector('.gallery');

	const nav = document.querySelector('#nav-main');

	// Modal
	let modal = () => {
		const overlay = document.querySelector('.modal-overlay');
		link.addEventListener('click', event => {
			event.preventDefault();
			popup.classList.toggle('modal-show');
			overlay.classList.toggle('show');
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
	if (newsSlider) {
		const newsSwiper = new Swiper('.news-slider', {
			effect: 'coverflow',
			grabCursor: true,
			loop: false,
			centeredSlides: false,
			keyboard: true,
			spaceBetween: 10,
			slidesPerView: '3',
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
	// END Sliders

	// // Map
	// if (mapContainer) {
	// 	function init() {
	// 		const myMap = new ymaps.Map('map', {
	// 			center: [47.5396, 42.0151],
	// 			controls: [
	// 				'typeSelector',
	// 				'fullscreenControl',
	// 				'geolocationControl',
	// 				'rulerControl',
	// 				'routeButtonControl',
	// 			],
	// 			zoom: 16,
	// 		});
	// 		const control = myMap.controls.get('routeButtonControl');
	// 		control.routePanel.state.set('from', 'Романовская союзный 97а');
	// 		const myPlacemark = new ymaps.Placemark(
	// 			[47.5398, 42.0153], {
	// 				hintContent: 'Ул. Союзная 97а',
	// 				balloonContent: 'Поликлиника',
	// 			}, {
	// 				preset: 'islands#blueMedicalIcon',
	// 			},
	// 		);
	// 		myMap.geoObjects.add(myPlacemark);
	// 	}
	// 	ymaps.ready(init);
	// }
	// // END Map

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
	const body = document.querySelector('.main-wrapper');
	const sliderNewsBlind = document.querySelectorAll('.js-sliderNews--blind');
	const blindPanel = document.querySelector('.js-blindHeaderPanel');

	if (!localStorage.getItem("blindClasses")) {
		let arr = ['font1', 'kerning1', 'color1'];
		let classArr = JSON.stringify(arr)
		localStorage.setItem('blindClasses', classArr)
		for (let i = 0; i < arr.length; i++) {
			body.classList.add(arr[i]);
		}

	}

	blindtrigger.addEventListener('click', () => {
		blindPanel.classList.toggle('blindHeaderPanel--show');
		body.classList.toggle('starblind');
		if (sliderNewsBlind) {
			for (let i = 0; i < sliderNewsBlind.length; i++) {
				sliderNewsBlind[i].classList.toggle('blindSliderNews--show');
			}
		}
		test();
	});

	function test() {
		if (body.classList.contains('starblind')) {
			let buttons = [...blindPanel.querySelectorAll('button')];
			let buttonLowFontSize = blindPanel.querySelector('.blind-fontSize--low');
			let buttonNormalFontSize = blindPanel.querySelector('.blind-fontSize--normal');
			let buttonBigFontSize = blindPanel.querySelector('.blind-fontSize--big');
			let htmlElem = document.querySelector('html');
			var style = window.getComputedStyle(htmlElem, null).getPropertyValue('font-size');
			var defaultFontSize = parseFloat(style);
			// now you have a proper float for the font size (yes, it can be a float, not just an integer)
			// htmlElem.style.fontSize = (defaultFontSize + 10) + 'px';
			console.log(defaultFontSize);

			buttons.forEach(button => {
				button.addEventListener('click', () => {
					buttons
						.filter(function (obj) {
							return (
								button.getAttribute('data-group') == obj.getAttribute('data-group')
							);
						})
						.map(function (obj) {
							body.classList.remove(obj.getAttribute('data-test'));
						});

					if (button.hasAttribute('data-test')) {
						body.classList.add(button.getAttribute('data-test'));
					}
				});
			});
			buttonLowFontSize.onclick = () => {
				htmlElem.style.fontSize = (defaultFontSize - 2) + 'px';
			};
			buttonNormalFontSize.onclick = () => {
				htmlElem.style.fontSize = (defaultFontSize) + 'px';
			};
			buttonBigFontSize.onclick = () => {
				htmlElem.style.fontSize = (defaultFontSize + 6) + 'px';
			}
		}
	}
});
document.addEventListener("DOMContentLoaded", function () {
	let lazyImages = [].slice.call(document.querySelectorAll(".lazy-img"));
	let active = false;
	console.log(lazyImages);

	const lazyLoad = function () {
		if (active === false) {
			active = true;

			setTimeout(function () {
				lazyImages.forEach(function (lazyImage) {
					if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect()
							.bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
						lazyImage.src = lazyImage.dataset.src;
						lazyImage.classList.remove("lazy");

						lazyImages = lazyImages.filter(function (image) {
							return image !== lazyImage;
						});

						if (lazyImages.length === 0) {
							document.removeEventListener("scroll", lazyLoad);
							window.removeEventListener("resize", lazyLoad);
							window.removeEventListener("orientationchange", lazyLoad);
						}
					}
				});

				active = false;
			}, 200);
		}
	};

	document.addEventListener("scroll", lazyLoad);
	window.addEventListener("resize", lazyLoad);
	window.addEventListener("orientationchange", lazyLoad);
});
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
