<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\BranchName;
use App\Models\Cities;
use App\Models\ProductType;
use App\Models\User;
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

    public function BookFetchData(){
        $data = Cities::all();
        $business = User::leftJoin('tbl_business_information','tbl_business_information.user_fk','=','users.id')
            ->selectRaw('tbl_business_information.business_name,users.id,tbl_business_information.id as business_id')
                ->where('users.role','!=',1)
                    ->get();
        $branch = BranchName::all();


        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
            "business"          =>          $business,
            "branch"            =>          $branch,
        ]);
    }
}
