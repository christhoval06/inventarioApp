/**
 * Created by cristobal on 04/08/14.
 */


$(document).ready(function () {

    var cc = new CategoriaController();

    $('form#categoria').ajaxForm({
        beforeSubmit: function (formData, jqForm, options) {},
        success: function (responseText, status, xhr, $form) {},
        error: function (e) { }
    });
    $('form#categoria #nombre').focus();
})


