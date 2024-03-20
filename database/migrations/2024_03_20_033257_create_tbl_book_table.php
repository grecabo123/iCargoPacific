<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblBookTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_book', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('business_fk');
            $table->foreign('business_fk')->references('id')->on('tbl_business_information')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('branch_fk');
            $table->foreign('branch_fk')->references('id')->on('tbl_branch')->onDelete('cascade')->onUpdate('cascade');
            $table->tinyInteger('service_type')->default(1);
            $table->string('tracking_number');
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
        Schema::dropIfExists('tbl_book');
    }
}
