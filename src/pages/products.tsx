import { Button } from "@/components/ui/button";

import Carousel from "@/components/template/Carousel";
import { DataCarousel } from "@/data/carousel";
import { useNavigate } from "@tanstack/react-router";

import Container from "@/components/template/Container";

export function ProductPage () {
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate({ to: "/profile" })
    }
    return(
        <Container className="h-screen flex flex-col justify-center items-center">
            <Carousel
                items={DataCarousel}
                variant="overlay"
                contentPosition="right"
                showDots={false}
                showProgress={true}
                height="h-[80vh]"
                className="mt-20"
            />
            <Button onClick={handleNavigate}>Navegar!</Button>
        </Container>
    );
}