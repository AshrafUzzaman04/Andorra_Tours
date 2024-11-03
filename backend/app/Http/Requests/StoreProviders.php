<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProviders extends FormRequest
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
        return [
            "provider_for" => "required|string|max:255",
            "name" => "required|string|max:255",
            "logo" => "required|image|mimes:jpeg,png,jpg,gif,svg|max:5048",
            "status" => "required|string|in:Active,Inactive",
        ];
    }
}
