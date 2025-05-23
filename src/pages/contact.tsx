import { Button } from "@/components/ui/button";

import { useNavigate } from "@tanstack/react-router";



export function ContactPage () {
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate({ to: "/orders" })
    }
    return(
    <Button onClick={handleNavigate}>Navegar!</Button>
    );
}