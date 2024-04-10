<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{

    protected $middleware = [
        \Fruitcake\Cors\CorsService::class,
        \App\Http\Middleware\OwnCors::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
];
}
