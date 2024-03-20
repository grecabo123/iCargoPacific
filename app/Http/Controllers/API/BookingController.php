<?php

namespace App\Http\Controllers\API;

use App\Models\ActivityLogs;
use App\Models\BookForm;
use App\Models\DeliveryDetails;
use App\Models\PickUpDetails;
use App\Models\PriceInformation;
use App\Models\Shipments;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    //

    public function BookingList(){
        $data = BookForm::orderBy('created_at','DESC')->get();

        return response()->json([
            "status"                =>          200,
            "data"                  =>          $data,
        ]);
    }

    public function RegisterBook(Request $request){

        $validate = Validator::make($request->all(), [
            "customer"              =>          "required",
            "branch"                =>          "required",
        ]);


        if($validate->fails()) {

            return response()->json([
                "error"             =>          $validate->messages(),          
            ]);
        }
        else{

            $book = new BookForm;
            $book->business_fk = $request->customer;
            $book->branch_fk = $request->branch;
            $book->service_type = $request->service_type;
            $book->tracking_number = rand(1111,9999)."".rand(111,999);
            $book->save();

            $delivery = new DeliveryDetails;
            $delivery->book_fk = $book->id;
            $delivery->delivery_name = $request->delivery_name;
            $delivery->delivery_email = $request->delivery_email;
            $delivery->delivery_contact_number = $request->delivery_contact;
            $delivery->delivery_national_id = $request->delivery_national;
            $delivery->city_fk = $request->delivery_city;
            $delivery->address = $request->delivery_address;
            $delivery->save();

            $pickup = new PickUpDetails;
            $pickup->book_fk = $book->id;
            $pickup->pick_name = $request->pickup_name;
            $pickup->pick_email = $request->pickup_email;
            $pickup->pick_contact_number = $request->pickup_contact;
            $pickup->pick_national_id = $request->pickup_national;
            $pickup->city_fk = $request->pickup_city;
            $pickup->address = $request->pickup_address;
            $pickup->save();

            $shipment = new Shipments;
            $shipment->book_fk = $book->id;
            $shipment->item_details = $request->ship_item;
            $shipment->special_details = $request->ship_special;
            $shipment->references_no = $request->ship_reference;
            $shipment->order_no = $request->ship_order;
            $shipment->pieces = $request->ship_pieces;
            $shipment->weight = $request->ship_weight;
            $shipment->insurance = $request->ship_insurance;
            $shipment->insured_items = $request->ship_insured;
            $shipment->amount = $request->ship_amount;
            $shipment->save();

            $price = new PriceInformation;
            $price->book_fk = $book->id;
            $price->delivery_charges = $request->deliver_charges;
            $price->special_charges = $request->special_charge;
            $price->fuel_charges = $request->fuel_charge;
            $price->time_definite = $request->timeamount;
            $price->edible = $request->edible;
            $price->holiday = $request->holiday;
            $price->fragile = $request->fragile;
            $price->save();


            $logs = new ActivityLogs;

            $logs->description = "Book Form Added";
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,
            ]);
            // $price->extra_charges = $request->

        }
    }
}
