<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BranchName;
use App\Models\Cities;
use App\Models\ProductType;
use Illuminate\Http\Request;

class FetchAllController extends Controller
{
    //

    public function FetchAll(){

        $data = Cities::all();
        $branch = BranchName::all();
        $product = ProductType::all();

        return response()->json([
            "status"            =>          200,
            "city"              =>          $data,
            "branch"            =>          $branch,
            "product"           =>          $product,  
        ]);
    }
}
