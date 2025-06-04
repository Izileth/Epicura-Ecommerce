import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import Container from "@/components/template/Container";
import { GlobalBanner } from "@/components/template/Banner";
import CategorySelector from "@/components/common/selector";
import { Categories } from "@/data/seletor";
import TestimonialCarousel from "@/components/common/testmonial";
import { Testimonials } from "@/data/testmonial";
import FeaturedBanner from "@/components/common/banner";
import { FeaturesData } from "@/data/banner";
import PartnersSelector from "@/components/common/partner";
import { Partners } from "@/data/partners";
export function Page () {
    
    const navigate = useNavigate()


    const handleNavigate = () =>{
        navigate({ to: "/about" })
    }
    return(
        <Container className="h-auto flex flex-col justify-center items-center">
            <GlobalBanner
            title="Epicura - Sabores Sofisticados à Sua Mesa"
            description="Loja online de produtos alimentícios de luxo. Queijos artesanais, azeites premiados, vinhos exclusivos e muito mais direto até você"
            imageUrl="https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/a2ea6035-a739-4629-9f7b-48d2ec9cafff/AlbedoBase_XL_Macro_shot_of_luxury_food_ingredients_truffle_oi_3.jpg"
            rounded="none"
            textPosition="left"
            textColor="light"
            size="medium"
            className="mb-10"
            cta={<Button className="rounded-none font-light bg-zinc-50 text-zinc-900 px-6 hover:bg-zinc-300 " onClick={handleNavigate}>Navegar!</Button>}
            />
            <CategorySelector
                categories={Categories}
                title="Navegação Rápida"
                className="grid-cols-2 sm:grid-cols-4 gap-4 p-4 "
            />
            <TestimonialCarousel
                testimonials={Testimonials}
                title="Depoimentos"
                showNavigation={false}
                showPagination={true}
                autoPlay={true}
                autoPlayInterval={4000}
                className="p-4"
                itemsPerView={{
                mobile: 1,
                tablet: 1,
                desktop: 1
                }}
            />
            <FeaturedBanner
                items={FeaturesData}
                title="Tendências"
                layout="minimal"
                showMeta={false}
                className="p-4"
            />
            <PartnersSelector
                partners={Partners}
                className="bg-gray-50"
            />
        </Container>
    );
}