<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
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
            'nome_empresa' => $this->nome_empresa,
            'inicio' => $this->inicio,
            'fim' => $this->fim,
            'cargo' => $this->cargo,
        ];

        return $fields;
    }
}
