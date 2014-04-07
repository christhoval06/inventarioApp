/**
 * Created by cristobal on 04/04/14.
 */


$(document).ready(function () {

    var lc = new LoginController(),
        lv = new LoginValidator();

    $('#login-form').ajaxForm({
        beforeSubmit: function (formData, jqForm, options) {
            if (!(lv.validateForm()))return false;
            else {
                formData.push({name: 'recordarme', value: true})
                return true;
            }
        },
        success: function (responseText, status, xhr, $form) {
            if (status == 'success') window.location.href = '/inicio';
        },
        error: function (e) {
            lv.animation(false);
            lv.showLoginError('Login Failure', 'por favor revise su USUARIO o su CLAVE');
        }
    });
    $('#usuario').focus();
})
