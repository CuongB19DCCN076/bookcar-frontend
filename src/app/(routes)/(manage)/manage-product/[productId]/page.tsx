import getProductById from "@/actions/get-product-by-id"
import ProductForm from "./components/product-form"

const ProductIdPage = async ({
    params
}: {
    params: { productId: string }
}) => {
    var data = null;
    try {
        data = await getProductById(params.productId);
    } catch (err) {

    }
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductForm initialData={data} />
            </div>
        </div>
    )
}

export default ProductIdPage