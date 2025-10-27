<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Repositories\BookRepository;

class BookController extends Controller
{

    public function __construct(private BookRepository $bookRepository)
    {
        
    }
    public function index()
    {
        try {
            $books = $this->bookRepository->getAll();
            return response()->json(['success' => true, 'data' => $books], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to retrieve books', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $book = $this->bookRepository->findById($id);
            if ($book) {
                return response()->json(['success' => true, 'data' => $book], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Book not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to retrieve book', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'author' => 'required|string|max:255',
        'publisher' => 'nullable|string|max:255',
        'publishYear' => 'nullable|integer',
        'category_id' => 'required|exists:categories,id', // <-- expect category_id
        'availableCopies' => 'required|integer|min:0',
        'totalCopies' => 'required|integer|min:0',
        'cover' => 'nullable|string|max:255',
        'description' => 'nullable|string',
    ]);

    try {
        $book = $this->bookRepository->create($request->all());
        return response()->json(['success' => true, 'data' => $book], 201);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'message' => 'Failed to create book', 'error' => $e->getMessage()], 500);
    }
}

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'author' => 'sometimes|required|string|max:255',
            'publisher' => 'sometimes|nullable|string|max:255',
            'publishYear' => 'sometimes|nullable|integer',
            'category' => 'sometimes|nullable|string|max:255',
            'availableCopies' => 'sometimes|required|integer|min:0',
            'totalCopies' => 'sometimes|required|integer|min:0',
            'cover' => 'sometimes|nullable|string|max:255',
            'description' => 'sometimes|nullable|string',
        ]);

        try {
            $book = $this->bookRepository->update($id, $request->all());
            if ($book) {
                $book->update($request->all());
                return response()->json(['success' => true, 'data' => $book], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Book not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update book', 'error' => $e->getMessage()], 500);
        }
    }

    public function addCopies($id){
        try {
            $book = $this->bookRepository->findById($id);
            if ($book) {
                $book->availableCopies += 1;
                $book->totalCopies += 1;
                $book->save();
                return response()->json(['success' => true, 'data' => $book], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Book not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to add copies', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $book = $this->bookRepository->findById($id);
            if ($book) {
                $book->delete();
                return response()->json(['success' => true, 'message' => 'Book deleted'], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Book not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to delete book', 'error' => $e->getMessage()], 500);
        }
    }
}
