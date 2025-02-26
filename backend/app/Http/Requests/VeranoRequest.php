<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VeranoRequest extends FormRequest
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
            "label" => "required",
            "reviews" => "required",
            "total_reviews" => "required",
            "type" => "required",
            "reviews_link" => "nullable|url",
            "title" => "required",
            "price" => "required",
            "photo" => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048',
            "booking_link" => "nullable|string",
            "status" => "nullable|in:Active,Inactive|",
            "meta_title" => "required|string|max:255",
            "meta_description" => "required",
            "meta_tags" => "nullable",
        ];
    }
}
