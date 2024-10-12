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
            "categorie" => "required|exists:card_categories,id,".$this->hotel->id,
            "photo" => 'required|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            "photo_one" => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            "photo_two" => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            "photo_three" => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            "review" => "required|string",
            "total_review" => "required|string",
            "title" => "required|unique:hotels,title,".$this->hotel->id,
            "location" => "required|string",
            "map_location" => "required|string",
            "tag" => "required|string",
            "hotel_link" => "required|string|url",
            "description" => "required|string",
            "status" => "required|string|in:Active,Inactive",
        ];
    }
}
