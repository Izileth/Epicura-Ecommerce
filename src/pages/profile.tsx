import { Button } from "@/components/ui/button";

import { useNavigate } from "@tanstack/react-router";

import Container from "@/components/template/Container";
export function ProfilePage () {
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate({ to: "/about" })
    }
    return(
        <Container className="h-screen flex flex-col justify-center items-center">
            <Button onClick={handleNavigate}>Navegar!</Button>
        </Container>
    );
}