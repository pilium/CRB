document.addEventListener('DOMContentLoaded', () => {

	const wrapperMenu = document.querySelector('.wrapper-menu');
	const sidenav = document.querySelector('.js-sidenav');
	const overlay = document.querySelector('.sidenav-overlay');

	const acc = document.getElementsByClassName('acc-header');

	const gallery = document.querySelector('.gallery');

	const nav = document.querySelector('#nav-main');

	// Modal
	const link = document.querySelector('.js-header-info__writeToUs-link');
	const popup = document.querySelector('.modal');
	const close = popup.querySelector('.modal-close__btn');
	const modalOverlay = document.querySelector('.modal-overlay');

	// modal--alert
	const modalAlert = document.querySelector('.modal--alert');
	const modalAlertClose = document.querySelector('.modal--alert__close');
	const modalAlertOverlay = document.querySelector('.modal--alert__background');

	// welcomeAlert
	function initAlert() {
		modalAlert.classList.add('is-active');
		modalAlertOverlay.classList.add('is-show');
	}
	if (modalAlert) {
		setTimeout(() => {
			initAlert();
		}, 2000);
	}

	// Modal
	let modal = () => {
		link.addEventListener('click', event => {
			event.preventDefault();
			popup.classList.toggle('modal-show');
			modalOverlay.classList.toggle('show');
		});
		close.addEventListener('click', event => {
			event.preventDefault();
			popup.classList.remove('modal-show');
			modalOverlay.classList.toggle('show');
		});
		document.addEventListener('click', e => {
			if (e.target.classList.contains('modal-overlay')) {
				popup.classList.remove('modal-show');
				modalOverlay.classList.toggle('show');
			}
		});
	};
	modal();
	// END Modal

	// Modal--alert
	let modalAlertInit = () => {
		modalAlertClose.addEventListener('click', event => {
			event.preventDefault();
			modalAlert.classList.toggle('is-active');
			modalAlertOverlay.classList.toggle('is-show');
		});
		document.addEventListener('click', e => {
			if (e.target.classList.contains('modal--alert__background')) {
				modalAlert.classList.remove('is-active');
				modalAlertOverlay.classList.toggle('is-show');
			}
		});
	}
	if (modalAlert) {
		modalAlertInit();
	}

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
		// eslint-disable-next-line no-undef
		baguetteBox.run('.gallery-wrap', {
			async: true,
		});
	}
	// END Gallery

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
		window.addEventListener('scroll', () => {
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

// polifill
var objectFitImages = (function () {
	'use strict';
	
	var OFI = 'bfred-it:object-fit-images';
	var propRegex = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g;
	var testImg = typeof Image === 'undefined' ? {style: {'object-position': 1}} : new Image();
	var supportsObjectFit = 'object-fit' in testImg.style;
	var supportsObjectPosition = 'object-position' in testImg.style;
	var supportsOFI = 'background-size' in testImg.style;
	var supportsCurrentSrc = typeof testImg.currentSrc === 'string';
	var nativeGetAttribute = testImg.getAttribute;
	var nativeSetAttribute = testImg.setAttribute;
	var autoModeEnabled = false;
	
	function createPlaceholder(w, h) {
		return ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + w + "' height='" + h + "'%3E%3C/svg%3E");
	}
	
	function polyfillCurrentSrc(el) {
		if (el.srcset && !supportsCurrentSrc && window.picturefill) {
			var pf = window.picturefill._;
			// parse srcset with picturefill where currentSrc isn't available
			if (!el[pf.ns] || !el[pf.ns].evaled) {
				// force synchronous srcset parsing
				pf.fillImg(el, {reselect: true});
			}
	
			if (!el[pf.ns].curSrc) {
				// force picturefill to parse srcset
				el[pf.ns].supported = false;
				pf.fillImg(el, {reselect: true});
			}
	
			// retrieve parsed currentSrc, if any
			el.currentSrc = el[pf.ns].curSrc || el.src;
		}
	}
	
	function getStyle(el) {
		var style = getComputedStyle(el).fontFamily;
		var parsed;
		var props = {};
		while ((parsed = propRegex.exec(style)) !== null) {
			props[parsed[1]] = parsed[2];
		}
		return props;
	}
	
	function setPlaceholder(img, width, height) {
		// Default: fill width, no height
		var placeholder = createPlaceholder(width || 1, height || 0);
	
		// Only set placeholder if it's different
		if (nativeGetAttribute.call(img, 'src') !== placeholder) {
			nativeSetAttribute.call(img, 'src', placeholder);
		}
	}
	
	function onImageReady(img, callback) {
		// naturalWidth is only available when the image headers are loaded,
		// this loop will poll it every 100ms.
		if (img.naturalWidth) {
			callback(img);
		} else {
			setTimeout(onImageReady, 100, img, callback);
		}
	}
	
	function fixOne(el) {
		var style = getStyle(el);
		var ofi = el[OFI];
		style['object-fit'] = style['object-fit'] || 'fill'; // default value
	
		// Avoid running where unnecessary, unless OFI had already done its deed
		if (!ofi.img) {
			// fill is the default behavior so no action is necessary
			if (style['object-fit'] === 'fill') {
				return;
			}
	
			// Where object-fit is supported and object-position isn't (Safari < 10)
			if (
				!ofi.skipTest && // unless user wants to apply regardless of browser support
				supportsObjectFit && // if browser already supports object-fit
				!style['object-position'] // unless object-position is used
			) {
				return;
			}
		}
	
		// keep a clone in memory while resetting the original to a blank
		if (!ofi.img) {
			ofi.img = new Image(el.width, el.height);
			ofi.img.srcset = nativeGetAttribute.call(el, "data-ofi-srcset") || el.srcset;
			ofi.img.src = nativeGetAttribute.call(el, "data-ofi-src") || el.src;
	
			// preserve for any future cloneNode calls
			// https://github.com/bfred-it/object-fit-images/issues/53
			nativeSetAttribute.call(el, "data-ofi-src", el.src);
			if (el.srcset) {
				nativeSetAttribute.call(el, "data-ofi-srcset", el.srcset);
			}
	
			setPlaceholder(el, el.naturalWidth || el.width, el.naturalHeight || el.height);
	
			// remove srcset because it overrides src
			if (el.srcset) {
				el.srcset = '';
			}
			try {
				keepSrcUsable(el);
			} catch (err) {
				if (window.console) {
					console.warn('https://bit.ly/ofi-old-browser');
				}
			}
		}
	
		polyfillCurrentSrc(ofi.img);
	
		el.style.backgroundImage = "url(\"" + ((ofi.img.currentSrc || ofi.img.src).replace(/"/g, '\\"')) + "\")";
		el.style.backgroundPosition = style['object-position'] || 'center';
		el.style.backgroundRepeat = 'no-repeat';
		el.style.backgroundOrigin = 'content-box';
	
		if (/scale-down/.test(style['object-fit'])) {
			onImageReady(ofi.img, function () {
				if (ofi.img.naturalWidth > el.width || ofi.img.naturalHeight > el.height) {
					el.style.backgroundSize = 'contain';
				} else {
					el.style.backgroundSize = 'auto';
				}
			});
		} else {
			el.style.backgroundSize = style['object-fit'].replace('none', 'auto').replace('fill', '100% 100%');
		}
	
		onImageReady(ofi.img, function (img) {
			setPlaceholder(el, img.naturalWidth, img.naturalHeight);
		});
	}
	
	function keepSrcUsable(el) {
		var descriptors = {
			get: function get(prop) {
				return el[OFI].img[prop ? prop : 'src'];
			},
			set: function set(value, prop) {
				el[OFI].img[prop ? prop : 'src'] = value;
				nativeSetAttribute.call(el, ("data-ofi-" + prop), value); // preserve for any future cloneNode
				fixOne(el);
				return value;
			}
		};
		Object.defineProperty(el, 'src', descriptors);
		Object.defineProperty(el, 'currentSrc', {
			get: function () { return descriptors.get('currentSrc'); }
		});
		Object.defineProperty(el, 'srcset', {
			get: function () { return descriptors.get('srcset'); },
			set: function (ss) { return descriptors.set(ss, 'srcset'); }
		});
	}
	
	function hijackAttributes() {
		function getOfiImageMaybe(el, name) {
			return el[OFI] && el[OFI].img && (name === 'src' || name === 'srcset') ? el[OFI].img : el;
		}
		if (!supportsObjectPosition) {
			HTMLImageElement.prototype.getAttribute = function (name) {
				return nativeGetAttribute.call(getOfiImageMaybe(this, name), name);
			};
	
			HTMLImageElement.prototype.setAttribute = function (name, value) {
				return nativeSetAttribute.call(getOfiImageMaybe(this, name), name, String(value));
			};
		}
	}
	
	function fix(imgs, opts) {
		var startAutoMode = !autoModeEnabled && !imgs;
		opts = opts || {};
		imgs = imgs || 'img';
	
		if ((supportsObjectPosition && !opts.skipTest) || !supportsOFI) {
			return false;
		}
	
		// use imgs as a selector or just select all images
		if (imgs === 'img') {
			imgs = document.getElementsByTagName('img');
		} else if (typeof imgs === 'string') {
			imgs = document.querySelectorAll(imgs);
		} else if (!('length' in imgs)) {
			imgs = [imgs];
		}
	
		// apply fix to all
		for (var i = 0; i < imgs.length; i++) {
			imgs[i][OFI] = imgs[i][OFI] || {
				skipTest: opts.skipTest
			};
			fixOne(imgs[i]);
		}
	
		if (startAutoMode) {
			document.body.addEventListener('load', function (e) {
				if (e.target.tagName === 'IMG') {
					fix(e.target, {
						skipTest: opts.skipTest
					});
				}
			}, true);
			autoModeEnabled = true;
			imgs = 'img'; // reset to a generic selector for watchMQ
		}
	
		// if requested, watch media queries for object-fit change
		if (opts.watchMQ) {
			window.addEventListener('resize', fix.bind(null, imgs, {
				skipTest: opts.skipTest
			}));
		}
	}
	
	fix.supportsObjectFit = supportsObjectFit;
	fix.supportsObjectPosition = supportsObjectPosition;
	
	hijackAttributes();
	
	return fix;
	
	}());
