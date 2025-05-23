import { Button } from "@/components/ui/button";

import { useNavigate } from "@tanstack/react-router";


export function AboutPage () {

    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate({ to: "/contact" })
    }
    
    return(
        <Button onClick={handleNavigate}>Navegar!</Button>
    );
}