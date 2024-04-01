<?php

namespace App\Http\Requests;

use App\Rules\FullnameRule;

class UserCompanyRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => ['string', 'required', new FullnameRule],
            'email' => 'string|email|unique:users,email|required',
            'senha' => 'string|required',
            'ramo' => 'string|required',
            'descricao' => 'string|required',
        ];
    }

    public function attributes(): array
    {
        return [
            'nome' => 'Nome',
            'email' => 'E-mail',
            'senha' => 'Senha',
            'ramo' => 'Ramo',
            'descricao' => 'Descrição',
        ];
    }
}
