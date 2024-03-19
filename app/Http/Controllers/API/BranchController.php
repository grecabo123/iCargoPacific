<?php

namespace App\Http\Controllers\API;

use App\Models\ActivityLogs;
use App\Models\BranchName;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class BranchController extends Controller
{
    //

    public function BranchName(){

        $data = BranchName::orderBy('branch_name','ASC')->get();
        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function AddBranch(Request $request){

        $validate = Validator::make($request->all(), [
            "branch"            =>      "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "status"        =>          $validate->messages(),
            ]);
        }
        else{

            $data = new BranchName;

            $data->branch_name = $request->branch;
            $data->save();

            $logs = new ActivityLogs;

            $logs->description = "Branch Added". " ". $request->branch;
            $logs->user_fk = $request->user_fk;
            $logs->save();
            return response()->json([
                "status"            =>          200,
            ]);

        }
    }

    public function UpdateBranch(Request $request){

        $data = BranchName::find($request->id);

        if($data) {
            $data->branch_name = $request->branch_name;
            $data->update();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function RemoveBranch($id) {
        $data = BranchName::find($id);
        if($data) {
            $data->delete();
            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
}
