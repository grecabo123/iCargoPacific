<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ActivityLogs;
use Illuminate\Http\Request;

class ActivityLogsController extends Controller
{
    //

    public function Logs($id){

        $data = ActivityLogs::where('user_fk',$id)->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }
}
