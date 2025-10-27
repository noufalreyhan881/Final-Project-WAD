<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'publisher',
        'publishYear',
        'category_id',
        'availableCopies',
        'totalCopies',
        'cover',
        'description',
    ];

    protected $casts = [
        'publishYear' => 'integer',
        'availableCopies' => 'integer',
        'totalCopies' => 'integer',
    ];

    public $timestamps = true;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
   
    public function coverURLImage(): string
    {
       try {
           return asset('storage/covers/' . $this->cover);
       } catch (\Exception $e) {
           return asset('images/default-cover.png');
       }
    }
}
