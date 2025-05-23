import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";


export function HomePage () {
    
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate({ to: "/about" })
    }
    return(
        <Button onClick={handleNavigate}>Navegar!</Button>
    );
}