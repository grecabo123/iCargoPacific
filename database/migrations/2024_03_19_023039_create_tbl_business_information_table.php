<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblBusinessInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_business_information', function (Blueprint $table) {
            $table->id();
            $table->string('business_name');
            $table->string('business_address');
            $table->tinyInteger('status_form')->default(0);
            $table->unsignedBigInteger('city_fk');
            $table->foreign('city_fk')->references('id')->on('tbl_city')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('branch_fk');
            $table->foreign('branch_fk')->references('id')->on('tbl_branch')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('user_fk');
            $table->foreign('user_fk')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string('national_id');
            $table->string('national_id_file');
            $table->string('logo_img');
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
        Schema::dropIfExists('tbl_business_information');
    }
}
