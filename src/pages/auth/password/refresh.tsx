import { LoginForm } from "@/components/common/auth/loginForm"
import Container from "@/components/template/Container"
export function RefreshTokenPage(){
    return(
        <Container className="h-screen flex flex-col justify-center items-center">
            <LoginForm/>
        </Container>
    )
}