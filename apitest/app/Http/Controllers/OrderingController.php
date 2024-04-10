<?php

namespace App\Http\Controllers;

use App\Models\Ordering;
use App\Http\Requests\StoreOrderingRequest;
use App\Http\Requests\UpdateOrderingRequest;

class OrderingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $ordering = Ordering::all();
        // dd($ordering);
        return response()->json($ordering);
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
    public function store(StoreOrderingRequest $request)
    {
        //

        Ordering::create([
            $request->validated(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ordering $ordering)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ordering $ordering)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderingRequest $request, Ordering $ordering)
    {
        //
        $ordering->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ordering $ordering)
    {
        //
        $ordering->delete();
    }
}
