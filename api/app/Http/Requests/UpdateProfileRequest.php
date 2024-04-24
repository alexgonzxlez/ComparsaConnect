<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
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
        $currentUser = auth()->id();

        return [
            'name'     => 'required',
            'email'    => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($currentUser),
            ],
            'username' => [
                'required',
                'string',
                'min:2',
                'max:20',
                Rule::unique('users', 'username')->ignore($currentUser),
            ],
        ];
    }

}
