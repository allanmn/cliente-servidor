<?php

namespace App\Http\Requests;

class JobAnnouncementCreateRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titulo' => 'required|string',
            'descricao' => 'required|string',
            'ramo_id' => 'required|numeric',
            'competencias' => 'required|array',
            'experiencia' => 'required|numeric',
            'salario_min' => 'required|numeric',
            'salario_max' => 'nullable|numeric',
        ];
    }

    public function attributes(): array
    {
        return [
            'titulo' => 'Título',
            'descricao' => 'Descrição',
            'ramo_id' => 'Ramo',
            'competencias' => 'Competências',
            'experiencia' => 'Experiência',
            'salario_min' => 'Sálario Min',
            'salario_max' => 'Sálario Max',
        ];
    }
}
