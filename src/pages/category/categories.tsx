import Container from "@/components/template/Container";
import { CategoryProductsPage } from "@/components/common/categories/categoriesList";
export function ProductCategoryPage () {


    return(
        <Container className="h-auto flex flex-col justify-center items-center">
            <CategoryProductsPage/>
        </Container>
    );
}