/**
 * Created by cristobal on 04/08/14.
 */


$(document).ready(function () {

    var pc = new ProductoController();

    $('form#producto').ajaxForm({
        beforeSubmit: function (formData, jqForm, options) {},
        success: function (responseText, status, xhr, $form) {},
        error: function (e) { }
    });
    $('form#producto #codigo').focus();
})


