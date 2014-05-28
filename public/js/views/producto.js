/**
 * Created by cristobal on 04/08/14.
 */


$(document).ready(function () {

    var pc = new ProductoController();

    $('form#producto').ajaxForm({
        beforeSubmit: function (formData, jqForm, options) {},
        success: function (data, status, xhr, $form) {
            if(data.success) window.location.href = '/productos/' + data.code
            else console.log(data.error);
        },
        error: function (e) { }
    });
    $('form#producto #codigo').focus();
})


