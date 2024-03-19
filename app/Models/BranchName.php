<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BranchName extends Model
{
    use HasFactory;
    protected $table = "tbl_branch";

    protected $fillable = [
        "branch_name",
    ];
}
