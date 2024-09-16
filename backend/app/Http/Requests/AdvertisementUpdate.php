<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdvertisementUpdate extends FormRequest
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
            "banner_color" => "required|string",
            "button_text" => "required|string|min:1|max:255",
            "button_text_color" => "required|string",
            "button_link" => "required|url",
            "title" => "required",
            "description" => "required",
            "image_one" => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            "image_two" => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            "image_three" => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            "image_four" => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            "image_five" => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            "status" => "nullable|in:Active,Inactive|"
        ];
    }
}
