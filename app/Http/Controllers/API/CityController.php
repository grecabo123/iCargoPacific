<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cities;
use Illuminate\Http\Request;

class CityController extends Controller
{
    //

    public function Cities(){

        $data = Cities::all();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }
}
