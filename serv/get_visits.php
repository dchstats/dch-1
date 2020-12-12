 <?php
    // $server="localhost";
    // $user="root";
    // $pwd="";
    // $db="dchlive";
    // $conn = new mysqli($server,$user,$pwd,$db);
    // if($conn->connect_error){
    //     die('Connection Error');
    // }
    // $qry = json_decode(file_get_contents('php://input'), true);
    // $data=$qry['data'];
    // $inp = file_get_contents('logs.json');
    // $tempArray = json_decode($inp);
    // array_push($tempArray, $data);
    // $jsonData = json_encode($tempArray);
    // file_put_contents('logs.json', $jsonData);
    echo file_get_contents('logs.json');
?>