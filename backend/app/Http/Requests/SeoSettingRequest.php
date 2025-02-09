<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SeoSettingRequest extends FormRequest
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
        $seoSettingsId = $this->route("seo_setting");

        return [
            "page_name" => "required|string|unique:seo_settings,page_name," . $seoSettingsId,
            "seo_title" => "required|string|max:255",
            "meta_description" => "required",
            "meta_tags" => "nullable",
        ];
    }
}
