<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Repositories\CategoryRepository;

class CategoryController extends Controller
{
    protected $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function index()
    {
        try {
            $categories = $this->categoryRepository->getAll();
            return response()->json(['success' => true, 'data' => $categories], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to retrieve categories'], 500);
        }
    }

    public function store(Request $request)
    {
         try {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

       
            $category = $this->categoryRepository->create($request->all());
            return response()->json(['success' => true, 'data' => $category], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to create category'], 500);
        }
    }

    public function show($id)
    {
        try {
            $category = $this->categoryRepository->findById($id);
            if ($category) {
                return response()->json(['success' => true, 'data' => $category], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Category not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to retrieve category'], 500);
        }
    }   

    public function update(Request $request, $id)
    {
        try {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
        ]);
            $category = $this->categoryRepository->findById($id);
            if ($category) {
                $category->update($request->all());
                return response()->json(['success' => true, 'data' => $category], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Category not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update category'], 500);
        }
    }   
    
    public function destroy($id)
    {
        try {
            $category = $this->categoryRepository->findById($id);
            if ($category) {
                $category->delete();
                return response()->json(['success' => true, 'message' => 'Category deleted'], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Category not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to delete category'], 500);
        }
    }   
}
