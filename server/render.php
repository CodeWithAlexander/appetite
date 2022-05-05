<?php
    include("db_info.php");
    include("cors.php");
    require __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;
    // if ($_SERVER['REQUEST_METHOD'] == "GET") {
        $auth_headers = getallheaders();
        if(isset(($auth_headers['Authorization']))) {
            $jwt_token = $auth_headers['Authorization'];
            $json_data = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $jwt_token)[1])));
            $token_data = json_decode($json_data);
            $id = $token_data->id;
            $query;
            $query = $mysqli->prepare('SELECT * FROM posts');
            $response=[];
        try {
            $query->execute();
            $result = $query->get_result();
            while ($row= $result->fetch_assoc()) {
                $response[]=$row;
            }
            $json_response=json_encode($response);
            echo $json_response;
        } 
    catch (mysqli_sql_exception $e) {
        http_response_code(500);
    }
  
} 
// }else {
//     http_response_code(404);
// }
    
?>