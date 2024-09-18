<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
class UpdateFooterPage extends FormRequest
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
            "category" => "required|exists:page_categories,id," . $this->id,
            "page_name" => "required|string|max:255|unique:footer_pages,page_name," . $this->id,
            "page_title" => "nullable|string|max:255|unique:footer_pages,page_title," . $this->id,
            "content" => 'nullable|string',
            "status" => "required|in:Active,Inactive",
        ];
    }
}
