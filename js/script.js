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
const modalTitle = $('.modal-order__title');

modalBtn.on('click', function() {
    modalOverlay.show(400);
    $('body').addClass('no-scroll');
});

modalClose.on('click', function() {
    modalOverlay.hide(400);
    $('body').removeClass('no-scroll');
});

modalOverlay.on('click', function(event) {
	if ($(event.target).closest(modalWrapper).length == 0) {
		$(this).fadeOut();					
	}
});

modalForm.submit(function (event) {
    event.preventDefault();
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        type: 'POST',
        data: $(this).serialize(),
        success(data) {
            modalTitle.text('Ваша заявка принята, номер заявки ' + data.id);  
            modalForm.slideUp(300);
        },
        error() {
            modalTitle.text('Что-то пошло не так, попробуйте позже!');
        }
    })
});

// второй способ

// modalForm.submit(function (event) {
//     event.preventDefault();
//     $.post('https://jsonplaceholder.typicode.com/posts', $(this).serialize())
//                 .then(function(data) {
//                     console.log(data);
//                     return data;
//                 })
//                 .catch(function(err) {
//                     console.log(err);
//                     return err;
//                 });
// });


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
    img.src = '../icons/map-marker.svg';
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
