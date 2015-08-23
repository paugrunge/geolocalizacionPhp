 <?php 

if(isset($_POST["marcadores"]))
{
$puntos = $_POST["marcadores"];

$file = fopen("marcadores.txt", "w");

foreach ($puntos as $valor)
{
    $lat =  $valor["lat"];
    $lng =  $valor["lng"];
    $nombre =  $valor["nombre"];
    //$lat = $valor
    fwrite($file, $lat.">".$lng.">".$nombre . PHP_EOL);
}

fclose($file);
    
echo "Marcadores guardados con exito";
}
else
    echo "No ingreso marcador/es a guardar";


?>