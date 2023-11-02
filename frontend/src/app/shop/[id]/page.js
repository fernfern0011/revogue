import ItemPage from '@/app/components/ItemPage';

async function ProductPage(context) {
    const { id } = context.params;
    var itemData;

    try {
        // get item details
        const getItemRes = await fetch(`${process.env.backendUrl}/api/product?productid=${id}`, {
            headers: { "Content-Type": "application/json" }
        })

        const getItemStatus = getItemRes.status;

        if (getItemStatus == 200) {
            itemData = getItemRes.json();
        }

    } catch (error) {
        console.log(error);
    }

    return (
        <ItemPage id={id} itemDetails={itemData} />
    )
}

export default ProductPage;
