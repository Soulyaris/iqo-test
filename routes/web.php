<?php

use App\Http\Controllers\Calculator;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/calculator');
});

Route::get('/calculator', function () {
    return view('calculator');
});

Route::post('/calculator/execute', 'Calculator@calc');
