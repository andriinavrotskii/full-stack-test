<?php

include 'config.php';

define("ROOT", __DIR__);

function __autoload($class)
{
    $class = ucfirst($class);

    if (file_exists(ROOT . "/Core/" . $class . ".php")) {
        require_once ROOT . "/Core/" . $class . ".php";
    }
    else if (file_exists(ROOT . "/Controllers/" . $class . ".php")) {
        require_once ROOT . "/Controllers/" . $class . ".php";
    }
    else if (file_exists(ROOT . "/Models/" . $class . ".php")) {
        require_once ROOT . "/Models/" . $class . ".php";
    }
    else {
        echo "$class 404";
        exit;
    }
}       


try {
    $router = new Router();
    $router->run();    
} catch (Exception $e) {
    echo "<h1>404</h1>";
    echo "<h2>Exception</h2> $e";
}