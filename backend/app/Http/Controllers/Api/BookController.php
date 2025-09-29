<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        // Dummy data for books
        $books = [
            [
                'id' => 1,
                'title' => 'The Great Gatsby',
                'author' => 'F. Scott Fitzgerald',
                'isbn' => '978-0743273565',
                'published_year' => 1925,
                'genre' => 'Fiction',
                'available' => true,
                'cover_image' => 'https://example.com/great-gatsby.jpg'
            ],
            [
                'id' => 2,
                'title' => '1984',
                'author' => 'George Orwell',
                'isbn' => '978-0451524935',
                'published_year' => 1949,
                'genre' => 'Science Fiction',
                'available' => true,
                'cover_image' => 'https://example.com/1984.jpg'
            ],
            [
                'id' => 3,
                'title' => 'To Kill a Mockingbird',
                'author' => 'Harper Lee',
                'isbn' => '978-0446310789',
                'published_year' => 1960,
                'genre' => 'Fiction',
                'available' => false,
                'cover_image' => 'https://example.com/mockingbird.jpg'
            ]
        ];

        return response()->json([
            'status' => 'success',
            'message' => 'Books retrieved successfully',
            'data' => $books
        ], 200);
    }

    public function show($id)
    {
        // Dummy data for a single book
        $book = [
            'id' => $id,
            'title' => 'The Great Gatsby',
            'author' => 'F. Scott Fitzgerald',
            'isbn' => '978-0743273565',
            'published_year' => 1925,
            'genre' => 'Fiction',
            'description' => 'The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.',
            'available' => true,
            'cover_image' => 'https://example.com/great-gatsby.jpg',
            'total_copies' => 5,
            'available_copies' => 3
        ];

        return response()->json([
            'status' => 'success',
            'message' => 'Book retrieved successfully',
            'data' => $book
        ], 200);
    }
}
