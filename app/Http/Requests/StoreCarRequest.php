<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCarRequest extends FormRequest
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
            'images' => 'nullable|array',
            'year' => 'required',
            'user_id' => 'exists:users,id',
            'car_type' => 'required|string',
            'fuel_type' => 'required|string',
            'vin' => 'required|string',
            'mileage' => 'required|int',
            'price' => 'required|int',
            'address' => 'required|string',
            'phone' => 'required|string|min:9|max:15',
            'maker' => 'required|string',
            'model' => 'required|string',
            'state' => 'required|string',
            'city' => 'required|string',
            'publish' => 'boolean',
            'features' => 'required|array|min:5',
            'description' => 'nullable|string|max:2000',
        ];
    }
}
