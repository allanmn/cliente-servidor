<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Token;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->senha,
        ];

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(
                [
                    'message' => 'E-mail ou senha incorretos.',
                ],
                401
            );
        }

        $user = JWTAuth::user();

        Token::create([
            'token' => $token,
            'user_id' => $user->id,
        ]);

        return response()->json([
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken();

        auth('api')->logout();

        Token::where('token', $token)->delete();

        return response()->json([
            'mensagem' => 'Logout realizado com sucesso.',
        ]);
    }
}
