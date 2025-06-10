import { Button } from "@/components/ui/button";


import { useNavigate } from "@tanstack/react-router";

import Container from "@/components/template/Container";

import { UserProductsList } from "@/components/common/product/productUserList";
export function ProductUserPage () {
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate({ to: "/profile" })
    }
    return(
        <Container className="h-screen flex flex-col justify-center items-center">

            <UserProductsList userId={""}/>

            <Button onClick={handleNavigate}>Navegar!</Button>
        </Container>
    );
}