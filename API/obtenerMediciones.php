<?php

	header('Access-Control-Allow-Origin: *');
	header("Content-type: application/json");

  include("config.php");

  if(isset($_GET["paramSis"])
    && $_GET["paramSis"]=="arkangel") {

    $enlace = mysqli_connect($dbServer, $dbUser, $dbPass, $dbName, $dbPort);
    if (!$enlace)
      exit;

    $consulta = "SELECT id_medicion,
                        temperatura_ambiente,
                        humedad_ambiente,
                        movimiento,
                        proximidad,
                        vibracion,
                        fecha
                FROM mediciones
                WHERE id_medicion = (SELECT MAX(id_medicion) FROM mediciones);";

    $result = mysqli_query($enlace, $consulta);

    while($row = mysqli_fetch_array($result))
    {
      $id_medicion=$row['id_medicion'];
      $temperatura_ambiente=$row['temperatura_ambiente'];
      $humedad_ambiente=$row['humedad_ambiente'];
      $movimiento=$row['movimiento'];
      $proximidad=$row['proximidad'];
      $vibracion=$row['vibracion'];
      $fecha=$row['fecha'];

      $arrMensaje[] = array('id_medicion'=> $id_medicion,
                'temperatura_ambiente'=> $temperatura_ambiente,
                'humedad_ambiente'=> $humedad_ambiente,
                'movimiento'=> $movimiento,
                'proximidad'=> $proximidad,
                'vibracion'=> $vibracion,
                'fecha'=> $fecha);
    }

    mysqli_close($enlace);
    if(!(isset($arrMensaje)) || is_null($arrMensaje))
    {
      echo json_encode(array('retorno' => 'NULL'));
    }
    else
    {
      $json_string = json_encode($arrMensaje);
      echo $json_string;
    }

  }

?>
