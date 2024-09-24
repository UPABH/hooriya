class VideoProgressSection extends HTMLElement {
  constructor() {
    super();
    let _this = this;
    let SwiperVideoIsPlaying = true;
    var slideSwiper = new Swiper('[data-video-progress-slider]', {
      slidesPerView: 1.2,
      loop: false,
      centeredSlides: false,
      spaceBetween: 20,
      pagination: {
        el: '[data-pagination-video]',
        clickable: true,
      },
      autoplay: {
        delay: 15000,
        disableOnInteraction: false,
      },
      breakpoints: {
        1024: {
          slidesPerView: 4.32,
          spaceBetween: 50,
          loop: true,
          centeredSlides: true    
        },
      },
      on: {
        slideChangeTransitionStart: function () {
          let currentSlide = this.slides[this.activeIndex];
          let video = currentSlide.querySelector('video');
          if (video) {
            video.currentTime = 0;
            if (SwiperVideoIsPlaying) {
              video.play();
            } else {
              video.pause();
            }
          }
        },
        slideChangeTransitionEnd: function () {
          let previousSlide = this.slides[this.previousIndex];
          let video = previousSlide.querySelector('video');
          if (video) {
            video.pause();
          }
        },
      },
    });

    const playPauseButton = _this.querySelector('.slider-playtoggle');
    playPauseButton.addEventListener('click', function (e) {
      let elem = e.currentTarget;
      let currentSlide = slideSwiper.slides[slideSwiper.activeIndex];
      let video = currentSlide.querySelector('video');
      if (video.paused) {
        video.play();
        slideSwiper.autoplay.start();
        SwiperVideoIsPlaying = true;
        _this.querySelector('.video-progress__slideshow .swiper-pagination-bullet-active').classList.remove('swiper-pagination-pause');
      } else {
        video.pause();
        slideSwiper.autoplay.stop();
        SwiperVideoIsPlaying = false;
        _this.querySelector('.video-progress__slideshow .swiper-pagination-bullet-active').classList.add('swiper-pagination-pause');
      }
      elem.querySelector('#sliderPlay').classList.toggle('slider-playtoggle--active');
      elem.querySelector('#sliderPause').classList.toggle('slider-playtoggle--active');
    });
  }
}

customElements.define('video-progress', VideoProgressSection);