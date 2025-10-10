<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::all();
            return response()->json(['success' => true, 'data' => $categories], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to retrieve categories'], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        try {
            $category = Category::create($request->all());
            return response()->json(['success' => true, 'data' => $category], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to create category'], 500);
        }
    }

    public function show($id)
    {
        try {
            $category = Category::find($id);
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
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
        ]);

        try {
            $category = Category::find($id);
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
            $category = Category::find($id);
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
