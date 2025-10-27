<?php

namespace App\Repositories\Interfaces;

use App\Models\Book;
interface BookInterface 
{
    public function create(array $bookDetails): Book;
    public function findById(int $id): ?Book;
    public function update(Book $book, array $bookDetails): Book;
    public function delete(Book $book): void;
    public function getAll(): array;
}