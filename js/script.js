document.addEventListener( 'click', event => {        // Код для активации focus в браузере Safari
    if (event.target.matches('button')) {        
        event.target.focus()    
}}); 
    
    // модальное окно

const modalBtn = $('.header__button');
const modalClose = $('.modal-order__close');
const modalOverlay = $('.modal-order');
const modalWrapper = $('.modal-order__wrapper');
const modalForm = $('.modal-order__form');
const body = $('body');
const originalModalForm = modalForm.html();

modalBtn.on('click', function() {
    modalOverlay.show(400);
    body.addClass('no-scroll');
});

modalClose.on('click', function() {
    modalOverlay.hide(400);
    body.removeClass('no-scroll');
    modalForm.html(originalModalForm);
});

modalOverlay.on('click', function(event) {
	if ($(event.target).closest(modalWrapper).length === 0) {
		$(this).fadeOut();
        body.removeClass('no-scroll');
        modalForm.html(originalModalForm);
	}
});
   // маска, валидация 

const justValidate = new JustValidate('.modal-order__form', {
    errorLabelStyle: {
        color: 'white'
    }
});
const inputTel = document.querySelector('.modal-order__input_tel');    
const telMask = new Inputmask('+7(999)999-99-99'); 
const modalTitle = document.querySelector('.modal-order__title');

telMask.mask(inputTel); 


// const express = require("express");
// const { createProxyMiddleware } = require("http-proxy-middleware");
// const cors = require('cors');
// const app = express();
// // здесь мы указываем адрес нашего сервера
// const API_SERVICE_URL = "https://postman-echo.com/post";
// // прописываем следующую строку, если используется незашифрованное соединение
// // это серьезная брешь в безопасности, следует использовать только на этапе
// // разработки, и никогда в продакшене process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// // здесь мы указываем, какие заголовки нам нужно разрешить для использования 
// app.use(cors({ exposedHeaders: '*' }));
// app.use("/", createProxyMiddleware({ target: API_SERVICE_URL, changeOrigin: true, ws: true, logLevel: "debug" }));
// app.listen(PORT, HOST, () => { console.log(`Starting Proxy Server at ${HOST}:${PORT}`); });




// const express = require("express");
// const { createProxyMiddleware } = require("http-proxy-middleware");
// const app = express();
// const PORT = 3000;

// app.use("/", createProxyMiddleware({ 
//     target: "https://postman-echo.com",
//     changeOrigin: true,
//     logLevel: "debug" 
// }));

// app.listen(PORT, () => { 
//     console.log(`Proxy Server is running at http://localhost:${PORT}`); 
// });



justValidate
    .addField('#name', [
        {
            rule: 'required',
            errorMessage: 'Как вас зовут?',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Не короче 3 символов',
        },
        {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'Слишком длинное имя',
        },
    ])
    .addField('#tel', [
        {
            rule: 'required',
            errorMessage: 'Укажите ваш телефон',
        },
        {
            validator: (value) => {
            const phone = inputTel.inputmask.unmaskedvalue()
            console.log(phone);
            return !!(Number(phone) && phone.length === 10);
        },
            errorMessage: 'Телефон не корректный!',
        },
    ])
    .onSuccess(event => {
        const target = event.target;
        // axios.post('https://jsonplaceholder.typicode.com/posts', {
        axios.post('https://postman-echo.com/post', {
            name: target.name.value,
            tel: inputTel.inputmask.unmaskedvalue(),
        },
        {
            proxy: {
                host: 'proxy.postman-echo.com',
                port: 443
            },
        })
        .then(response => {
        // console.log(response)          Access-Control-Allow-Origin: https://postman-echo.com
        target.reset();
        modalTitle.textContent = `Спасибо ваша заявка принята, номер заявки ${response.data.id}!`;
        })
        .catch(err => {
        console.error(err);
        modalTitle.textContent = 'Что-то пошло не так, попробуйте позже!';
        })
        closeMenu();
    });


    // дата и время

const dateLabels = document.querySelectorAll('.form__label-third_small');

dateLabels.forEach(function(label) {
    label.addEventListener('click', function(event) {
        const clickedLabel = event.currentTarget;
        const dateText = clickedLabel.querySelector('.form__field-data');
        const formTriangle = clickedLabel.querySelector('.form__triangle');
        const formInput = clickedLabel.querySelector('.form__input-data');
        
        dateText.innerText = '';
        formTriangle.style.display = 'none';
        formInput.style.opacity = '1';
    });
});

$(document).ready( function() {
    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    $('#datePicker').val(today);
});


  // select

    const select = document.querySelector('.form__select-wrap');
    const selectText = document.querySelector('.form__select-text');
    const selectForm = document.querySelector('.form__select');

    select.addEventListener('click', () => {
        selectText.innerText = '';
        selectForm.style.opacity = '1';
    })


     // валидация формы

const justValidateForm = new JustValidate('.form', {
    errorLabelStyle: {
        color: 'red',
        top: '20px',
        left: '5px',
        fontSize: '10px' 
    }
});
const inputTelForm = document.querySelector('#form-tel');    
const telMaskForm = new Inputmask('+7(999)999-99-99');
const bookingTitle = document.querySelector('.booking__title');
    
