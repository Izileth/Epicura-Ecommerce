import Container from "@/components/template/Container";
import { CartPage } from "@/components/common/cart/cartPage";
export function CartListPage () {


    return(
        <Container className="h-auto flex flex-col justify-center items-center">
            <CartPage/>
        </Container>
    );
}