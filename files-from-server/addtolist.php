<?php

$configs = include('config.php');
$servername = $configs["servername"];
$adminname = $configs["adminname"];
$serverpassword = $configs["serverpassword"];
$databasename = $configs["databasename"];

$_POST = json_decode(file_get_contents('php://input'), true);

$email = $_POST['email'];

/*
$string = file_get_contents("/home/michael/test.json");
$json_a = json_decode($string, true);
*/
// database insert
try {

    $conn = new PDO("mysql:host=$servername;dbname=$databasename", $adminname, $serverpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $statement = $conn->prepare("INSERT INTO email_list(email)
        VALUES(:email)");
    $statement->execute(array(
        "email" => $email
    ));

    // echo a message to say the UPDATE succeeded
    //echo $statement->rowCount() . " records UPDATED successfully";
}
catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
}

$conn = null;

echo 'success';
?> 