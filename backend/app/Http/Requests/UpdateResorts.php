<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateResorts extends FormRequest
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
            "providers" => "required|exists:providers,id",
            "photo" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5048",
            "name" => "required|string|max:255|unique:resorts,name, {$this->resort->id}",
            "country" => "required|string|max:255",
            "height" => "required|string|max:255",
            "alpine_skiing" => "nullable|string|max:255",
            "ski_lifts" => "nullable|string|max:255",
            "clues" => "nullable|string|max:255",
            "details_title" => "nullable|string|max:255",
            "description" => "nullable|string",
            "status" => "required|string|in:Active,Inactive",
        ];
    }
}
