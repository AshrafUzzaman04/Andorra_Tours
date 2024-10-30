<?php

namespace Database\Seeders;

use App\Models\Webcam;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WebcamsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "content_for" => "section_one",
                "title"=> "Don't let monotony get to you!",
                "sub_title"=> "Access the Grandvalira webcams live: Soldeu, Pas de la Casa, Grau Roig, Encamp, Canillo, El Tarter, Pal Arinsal and Arcalis.",
            ],
            [
                "content_for" => "section_two",
                "title"=> "Map of the slopes",
                "sub_title"=> "can you find the best slopes for you?",
            ]
        ];

        foreach ($data as $item) {
            Webcam::create($item);
        }
    }
}
