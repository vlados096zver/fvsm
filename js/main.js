$(document).ready(function () {

    $('.mobile-wrap').on('click', function () {
        $('.line-burger').toggleClass('line-active');
        $('.about__list').slideToggle();
    });
    
    $(window).resize(function () {
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
    
    if ($('.single__row').length > 0) {
        var sliderGallery = undefined;
        initSliderGallery();
    
        $(window).on('resize', function () {
            initSliderGallery();
        });
    }
    
    function initSliderGallery() {
        var screenWidth = $(window).width();
        if (screenWidth > 1050 && sliderGallery == undefined) {
            sliderGallery = new Swiper('.single__row', {
                loop: true,
            });
    
            $('.single__arrow--dir_right').on('click', function () {
                sliderGallery.slideNext();
            });
    
        } else if (screenWidth < 1051 && sliderGallery != undefined) {
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
    
    swiper.on('slideChange', function() {
        var location = window.location.origin;
        var url = $('.swiper-slide:eq(' + swiper.activeIndex + ')').data('url');
        history.replaceState(null, '', location + '/' + url);    
    });

    $('.services__link').on('click', function() {
        var tab = $(this).data('tab');
        $('.services__link').removeClass('services__link--active');
        $('.services__box--content').addClass('services__box--hidden');
        $(this).addClass('services__link--active');
        $('.tab-' + tab).removeClass('services__box--hidden');
        return false;
    });
    
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
    
    validate('#c_name', 1, regName, '.contacts .contacts__fail-name');
    validate('#c_phone', 1, regPhone, '.contacts .contacts__fail-phone', true);
    
    validate('#p_name', 1, regName, '.overlay .contacts__fail-name');
    validate('#p_phone', 1, regPhone, '.overlay .contacts__fail-phone', true);
    
    disBtn('#c_name, #c_phone', '#btn--send');
    
    disBtn('#p_name, #p_phone', '#btn--popup');
    
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
    
    $('#btn--contact').on('click', function () {
        var name = $('#c_name').val();
        var phone = $('#c_phone').val();
        var msg = $('#c_msg').val();
    
        validate('#c_name', 1, regName, '.contacts__fail--name');
        validate('#c_phone', 1, regPhone, '.contacts__fail--phone', true);
        disBtn('#c_name, #c_phone', '#btn--contact');
    
        valClick('#c_name', 1, regName, '.contacts__fail--name');
        valClick('#c_phone', 1, regPhone, '.contacts__fail--phone', true);
        var btn_bool = disBtnClick('#c_name, #c_phone', '#btn--contact');
    
        if (btn_bool) {
            $.ajax({
                url: myajax.url,
                type: 'POST',
                data: {
                    action: 'contact',
                    name: name,
                    phone: phone,
                    msg: msg,
                },
            }).done(function (data) {
                $('#c_name, #c_phone, #c_msg').val('').removeClass('form-done');
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