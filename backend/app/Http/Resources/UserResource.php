<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $fields = [];
        $fields['nome'] = $this->nome;
        $fields['email'] = $this->email;
        $fields['tipo'] = $this->tipo;

        if ($this->tipo === 'empresa') {
            $fields['ramo'] = $this->ramo;
            $fields['descricao'] = $this->descricao;
        } else {
            $fields['competencias'] = [];
            $fields['experiencia'] = [];
        }

        return $fields;
    }
}
