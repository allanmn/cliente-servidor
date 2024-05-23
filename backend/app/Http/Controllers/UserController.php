<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserCandidateRequest;
use App\Http\Requests\UserCompanyRequest;
use App\Http\Resources\UserResource;
use App\Models\Experience;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
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

        $user->load('skills', 'experiences');

        return new UserResource($user);
    }

    public function updateMe(UpdateUserRequest $request)
    {
        $user = auth('api')->user();

        if (isset($request->nome)) {
            $user->nome = $request->nome;
        }

        if (isset($request->email)) {
            $user->email = $request->email;
        }

        if (isset($request->senha)) {
            $user->senha = Hash::make($request->senha);
        }

        if ($user->tipo === 'empresa') {
            if (isset($request->ramo)) {
                $user->ramo = $request->ramo;
            }

            if (isset($request->descricao)) {
                $user->descricao = $request->descricao;
            }
        } else if ($user->tipo === 'candidato') {
            if (isset($request->competencias)) {
                $user->skills()->sync(array_map(fn($skill) => $skill['id'], $request->competencias));
            }

            if (isset($request->experiencia)) {
                $ids = [];

                foreach ($request->experiencia as $exp) {
                    if (isset($exp['id'])) {
                        $expModel = Experience::findOrFail($exp['id']);

                        if (isset($exp['nome_empresa'])) {
                            $expModel->nome_empresa = $exp['nome_empresa'];
                        }

                        if (isset($exp['cargo'])) {
                            $expModel->cargo = $exp['cargo'];
                        }

                        if (isset($exp['inicio'])) {
                            $expModel->inicio = $exp['inicio'];
                        }

                        if (isset($exp['fim'])) {
                            $expModel->fim = $exp['fim'];
                        }

                        $expModel->save();

                        $ids[] = $expModel->id;
                    } else {
                        $expModel = new Experience;

                        if (isset($exp['nome_empresa'])) {
                            $expModel->nome_empresa = $exp['nome_empresa'];
                        }

                        if (isset($exp['cargo'])) {
                            $expModel->cargo = $exp['cargo'];
                        }

                        if (isset($exp['inicio'])) {
                            $expModel->inicio = $exp['inicio'];
                        }

                        if (isset($exp['fim'])) {
                            $expModel->fim = $exp['fim'];
                        }

                        $expModel->user_id = $user->id;

                        $expModel->save();

                        $ids[] = $expModel->id;
                    }
                }

                Experience::where('user_id', $user->id)
                ->whereNotIn('id', $ids)
                ->delete();
            }
        }

        $user->save();

        return response()->json([
            'mensagem' => 'Usuário atualizado com sucesso!',
        ]);
    }

    public function deleteMe()
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json([
                'mensagem' => 'Não foi possível autenticar o usuário.',
            ], 401);
        }

        $user->tokens()->delete();

        $user->delete();

        return response()->json([
            'mensagem' => "Usuário apagado com sucesso",
        ], 200);
    }
}
