<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobAnnouncementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $fields = [
            'id' => $this->id,
            'ramo_id' => $this->ramo_id,
            'titulo' => $this->titulo,
            'descricao' => $this->descricao,
            'competencias' => SkillResource::collection($this->whenLoaded('competencias')),
            'experiencia' => $this->experiencia,
            'salario_min' => $this->salario_min,
            'salario_max' => $this->salario_max,
            'ativo' => $this->ativo,
            'empresa_id' => $this->empresa_id,
            'ramo' => new JobSectorResource($this->whenLoaded('ramo')),
        ];

        return $fields;
    }
}
