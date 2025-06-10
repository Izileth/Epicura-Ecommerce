import { Button } from "@/components/ui/button";


import { useNavigate } from "@tanstack/react-router";

import Container from "@/components/template/Container";

import { EditProductPage } from "@/components/common/product/productUpdateCard";
export function ProductUpdatePage () {
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate({ to: "/profile" })
    }
    return(
        <Container className="h-screen flex flex-col justify-center items-center">

            <EditProductPage/>
            
            <Button onClick={handleNavigate}>Navegar!</Button>
        </Container>
    );
}