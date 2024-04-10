<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\User;
use GuzzleHttp\Psr7\Message;

class UserController extends Controller
{
    //
    public function register(Request $request){
        $request->validate([
            'name'=>'required|string',
            'email'=>'required|string|unique:users',
            'password'=>'required|string|min:6'
        ]);
        $user = new User([
            'name' => $request->name,
            'email'=> $request->email,
            'password'=>Hash::make($request->password),
        ]);
        $user->save();
        return response()->json([
            'message'=>'User has been registered'
        ], 200);
    }
    public function login(Request $request){
        $request->validate([
            'email'=>'required',
            'password'=>'required|string',
        ]);
        $credentials= request([
            'email',
            'password',
        ]);
        if (!Auth::attempt($credentials)){
            return response()->json([
                'message'=>'Unauthorised'
            ], 401);
        }
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $token->expired_at = Carbon::now()->addWeeks(1);
        $token->save();

        return response()->json(['data'=>[
            'user' =>Auth::user(),
            'access_token'=>$tokenResult->access_token,
            'token_type'=> 'Bearer',
            'expires_at'=>Carbon::parse($tokenResult->token->expires_at)->toDateString()
        ]]);
    }
}
