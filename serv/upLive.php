<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: content-type");

    // This line caused problem with xamp
    // header(" Access-Control-Allow-Methods: POST, PUT, GET, OPTIONS");
   
    $postdata = file_get_contents("php://input");
    if($postdata){
        file_put_contents('liveData.json', $postdata);
    }
   
    echo file_get_contents('liveData.json');
?>