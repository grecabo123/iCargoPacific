<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblDeliveryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_delivery', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('book_fk');
            $table->foreign('book_fk')->references('id')->on('tbl_book')->onDelete('cascade')->onUpdate('cascade');
            $table->string('delivery_name');
            $table->string('delivery_email');
            $table->string('delivery_contact_number');
            $table->string('delivery_national_id');
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
        Schema::dropIfExists('tbl_delivery');
    }
}
