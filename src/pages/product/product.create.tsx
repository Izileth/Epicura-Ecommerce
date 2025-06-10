import { Button } from "@/components/ui/button";


import { useNavigate } from "@tanstack/react-router";

import Container from "@/components/template/Container";
import { CreateProductPage } from "@/components/common/product/productCreateCard";
export function ProductCreatePage () {
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate({ to: "/profile" })
    }
    return(
        <Container className="h-screen flex flex-col justify-center items-center">
            <CreateProductPage/>
            
            <Button onClick={handleNavigate}>Navegar!</Button>
        </Container>
    );
}