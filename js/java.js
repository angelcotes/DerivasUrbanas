$(document).ready(function() {
	/*var input = document.getElementById('elInputmasvacile');
	input.addEventListener('input', function () {
		console.log(input.value);
	});*/
	$("#the-file-input").change(function() {
	    // will log a FileList object, view gifs below
	    var lmDate = this.files[0]
	    EXIF.getData(lmDate, function() {
		   console.log(EXIF.pretty(this));
		});
	});
	var heightImage = $('#navbar').offset().top;
	$(window).on('scroll', function(){
		if ($(window).scrollTop() > heightImage) {
			$('#navbar').addClass('menu-fixed');
			$('#vista').addClass('contenido');
			$('.photo').addClass('resize');
		}
		else{
			$('#navbar').removeClass('menu-fixed');
			$('#vista').removeClass('contenido');
			$('.photo').removeClass('resize');	
		}
	});
	navigator.geolocation.getCurrentPosition( fn_ok, fn_error);
	var divMapa = document.getElementById('mapa');
	var data_time = new Date();
	function fn_error(){
		divMapa.innerHTML = 'Para poder ver la actividar debe habilitar la geolocalizacion. Ingrese nuevamente a la pagina.';
	}
	function fn_ok(respuesta){
		var latitud = respuesta.coords.latitude;
		var longitud = respuesta.coords.longitude;
		/*var latArea = 11.0130076;
		var LonArea = -74.8276837;*/

		var pointA = new google.maps.LatLng(latitud, longitud);
		var pointB = new google.maps.LatLng(latitud, longitud);

		var distanceBetweenPoints = google.maps.geometry
									.spherical.computeDistanceBetween(pointA, pointB);
		if (distanceBetweenPoints <= 500) {
			$("#banner").text('pendiente: '+distanceBetweenPoints+data_time.getFullYear()+'/'+(data_time.getMonth()+1)+'/'+data_time.getDate()+' '+data_time.getHours()+':'+data_time.getMinutes()+':'+data_time.getSeconds());
		}else{
			$("#banner").text('Fuera de rango: '+latArea);
		};
		var citymap = {
		  area_work: {
		    center: {lat: latitud, lng: longitud}
		  }
		};
		divMapa = new google.maps.Map(document.getElementById('mapa'), {
	    center: {lat: latitud, lng: longitud},
	    zoom: 17
	  });
		var marker = new google.maps.Marker({
		    position: {lat: latitud, lng: longitud},
		    map: divMapa,
		    title: 'Hello World!'
		});
		var cityCircle = new google.maps.Circle({
	      strokeColor: '#FF0000',
	      strokeOpacity: 0.8,
	      strokeWeight: 2,
	      fillColor: '#FF0000',
	      fillOpacity: 0.35,
	      map: divMapa,
	      center: {lat: latArea, lng: LonArea},
	      radius: 500
	    });
	}
});
angular.module("vista",['ngRoute'])
.config(['$routeProvider','$locationProvider',function ($routeProvider, $locationProvider) {
	$routeProvider
    .when('/objective',{
		templateUrl: 'partial_views/objective.html'
	})
	.when('/send_to',{
		templateUrl: 'partial_views/send_to.html'
	})
	.when('/steps',{
		templateUrl: 'partial_views/steps.html'
	})
	.when('/agreement',{
		templateUrl: 'partial_views/agreement.html'
	}).when('/contact',{
		templateUrl: 'partial_views/contact.html'
	})
	.when('/home',{
		templateUrl: 'partial_views/home.html'
	}).otherwise({ redirectTo: '/home' })
}]);
