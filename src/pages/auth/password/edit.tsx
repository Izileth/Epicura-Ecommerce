import { SettingsPasswordForm } from "@/components/common/password/editPasswordForm"
import Container from "@/components/template/Container"
export function SettingsPasswordPage(){
    return(
        <Container className="h-auto flex flex-col justify-center items-center">
            <SettingsPasswordForm/>
        </Container>
    )
}