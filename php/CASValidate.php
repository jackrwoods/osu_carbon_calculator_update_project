<?php
$ticket = $_GET["ticket"];
$app_url = "http://carbon.campusops.oregonstate.edu/";
$response = file_get_contents("http://52.39.141.177:3478/auth/login");
print($response);
?>
