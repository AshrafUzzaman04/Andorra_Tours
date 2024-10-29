<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyPromotion extends FormRequest
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
            "content_for" => "required|string|unique:company_promotions,content_for,{$this->company_promotion->id} ",
            "title" => "required|string|unique:company_promotions,title,{$this->company_promotion->id} ",
            "sub_title" => "nullable|string",
            "pricing_cards" => "nullable|string",
            "description" => "nullable|string",
            "company_benifits" => "nullable|string",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5048",
            "status" => "required|string|in:Active,Inactive"
        ];
    }
}
