<?php
header('Access-Control-Allow-Origin: *');
include("db_info.php");
include("cors.php");
//add post to database already converted (ready to display on fetch to frontend handeled front end)
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    //same code like all other files
    //-----------------------------------------------
    $params = json_decode(file_get_contents("php://input"));
    $received_arr = $params->creds;
    $json_data = $params->token;
    //---------------------------------------------
    //title
    $title=$received_arr[0];
    //description
    $description=$received_arr[1];
    //image
    $image=$received_arr[2];
    //------------------------------------------------------
    $to_decode = base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $json_data)[1])));
    $token_data = json_decode($to_decode);
    //--------------------------------------------------
    //user id
    $id = $token_data->id;
    //insert post into table
    $query= $mysqli->prepare("INSERT INTO posts(id,image,description,title) VALUES(?,?,?,?);");
    $query->bind_param("isss",$id,$image,$description,$title);
    $query->execute();
    
    //update number of posts by user
    $query2=$mysqli->prepare("UPDATE users SET number_of_posts = number_of_posts + 1 where id=?");
    $query2->bind_param("i",$id);
    $query2->execute();

}
?>