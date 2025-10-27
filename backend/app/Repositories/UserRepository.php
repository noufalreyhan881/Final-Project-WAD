<?php

namespace App\Repositories;

use App\Repositories\Interfaces\UserInterface;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserInterface
{
    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function create(array $userDetails): User
{
    
    return User::create([
        'name' => $userDetails['name'],
        'email' => $userDetails['email'],
        'password' => $userDetails['password'],
    ]);
}

    public function assignRole(User $user, string $roleName): void
    {
        $role = Role::where('name', $roleName)->firstOrFail();
        $user->roles()->attach($role);
    }

    public function findById(int $id): ?User
    {
        try {
            return User::find($id);
        } catch (\Exception $e) {
            return null;
        }
    }
}