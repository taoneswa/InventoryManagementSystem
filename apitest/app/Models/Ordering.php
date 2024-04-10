<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ordering extends Model
{
    use HasFactory;

   protected $fillable = [
       'product_name',
       'description',
       'product_code',
       'order_date',
       'delivery_date',
       'quantity',
       'total_amount',
   ];

}
