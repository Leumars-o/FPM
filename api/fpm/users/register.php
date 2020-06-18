<?php
session_start();

/**
 * Here we want to register a new user
 */

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

// prepare job object
$user = new User($db);

// get user_i

$firstname = isset($_REQUEST['firstname']) ? $_REQUEST['firstname'] : null;
$lastname = isset($_REQUEST['lastname']) ? $_REQUEST['lastname'] : null;
$username = isset($_REQUEST['username']) ? $_REQUEST['username'] : null;
$fullname = isset($_REQUEST['fullname']) ? $_REQUEST['fullname'] : null;
$email = isset($_REQUEST['email']) ? $_REQUEST['email'] : null;
$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : null;


if($firstname === null || $firstname === null || $lastname ===   null || $password === null){
        http_response_code(403);
        // echo $_REQUEST['firstname'];
        echo $user->forbidden('You cannot go any furthe,details are incomplete');
        return;
}

$user->firstname =  $firstname;
$user->lastname = $lastname;
$user->email = $email;
$user->password = $password;
$user->username = $username;
$user->fullname = $firstname.' '.$lastname;
$user->query("SELECT email FROM $user->table_name WHERE email =? ",[$email]);

if($user->_result){
    
    echo $user->actionFailure('Email already in use');
    return;
}

 try {

     $user->register();
     http_response_code(201);
     $_SESSION['user_authenticated'] = true;
     $_SESSION['username'] = $user->username;
     $_SESSION['user_id'] = $user->user_id;
     $_SESSION['firstname'] = $user->firstname;
     $_SESSION['lastname'] = $user->lastname;
     $_SESSION['acount_number'] = $user->account_number;


     echo $user->actionSuccess('Account created successfully');
     return;

 } catch (\Throwable $th) {
    http_response_code(505);

        echo $user->actionFailure('Opps! Something went wrong, error code xm112c3 '. $th->getMessage()); 
        die;
}

