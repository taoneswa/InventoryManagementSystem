<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_id',
        'quantity',
         'amount',
          'total_amount'];

    /**
     * Get the product associated with the stock.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
}
}
