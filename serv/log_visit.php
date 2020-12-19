 <?php
 $server="localhost";
    $user="dch";
    $pwd="kitkat";
    $db="dchlive";
    $conn = new mysqli($server,$user,$pwd,$db);
    if($conn->connect_error){
        die('Connection Error');
    }
    $qry = json_decode(file_get_contents('php://input'), true);
    $data=$qry['data'];
    $uid=$data['uid'];
    $uname=$data['uname'];
    $uts=$data['uts'];

    $sql="INSERT INTO visits (uid, uname, uts) VALUES('$uid', '$uname', '$uts')";
    if($conn->query($sql)===TRUE){
        echo mysqli_insert_id($conn);
    }
    else{
        echo $conn->error;
    }

?>