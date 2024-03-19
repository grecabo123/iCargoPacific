<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessContact extends Model
{
    use HasFactory;

    protected $table = "tbl_business_contact";

    protected $fillable = [
        "contact_person",
        "contact_number",
        "user_fk",
    ];
}
