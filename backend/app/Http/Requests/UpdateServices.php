<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServices extends FormRequest
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
            "service_name" => "required|unique:services,service_name,".$this->service->id,
            "service_image" => "nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048,".$this->service->id,
            "total_services" => "required",
            "service_link" => "required|url",
            "status" => "required|in:Active,Inactive",
        ];
    }
}
