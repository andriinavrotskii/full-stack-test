<?php 

class Model 
{
    protected $db;

    public function __construct()
    {
        try {
            $this->db = new PDO('mysql:host=' . DBHOST . ';dbname=' . DBNAME . ';charset=utf8', DBUSER, DBPASS);
            $this->db->exec("set names utf8");
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);            
        } catch (Exception $e) {
            echo "DB connect error";
            exit;
        }

    }
}