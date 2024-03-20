<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookForm extends Model
{
    use HasFactory;

    protected $table = "tbl_book";

    protected $fillable = [
        "business_fk",
        "branch_fk",
        "service_type",
        "tracking_number"
    ];
}
