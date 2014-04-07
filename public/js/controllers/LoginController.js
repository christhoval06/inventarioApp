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
}