/**
 * Created by cristobal on 04/08/14.
 */


$(document).ready(function () {

    var ic = new InicioController();
     var that = this;
    $('a.logout').click(function(e){
		$.ajax({
			url: "/logout",
			type: "GET",
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert("Success!!",'You are now logged out.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
    });

    this.showLockedAlert = function(title, msg){
		$('.modal.alerta').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal.alerta .modal-header .modal-title').text(title);
		$('.modal.alerta .modal-body p').html(msg);
		$('.modal.alerta').modal('show');
		$('.modal.alerta button').click(function(){window.location.href = '/';})
		setTimeout(function(){window.location.href = '/';}, 3000);
	}
})


