<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePartners extends FormRequest
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
            "partner_name" => "required|string|max:255|unique:partners,partner_name,".$this->footer_partner,
            "partner_logo" => "nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048,".$this->footer_partner,
            "status" => "required|in:Active,Inactive"
        ];
    }
}
