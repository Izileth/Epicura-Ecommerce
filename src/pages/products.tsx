import { Button } from "@/components/ui/button";

import { useNavigate } from "@tanstack/react-router";


export function ProductPage () {
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate({ to: "/profile" })
    }
    return(
    <Button onClick={handleNavigate}>Navegar!</Button>
    );
}