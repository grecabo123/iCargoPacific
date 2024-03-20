<?php

namespace App\Http\Controllers\API;

use App\Models\ActivityLogs;
use App\Models\BusinessBankDetails;
use App\Models\BusinessContact;
use App\Models\BusinessInformation;
use App\Models\BusinessShipments;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
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
            "email"                         =>          "required|email|unique:users,email",
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
            "logofile"                      =>          "required|mimes:jpg,jpeg,png",
            "nationalfile"                  =>          "required|mimes:jpg,jpeg,png",
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

            $user = new User;
            $user->name = $request->business_name;
            $user->email = $request->email;
            $user->role = 5;
            $user->password = Hash::make($request->password);
            $user->secret_key = $request->password;
            $user->save();

            $business_bank = new BusinessBankDetails;
            $business_bank->bank_name = $request->bank_name;
            $business_bank->account_title = $request->account_title;
            $business_bank->account_number = $request->account_number;
            $business_bank->branch_name = $request->branch_name;
            $business_bank->branch_code = $request->branch_code;
            $business_bank->swift_code = $request->swift_code;
            $business_bank->ntn = $request->ntn;
            $business_bank->stn = $request->stn;
            $business_bank->iban = $request->iban;
            $business_bank->user_fk = $user->id;
            $business_bank->save();

            $business_contact = new BusinessContact;
            $business_contact->contact_person = $request->contact_person;
            $business_contact->contact_number = $request->mobile_number;
            $business_contact->user_fk = $user->id;
            $business_contact->save();

            $business_shipement = new BusinessShipments;
            $business_shipement->website = $request->url;
            $business_shipement->product_fk = $request->product_pick;
            $business_shipement->user_fk = $user->id;
            $business_shipement->average_shipments = $request->shipments;
            $business_shipement->save();

            $business_information = new BusinessInformation;
            $business_information->business_name = $request->branch_name;
            $business_information->business_address = $request->business_address;
            $business_information->status_form = $request->bookingenable;
            $business_information->city_fk = $request->pickcity;
            $business_information->branch_fk = $request->branchpick;
            $business_information->user_fk = $user->id;
            $business_information->national_id = $request->national_id;

            if($request->hasFile('logofile') && $request->hasFile('nationalfile')){

                $file = $request->file('logofile');
                $extension = $file->getClientOriginalExtension();
                $filename = $request->business_name.".".$extension;
                $file->move('Uploads/Files/',$filename);
                $business_information->logo_img = "Uploads/Files/".$filename;
    
                $complete = $request->file('nationalfile');
                $extensionwhole = $complete->getClientOriginalExtension();
                $filenamecomplete = $request->business_name.".".$extensionwhole;
                $complete->move('Uploads/Files/',$filenamecomplete);
                $business_information->national_id_file = "Uploads/Files/".$filenamecomplete;
            }
            $business_information->save();

            $logs = new ActivityLogs;
            
            $logs->description = "Registered Business"." ".$request->business_name."";
            $logs->user_fk = $request->user_fk;
            $logs->save();


            return response()->json([
                "status"            =>          200,
            ]);

        }
    }

    public function BusinessAccount(){

        $business = User::leftjoin('tbl_business_information','tbl_business_information.user_fk','=','users.id')
            ->leftjoin('tbl_business_contact','tbl_business_contact.user_fk','=','users.id')
                ->leftjoin('tbl_city','tbl_city.id','=','tbl_business_information.city_fk')
                ->selectRaw('users.email,users.created_at,tbl_business_information.business_name,tbl_business_information.business_address,
                tbl_business_information.status_form,tbl_business_contact.contact_person,tbl_business_contact.contact_number,tbl_city.cities,
                tbl_business_information.logo_img,users.id')
                    ->where('users.role','!=',1)
                    ->get();
                
        return response()->json([
            "status"            =>              200,
            "data"              =>              $business,
        ]);

    }
}
