<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OfferBannerRequest extends FormRequest
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
            "banner_title" => "nullable",
            "banner_title_color" => "nullable",
            "button_text" => "required",
            "button_color" => "required",
            "button_text_color" => "required", 
            "button_link" => "required|url",
            "banner_image" => "required|image|mimes:jpg,jpeg,png,gif,svg|max:5048",
            "status" => "required|in:Active,Inactive",
        ];
    }
}
