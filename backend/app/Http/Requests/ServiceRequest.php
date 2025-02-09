<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
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
            "service_name" => "required|unique:services,service_name",
            "service_image" => "nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048",
            "total_services" => "required",
            "service_link" => "nullable|string",
            "status" => "required|in:Active,Inactive",
            "seo_title" => "required|string|max:255",
            "meta_description" => "required",
            "meta_tags" => "nullable",
        ];
    }
}
