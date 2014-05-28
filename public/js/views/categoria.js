/**
 * Created by cristobal on 04/08/14.
 */


$(document).ready(function () {

    var cc = new CategoriaController();

    $('form#categoria').ajaxForm({
        beforeSubmit: function (formData, jqForm, options) {
            return true;
        },
        success: function (data, status, xhr, $form) {
            if(data.success) window.location.href = '/categorias/' + data.code
            else console.log(data.error);
        },
        error: function (e) {
            console.log("ERROR");
        }
    });
    $('form#categoria #nombre').focus();
})


