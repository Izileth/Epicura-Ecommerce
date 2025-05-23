import { Button } from "@/components/ui/button";

import { useNavigate } from "@tanstack/react-router";


export function OrdersPage () {
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate({ to: "/products" })
    }
    return(
        <Button onClick={handleNavigate}>Navegar!</Button>
    );
}