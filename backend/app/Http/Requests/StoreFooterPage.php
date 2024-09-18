<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFooterPage extends FormRequest
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
            'category' => 'required|exists:page_categories,id', // Ensure category exists in page_categories table
            'page_name' => 'required|string|max:255|unique:footer_pages,page_name', // Ensure page_name is unique
            //'page_slub' => 'required|string|max:255|unique:footer_pages,page_slub', // Ensure page_slub is unique
            'page_title' => 'nullable|string|max:255|unique:footer_pages,page_title', // Optional and unique
            'content' => 'nullable|string', // No additional constraints
            'status' => 'required|in:Active,Inactive', // Enum values
        ];
    }
}
