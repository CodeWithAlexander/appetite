<?php
    include("db_info.php");
    include("cors.php");
    require __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;
    // if ($_SERVER['REQUEST_METHOD'] == "GET") {

        //get all posts that the user liked to display

        //same code
        //---------------------------------------------------------------
        $auth_headers = getallheaders();
        if(isset(($auth_headers['Authorization']))) {
            $jwt_token = $auth_headers['Authorization'];
            $json_data = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $jwt_token)[1])));
            $token_data = json_decode($json_data);
            $id = $token_data->id;
        //--------------------------------------------------------------

        //get the posts that the user liked 
            $query=$mysqli->prepare('SELECT post_id FROM likes WHERE id = ?');
            $query->bind_param('i', $id);
            $query->execute();
            $result = $query->get_result();
            $response=[];
            $fixedresponse=[];
        try {
            $query->execute();
            $result = $query->get_result();
            while ($row= $result->fetch_assoc()) {
                $response[]=$row['post_id'];
            }

            //get all details of the posts the user liked
            //implode is used to turn the format into (1,2,3,4)
            $query2 = $mysqli->prepare( 'SELECT * FROM `posts` WHERE `post_id` IN (' . implode(',', array_map('intval', $response)) . ')');
            $response2=[];
            $query2->execute();
            $result2 = $query2->get_result();
            while ($row= $result2->fetch_assoc()) {
                $response2[]=$row;
            }
            $json_response=json_encode($response2);
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