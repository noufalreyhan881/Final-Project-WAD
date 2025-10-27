<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryInterface;

class CategoryRepository implements CategoryInterface
{
    public function create(array $categoryDetails): Category
    {
        return Category::create($categoryDetails);
    }
    public function findById(int $id): ?Category
    {
        return Category::find($id);
    }
    public function update(Category $category, array $categoryDetails): Category
    {
        $category->update($categoryDetails);
        return $category;
    }
    public function delete(Category $category): void
    {
        $category->delete();
    }
    public function getAll(): array
    {
        return Category::all()->toArray();
    }
    
}

