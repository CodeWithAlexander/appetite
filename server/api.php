<?php
    include("db_info.php");
    include("cors.php");
    //source https://www.youtube.com/watch?v=OSlLqDpPeVc
    require __DIR__ . '/vendor/autoload.php';
    use Firebase\JWT\JWT;
    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $params = json_decode(file_get_contents("php://input"));
        //variable assignment
        //-------------------
        $username = $params->username;
        $password =$params->password;
        //----------------------
        $query;
            $query = $mysqli->prepare('SELECT * FROM credentials WHERE username = ?');
        
        $query->bind_param('s', $username);

        try {
            //try to find user
            $query->execute();
            $result = $query->get_result();

            if (mysqli_num_rows($result) == 0) {
                //not found
                http_response_code(404);
            } else {
                //user was found
                $user = $result->fetch_assoc();
                //validate password
                if (password_verify($password, $user['password'])) {
                    $secret_key = "key";
                    $payload = array(
                        'id' => $user['id']
                    );
                    $jwt_token = JWT::encode($payload, $secret_key, 'HS256');
                    http_response_code(200);
                    $response = array('token' => $jwt_token);
                    echo json_encode($response);
                } else {
                    http_response_code(401);
                }
            }
        } catch (mysqli_sql_exception $e) {
            http_response_code(500);
        }
    } else {
        http_response_code(404);
    }
?>