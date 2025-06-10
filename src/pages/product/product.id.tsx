import { Button } from "@/components/ui/button";


import { useNavigate } from "@tanstack/react-router";

import Container from "@/components/template/Container";
import { DetailsProduct } from "@/components/common/product/productIdCard";
export function ProductDetailsPage () {
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate({ to: "/profile" })
    }
    return(
        <Container className="h-screen flex flex-col justify-center items-center">
            <DetailsProduct/>

            <Button onClick={handleNavigate}>Navegar!</Button>
        </Container>
    );
}