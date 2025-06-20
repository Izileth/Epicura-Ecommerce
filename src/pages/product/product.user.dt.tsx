import Container from "@/components/template/Container";

import { UserProductsList } from "@/components/common/product/productUserList";
export function ProductUserPage () {

    return(
        <Container className="h-auto flex flex-col justify-center items-center">

            <UserProductsList userId={""}/>
 
        </Container>
    );
}