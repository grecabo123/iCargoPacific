<?php

namespace App\Http\Controllers\API;

use App\Models\ActivityLogs;
use App\Models\ProductType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ProductTypeController extends Controller
{
    //
    public function AddProduct(Request $request){

        $validate = Validator::make($request->all(), [
            "product"           =>          "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"         =>          $validate->messages(),
            ]);
        }
        else{
            $product = new ProductType;

            $product->product_name = $request->product;
            $product->save();

            $logs = new ActivityLogs;
            $logs->description = "Product Added". " ".$request->product;
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,

            ]);
        }
        
    }

    public function ProductType(){

        $data = ProductType::orderBy('product_name','ASC')->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function ProductUpdate(Request $request){

        $data = ProductType::find($request->id);

        if($data) {
            $data->product_name = $request->product_name;
            $data->update();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function Deactivate(Request $request){

        $data = ProductType::find($request->id);

        if($data){

            $data->status = $request->status == 1 ? 0 : 1;
            $data->update();
            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
}
