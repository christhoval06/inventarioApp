/**
 * Created by cristobal on 04/08/14.
 */


function CategoriaController() {

    $('.input-group .form-control').focus(function () {
        $(this).addClass('focus')
        $(this).parent().find('.input-group-addon').addClass('focus')
    }).focusout(function () {
            $(this).removeClass('focus')
            $(this).parent().find('.input-group-addon').removeClass('focus')
        });
}