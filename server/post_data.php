<?php
header('Access-Control-Allow-Origin: *');
include("db_info.php");
include("cors.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $params = json_decode(file_get_contents("php://input"));
    $username = $params->username;
    $password = $params->password;
    $email = $params->email;
    $hashes_pass=password_hash($password,PASSWORD_BCRYPT,array('cost'=>10));
    $query= $mysqli->prepare("INSERT INTO credentials(username,password,email) VALUES (?,?,?)");
    $query->bind_param("sss", $username, $hashes_pass, $email);
    $query->execute();
    $query2=$mysqli->prepare('SELECT id FROM credentials WHERE username = ?');
    $query2->bind_param('s', $username);
    $query2->execute();
    $result = $query2->get_result();
    while ($row= $result->fetch_assoc()) {
        $row;
        $id=$row['id'];
    }
    
    $query3 = $mysqli->prepare('INSERT INTO users(id,number_of_posts,profile_notes,likes_received,liked_posts) VALUES(?,?,?,?,?)');
    $var="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure voluptates suscipit fugiat, laborum illum nostrum molestiae quas sunt. Dignissimos cum facere maxime reiciendis iure porro non autem ad quia dolorum.";
    $nnn=0;
    $nnnn=0;
    $nnnnn=0;
    $query3->bind_param('iisii',$id,$nnn,$var,$nnnn,$nnnnn);
    $query3->execute();
    echo json_encode(array('sucess'=>true));
}
?>