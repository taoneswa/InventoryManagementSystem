<?php

namespace App\Http\Controllers;

use App\Models\UserRegisterController;
use App\Http\Requests\StoreUserRegisterControllerRequest;
use App\Http\Requests\UpdateUserRegisterControllerRequest;

class UserRegisterControllerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $userRegisterController = UserRegisterController::all();
        dd($userRegisterController);
        return response()->json($userRegisterController);
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
    public function store(StoreUserRegisterControllerRequest $request)
    {
        //
        
    }

    /**
     * Display the specified resource.
     */
    public function show(UserRegisterController $userRegisterController)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserRegisterController $userRegisterController)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRegisterControllerRequest $request, UserRegisterController $userRegisterController)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserRegisterController $userRegisterController)
    {
        //
    }
}
