import { RegisterForm } from "@/components/common/auth/registerForm"
import Container from "@/components/template/Container"

export  function RegisterPage(){
    return(
        <Container className="h-screen flex flex-col justify-center items-center">
            <RegisterForm/>
        </Container>
    )
}