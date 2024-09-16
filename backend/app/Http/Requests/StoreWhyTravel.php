<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWhyTravel extends FormRequest
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
            'title' => 'required|unique:why_travel,title',
            'background_color' => 'required',
            'description' => 'required',
            'logo' => 'required|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            'status' => "nullable|in:Active,Inactive|"
        ];
    }
}
