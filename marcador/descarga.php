<?php
  session_start();
  $file =  $_SESSION['file'];
  if (file_exists ($file))
  {
        $basefichero = basename($file);
        
        header("Content-Type: application/octet-stream");
        header("Content-Length: ".filesize($file));
        header("Content-Disposition: attachment; filename=".$basefichero."");
        readfile($file);
  }
  else
    echo "No hay archivo para descargar, debe guardar primero.";
   
?>