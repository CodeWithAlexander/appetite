<?php
    include("db_info.php");
    include("cors.php");
    require __DIR__ . '/vendor/autoload.php';
        //GET USERNAME AND DISPLAY IT ON PROFILE PAGE
        $auth_headers = getallheaders();
        if(isset(($auth_headers['Authorization']))) {
            $jwt_token = $auth_headers['Authorization'];
            //DECODE JSON OBJ (TOKEN)
            $json_data = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $jwt_token)[1])));
            $token_data = json_decode($json_data);
            //SET ID
            $id = $token_data->id;
            $query;
            //GET USERNAME FROM CREDENTIALS
            $query = $mysqli->prepare('SELECT username FROM credentials WHERE id = ?');
    
        $query->bind_param('i', $id);

        try {
            //TRY EXECUTE
            $query->execute();
            $result = $query->get_result();
            while ($row= $result->fetch_assoc()) {
                //RETURN ROW BECAUSE ONLY ONE OBJECT
                echo json_encode($row);
            }
        } 
        //CATCH ERROR
    catch (mysqli_sql_exception $e) {
        http_response_code(500);
    }
  
} 

    
?>