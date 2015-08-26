 <?php 
session_start();

if(isset($_POST["marcadores"]))
{
    $filename = "marcadores" . getdate()[0] . ".txt";
    
    $_SESSION['file'] = $filename;
    $puntos = $_POST["marcadores"];
    
    $file = fopen($filename, "w");
    
    foreach ($puntos as $valor)
    {
        $lat =  $valor["lat"];
        $lng =  $valor["lng"];
        $nombre =  $valor["nombre"];
        fwrite($file, $lat.">".$lng.">".$nombre . PHP_EOL);

    }

fclose($file);
    
echo "Marcadores guardados con exito";
}
else
    echo "No ingreso marcador/es a guardar";


?>