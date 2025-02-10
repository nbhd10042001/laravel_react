<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Client\HttpClientException;
use Laravel\Socialite\Facades\Socialite;
use Response;

class GoogleController extends Controller
{
    public function googleLoginRedirect()
    {
        return Response::json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function googleLoginCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
        } catch (HttpClientException $e) {
            return response()->json(['error' => 'Invalid credentials provided.'], 422);
        }

        $user = null;
        $query = User::query();
        $user = $query->where('email', $googleUser->getEmail())->first();

        if ($user == null) {
            $user = User::create([
                'email' => $googleUser->getEmail(),
                'email_verified_at' => now(),
                'name' => $googleUser->getName(),
                'user_name' => 'google_'.fake()->numerify('#########'),
                'google_id' => $googleUser->getId(),
                'image' => $googleUser->getAvatar(),
            ]);
            // get role member
            $roleMember = Role::where('name', 'Member')->first();
            // add new record in table user_roles with user_id, role_id 
            $user->roles()->attach($roleMember->id);
        }

        return response()->json([
            'user' => new UserResource($user),
            'access_token' => $user->createToken('google-token')->plainTextToken,
            'token_type' => 'Bearer',
        ]);
    }
}
