<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $role = $this->user()->roles->first()->name;
        if($role == 'Admin' || $role == 'Seller'){
            return true;
        }
        
        return false;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->user()->id
        ]);
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:1000',
            'image' => 'nullable|string',
            'user_id' => 'exists:users,id',
            'status' => 'required|boolean',
            'description' => 'nullable|string',
            'expire_date' => 'required|date|after:today',
            'questions' => 'required|array',
        ];
    }
}
