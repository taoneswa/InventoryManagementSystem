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

      // Decode base64 data to binary
$imageData = base64_decode($request->product_image);

// Generate a random filename
$randomFilename = uniqid('image_', true) . '.png';

// Path to save the image in the storage folder
$imagePath = storage_path('app/public/images/') . $randomFilename;

// Save the image to file
file_put_contents($imagePath, $imageData);


        Product::create([
            "cat_id"=>$request->cat_id,
            "sup_id"=>$request->sup_id,
            "product_name"=>$request->product_name,
            "product_id"=>$request->product_id,
            "product_code"=>$request->product_code,
            "product_garage"=>$request->product_garage,
            "product_route"=>$request->product_route,
            "product_image"=>$imagePath,
            "buy_date"=>$request->buy_date,
            "expire_date"=>$request->expire_date,
            "buying_price"=>$request->buying_price,
            "price"=>$request->price,

        ]);

    }

    /**
     * Display the specified resource.
     */
      public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
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
