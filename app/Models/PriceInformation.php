<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceInformation extends Model
{
    use HasFactory;

    protected $table = "tbl_price_information";

    protected $fillable = [
        "book_fk",
        "delivery_charges",
        "special_charges",
        "extra_charges",
        "insurance_premium",
        "fuel_charges",
        "sales_tax",
        "net_amount",
        "time_definite",
        "edible",
        "holiday",
        "fragile",
    ];
}
