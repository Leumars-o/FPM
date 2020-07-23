<?php
class Database{

    // heroku credentials
    // private $host = "us-cdbr-iron-east-02.cleardb.net";
    // private $db_name = "heroku_2cc9f27b81c94e0";
    // private $username = "b16442e8aa5641";
    // private $password = "96654dd2";
    
    //local host crednetials
    private $host = "localhost";
    private $db_name = "busines9_main";
    private $username = "busines9_main";
    private $password = "iftrueconnect";

   
    // private $host = "localhost";
    // private $db_name = "fpm-bet";
    // private $username = "root";
    // private $password = "";

    public $conn;
    
    

    // get the database connection
    public function getConnection(){

        $this->conn = null;

        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password, array(
        PDO::ATTR_PERSISTENT => true
      ));
      $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
            die();
        }

        return $this->conn;
    }
}
