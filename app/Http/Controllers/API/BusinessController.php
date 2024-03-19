<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class BusinessController extends Controller
{
    //

    public function RegisterBusiness(Request $request){

        $validate = Validator::make($request->all(), [
            "business_name"                 =>          "required",
            "national_id"                   =>          "required",
            "business_address"              =>          "required",
            "contact_person"                =>          "required",
            "mobile_number"                 =>          "required",
            "email"                         =>          "required",
            "url"                           =>          "required",
            "shipments"                     =>          "required",
            "bank_name"                     =>          "required",
            "account_title"                 =>          "required",
            "account_number"                =>          "required",
            "branch_name"                   =>          "required",
            "branch_code"                   =>          "required",
            "swift_code"                    =>          "required",
            "ntn"                           =>          "required",
            "stn"                           =>          "required",
            "iban"                          =>          "required",
            "password"                      =>          "required",
            "logofile"                      =>          "required",
            "nationalfile"                  =>          "required",
            "pickcity"                      =>          "required",
            "branchpick"                    =>          "required",
            "product_pick"                  =>          "required",
            "bookingenable"                 =>          "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"             =>          $validate->messages(),
            ]);
        }
        else{

            
        }
    }
}
