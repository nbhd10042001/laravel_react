<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Str;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        // get the request validated data
        $data = $request->validated();

        // annonate the user variable to be instance of app models user
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'user_name' => $data['user_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'phone' => fake()->numerify('#########'),
        ]);

        // get role member
        $roleMember = Role::where('name', 'Admin')->first();
        // add new record in table user_roles with user_id, role_id 
        $user->roles()->attach($roleMember->id);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        // check if field username
        if (filter_var($credentials['userOrEmail'], FILTER_VALIDATE_EMAIL)) {
            $credentials['email'] = $credentials['userOrEmail']; // add new element 'email'
            unset($credentials['userOrEmail']); // remove element 'userOrEmail'
        } else {
            $credentials['user_name'] = $credentials['userOrEmail']; // add new element 'user_name'
            unset($credentials['userOrEmail']);
        }

        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        // Auth::attempt will try to login with <email/user_name and password> in $credentials
        // if colunm <email/user_name and password> in database are same value in $credentials
        // then return success
        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => "Email or Password are not correct"
            ], 400);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        // revoke the token that was used to authenticate the current requeset...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }
}
