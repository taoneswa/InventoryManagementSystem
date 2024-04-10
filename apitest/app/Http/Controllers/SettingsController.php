<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use App\Http\Requests\StoreSettingsRequest;
use App\Http\Requests\UpdateSettingsRequest;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $settings = Settings::all();
        // dd($settings);
        return response()->json($settings);
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
    public function store(StoreSettingsRequest $request)
    {
        //
        $report = $request->file('report');
        $directory = 'reports';
         $path = $report->store($directory, 'public');
         Settings::create([
             'company_name' => $request->company_name,
             'company_email' => $request->company_email,
             'company_phone' => $request->company_phone,
             'company_address' => $request->company_address,
             'company_logo' => $path,
             'company_city'=> $request->company_city,
             'company_country'=> $request->company_country,
             'company_postal_code'=> $request->company_postal_code,

         ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Settings $settings)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Settings $settings)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingsRequest $request, Settings $settings)
    {
        //
        $report = $request->file('report');
        $directory = 'reports';
         $path = $report->store($directory, 'public');
         $settings->update([
            'company_name' => $request->company_name,
            'company_email' => $request->company_email,
            'company_phone' => $request->company_phone,
            'company_address' => $request->company_address,
            'company_logo' => $path,
            'company_city'=> $request->company_city,
            'company_country'=> $request->company_country,
            'company_postal_code'=> $request->company_postal_code,
         ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Settings $settings)
    {
        //
        $settings->delete();
    }
}
