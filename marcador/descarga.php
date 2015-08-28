<?php
require_once '../clases/Marcador.php';

  session_start();
  if (isset($_SESSION['file']))
  {
    $file =  $_SESSION['file'];
    if (file_exists ($file))
    {
         Marcador::descargarTxt($file);
    }
    else
      echo "No hay archivo para descargar, debe guardar primero.";
  }
  else
      echo "No hay archivo para descargar, debe guardar primero.";
?>