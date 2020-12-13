<?php
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');

    // The problem of CORS came due to content-type:application/json. This can be solved with Access-control-allow-headers.
    // Found about Access-Control-Allow-Header here
    // https://stackoverflow.com/questions/38998684/cant-send-a-post-request-when-the-content-type-is-set-to-application-json
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers

    header("Access-Control-Allow-Headers: content-type");

    echo file_get_contents('liveData.json');
?>