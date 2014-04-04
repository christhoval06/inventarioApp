/**
 * Created by cristobal on 04/04/14.
 */

function LoginController() {

    $('.form-signin input').focus(function () {
        $(this).addClass('focus')
        $(this).parent().find('.input-group-addon').addClass('focus')
    }).focusout(function () {
            $(this).removeClass('focus')
            $(this).parent().find('.input-group-addon').removeClass('focus')
        });

    $('.form-signin button').click(function (e) {
        e.preventDefault();
        $(this).find('i').removeClass().addClass('flaticon-sync');
        $(this).find('div').addClass('rotate');
        document.location.href = '/inicio';
    });
}