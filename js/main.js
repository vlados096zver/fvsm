$(document).ready(function () {

   var mh = 0;
   $(".services__box").each(function () {
       var h_block = parseInt($(this).height());
       if(h_block > mh) {
          mh = h_block;
       };
   });
   $(".services__box").height(mh);

$('.mobile-wrap').on('click', function () {
    $('.line-burger').toggleClass('line-active');
    $('.about__list').slideToggle();
});

if ($(window).width() >= 960) {
    $('.about__logo img').attr('src', $('.about__logo').data('white'));
    $('.main__page .about__wrap').removeClass('about__wrap--white');
} else {
    $('.about__logo img').attr('src', $('.about__logo').data('black'));
    $('.main__page .about__wrap').addClass('about__wrap--white');
}

$(window).resize(function () {
    if ($(window).width() >= 840) {
        $('.about__list').attr('style', '');
        $('.line-burger').removeClass('line-active');
    }

    if ($(window).width() >= 960) {
        $('.about__logo img').attr('src', $('.about__logo').data('white'));
        $('.main__page .about__wrap').removeClass('about__wrap--white');
    } else {
        $('.about__logo img').attr('src', $('.about__logo').data('black'));
        $('.main__page .about__wrap').addClass('about__wrap--white');
    }

});

$('body').on('mouseover touchstart', 'video', function() {
    $(this).attr('controls', 'controls');
});

$('body').on('mouseout touchend', 'video', function() {
    $(this).removeAttr('controls');
});

function customCursor() {

    const text = document.querySelector('#text');
    const title = document.querySelector('#text .text--title');
    const tag = document.querySelector('#text .text--tags');
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
    window.addEventListener('touchmove', (event) => {
        mx = event.touches[0].clientX;
        my = event.touches[0].clientY;
    });

    function update() {
        const dxi = (mx - cxi) * 0.3;
        const dyi = (my - cyi) * 0.3;
        cxi += dxi;
        cyi += dyi;

        const dxo = (mx - cxo) * 0.25;
        const dyo = (my - cyo) * 0.25;
        cxo += dxo;
        cyo += dyo;

        cursorOuter.style.transform = `translate(${cxo}px, ${cyo}px)`;
        cursorInner.style.transform = `translate(${cxi}px, ${cyi}px)`;
        if(text !== null) {
            text.style.transform = `translate(${cxo}px, ${cyo}px)`;
        }

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);

    ['mouseover', 'touchstart'].map(type => document.body.addEventListener(type, (event) => {
        const image = event.target.closest('.photo__image');
        if (!image) return;
        title.textContent = image.dataset.title;
        tag.textContent = image.dataset.tag;
        text.style.opacity = 1;
        cursorInner.classList.add('circle-cursor__hover');
        cursorOuter.classList.add('circle-cursor__hover');
    }));

    ['mouseout', 'touchend'].map(type => document.body.addEventListener(type, (event) => {
        const image = event.target.closest('.photo__image');
        if (!image) return;
        text.style.opacity = 0;
        cursorInner.classList.remove('circle-cursor__hover');
        cursorOuter.classList.remove('circle-cursor__hover');
    }));

    // fix ios
    ['mouseover', 'touchstart'].map(type => document.body.addEventListener(type, (event) => {
        const image = event.target.className;
        if (image !== 'photo__wrap') return;
        text.style.opacity = 0;
        cursorInner.classList.remove('circle-cursor__hover');
        cursorOuter.classList.remove('circle-cursor__hover');
    }));
}

customCursor();

if ($('.swiper-container').length > 0) {
    var sliderGallery = undefined;
    initSliderGallery();

    $(window).on('resize', function () {
        initSliderGallery();
    });
}

function initSliderGallery() {
    var screenWidth = $(window).width();
    if (screenWidth > 1350 && sliderGallery == undefined) {
        sliderGallery = new Swiper('.swiper-container', {
            loop: true,
            preloadImages: false,
            lazy: true,
            on: {
                afterInit: function() {
                    if($('.swiper-slide-active video').length > 0) {
                        $('.swiper-slide-active video')[0].play();
                    }
                }
            }
        });

        sliderGallery.on('slideChangeTransitionEnd', function() {
            if($('.swiper-slide video').length > 0) {
                $('.swiper-slide video').each(function() {
                    $(this)[0].pause();
                    $(this)[0].currentTime = 0;
                })
            }
            
            if($('.swiper-slide-active video').length > 0) {
                $('.swiper-slide-active video')[0].play();
            }
        });

        $('.single__arrow--dir_right').on('click', function () {
            sliderGallery.slideNext();
        });

    } else if (screenWidth < 1351 && sliderGallery != undefined) {
        sliderGallery.destroy();
        sliderGallery = undefined;
    }

}

if ($('#slider').length > 0) {
    var swiper = undefined;
    initSwiper();

    $(window).on('resize', function () {
        initSwiper();
    });

    if(swiper) {
        swiper.on('slideChange', function() {
            var location = window.location.origin;
            var activeSlide = swiper.activeIndex;
            var position = $('.swiper-slide:eq(' + activeSlide + ')').data('url');
            var url = location + '/' + position;
            // var tab = '';
            if(activeSlide == 1) {
                url = $('.services__link--active').attr('href');
                // var activeTab = $('.services__link--active').data('tab');
                // tab = '/#tab-' + activeTab;
            }
            
            history.replaceState(null, '', url);    
        });
    }
    
}

function initSwiper() {
    var screenWidth = $(window).width();
    let wrapper = document.querySelector('.holder');

    if (screenWidth > 1150 && swiper == undefined) {
        const asideList = document.getElementsByClassName('aside__list')[0],
            asideListItems = asideList.children,
            activeItemClass = 'aside__link--active';

        var currentActive = document.querySelector('.aside__link--active').dataset.number;

        swiper = new Swiper('#slider', {
            direction: 'horizontal',
            loop: false,
            mousewheel: true,
            freeMode: true
        });

        swiper.on('init resize', function () {
            asideListItems[currentActive].classList.add(activeItemClass);
        });

        swiper.on('activeIndexChange', function (e) {
            asideListItems[e.previousIndex].classList.remove(activeItemClass);
            asideListItems[e.realIndex].classList.add(activeItemClass);

        });

        swiper.on('slideChange', function () {
            let elems = document.querySelectorAll('.item.swiper-slide');
            let elemIndex = swiper.activeIndex;
            elems.forEach(function (item, index) {
                if (elemIndex > 0) {
                    wrapper.classList.add('dark__mode');
                } else {
                    wrapper.classList.remove('dark__mode');
                }
            })

            if (swiper.activeIndex == 1 && document.querySelector('.services').classList.contains('dark-bg')) {
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
            links.forEach(function (item, index) {
                if (index == 0) return false;
                item.classList.remove('aside__link--active');
            })
        }

    } else if (screenWidth < 1151 && swiper != undefined) {
        swiper.destroy();
        swiper = undefined;
        wrapper.classList.remove('dark__mode');
    }

}

if($('.photo__wrap').length) {
    // Получаем нужный элемент
    var element = document.querySelector('.photo__image');
    var isResizeble = false;
    let elems = document.querySelectorAll('.photo__image');

    var Visible = function (target) {
        // Все позиции элемента
        var targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
        // Получаем позиции окна
        windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };

        if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
            targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
            targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
            targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
            // Если элемент полностью видно, то запускаем следующий код

            target.classList.add('photo__image--animation');

            if (!isResizeble) {
                //  ф-ция которая, отработает 1 раз и все
                isResizeble = true;
            } else {
                // Если элемент не видно, то запускаем этот код
            }
        } else {
            // target.classList.remove('photo__image--animation');
        }

    }

    // Запускаем функцию при прокрутке страницы
    window.addEventListener('scroll', function () {
        for (let elem of elems) {
            Visible(elem);
        }
    });

    // А также запустим функцию сразу. А то вдруг, элемент изначально видно
    for (let elem of elems) {
        Visible(elem);
    }

}

$('.btn--decor').on('click', function() {
    if(swiper) {
        swiper.slideNext(300, false);
    }
});

$('.services__link').on('hover mouseenter', function() {
    if($(window).width() > 1150) {
        var tab = $(this).data('tab');
        $('.services__link').removeClass('services__link--active');
        $('.services__box--content').addClass('services__box--hidden');
        $(this).addClass('services__link--active');
        $('.tab-' + tab).removeClass('services__box--hidden');
    
        var url = $(this).attr('href');
        // var location = window.location.origin;
        // var path = window.location.pathname;
        // history.replaceState(null, '', location + path + '#tab-' + tab); 
        history.replaceState(null, '', url); 
        return false;
    }
});

var hash = window.location.hash;
if(hash.indexOf('tab') !== -1) {
    var pos = hash.indexOf('#tab-');
    if(pos !== -1) {
        if($(window).width() > 1150) {
            var el = hash.substr(pos + 5);
            $('.services__link').removeClass('services__link--active');
            $('.services__box--content').addClass('services__box--hidden');
            $('.services__link[data-tab="' + el + '"]').addClass('services__link--active');
            $('.tab-' + el).removeClass('services__box--hidden');
            swiper.slideTo(1, 0, false);
        } else {
            var offset = $('.services').offset().top;
            $('html, body').animate({scrollTop: offset + 'px'}, 500);
        }
    }
}

// var search = window.location.search;
// if(search.indexOf('slide=3') !== -1) {
//     swiper.slideTo(2, 0, false);
// }

function validate(input, length, regExp, error, phone) {

    $(input).on('input blur', function () {
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

};

// деакцивация кнопки если есть поле с ошибкой

function disBtn(input, btn) {
    var input = $(input);
    input.on('input blur', function () {

        if (input.hasClass('form-fail')) {
            $(btn).attr('disabled', 'disabled');
        } else {
            $(btn).removeAttr('disabled');
        }

    });

};

// для проверки при нажатии

function valClick(input, length, regExp, error, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
        bool_reg = regExp.test(value);
    } else {
        bool_reg = !regExp.test(value);
    }

    if (value.length < length || value === '' || bool_reg) {
        $(input).addClass('form-fail');
        $(error).slideDown();
    }
};

//  деакцивация кнопки при нажатии

function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
        $(btn).attr('disabled', 'disabled');
        return false;
    } else {
        return true;
    }

};

$('input[type="tel"]').mask("+38 (999) 999-99-99");

var regName = /^[a-zA-Zа-яА-ЯёЁІі]+/;
var regPhone = /[_]/i;
var regEmail = /.+@.+\..+/i;
var regNumber = /^\d{1,}$/;

$('.input').on('focus', function () {
    $(this).next().addClass('label-active');
});

$('.input').on('blur', function () {
    if ($(this).val() == '') {
        $(this).next().removeClass('label-active');
    }
});

$('.overlay-close').click(function () {
    var overlay = $(this).parents('.overlay');
    overlay.removeClass('overlay-active');
});

$('body').on('click', function (e) {
    if ($(e.target).is('.overlay-request')) {
        $('.overlay-request').removeClass('overlay-active');
    }
});

$('.btn--order, .btn--popup').on('click', function (e) {
    $('.overlay-request').addClass('overlay-active');
});

$('#btn--send').on('click', function () {
    var name = $('#c_name').val();
    var phone = $('#c_phone').val();
    var email = $('#c_email').val();

    validate('#c_name', 1, regName, '.contacts .contacts__fail--name');
    validate('#c_phone', 1, regPhone, '.contacts .contacts__fail--phone', true);
    disBtn('#c_name, #c_phone', '#btn--send');

    valClick('#c_name', 1, regName, '.contacts .contacts__fail--name');
    valClick('#c_phone', 1, regPhone, '.contacts .contacts__fail--phone', true);
    var btn_bool = disBtnClick('#c_name, #c_phone', '#btn--send');

    if (btn_bool) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'contact',
                name: name,
                phone: phone,
                email: email,
            },
        }).done(function (data) {
            $('#c_name, #c_phone, #c_email').val('').removeClass('form-done');
            var text = 'Ваше повідомлення успішно надіслано!';
            
            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function () {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500);
        });

    }
    return false;
});

$('#btn--popup').on('click', function () {
    var name = $('#p_name').val();
    var phone = $('#p_phone').val();
    var email = $('#p_email').val();

    validate('#p_name', 1, regName, '.overlay .contacts__fail--name');
    validate('#p_phone', 1, regPhone, '.overlay .contacts__fail--phone', true);
    disBtn('#p_name, #p_phone', '#btn--popup');

    valClick('#p_name', 1, regName, '.overlay .contacts__fail--name');
    valClick('#p_phone', 1, regPhone, '.overlay .contacts__fail--phone', true);
    var btn_bool = disBtnClick('#p_name, #p_phone', '#btn--popup');

    if (btn_bool) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'contact',
                name: name,
                phone: phone,
                email: email,
            },
        }).done(function (data) {
            $('#p_name, #p_phone, #p_email').val('').removeClass('form-done');
            $('.overlay-request').removeClass('overlay-active');
            var text = 'Ваше повідомлення успішно надіслано!';
            
            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function () {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500);
        });

    }
    return false;
});

});