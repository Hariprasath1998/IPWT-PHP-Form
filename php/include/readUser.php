<?php
$myFile = "../../data/Users.json";
$jsondata = file_get_contents($myFile);
echo $jsondata;
?>