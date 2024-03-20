<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblShipmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_shipment', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('book_fk');
            $table->foreign('book_fk')->references('id')->on('tbl_book')->onDelete('cascade')->onUpdate('cascade');
            $table->longText('item_details');
            $table->longText('special_details');
            $table->string('references_no');
            $table->string('order_no');
            $table->bigInteger('pieces');
            $table->double('weight',10,2);
            $table->string('insurance');
            $table->string('insured_items');
            $table->double('amount',10,2);
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
        Schema::dropIfExists('tbl_shipment');
    }
}
