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
            "category" => "required",
            "page_name" => "required|string|max:255|unique:footer_pages,page_name," . $this->footer_page->id,
            "page_title" => "nullable|string|max:255|unique:footer_pages,page_title," . $this->footer_page->id,
            'title_for' => 'required|string|max:255',
            "content" => 'nullable|string',
            "status" => "required|in:Active,Inactive",
            "meta_description" => "required",
            "meta_tags" => "nullable",
        ];
    }
}
