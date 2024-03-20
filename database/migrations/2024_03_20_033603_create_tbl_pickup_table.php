<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPickupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_pickup', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('book_fk');
            $table->foreign('book_fk')->references('id')->on('tbl_book')->onDelete('cascade')->onUpdate('cascade');
            $table->string('pick_name');
            $table->string('pick_email');
            $table->string('pick_contact_number');
            $table->string('pick_national_id');
            $table->unsignedBigInteger('city_fk');
            $table->foreign('city_fk')->references('id')->on('tbl_city')->onDelete('cascade')->onUpdate('cascade');
            $table->string('address');
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
        Schema::dropIfExists('tbl_pickup');
    }
}
