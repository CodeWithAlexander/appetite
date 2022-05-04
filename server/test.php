<?php
    include("db_info.php");
    include("cors.php");
    require __DIR__ . '/vendor/autoload.php';
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $auth_headers = getallheaders();
        if(isset(($auth_headers['Authorization']))) {
            $jwt_token = $auth_headers['Authorization'];
            $json_data = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $jwt_token)[1])));
            $token_data = json_decode($json_data);
            $id = $token_data->id;
            echo json_encode(array('token' => $jwt_token));
        }
    }
?>
