<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            "cat_id" => "required",
            "sup_id" => "required",
            "brand_id" => "required",
            "product_name" => "required",
            "product_code" => "required",
            "product_garage" => "required",
            "product_route" => "required",
            "buy_date"=> "required",
            "expire_date"=> "required",
            "buying_price"=> "required",
            "price"=> "required",
        ];
    }
}
