<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $employee = Employee::all();
        // dd($employee);
        return response()->json($employee);
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
    public function store(StoreEmployeeRequest $request)

   {
        $report = $request->file('report');
       $directory = 'reports';
        $path = $report->store($directory, 'public');

        // Store the file in the public disk
       Employee::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'nid_no' => $request->nid_no,
            'photo' => $path,
            'address' => $request->address,
            'salary' => $request->salary,
            'city' => $request->city,
            'experience' => $request->experience,
            'vacation' => $request->vacation,

       ]);



    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        //
        $report = $request->file('report');
        $directory = 'reports';
         $path = $report->store($directory, 'public');
         $employee->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'nid_no' => $request->nid_no,
            'photo' => $path,
            'address' => $request->address,
            'salary' => $request->salary,
            'city' => $request->city,
            'experience' => $request->experience,
            'vacation' => $request->vacation,]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
    }
}
