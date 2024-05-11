<?php

namespace App\Http\Requests;

use App\Rules\FullnameRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

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
