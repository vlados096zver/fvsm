$(document).ready(function() {


  $('.mobile-wrap').on('click', function() {
    $('.line-burger').toggleClass('line-active');
    $('.about__list').slideToggle();
  });

  $(window).resize(function() {
    if ($(window).width() >= 840) {
      $('.about__list').attr('style', '');
      $('.line-burger').removeClass('line-active');
    }

  });

  function customCursor() {

    const cursorInner = document.querySelector('.circle-cursor__inner');
    const cursorOuter = document.querySelector('.circle-cursor__outer');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cxi = mx,
      cyi = my,
      cxo = mx,
      cyo = my;

    window.addEventListener('mousemove', (event) => {
      mx = event.clientX;
      my = event.clientY;
    });

    function update() {
      const dxi = (mx - cxi) * 0.2;
      const dyi = (my - cyi) * 0.2;
      cxi += dxi;
      cyi += dyi;

      const dxo = (mx - cxo) * 0.07;
      const dyo = (my - cyo) * 0.07;
      cxo += dxo;
      cyo += dyo;

      cursorOuter.style.transform = `translate(${cxo}px, ${cyo}px)`;
      cursorInner.style.transform = `translate(${cxi}px, ${cyi}px)`;

      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);

    document.body.addEventListener('mouseover', (event) => {
      if (!event.target.closest('.hover__block')) return;
      cursorInner.classList.add('circle-cursor__hover');
      cursorOuter.classList.add('circle-cursor__hover');
    });

    document.body.addEventListener('mouseout', (event) => {
      if (!event.target.closest('.hover__block')) return;
      cursorInner.classList.remove('circle-cursor__hover');
      cursorOuter.classList.remove('circle-cursor__hover');
    });

  }

  customCursor();


if ($('.single__row').length>0) {

var sliderGallery = undefined;

  function initSliderGallery() {
    var screenWidth = $(window).width();
   if (screenWidth > 1050 && sliderGallery == undefined) {
      sliderGallery = new Swiper('.single__row', {
      loop: true,
    });  

      $('.single__arrow--dir_right').on('click', function() { 
      //$('.single__row').slick('slickNext');
      sliderGallery.slideNext();
    });


   } else if (screenWidth < 1051 && sliderGallery != undefined) {
    sliderGallery.destroy();
     sliderGallery = undefined;
   }

 }

initSliderGallery();

$(window).on('resize', function() {
   initSliderGallery();
});
  
}

  
    if ($('#slider').length>0) {
  
    var swiper = undefined;

    function initSwiper() {
      var screenWidth = $(window).width();
      let wrapper = document.querySelector('.holder');

      if (screenWidth > 1150 && swiper == undefined) {

        const asideList = document.getElementsByClassName('aside__list')[0],
          asideListItems = asideList.children,
          activeItemClass = 'aside__link--active';

        var currentActive = document.querySelector('.aside__link--active').dataset.number;

        console.log(currentActive);

        swiper = new Swiper('#slider', {
          direction: 'horizontal',
          loop: false,
          mousewheel: true,
          freeMode: true
        });

        swiper.on('init resize', function() {
          asideListItems[currentActive].classList.add(activeItemClass);
        });

        swiper.on('activeIndexChange', function(e) {
          asideListItems[e.previousIndex].classList.remove(activeItemClass);
          asideListItems[e.realIndex].classList.add(activeItemClass);

        });

        swiper.on('slideChange', function() {

          let elems = document.querySelectorAll('.item.swiper-slide');
          let elemIndex = swiper.activeIndex;
          elems.forEach(function(item, index) {


            if (elemIndex > 0) {
              wrapper.classList.add('dark__mode');

            } else {
              wrapper.classList.remove('dark__mode');

            }

          })

          if (swiper.activeIndex == 1 && document.querySelector('.services').classList.contains('dark-bg')) {
            console.log('text');
            wrapper.classList.remove('dark__mode');
          }

        });

        asideList.onclick = event => {
          if (event.target.tagName !== 'LI') return;

          let number = +event.target.dataset.number;

          swiper.slideTo(number);
        }


        let links = document.querySelectorAll('.aside__link--active');
        if (links.length > 1) {
          links.forEach(function(item, index) {
            if (index == 0) return false;
            item.classList.remove('aside__link--active');
          })
        }

      } else if (screenWidth < 1151 && swiper != undefined) {
        swiper.destroy();
        swiper = undefined;
        console.log($('.swiper-wrapper'));
        wrapper.classList.remove('dark__mode');
        // document.querySelector('.swiper-wrapper').classList.add('swiper-mob');
      }

    }

    initSwiper();

    $(window).on('resize', function() {
      initSwiper();
    });
}


  function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function() {
      var value = $(this).val();
      var that = $(this);

      regExp = regExp == '' ? /./ : regExp;

      if (phone === true) {
        bool_reg = !regExp.test(value);
      } else {
        bool_reg = regExp.test(value);
      }

      if (value.length > length && value !== '' && bool_reg) {
        that.removeClass('form-fail').addClass('form-done');
        $(error).slideUp();
      } else {
        that.removeClass('form-done').addClass('form-fail');
        $(error).slideDown();
      }
    });

  }

  // деакцивация кнопки если есть поле с ошибкой

  function disBtn(input, btn, bool) {
    var input = $(input);
    input.on('blur keyup', function() {

      if (input.hasClass('form-fail') || bool == true) {
        $(btn).attr('disabled', 'disabled');
      } else {
        $(btn).removeAttr('disabled');
      }

    });

  }

  // для проверки при нажатии

  function valClick(input, length, regExp, error, btn, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
      bool_reg = regExp.test(value);
    } else {
      bool_reg = !regExp.test(value);
    }

    if (value.length < length && value === '' && bool_reg) {
      $(input).addClass('form-fail');
      $(error).slideDown();
    }
  }

  //  деакцивация кнопки при нажатии

  function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
      $(btn).attr('disabled', 'disabled');
      return false;
    } else {
      return true;
    }

  }

  $('input[type="tel"]').mask("+38 (999) 999-99-99");

  var regName = /^[a-zA-Zа-яА-ЯёЁ]+/;
  var regPhone = /[_]/i;
  var regEmail = /.+@.+\..+/i;
  var regNumber = /^\d{1,}$/;

  function validateCheck(input) {
    $(input).on('change', function() {
      var check = $(this).prop('checked');
      var that = $(this);

      if (check) {
        that.removeClass('input-fail').addClass('input-done');
      } else {
        that.removeClass('input-done').addClass('input-fail');
      }
    });
  }


  validate('#c_name', 1, regName, '.contacts .contacts__fail-name');
  validate('#c_phone', 1, regPhone, '.contacts .contacts__fail-phone', true);

  validate('#p_name', 1, regName, '.overlay .contacts__fail-name');
  validate('#p_phone', 1, regPhone, '.overlay .contacts__fail-phone', true);

  disBtn('#c_name, #c_phone', '#btn--send');

  disBtn('#p_name, #p_phone', '#btn--popup');

  $('.input').on('focus', function() {
    $(this).next().addClass('label-active');
  });

  $('.input').on('blur', function() {
    if ($(this).val() == '') {
      $(this).next().removeClass('label-active');
    }
  });

  $('.overlay-close').click(function() {
    var overlay = $(this).parents('.overlay');
    overlay.removeClass('overlay-active');
  });

  $('body').on('click', function(e) {
    if ($(e.target).is('.overlay-request')) {
      $('.overlay-request').removeClass('overlay-active');
    }
  });

  $('.btn--order, .btn--popup').on('click', function(e) {
    $('.overlay-request').addClass('overlay-active');
  });


});
