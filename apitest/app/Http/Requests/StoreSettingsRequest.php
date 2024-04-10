<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSettingsRequest extends FormRequest
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
            //
            'company_name'=>'required',
            'company_email'=>'required',
            'company_phone'=>'required',
            'company_logo'=>'required',
            'company_city'=>'required',
            'company_country'=>'required',
            'company_postal_code'=>'required',
            'company_address'=>'required',
        ];
    }
}
