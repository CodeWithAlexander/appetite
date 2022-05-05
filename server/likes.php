<?php
header('Access-Control-Allow-Origin: *');
include("db_info.php");
include("cors.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $params = json_decode(file_get_contents("php://input"));
    $post_id = $params->creds;
    $json_data = $params->token;
    $to_decode = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $json_data)[1])));
    $token_data = json_decode($to_decode);
    $id = $token_data->id;
    $check=$mysqli->prepare("select * from likes where id=? and post_id=?");
    $check->bind_param("ii",$id,$post_id);
    $check->execute();
    $row = $check->fetch();
    echo $row;
    if(!$row) {
        $query= $mysqli->prepare("INSERT INTO likes(id,post_id) VALUES(?,?);");
        $query->bind_param("ii",$id,$post_id);
        $query->execute();
        $query2=$mysqli->prepare("UPDATE users SET liked_posts = liked_posts + 1 where id=?");
        $query2->bind_param("i",$id);
        $query2->execute();
        echo json_encode(array('sucess'=>$post_id));
     } else {  
        die();
      }
}
?>