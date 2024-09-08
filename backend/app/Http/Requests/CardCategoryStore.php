<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CardCategoryStore extends FormRequest
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
            "top_title" => "required|string",
            "top_sub_title" => "required|string",
            "tag" => "required|image|mimes:jpg,jpeg,png,gif,svg|max:5048",
            "image" => "required|image|mimes:jpg,jpeg,png,gif,svg|max:5048",
            "title" => "required|string|unique:card_categories,title",
            "sub_title" => "required|string",
            "link" => "required|url",
            "status" => "required|string|in:Active,Inactive"
        ];
    }
}
