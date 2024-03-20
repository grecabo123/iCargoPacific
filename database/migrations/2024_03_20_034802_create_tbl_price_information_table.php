<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPriceInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_price_information', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('book_fk');
            $table->foreign('book_fk')->references('id')->on('tbl_book')->onDelete('cascade')->onUpdate('cascade');
            $table->double('delivery_charges',10,2);
            $table->double('special_charges',10,2);
            $table->double('extra_charges',10,2);
            $table->double('insurance_premium',10,2);
            $table->double('fuel_charges',10,2);
            $table->double('sales_tax',10,2);
            $table->double('net_amount',10,2);

            // Charges
            $table->double('time_definite',10,2);
            $table->double('edible',10,2);
            $table->double('holiday',10,2);
            $table->double('fragile',10,2);

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
        Schema::dropIfExists('tbl_price_information');
    }
}
