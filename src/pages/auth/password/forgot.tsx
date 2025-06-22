import { ForgotPasswordForm } from "@/components/common/password/forgotPasswordForm"
import Container from "@/components/template/Container"
export function FogotPasswordPage(){
    return(
        <Container className="h-screen flex flex-col justify-center items-center">
            <ForgotPasswordForm/>
        </Container>
    )
}