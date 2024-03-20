<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipments extends Model
{
    use HasFactory;
    protected $table = "tbl_shipment";

    protected $fillable = [
        "book_fk",
        "item_details",
        "special_details",
        "references_no",
        "order_no",
        "pieces",
        "weight",
        "insurance",
        "insured_items",
        "amount",
    ];
}
