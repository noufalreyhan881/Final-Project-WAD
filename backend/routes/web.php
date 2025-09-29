<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/book', function () {
    $books = [
        [
            'id' => '1',
            'title' => 'Belajar React dan TypeScript',
            'author' => 'John Doe',
            'publisher' => 'Tech Publisher',
            'publishYear' => 2023,
            'category' => 'Teknologi',
            'availableCopies' => 5,
            'totalCopies' => 10,
            'cover' => null,
            'description' => 'Panduan lengkap mempelajari React dan TypeScript untuk pengembangan web modern.'
        ],
        [
            'id' => '2',
            'title' => 'Laravel for Beginners',
            'author' => 'Jane Smith',
            'publisher' => 'Web Dev Books',
            'publishYear' => 2024,
            'category' => 'Programming',
            'availableCopies' => 3,
            'totalCopies' => 7,
            'cover' => null,
            'description' => 'Tutorial dasar Laravel untuk pemula dalam pengembangan aplikasi web.'
        ]
    ];

    return response()->json($books, 200);
});
