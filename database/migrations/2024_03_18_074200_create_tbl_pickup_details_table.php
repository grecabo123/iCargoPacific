<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPickupDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_pickup_details', function (Blueprint $table) {
            $table->id();
            $table->string('pickup_name');
            $table->string('pickup_upcontact');
            $table->string('pickup_email');
            $table->string('pickup_national');
            $table->string('pickup_address');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_pickup_details');
    }
}
