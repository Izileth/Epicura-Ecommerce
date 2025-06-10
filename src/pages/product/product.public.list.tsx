import { Button } from "@/components/ui/button";


import { useNavigate } from "@tanstack/react-router";

import Container from "@/components/template/Container";

import { PublicProductsList } from "@/components/common/product/productList";

export function ProductPublicPage () {
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate({ to: "/profile" })
    }
    return(
        <Container className="h-auto flex flex-col justify-center items-center gap-10">
            <Container className="h-autoflex flex-col justify-center items-center p-6">
                <PublicProductsList/>
            </Container>

            <Container className="h-auto flex flex-col justify-center items-center">
                    <Button onClick={handleNavigate}>Navegar!</Button>
            </Container>

        </Container>
    );
}