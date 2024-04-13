<?php

use App\Http\Controllers\Api\AuthController;
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
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::apiResource('api/employee', EmployeeController::class);
Route::resource('/attendance', AttendanceController::class);
Route::resource('/brand',BrandController::class);
Route::resource('/category', CategoryController::class);
Route::resource('/customer', CustomersController::class);
Route::resource('/ordering', OrderingController::class);
Route::resource('/product',ProductController::class);
Route::apiResource('api/reports',ReportsController::class);
Route::resource('/salary',SalaryController::class);
Route::resource('/settings',SettingsController::class);
Route::resource('/stock',StockController::class);
Route::resource('/supplier', SupplierController::class);
Route::resource('/transactions', TransactionsController::class);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
