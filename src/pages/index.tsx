
import Container from "@/components/template/Container";
import { CategoryGrid } from "@/components/common/selector";

import { MinimalistCarousel } from "@/components/layout/carousel";
import { DataCarousel } from "@/data/carousel";
export function Page () {
    
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
        </Container>
    );
}