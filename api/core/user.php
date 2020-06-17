<?php

require 'Base.php';

class User extends Base {

  // database connection and table name
  public $conn,$table_name = "users", $null  = null,$deleted_status = 2,$active_status = 1,$not_active = 0,$_result = null;
  private $_fetchStyle = PDO::FETCH_CLASS;

  // constructor with $db as database connection
  public function __construct($db){

    $this->conn = $db;
  
    }


  // create courier
  function register(){

    // query to insert record
    $query = "INSERT INTO
                " . $this->table_name . "
            SET
            user_id=:user_id,firstname=:firstname,lastname=:lastname,email=:email,
            created_at=:created_at,password=:password,username=:username,fullname=:fullname,account_number=:account_number
             ";
    // prepare query
    $stmt = $this->conn->prepare($query);
    $user_id = time().uniqid();
    // sanitize
    $this->firstname = htmlspecialchars(strip_tags($this->firstname));
    $this->lastname = htmlspecialchars(strip_tags($this->lastname));
    $this->email = htmlspecialchars(strip_tags(trim($this->email)));
    $this->username = htmlspecialchars(strip_tags(trim($this->username)));
    $this->created_at = date('Y-m-d H:i:s');
    $this->password = password_hash(htmlspecialchars(strip_tags(trim($this->password))),PASSWORD_BCRYPT);
    
    $this->user_id = rand(3,34).time();
    $this->account_number = (rand(0,11).time());
    // bind values
     $stmt->bindParam(":firstname", $this->firstname);
     $stmt->bindParam(":lastname", $this->lastname);
     $stmt->bindParam(":email", $this->email);
     $stmt->bindParam(":username",$this->username);
     $stmt->bindParam(":account_number",$this->account_number);
     $stmt->bindParam(":fullname", $this->fullname);
   $stmt->bindParam(":created_at", $this->created_at);
    $stmt->bindParam(":user_id",$user_id);
   $stmt->bindParam(":password",$this->password);

    // execute query
    if ($stmt->execute()) {

      return true;
    }

    return false;
  }

    /**
   * Perform raw query
   */
  public function query($sql, $params = [],$class = false,$fetch = true) {
    $this->_error = false;
    if($this->_query = $this->conn->prepare($sql)) {
      $x = 1;
      if(count($params)) {
        foreach($params as $param) {
          $this->_query->bindValue($x, $param);
          $x++;
        }
      }
      if($this->_query->execute()) {

        if($fetch){
          if($class && $this->_fetchStyle === PDO::FETCH_CLASS){
            $this->_result = $this->_query->fetchAll($this->_fetchStyle,$class);
          } else {
            $this->_result = $this->_query->fetchAll($this->_fetchStyle);
          }
          
        $this->_count = $this->_query->rowCount();
        $this->_lastInsertID = $this->conn->lastInsertId();
          }
        
      } else {
        $this->_error = true;
      }
    }
    return $this;
  }


    
}
