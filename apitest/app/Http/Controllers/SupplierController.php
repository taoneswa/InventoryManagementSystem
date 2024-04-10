<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $supplier = Supplier::all();
        // dd($supplier);
        return response()->json($supplier);
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
    public function store(StoreSupplierRequest $request)
    {
        //
        $report = $request->file('report');
        $directory = 'reports';
         $path = $report->store($directory, 'public');
         Supplier::create([
            "name"=>$request->name,
            "email"=>$request->email,
            "phone" => $request->phone,
            "photo"=>$path,
            "shop_name"=>$request->shop_name,
            "address"=>$request->address,
            "type"=>$request->type,
            "city"=>$request->city,
            "bank_name"=>$request->bank_name,
            "account_holder"=>$request->account_holder,
            "bank_branch"=>$request->bank_branch,
            "account_number"=>$request->account_number,
         ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        //
        $report = $request->file('report');
        $directory = 'reports';
         $path = $report->store($directory, 'public');
        $supplier->update([
            "name"=>$request->name,
            "email"=>$request->email,
            "phone" => $request->phone,
            "photo"=>$path,
            "shop_name"=>$request->shop_name,
            "address"=>$request->address,
            "type"=>$request->type,
            "city"=>$request->city,
            "bank_name"=>$request->bank_name,
            "account_holder"=>$request->account_holder,
            "bank_branch"=>$request->bank_branch,
            "account_number"=>$request->account_number,

        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        //
        $supplier->delete();
        //
    }
}
