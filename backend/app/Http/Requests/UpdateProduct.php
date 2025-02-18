<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProduct extends FormRequest
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
        // Determine the step from the request
        $step = $this->input('step');
        $rules = [];
        switch ($step) {
            case 0:
                $rules = [
                    "verano_id" => "nullable|exists:veranos,id",
                    "inverano_id" => "nullable|exists:inveranos,id",
                    "product_for" => "required|in:verano,inverano,winter,summer",
                    "title" => "required|unique:multiples,title," . $this->multiple->id,
                    "photos.*" => "file|mimes:jpg,jpeg,png,gif,svg|max:5048",
                    "description" => "nullable|string",
                    "status" => "nullable|in:Active,Inactive",
                    "meta_title" => "required|string|max:255",
                    "meta_description" => "required",
                    "meta_tags" => "nullable",
                ];
                break;

            case 1:
                $rules = [
                    "pricing" => "required|string",
                ];
                break;

            case 2:
                $rules = [
                    "form_title" => "nullable|string",
                    "service_title" => "required|string",
                    "services" => "required|string",
                    "extra_service_title" => "nullable|string",
                    "extra_services" => "nullable|string",
                ];
                break;

            default:
                abort(400, 'Invalid step provided.');
        }

        return $rules;
    }
}