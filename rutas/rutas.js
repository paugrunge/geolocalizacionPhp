// esta variable hara de namespace
var Geolocalizacion = Geolocalizacion || {};
Geolocalizacion.Rutas = Geolocalizacion.Rutas || {};

//Lo asignado a self sera es publico, es decir se puede acceder utilizando Geolocalizacion.Rutas
//lo definido solo como var sera privado

//Envolvemos el módulo dentro de una función auto-ejecutable
(function (self, $){
    
    var map; 
    var directionsDisplay = null;
    var directionsService = null;

    self.mostrarGoogleMaps = function() {
         
        // Nueva infowindow, el tooltip que aparece al hacer click
        // infoWindow = new google.maps.InfoWindow();
         
        var punto = new google.maps.LatLng(-34.603657,-58.381794);
       
        //Configuramos las opciones indicando Zoom, punto(el que hemos creado) y tipo de mapa
        var myOptions = {
        zoom: 14, 
        center: punto, 
        mapTypeId: google.maps.MapTypeId.ROADMAP //G_MAP_TYPE o ROADMAP
        };

        map = new google.maps.Map(document.getElementById("mostrarMapa"), myOptions);
        directionsDisplay = new google.maps.DirectionsRenderer();
		directionsService = new google.maps.DirectionsService();

      };
      
      self.buscar = function(){
          Geolocalizacion.hacerRuta(map, directionsService, directionsDisplay, $('#origen').val(), $('#destino').val(), $('#modoViaje').val(), $("#panelRuta").get(0));
      };

    
})(Geolocalizacion.Rutas, jQuery);





