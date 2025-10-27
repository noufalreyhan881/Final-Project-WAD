<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Role;
// We don't need 'Hash' because the User model's 'hashed'
// cast will automatically hash the password.

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Use a transaction for safety
        DB::transaction(function () {
            
            // 1. Find Existing Roles
            // We use firstOrFail() now because we assume these roles
            // were already created (as per your instruction).
            // This will throw an error if the role is not found.
            $adminRole = Role::where('name', 'admin')->firstOrFail();
            $memberRole = Role::where('name', 'member')->firstOrFail();

            // 2. Create Admin User
            // firstOrCreate finds a user by 'email', and if it doesn't
            // exist, it creates them with the data in the second array.
            $adminUser = User::firstOrCreate(
                ['email' => 'atar@admin.com'],
                [
                    'name' => 'atar',
                    'password' => 'ataradmin' // The 'hashed' cast in User.php handles this
                ]
            );
            
            // 3. Attach the Admin Role
            // sync() is safer than attach() in a seeder as it prevents
            // duplicate entries in the pivot table.
            $adminUser->roles()->sync([$adminRole->id]);

            // 4. (Optional) Create a Member User for testing
            $memberUser = User::firstOrCreate(
                ['email' => 'atar@member.com'],
                [
                    'name' => 'atarMember',
                    'password' => 'atarmember'
                ]
            );
            
            $memberUser->roles()->sync([$memberRole->id]);

        });
    }
}

