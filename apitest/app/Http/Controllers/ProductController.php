<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $product = Product::all();
        // dd($product);
        return response()->json($product);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        //
        $report = $request->file('report');
        $directory = 'reports';
        $path = $report->store($directory, 'public');
        Product::create([
            "cat_id"=>$request->cat_id,
            "sup_id"=>$request->sup_id,
            "product_name"=>$request->product_name,
            "product_code"=>$request->product_code,
            "product_garage"=>$request->product_garage,
            "product_route"=>$request->product_route,
            "product_image"=>$path,
            "buy_date"=>$request->buy_date,
            "expire_date"=>$request->expire_date,
            "buying_price"=>$request->buying_price,
            "price"=>$request->price,

        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
        $report = $request->file('report');
        $directory = 'reports';
        $path = $report->store($directory, 'public');

        $product->update([
            "cat_id"=>$request->cat_id,
            "sup_id"=>$request->sup_id,
            "product_name"=>$request->product_name,
            "product_code"=>$request->product_code,
            "product_garage"=>$request->product_garage,
            "product_route"=>$request->product_route,
            "product_image"=>$path,
            "buy_date"=>$request->buy_date,
            "expire_date"=>$request->expire_date,
            "buying_price"=>$request->buying_price,
            "price"=>$request->price,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //

        $product->delete();
    }
}
