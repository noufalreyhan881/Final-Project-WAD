<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/books', [App\Http\Controllers\BookController::class, 'index']);
Route::post('/books', [App\Http\Controllers\BookController::class, 'store']);
Route::get('/books/{id}', [App\Http\Controllers\BookController::class, 'show']);
Route::put('/books/{id}', [App\Http\Controllers\BookController::class, 'update']);
Route::delete('/books/{id}', [App\Http\Controllers\BookController::class, 'destroy']);

Route::get('/categories', [App\Http\Controllers\CategoryController::class, 'index']);
Route::post('/categories', [App\Http\Controllers\CategoryController::class, 'store']);
Route::get('/categories/{id}', [App\Http\Controllers\CategoryController::class, 'show']);
Route::put('/categories/{id}', [App\Http\Controllers\CategoryController::class, 'update']);
Route::delete('/categories/{id}', [App\Http\Controllers\CategoryController::class, 'destroy']);
