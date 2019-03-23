<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dch";


// print_r($_POST);
$postdata = file_get_contents("php://input");
// echo $postdata;
$req=json_decode($postdata);
$shift=$req->shift;
$data=$req->t;

// $t=$_POST['load'];
// echo $t;
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO shiftend (shift, data)
VALUES ('$shift', '$data')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>