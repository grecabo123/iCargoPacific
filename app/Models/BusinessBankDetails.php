<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessBankDetails extends Model
{
    use HasFactory;

    protected $table = "tbl_business_bank_details";

    protected $fillable = [
        "bank_name",
        "account_title",
        "account_number",
        "branch_name",
        "branch_code",
        "swift_code",
        "ntn",
        "stn",
        "iban",
        "user_fk",
    ];
}
