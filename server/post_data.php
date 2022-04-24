<?php
header('Access-Control-Allow-Origin: *');
//include database info+connection
include("db_info.php");
include("cors.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $params = json_decode(file_get_contents("php://input"));
    $username = $params->username;
    $password = $params->password;
    $email = $params->email;
    $hashes_pass=password_hash($password,PASSWORD_BCRYPT,array('cost'=>10));
    $query= $mysqli->prepare("INSERT INTO credentials(username,password,email) VALUES (?,?,?)");
    $query->bind_param("sss", $username, $hashes_pass, $email);
    $query->execute();
    echo json_encode(array('sucess'=>true));
}
?>