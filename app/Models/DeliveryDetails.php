<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryDetails extends Model
{
    use HasFactory;

    protected $table = "tbl_delivery";
    
    protected $fillable = [
        "book_fk",
        "delivery_name",
        "delivery_email",
        "delivery_contact_number",
        "delivery_national_id",
        "city_fk",
        "address",
    ];
}