telMaskForm.mask(inputTelForm);

justValidateForm
    .addField('.form__input-btn', [
        {
            rule: 'required',
            errorMessage: 'Выберите зал',
        },
    ])
    .addField('.form__input', [
        {
            rule: 'required',
            errorMessage: 'Выберите развлечение',
        },
    ])
    .addField('#datePicker', [
        {
            rule: 'required',
            errorMessage: 'Выберите дату',        // не работает
        },
    ])
    .addField('#appt', [
        {
            rule: 'required',
            errorMessage: 'Выберите время',    
        },
    ])
    .addField('#form-name', [
        {
            rule: 'required',
            errorMessage: 'Как вас зовут?',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Не короче 3 символов',
        },
        {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'Слишком длинное имя',
        },
    ])
    .addField('#form-last_name', [
        {
            rule: 'required',
            errorMessage: 'Какая ваша фамилия?',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Не короче 3 символов',
        },
        {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'Слишком длинная фамилия',
        },
    ])
    .addField('#form-tel', [
        {
            rule: 'required',
            errorMessage: 'Укажите ваш телефон',
        },
        {
            validator: (value) => {
            const phone = inputTelForm.inputmask.unmaskedvalue()
            console.log(phone);
            return !!(Number(phone) && phone.length == 10);
        },
            errorMessage: 'Телефон не корректный!',
        },
    ])
    .addField('#form-email', [
        {
            rule: 'required',
            errorMessage: 'Укажите ваш e-mail',
        },
        {
            rule: 'email',
            errorMessage: 'E-mail не корректный!',
        },
    ]) 
    .onSuccess(event => {
        const target = event.target;
        // axios.post('https://jsonplaceholder.typicode.com/posts', {
            axios.post('https://postman-echo.com/post', {
            name: target.name.value, 
            lastName: target.last_name.value,
            phone: target.phone.value,
            email: target.email.value,
            halls: target.halls.value,
            gameConsole: target.game_console.value,
            tableGames: target.table_games.value,
            hallsPlus: target.halls_plus.value,
            date: target.date.value,
            time: target.time.value,
            quantity: target.quantity.value,
        })
        .then(response => {
            console.log(response)
            target.reset();
            bookingTitle.textContent = `Спасибо ваша заявка принята, номер заявки ${response.data.id}!`;
            })
            .catch(err => {
            console.error(err);
            bookingTitle.textContent = 'Что-то пошло не так, попробуйте позже!';
            })
    }) 
    

    // аккордеон

const questionsList = $('.questions__list');

questionsList.accordion({
    active: true,
    collapsible: true,
    heightStyle: 'content',
    icons: {
        header: 'questions__accord',
        activeHeader: 'questions__accord-active',
        hoverHeader: 'questions__accord-hover',
    }
});

    // карта

async function initMap() {
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker} = ymaps3;

    const map = new YMap(
        document.getElementById('map'),
        {
            location: {
                center: [37.565021, 55.723151],
                zoom: 17
            }
        }
    );

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    const markerElement = document.createElement('div');
    markerElement.className = 'marker-class';
    const img = document.createElement('img');
    img.src = 'icons/map-marker.svg';
    img.alt = 'Маркер';
    markerElement.style.width = '35px'; 
    markerElement.style.height = '35px';
    markerElement.appendChild(img);

    const marker = new YMapMarker(
        {
            coordinates: [37.565021, 55.723151],
            draggable: false,
            mapFollowsOnDrag: true
        },
        markerElement
    );

    map.addChild(marker);
}

initMap();


    // слайдер

new Swiper('.swiper', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 30,
    grapCursor: true,
    speed: 1000,
    navigation: {
        nextEl: '.button-right',
        prevEl: '.button-left',
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    mousewheel: true,
    keyboard: true,
});


    // бургер-меню

const burgerMenu = $('.burger-menu');
const menuList = $('.nav-mobile');
const link = $('.nav__link');

function openMenu() {
    burgerMenu.addClass('active');
    menuList.addClass('active');
    body.addClass('lock');
    body.append($('<div></div>').addClass('overlay'));
}

function closeMenu() {
    burgerMenu.removeClass('active');
    menuList.removeClass('active');
    body.removeClass('lock');
    $('.overlay').remove();
}

burgerMenu.on('click', function() {
    const open = burgerMenu.hasClass('active');

    if (open) {
        closeMenu()
    } else {
        openMenu()
    }
});

body.on('click', '.overlay', function() {
    closeMenu()
});

link.on('click', function() {
    closeMenu()
});


    // cookie

const cookieAlert = document.querySelector('.alert-cookie'); 
const cookieButton = document.querySelector('.alert-cookie__button'); 

cookieButton.addEventListener('click', () => {
    cookieAlert.style.display = 'none';
});

let cookies = () => {
    if (!Cookies.get('hide-cookie')) {
        setTimeout(() => {
            cookieAlert.style.display = 'block';
        }, 1000);
    }

    Cookies.set('hide-cookie', 'true', {
    expires: 10
    });
}

cookies();





