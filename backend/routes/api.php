<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\SkillsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Usuários
Route::get('/usuario', [UserController::class, 'getMe'])->middleware(['api', 'auth']);
Route::post('/usuarios/candidato', [UserController::class, 'createCandidate'])->middleware(['api']);
Route::post('/usuarios/empresa', [UserController::class, 'createCompany'])->middleware(['api']);

//login
Route::post('/login', [LoginController::class, 'login'])->middleware('api');
Route::post('/logout', [LoginController::class, 'logout'])->middleware(['api', 'auth']);

// CompetÊncias
Route::get('/competencias', [SkillsController::class, 'index'])->middleware('api', 'auth');