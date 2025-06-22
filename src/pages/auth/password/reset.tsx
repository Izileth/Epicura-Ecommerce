import { ResetPasswordForm } from "@/components/common/password/resetPasswordForm"
import Container from "@/components/template/Container"
export function ResetPasswordPage(){
    return(
        <Container className="h-screen flex flex-col justify-center items-center">
            <ResetPasswordForm/>
        </Container>
    )
}