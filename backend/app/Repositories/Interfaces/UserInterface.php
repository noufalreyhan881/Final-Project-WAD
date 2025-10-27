<?php

namespace App\Repositories\Interfaces;

use App\Models\User;

interface UserInterface 
{
    public function create(array $userDetails): User;
    public function findByEmail(string $email): ?User;
    public function assignRole(User $user, string $roleName): void;
    public function findById(int $id): ?User;
    
}