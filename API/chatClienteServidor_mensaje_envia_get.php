<?php
	header('Access-Control-Allow-Origin: *');
	header("Content-type: application/json");
	
	include("config.php");	
							
	if(isset($_GET["paramNickname"]) 
    && isset($_GET["paramMensaje"])
    && isset($_GET["paramSis"])
&& $_GET["paramSis"]=="dab")
	{	
		$enlace = mysqli_connect($dbServer, $dbUser, $dbPass, $dbName, $dbPort);
		if (!$enlace)
			exit;
		
		$consulta = "INSERT INTO mensaje (mensaje, nickname) VALUES ('".$_GET["paramMensaje"]."','".$_GET["paramNickname"]."');";		


        
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