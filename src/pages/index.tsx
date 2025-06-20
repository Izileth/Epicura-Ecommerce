import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import Container from "@/components/template/Container";
import { GlobalBanner } from "@/components/template/Banner";
import { CategoryGrid } from "@/components/common/selector";

import { TestimonialCarousel } from "@/components/common/testmonial";
import { Testimonials } from "@/data/testmonial";
import { FeaturedBanner } from "@/components/common/banner";
import { FeaturesData } from "@/data/banner";
import PartnersSelector from "@/components/common/partner";
import { MinimalistCarousel } from "@/components/layout/carousel";
import { Partners } from "@/data/partners";
import { DataCarousel } from "@/data/carousel";
export function Page () {
    
    const navigate = useNavigate()



    const handleNavigate = () =>{
        navigate({ to: "/about" })
    }
    return(
        <Container className="h-auto flex flex-col justify-center items-center">
            <MinimalistCarousel
                items={DataCarousel}
                className="rounded-none  w-full text-left  items-center justify-center"
            />
            <CategoryGrid
                title="Nossas Categorias"
                className="grid-cols-2 sm:grid-cols-4 gap-4 p-4 w-full px-6"
            />
            <GlobalBanner
            title="Epicura - Sabores Sofisticados à Sua Mesa"
            description="Loja online de produtos alimentícios de luxo. Queijos artesanais, azeites premiados, vinhos exclusivos e muito mais direto até você"
            imageUrl="https://cdn.leonardo.ai/users/c60a0145-a4a8-4ee5-91cf-76495889e8b2/generations/4c1f6a4b-33e2-4b91-8a7b-33b4befc84c5/Leonardo_Kino_XL_Golden_sandy_paste_infused_with_pure_melange_1.jpg"
            rounded="none"
            textPosition="left"
            textColor="light"
            size="medium"
            className="mb-10"
            cta={<Button className="rounded-none font-light bg-zinc-50 text-zinc-900 px-6 hover:bg-zinc-300 " onClick={handleNavigate}>Navegar!</Button>}
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