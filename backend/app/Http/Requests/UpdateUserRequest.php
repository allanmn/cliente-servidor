<?php

namespace App\Http\Requests;

use App\Rules\FullnameRule;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = auth('api')->user();

        if ($user->tipo === 'empresa') {
            return [
                'nome' => ['string', 'required', new FullnameRule],
                'email' => ['string', 'email', 'required', Rule::unique('users', 'email')->ignore($user->id)],
                'senha' => 'string|nullable',
                'ramo' => 'string|required',
                'descricao' => 'string|required',
            ];
        }

        return [
            'nome' => ['string', 'required', new FullnameRule],
            'email' => ['string', 'email', 'required', Rule::unique('users', 'email')->ignore($user->id)],
            'senha' => 'string|nullable',
            'competencias' => 'array|nullable',
            'experiencia' => 'array|nullable',
        ];
    }
}
