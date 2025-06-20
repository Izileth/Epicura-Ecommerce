
import Container from "@/components/template/Container";

import { PublicProductsList } from "@/components/common/product/productList";

export function ProductPublicPage () {

    return(
        <Container className="h-auto flex flex-col justify-center items-center gap-10">
            <Container className="h-autoflex flex-col justify-center items-center p-2 md:p-6">
                <PublicProductsList/>
            </Container>

        </Container>
    );
}