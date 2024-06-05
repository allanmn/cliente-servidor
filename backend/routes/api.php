<?php

use App\Http\Controllers\JobAnnouncementController;
use App\Http\Controllers\JobSectorsController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SkillsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Usuários
Route::get('/usuario', [UserController::class, 'getMe'])->middleware(['api', 'auth']);
Route::post('/usuarios/candidatos', [UserController::class, 'createCandidate'])->middleware(['api']);
Route::post('/usuarios/empresa', [UserController::class, 'createCompany'])->middleware(['api']);
Route::put('/usuario', [UserController::class, 'updateMe'])->middleware(['api', 'auth']);
Route::delete('/usuario', [UserController::class, 'deleteMe'])->middleware(['api', 'auth']);

//login
Route::post('/login', [LoginController::class, 'login'])->middleware('api');
Route::post('/logout', [LoginController::class, 'logout'])->middleware(['api', 'auth']);

// CompetÊncias
Route::get('/competencias', [SkillsController::class, 'index'])->middleware('api', 'auth');

// Ramos
Route::get('/ramos', [JobSectorsController::class, 'index'])->middleware('api', 'auth');

// Vagas
Route::get('/vagas', [JobAnnouncementController::class, 'index'])->middleware(['api', 'auth']);
Route::post('/vagas', [JobAnnouncementController::class, 'store'])->middleware(['api', 'auth']);
Route::get('/vagas/{id}', [JobAnnouncementController::class, 'find'])->middleware(['api', 'auth']);
Route::put('/vagas/{id}', [JobAnnouncementController::class, 'update'])->middleware(['api', 'auth']);
Route::delete('/vagas/{id}', [JobAnnouncementController::class, 'delete'])->middleware(['api', 'auth']);
