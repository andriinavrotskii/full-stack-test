<?php 

class Router {

    private $routes;

    public function __construct()
    {
        $this->routes = $this->parse();
    }


    public function run()
    {

        $controller = new Controller();

        if (isset($this->routes[0])) {
            $action = $this->routes[0];

            if (method_exists($controller, $action)) {
                $controller->$action();
            } else {
                echo "<p>method 404</p>";
            }
            
        } else if (method_exists($controller, 'index')) {
            $controller->index();
        } else {
            echo "<p>method 404</p>";
        }

    }


    private function parse() 
    {
        $path = str_replace('index.php', '', $_SERVER['SCRIPT_NAME']);
        $request = $_SERVER['REQUEST_URI'];

        if(strpos($request, $path) === 0) {
            $request = substr($request, strlen($path));
        }
        $routes = explode('/', $request);
        $routes = array_filter($routes, function($element) {
            return !empty($element);
        });
        return $routes;
    }
}