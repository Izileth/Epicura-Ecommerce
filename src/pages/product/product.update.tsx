
import Container from "@/components/template/Container";

import { EditProductPage } from "@/components/common/product/productUpdateCard";
export function ProductUpdatePage () {

    return(
        <Container className="h-auto flex flex-col justify-center items-center">

            <EditProductPage/>

        </Container>
    );
}