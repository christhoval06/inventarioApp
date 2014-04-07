/**
 * Created by cristobal on 04/07/14.
 */



function LoginValidator() {

    this.loginErrors = $('#myAlert');
    this.loginErrors.modal({ show: false, keyboard: true, backdrop: true });

    this.showLoginError = function (t, m) {
        $('#myAlert .modal-header h4').text(t);
        $('#myAlert .modal-body p').text(m);
        this.loginErrors.modal('show');
    }

    this.animation = function(animate)
    {
        var icon = $('.form-signin button div i'),
            div = $('.form-signin button div');

        if (animate) {
            icon.removeClass().addClass('flaticon-sync');
            div.addClass('rotate');
        } else {
            icon.removeClass().addClass('flaticon-key');
            div.removeClass();
        }
    }

}

LoginValidator.prototype.validateForm = function () {
    if ($('#usuario').val() == '') {
        this.animation(false);
        this.showLoginError('Whoops!', 'Introduzca un USUARIO valido.');
        return false;
    } else if ($('#clave').val() == '') {
        this.animation(false);
        this.showLoginError('Whoops!', 'Introduzca una CLAVE valida.');
        return false;
    } else {
        this.animation(true);
        return true;
    }
}
