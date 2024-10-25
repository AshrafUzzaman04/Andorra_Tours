<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlog extends FormRequest
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
            "tag" => "required|string|max:255",
            "photo" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5048,".$this->blog->id,
            "images.*" => "nullable|file|mimes:jpg,jpeg,png,gif,svg|max:5048",
            "date" => "required|date",
            "title" => "required|string|max:255|unique:blogs,title,".$this->blog->id,
            "user_photo" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5048,".$this->blog->id,
            "user_name" => "required|string|max:255",
            "button_text" => "required|string|max:255",
            "description" => "required|string",
            "status" => "required|in:Active,Inactive"
        ];
    }
}
