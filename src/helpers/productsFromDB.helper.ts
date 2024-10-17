import type { IProduct } from "~/Interfaces/IProduct";

const APIURL = process.env.NEXTAUTH_URL;

export async function getProductsFromDb ():  Promise<IProduct[]> {

    try {
        const response = await fetch (`${APIURL}/products`,{
            method: 'GET',
            next: {revalidate: 1200}
        });
        const products: IProduct[] = await response.json();
        return products;
        
    } catch (error) {
        
    }    
}