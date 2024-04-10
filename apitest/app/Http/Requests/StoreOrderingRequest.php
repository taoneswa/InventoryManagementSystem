<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderingRequest extends FormRequest
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
            'product_name'=> 'required',
            'product_code'=> 'required',
            'quantity'=> 'required',
            'total_amount'=> 'required',
            'description'=> 'required',
            'order_date'=> 'required',
            'delivery_date'=> 'required',
        ];
    }
}
