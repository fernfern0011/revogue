import { backendUrl } from "../../../config"

export default async function getAllProducts() {
    const res = await fetch(`${backendUrl}/api/product/get-all-products`,
        { headers: { "Content-Type": "application/json" }, next: { revalidate: 60 }},
    );

    if (!res.ok) throw new Error(`failed to fetch product`)

    return res.json();
}