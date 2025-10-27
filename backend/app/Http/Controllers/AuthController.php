<?php


namespace App\Http\Controllers;

use App\Models\Role;
use App\Repositories\Interfaces\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth; 
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    protected UserInterface $userRepository;

    public function __construct(UserInterface $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->middleware('auth:api')->only(['me', 'logout', 'refresh']);
    }

    /**
     * Public registration. It creates a user and gives them the 'member' role.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'                  => 'required|string|max:255',
            'email'                 => 'required|string|email|max:255|unique:users,email',
            'password'              => 'required|string|min:8|confirmed',
        ]);

        DB::beginTransaction();
        try {
            // $validated['password'] = Hash::make($validated['password']);
            $user = $this->userRepository->create($validated);
            $this->userRepository->assignRole($user, 'member');
            $token = JWTAuth::fromUser($user);
            DB::commit();

            return response()->json([
                'success'     => true,
                'data'        => $user,
                'token'       => $token,
                'token_type'  => 'bearer',
                // Use the Auth facade for clarity
                'expires_in'  => Auth::guard('api')->factory()->getTTL() * 60,
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Registration failed',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Login a user and return a JWT token.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        try {
            // Use Auth::guard('api')->attempt() for consistency
            if (!$token = Auth::guard('api')->attempt($credentials)) {
                return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
            }
            
            // This is the correct way to get the user after a successful attempt
            $user = Auth::guard('api')->user();

            return response()->json([
                'success'    => true,
                'data'       => $user,
                'token'      => $token,
                'token_type' => 'bearer',
                'expires_in' => Auth::guard('api')->factory()->getTTL() * 60,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => 'Login failed', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get the authenticated user's profile.
     */
    public function me()
    {
        // Use the Auth facade for clarity
        $user = Auth::guard('api')->user();
        return response()->json(['success' => true, 'data' => $user], 200);
    }

    /**
     * Log the user out (invalidate the token).
     */
    public function logout()
    {
        // Use the Auth facade for clarity
        Auth::guard('api')->logout();
        return response()->json(['success' => true, 'message' => 'Successfully logged out'], 200);
    }

    /**
     * Refresh a token.
     */
    public function refresh()
    {
        // Use the Auth facade for clarity
        $newToken = Auth::guard('api')->refresh();
        return response()->json([
            'success'     => true,
            'token'       => $newToken,
            'token_type'  => 'bearer',
            'expires_in'  => Auth::guard('api')->factory()->getTTL() * 60,
        ], 200);
    }
}