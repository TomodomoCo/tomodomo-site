import ResizeObserver from 'resize-observer-polyfill';

const observer = new ResizeObserver((items, observer) => {
  for (const item of items) {
    const {
      height,
    } = item.contentRect

    document.documentElement.style.setProperty('--headerHeight', height + 'px');
  }
})

observer.observe(document.querySelectorAll('.header__nav > .nav')[0])

jQuery('.js-toggle-nav').on('click', function () {
  jQuery('body').toggleClass('has-open-nav')
})
