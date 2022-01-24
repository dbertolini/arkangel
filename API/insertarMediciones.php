<?php
	header('Access-Control-Allow-Origin: *');
	header("Content-type: application/json");

	include("config.php");

  if(isset($_GET["paramSis"])
    && $_GET["paramSis"]=="arkangel") {

		$enlace = mysqli_connect($dbServer, $dbUser, $dbPass, $dbName, $dbPort);
		if (!$enlace)
			exit;

		// $consulta = "INSERT INTO mediciones (temperatura_ambiente,
    //                                     humedad_ambiente,
    //                                     movimiento,
    //                                     proximidad,
    //                                     vibracion)
    //             VALUES ('".$_GET["temperatura_ambiente"]."',
    //                     '".$_GET["humedad_ambiente"]."',
    //                     '".$_GET["movimiento"]."',
    //                     '".$_GET["proximidad"]."',
    //                     '".$_GET["vibracion"]."');";

    $consulta = "UPDATE mediciones
                SET temperatura_ambiente = '".$_GET["temperatura_ambiente"]."',
                humedad_ambiente = '".$_GET["humedad_ambiente"]."',
                movimiento = '".$_GET["movimiento"]."',
                proximidad = '".$_GET["proximidad"]."',
                vibracion = '".$_GET["vibracion"]."'
                WHERE id_medicion = 1;";


		if($result = mysqli_query($enlace, $consulta))
		{
			echo json_encode(array('retorno' => 'OK'));
		}
		else
		{
			echo json_encode(array('retorno' => 'ERROR'));
		}

		mysqli_close($enlace);
	}
?>
