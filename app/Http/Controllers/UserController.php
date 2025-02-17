<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Str;

class UserController extends Controller
{
    public function getAllUser(Request $request)
    {
        Gate::authorize('is-admin');

        return UserResource::collection(
            User::with('roles')
                ->orderBy('created_at', 'desc')
                ->paginate(10)
        );
    }

    public function me(Request $request)
    {
        return response([
            'user' => new UserResource($request->user())
        ]);
    }

    public function profile(Request $request, string $name = null)
    {
        if ($name) {
            $user = User::where('user_name', $name)->first();
        } else {
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
        $file = $user_name . '_' . Str::random() . '.' . $type;
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
