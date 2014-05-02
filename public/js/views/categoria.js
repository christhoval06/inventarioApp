/**
 * Created by cristobal on 04/08/14.
 */


$(document).ready(function () {

    var cc = new CategoriaController();

    $('form#categoria').ajaxForm({
        beforeSubmit: function (formData, jqForm, options) {
            console.log(formData);
            return true;
        },
        success: function (responseText, status, xhr, $form) {
            if (status == 'success') console.log("YES");
        },
        error: function (e) {
            console.log("ERROR");
        }
    });
    $('form#categoria #nombre').focus();
})


