import { LoginForm } from "@/components/common/auth/loginForm"
import Container from "@/components/template/Container"
export function LoginPage(){
    return(
        <Container className="h-screen flex flex-col justify-center items-center">
            <LoginForm/>
        </Container>
    )
}