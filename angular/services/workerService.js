'use strict';

angular.module('vista')
.factory('MyWorker', function($interval, activityService, StorageService, $rootScope) {
    var _worker;
    var date;
    var firebaseRef = firebase.database().ref();
    var MyWorker = function(settings) {
        _init(settings);
    };
    MyWorker.prototype.verificar = function(){
        if (StorageService.get('activity_start') != undefined && StorageService.get('activity_start').state) {
            $interval(function () {
                navigator.geolocation.getCurrentPosition( fn_ok, fn_error);
                function fn_error(){
                  alert('Debe activar el GPS');
                }
                function fn_ok(respuesta){
                    var date1 = new Date();
                    if (new Date(StorageService.get('dateStart')) >= date1) {
                        firebaseRef.child("User_id_" + StorageService.get('currentUser').id).child("Act_id_" + StorageService.get('actividad').id).push().set({Latitud: respuesta.coords.latitude, Longitud: respuesta.coords.longitude, Fecha: date1});
                    } else{
                        StorageService.clean('dateStart');
                        StorageService.clean('activity_start');
                        StorageService.clean('actividad');
                        $interval.cancel();
                    };
                };
            }, 30000);
        };
    };
    MyWorker.prototype.start = function(actividad) {
        navigator.geolocation.getCurrentPosition( fn_ok, fn_error);
        function fn_error(){
          alert('Para poder iniciar la actividad debe activar el GPS');
        }
        function fn_ok(respuesta){
            var date1 = new Date();
            var pointA = new google.maps.LatLng(respuesta.coords.latitude, respuesta.coords.longitude);
            var pointB = new google.maps.LatLng(parseFloat(actividad.latitude), parseFloat(actividad.longitude));
            var distanceBetweenPoints = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB);
            if (distanceBetweenPoints >= parseFloat(actividad.range)) {
                console.log('Se encuentra fuera del area de trabajo');
            } else{
                if (date == undefined) {
                    activityService.iniciarActividad(actividad, "ejecutar", date1).then(
                        function success(response) {
                            StorageService.set('actividad', actividad);
                            StorageService.set('activity_start', {state: true});
                            date = new Date(response.data.finish);
                            StorageService.set('dateStart', date);
                            date1 = new Date();
                            if (date >= date1) {
                                MyWorker.prototype.verificar();
                                alert("La actividad empezó");
                                firebaseRef.child("User_id_" + StorageService.get('currentUser').id).child("Act_id_" + actividad.id).push().set({Latitud: respuesta.coords.latitude, Longitud: respuesta.coords.longitude, Fecha: date1});
                            };
                            console.log(response);
                        }, function error(response) {
                            console.log(response.data.sms);
                        }
                    );
                    firebaseRef.child("User_id_" + StorageService.get('currentUser').id).child("Act_id_" + actividad.id).push().set({Latitud: respuesta.coords.latitude, Longitud: respuesta.coords.longitude, Fecha: date1});
                } else{
                    if (date >= date1) {
                        firebaseRef.child("User_id_" + StorageService.get('currentUser').id).child("Act_id_" + actividad.id).push().set({Latitud: respuesta.coords.latitude, Longitud: respuesta.coords.longitude, Fecha: date1});
                    } else{
                        $interval.cancel();
                    };
                };
            };
        } 
    };
    MyWorker.prototype.destroy = function() {
        _worker.terminate();
    };
    MyWorker.prototype.verificar();
    function _init(settings) {
        if (settings.script)
            _worker = new Worker(settings.script);
        //Need to make this IE (10+) friendly.
        else if (settings.fn) {
            var blobUrl = window.URL.createObjectURL(new Blob(
                ['(', settings.fn.toString(), ')()'],
                { type: 'application/javascript' }
            ));

            _worker = new Worker(blobUrl);
        }
    };

    return MyWorker;
});