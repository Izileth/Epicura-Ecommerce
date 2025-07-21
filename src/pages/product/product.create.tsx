import Container from "@/components/template/Container";
import { CreateProductPage } from "@/components/common/product/productCreateCard";
export function ProductCreatePage () {


    return(
        <Container className="h-auto flex flex-col justify-center items-center px-6">
            <CreateProductPage/>
 
        </Container>
    );
}