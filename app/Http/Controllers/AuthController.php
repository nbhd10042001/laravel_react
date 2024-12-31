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
        $roleMember = Role::where('name', 'Member')->first();
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

    public function me(Request $request)
    {
        return response([
            'user' => new UserResource($request->user())
        ]);
    }

    public function profile(Request $request, string $name = null)
    {
        if($name){
            $user = User::where('user_name', $name)->first();
        }
        else{
            $user = $request->user();
        }
        return response([
            'user' => new UserResource($user)
        ]);
    }

    public function updateProfile(UpdateProfileRequest $request, User $user)
    {
        $data = $request->validated();

        // Check if image was given and save on local file system
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image'], $user->user_name);
            $data['image'] = $relativePath;
            // If there is an old image, delete it
            if ($user->image) {
                $absolutePath = public_path($user->image);
                File::delete($absolutePath);
            }
        }
        // Update user in the database
        $user->update($data);
        return new UserResource($user);
    }

    private function saveImage($image, $user_name)
    {
        // Check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);
            // Get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            // Check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/users/';
        $file = $user_name. '_' . Str::random() . '.' . $type;
        $absolutePath = public_path($dir); // path dir
        $relativePath = $dir . $file; // path image file
        // if the folder images not exist, then create new folder images
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
