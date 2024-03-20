<?php

use App\Http\Controllers\API\ActivityLogsController;
use App\Http\Controllers\API\BookingController;
use App\Http\Controllers\API\BranchController;
use App\Http\Controllers\API\BusinessController;
use App\Http\Controllers\API\FetchAllController;
use App\Http\Controllers\API\ProductTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CityController;


Route::post('Login',[AuthController::class, 'Login']);

// Fetch City
Route::get('Cities',[CityController::class, 'Cities']);

// Branch Data
Route::get('BranchName',[BranchController::class, 'BranchName']);
Route::post('AddBranch',[BranchController::class, 'AddBranch']);
Route::put('UpdateBranch',[BranchController::class, 'UpdateBranch']);
Route::delete('RemoveBranch/{id}',[BranchController::class, 'RemoveBranch']);


// Fetch for Register Busienss
Route::get('FetchAll',[FetchAllController::class, 'FetchAll']);
Route::get('BookFetchData',[FetchAllController::class,'BookFetchData']);

// Logs
Route::get('Logs/{id}',[ActivityLogsController::class, 'Logs']);

Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function () {

    Route::get('/checking',function() {
        return response()->json([
            "status"        =>      200,
            "role"          =>      auth()->user()->role,
        ],200);
    });

    // Product Type
    Route::post('AddProduct',[ProductTypeController::class, 'AddProduct']);
    Route::get('ProductType',[ProductTypeController::class, 'ProductType']);
    Route::put('ProductUpdate',[ProductTypeController::class, 'ProductUpdate']);
    Route::put('Deactivate',[ProductTypeController::class, 'Deactivate']);


    // Bookinf form
    Route::post('RegisterBook',[BookingController::class, 'RegisterBook']);
    Route::get('BookingList',[BookingController::class,'BookingList']);

    // Register Business
    Route::post('RegisterBusiness',[BusinessController::class,'RegisterBusiness']);
    Route::get('BusinessAccount',[BusinessController::class, 'BusinessAccount']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
