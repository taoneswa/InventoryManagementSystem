<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomersRequest extends FormRequest
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
            "name"=> "required|max:150",
            'email'=>['email','required',
                Rule::unique('customers')->ignore($this->id)],
            "phone"=> ['required','max:15',
                Rule::unique('customers')->ignore($this->id)],
            "address"=> "required|max:500",
            "city"=> "required|max:100",
           "shop_name"=> "required",
           "bank_name"=> "required",
           "account_holder"=> "max:20",
           "account_number"=> "required",
           "bank_branch"=> "required",
        ];
    }
}
