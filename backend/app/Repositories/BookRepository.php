<?php

namespace App\Repositories;
use App\Models\Book;
use App\Repositories\Interfaces\BookInterface;
class BookRepository implements BookInterface 
{
    public function create(array $bookDetails): Book
    {
        return Book::create($bookDetails);
    }

    public function findById(int $id): ?Book
    {
        return Book::find($id);
    }

    public function update(Book $book, array $bookDetails): Book
    {
        $book->update($bookDetails);
        return $book;
    }

    public function delete(Book $book): void
    {
        $book->delete();
    }

    public function getAll(): array
    {
        return Book::all()->toArray();
    }
}