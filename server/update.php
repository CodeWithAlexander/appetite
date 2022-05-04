<?php
header('Access-Control-Allow-Origin: *');
include("db_info.php");
include("cors.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $params = json_decode(file_get_contents("php://input"));
    $profile_notes = $params->creds;
    $json_data = $params->token;
    $to_decode = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $json_data)[1])));
    $token_data = json_decode($to_decode);
    $id = $token_data->id;
    $query= $mysqli->prepare("UPDATE users SET profile_notes = ? WHERE id = ?;");
    $query->bind_param("si", $profile_notes, $id);
    $query->execute();
    // echo json_encode(array('sucess'=>true));
}
?>