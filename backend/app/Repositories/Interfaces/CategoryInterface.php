<?php

namespace App\Repositories\Interfaces;

use App\Models\Category;
interface CategoryInterface{

    public function create(array $categoryDetails): Category;
    public function findById(int $id): ?Category;
    public function update(Category $category, array $categoryDetails): Category;
    public function delete(Category $category): void;
    public function getAll(): array;

}