document.addEventListener( 'click', event => {        // Код для активации focus в браузере Safari
    if (event.target.matches('button')) {        
        event.target.focus()    
    }});    

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

