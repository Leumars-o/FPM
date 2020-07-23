<?php
session_start();

 // required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('HEY NIGGA!! SEND THE RIGHT REQUEST TYPE');
}

// include database and object file
include_once '../../config/db.php';
include_once '../../core/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare user object
$user = new User($db);


$username = isset($_REQUEST['username']) ? $_REQUEST['username'] : null;
$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : null;

if($username === null || $password === null){
   
        echo $user->forbidden('username or password was left empty');
        return;
}

/**
 * More security measures should be implemented for now skipping it
 */

 try {
   
   $user->query("SELECT *
     FROM users WHERE username = ?",[$username]);

    if($user->_result){
        $pass = $user->_result[0]->password;
     $valid =   password_verify($password,$pass) ? 1 : 0;
     if($valid){
        $user->_result[0]->password= null;
        session_regenerate_id(true);

        $_SESSION['user_id'] = $user->_result[0]->user_id;
        $_SESSION['user_authenticated'] =  true;
        $_SESSION['username'] = $user->_result[0]->username;

    echo  $user->actionSuccess(['data' => $user->_result]);
    return;
     }else{
    echo  $user->actionFailure('username and password does not match');
        return;
     }
    } else {
        
    echo  $user->actionFailure('Account does not exist');
    return;
    }

 } catch (\Throwable $th) {
        echo $user->actionFailure('Opps! Something went wrong, error code xm112c3'. $th->getMessage()); 
        die;
    }

