<?php

namespace Database\Seeders;

use App\Models\CompanyPromotion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanyPromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "content_for" => "section_one",
                "title" => "Impulsa el éxito de tu negocio con nuestra plataforma turística",
                "sub_title" => "Nos dedicamos a brindar a nuestros clientes una experiencia turística inigualable, guiándolos hacia los destinos más destacados para visitar, comprar, disfrutar del ocio, degustar la mejor gastronomía y encontrar el alojamiento perfecto, entre otros servicios. Además, ofrecemos a nuestros socios comerciales una valiosa oportunidad para promocionar sus productos y servicios, conectándolos con un público deseoso de descubrir lo mejor en cada rincón.",
                "pricing_cards" => null,
                "description" => null,
                "company_benifits" => null,
                "image" => null,
                "status" => "Active",
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "content_for" => "section_two",
                "title" => "Te ayudamos a llegar a más clientes",
                "sub_title" => "Dar vouchers de descuentos es una estrategia versátil que puede beneficiar a tu negocio al atraer, retener y motivar a los clientes, así como impulsar las ventas y promocionar productos o servicios específicos.",
                "pricing_cards" => null,
                "description" => null,
                "company_benifits" => null,
                "image" => null,
                "status" => "Active",
                "created_at" => now(),
                "updated_at" => now(),
            ]
        ];

        foreach ($data as $item) {
            CompanyPromotion::create($item);
        }
    }
}
