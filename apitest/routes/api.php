<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OrderingController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TransactionsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);

    Route::apiResource('/users', UserController::class);
    Route::apiResource('/employees', EmployeeController::class);
    Route::apiResource('/attendance', AttendanceController::class);
    Route::apiResource('/brands',BrandController::class);
    Route::apiResource('/categories', CategoryController::class);
    Route::apiResource('/customers', CustomersController::class);
    Route::apiResource('/ordering', OrderingController::class);
    Route::apiResource('/products',ProductController::class);
    Route::apiResource('/reports',ReportsController::class);
    Route::apiResource('/salary',SalaryController::class);
    Route::apiResource('/settings',SettingsController::class);
    Route::apiResource('/stock',StockController::class);
    Route::apiResource('/suppliers', SupplierController::class);
    Route::apiResource('/transactions', TransactionsController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
