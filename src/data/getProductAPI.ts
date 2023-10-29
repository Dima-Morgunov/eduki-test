import { Language, Product } from "./types/product";

const token = "";

export interface ProductsResponse {
    code: string;
    errors: [];
    status: "success";
    data: {
        items: {
            materials: Product[];
            suggestion: null;
        };
        total: number;
    };
}

export const getProductsAPI = async (
    searchQuery: string = "",
    page: number = 1,
    limit: number = 20,
    world: Language = Language.DE
) => {
    const baseUrl = "https://api.eduki.com/api/v1/elastic";
    let url = `${baseUrl}?limit=${limit}&p=${page}&world=${world}`;

    if (searchQuery) {
        url = `${url}&q=${searchQuery}`;
    }
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.ok) {
        const result: ProductsResponse = await response.json();
        return result
    }
};