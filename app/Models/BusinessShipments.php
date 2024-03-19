<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessShipments extends Model
{
    use HasFactory;

    protected $table = "tbl_business_shipment";

    protected $fillable = [
        "website",
        "product_fk",
        "user_fk",
        "average_shipments",

    ];
}
