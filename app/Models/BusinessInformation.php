<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessInformation extends Model
{
    use HasFactory;

    protected $table = "tbl_business_information";

    protected $fillable = [
        "business_name",
        "business_address",
        "status_form",
        "city_fk",
        "branch_fk",
        "user_fk",
        "national_id",
        "national_id_file",
        "logo_img",
    ];
}
