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
        //insert id and post id into liked table
        $query= $mysqli->prepare("INSERT INTO likes(id,post_id) VALUES(?,?);");
        $query->bind_param("ii",$id,$post_id);
        $query->execute();
        //update number of likes
        $query2=$mysqli->prepare("UPDATE users SET liked_posts = liked_posts + 1 where id=?");
        $query2->bind_param("i",$id);
        $query2->execute();

        //get user
        $query3=$mysqli->prepare("select user_id from posts where post_id=?");
        $query3->bind_param("i",$post_id);
        $query3->execute();
    
        $result = $query3->get_result();
        $row= $result->fetch_assoc();
        $query4=$mysqli->prepare("UPDATE users SET likes_received = likes_received + 1 where id=?");
        $query4->bind_param("i",$row);
        $query4->execute();
        echo json_encode($row);
        //update other user's likes received
        echo json_encode(array('sucess'=>$post_id));
     } else {  
        die();
      }
}
?>