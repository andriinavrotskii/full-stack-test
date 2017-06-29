<?php

class Controller {
    
    private $articlesModel;

    public function __construct()
    {
        $this->articlesModel = new ArticlesModel();
    }

    private function returnJson(array $data)
    {
        echo json_encode($data);
    }


    public function articles() 
    {
        $data = $this->articlesModel->getArticles();
        $this->returnJson($data);

    }
 

}