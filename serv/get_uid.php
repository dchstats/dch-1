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
    $device=$data['device'];
    $os=$data['os'];
    $browser=$data['browser'];
    $screen=$data['screen'];
    $sql="INSERT INTO devices (device, os, browser, screen ) VALUES('$device', '$os', '$browser','$screen')";
    if($conn->query($sql)===TRUE){
        $sql= "SELECT * FROM devices ORDER BY id DESC LIMIT 0,1";
        $rows=array();
        $res=$conn->query($sql);
        $id = mysqli_fetch_assoc($res)['id'];
        
        echo "#";
        echo $id;
        echo "#";
    }
    else{
        echo $conn->error;
    }
?>