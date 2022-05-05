<?php
header('Access-Control-Allow-Origin: *');
include("db_info.php");
include("cors.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $params = json_decode(file_get_contents("php://input"));
    $received_arr = $params->creds;
    $json_data = $params->token;
    $title=$received_arr[0];
    $description=$received_arr[1];
    $image=$received_arr[2];
    $to_decode = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $json_data)[1])));
    $token_data = json_decode($to_decode);
    $id = $token_data->id;
    $query= $mysqli->prepare("INSERT INTO posts(id,image,description,title) VALUES(?,?,?,?);");
    $query->bind_param("isss",$id,$image,$description,$title);
    $query->execute();
    echo json_encode($id);
}
?>