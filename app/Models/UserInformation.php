<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInformation extends Model
{
    use HasFactory;
    protected $table = "tbl_user_information";

    protected $fillable = [
        "user_fk",
        "contact_number",
        "car_plate_number",
    ];
}
