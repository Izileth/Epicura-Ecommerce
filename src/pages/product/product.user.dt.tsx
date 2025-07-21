import Container from "@/components/template/Container";
import { useAuth } from "@/hooks/useAuth";
import { UserProductsList } from "@/components/common/product/productUserList";
export function ProductUserPage () {
    const { user } = useAuth();
    
    if (!user) {
        return <div>Carregando...</div>;
    }

    return(
        <Container className="h-auto flex flex-col justify-center items-center px-2">
            <UserProductsList userId={user.id} />
        </Container>
    );
}