<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobAnnouncementCreateRequest;
use App\Http\Requests\JobAnnouncementUpdateRequest;
use App\Http\Resources\JobAnnouncementResource;
use App\Models\JobAnnouncement;
use Illuminate\Http\Request;

class JobAnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $user = auth('api')->user();

        if ($user->tipo === 'empresa') {
            $models = JobAnnouncement::with(['competencias'])
                ->where('empresa_id', $user->id)
                ->get();

            return JobAnnouncementResource::collection($models);
        }
    }

    public function find(Request $request, $id)
    {
        $user = auth('api')->user();

        if ($user->tipo === 'empresa') {
            $model = JobAnnouncement::with(['ramo', 'competencias'])
                ->where('empresa_id', $user->id)
                ->where('id', $id)
                ->first();

            if (!$model) {
                return response()->json([
                    'mensagem' => 'Vaga não encontrada',
                ], 404);
            }

            return new JobAnnouncementResource($model);
        }
    }

    public function store(JobAnnouncementCreateRequest $request)
    {
        $user = auth('api')->user();

        $model = new JobAnnouncement;

        $model->titulo = $request->titulo;
        $model->descricao = $request->descricao;
        $model->experiencia = $request->experiencia;
        $model->salario_min = $request->salario_min;
        $model->ativo = $request->ativo;
        $model->ramo_id = $request->ramo_id;
        $model->empresa_id = $user->id;

        if (isset($request->salario_max)) {
            $model->salario_max = $request->salario_max;
        }

        $model->save();

        if (isset($request->competencias)) {
            $model->competencias()->sync(array_map(fn($skill) => $skill['id'], $request->competencias));
        }

        return response()->json([
            'mensagem' => 'Vaga criada com sucesso!',
        ], 201);
    }

    public function update(JobAnnouncementUpdateRequest $request, $id)
    {
        $model = JobAnnouncement::find($id);

        if (!$model) {
            return response()->json([
                'mensagem' => 'Vaga não encontrada',
            ], 404);
        }

        $model->titulo = $request->titulo;
        $model->descricao = $request->descricao;
        $model->experiencia = $request->experiencia;
        $model->salario_min = $request->salario_min;
        $model->ativo = $request->ativo;
        $model->ramo_id = $request->ramo_id;

        if (isset($request->salario_max)) {
            $model->salario_max = $request->salario_max;
        }

        $model->save();

        if (isset($request->competencias)) {
            $model->competencias()->sync(array_map(fn($skill) => $skill['id'], $request->competencias));
        }

        return response()->json([
            'mensagem' => 'Vaga atualizada com sucesso!',
        ], 201);
    }

    public function delete(Request $request, $id)
    {
        $user = auth('api')->user();

        $model = JobAnnouncement::where('empresa_id', $user->id)
            ->where('id', $id)
            ->first();

        if (!$model) {
            return response()->json([
                'mensagem' => 'Vaga não encontrada',
            ], 404);
        }

        $model->delete();

        return response()->json([
            'mensagem' => 'Vaga excluída com sucesso',
        ], 204);
    }
}
