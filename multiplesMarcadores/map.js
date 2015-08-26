//Este patrón de diseño JavaScript, que se basa en el expuesto en la publicación de Addy Osmani Namespacing Patterns, 
//declara una variable geolocalizacion que será la que contendrá todo el espacio de variables de la página. 
//Si esa variable ya fue declarada anteriormente ahora la vuelve a referenciar. En otro caso le asigna un objeto vacío

//Asignación inicial a un objeto literal vacío o a si mismo
//si ya fue creado previamente.
var Geolocalizacion = Geolocalizacion || {};
Geolocalizacion.MultMarcadores = Geolocalizacion.MultMarcadores || {};

//Lo asignado a self sera es publico, es decir se puede acceder utilizando geolocalizacion.
//lo definido solo como var sera privado
//Envolvemos el módulo dentro de una función auto-ejecutable
(function (self){
    var marcadores = [
        {
            nombre:"León", 
             lat: 42.603,
             lng: -5.577,
             direccion: "Algo 534543",
             codPostal: "1940"
        },
        {
            nombre:"Salamanca", 
             lat: 40.963,
             lng: -5.669,
             direccion: "Some 534543",
             codPostal: "1942"
        },
        {
            nombre:"Zamora", 
            lat: 41.503,
            lng: -5.744,
            direccion: "Calle 534543",
            codPostal: "1944"
        },
        {
            nombre:"Algo", 
            lat: 42.000,
            lng: -6.000,
            direccion: "Low 534543",
            codPostal: "1945"
        }
    ];
    
    var map; 
    
    var initialize = function initialize() {


       var mapOptions = {
          center: new google.maps.LatLng(-35.503, -58.744),
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP
       };

       map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

       // Nueva infowindow, el tooltip que aparece al hacer click
       infoWindow = new google.maps.InfoWindow();

       // Evento que cierra infowindow con un click en el mapa
       google.maps.event.addListener(map, 'click', function() {
          infoWindow.close();
       });

       // Se llama para comenzar con la creacion de los marcadores
       //Geolocalizacion.displayMarkers(map, marcadores, infoWindow);
    }
    
    google.maps.event.addDomListener(window, 'load', initialize);

    
     self.cargar = function cargar(){
        
        $("#divError").hide();
        var files = $("#archivo").get(0).files; // $("#archivo") slector por id de jquery  
       
        var envio = new FormData();
        for (var i = 0; i < files.length; i++) {
            envio.append("fichero", files[i]);
        }
        
        var promise = $.ajax
                        ({
                        type: "POST",
                        url: "nexoAjax.php",
                        data: envio,
                        cache: false,
                        dataType: "json",
                        contentType: false,
            		    processData: false
                      });// fin del ajax

        promise.done(function (dato){
            if (dato["message"] == "ok")
                Geolocalizacion.displayMarkers(map, dato["puntos"], infoWindow);
            else
            {
                 $("#divError").html(dato["message"]);
                 $("#divError").show();
            }
        });
    }
    
})(Geolocalizacion.MultMarcadores);
//De este closure solo sera visible Geolocalizacion.MultMarcadores.cargar