<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCandidateRequest;
use App\Http\Requests\UserCompanyRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function createCandidate(UserCandidateRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            return response()->json(
                [
                    'mensagem' => 'E-mail já utilizado.',
                ],
                422
            );
        }

        $user = new User;

        $user->nome = $request->nome;
        $user->email = $request->email;
        $user->senha = Hash::make($request->senha);
        $user->tipo = 'candidato';

        $user->save();

        return response()->json(
            [
                'mensagem' => 'Usuário cadastrado com sucesso',
            ],
            201
        );
    }

    public function createCompany(UserCompanyRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            return response()->json(
                [
                    'mensagem' => 'E-mail já utilizado.',
                ],
                422
            );
        }

        $user = new User;

        $user->nome = $request->nome;
        $user->email = $request->email;
        $user->senha = Hash::make($request->senha);
        $user->ramo = $request->ramo;
        $user->descricao = $request->descricao;
        $user->tipo = 'empresa';

        $user->save();

        return response()->json(
            [
                'mensagem' => 'Usuário cadastrado com sucesso',
            ],
            201
        );
    }

    public function getMe()
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json([
                'mensagem' => 'Não foi possível autenticar o usuário.',
            ], 401);
        }

        return new UserResource($user);
    }
}
