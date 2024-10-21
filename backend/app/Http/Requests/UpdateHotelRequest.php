<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHotelRequest extends FormRequest
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
            "categorie" => "required|exists:card_categories,id",
            "photo" => 'nullable|image|mimes:jpg,jpeg,png,gif,webp,svg|max:5048',
            "photo_one" => 'nullable|image|mimes:jpg,jpeg,png,gif,webp,svg|max:5048',
            "photo_two" => 'nullable|image|mimes:jpg,jpeg,png,gif,webp,svg|max:5048',
            "photo_three" => 'nullable|image|mimes:jpg,jpeg,png,gif,webp,svg|max:5048',
            "review" => "required|string",
            "total_review" => "required|string",
            "title" => "required|unique:hotels,title,".$this->hotel->id,
            "location" => "required|string",
            "map_location" => "required|string|url",
            "button_text_map" => "required|string",
            "tag" => "required|string",
            "hotel_link" => "required|string|url",
            "button_text_link" => "required|string",
            "description" => "required|string",
            "status" => "required|string|in:Active,Inactive",
        ];
    }
}
