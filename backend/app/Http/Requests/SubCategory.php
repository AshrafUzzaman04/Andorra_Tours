<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubCategory extends FormRequest
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
        $SubcategoryId = $this->route('sub_category');
        return [
            "category" => "required|exists:categories,id",
            "sub_category_name" => "required|unique:sub_categories,sub_category_name,".$SubcategoryId,
            "link" => "nullable|url", // Added URL validation
            "status" => "required|string|in:Active,Inactive",
        ];
    }
}
