<?php
    header("Access-Control-Allow-Origin:*");
    $postdata = file_get_contents("php://input");
    file_put_contents('liveData.json', $postdata);
    echo file_get_contents('liveData.txt');
?>