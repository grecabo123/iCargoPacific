<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PickUpDetails extends Model
{
    use HasFactory;

    protected $table = "tbl_pickup";

    protected $fillable = [
        "book_fk",
        "pick_name",
        "pick_email",
        "pick_contact_number",
        "pick_national_id",
        "city_fk",
        "address",
    ];
}
