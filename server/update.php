<?php
header('Access-Control-Allow-Origin: *');
include("db_info.php");
include("cors.php");
//UPDATE NOTES ON PROFILE
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    //SAME CODE EVERYWHERE (DECODE AND STORE ID)
    //-----------------------------------------------------------------------------//
    $params = json_decode(file_get_contents("php://input"));
    $profile_notes = $params->creds;
    $json_data = $params->token;
    $to_decode = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $json_data)[1])));
    $token_data = json_decode($to_decode);
    $id = $token_data->id;
    //-----------------------------------------------------------------------------//

    //SET NEW PROFILE NOTES
    $query= $mysqli->prepare("UPDATE users SET profile_notes = ? WHERE id = ?;");
    $query->bind_param("si", $profile_notes, $id);
    $query->execute();
    //NO RETURN REQUIRED BECAUSE IT IS ALREADY UPDATED CLIENT SIDE AND ON REVISIT OTHER API WILL BE CALLED
    // echo json_encode(array('sucess'=>true));
}
?>