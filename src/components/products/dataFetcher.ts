import type Product from '../../interfaces/Product';
import { getDefaultCards } from '../products/defaultCards';

export const fetchData = async (url: string): Promise<Product[]> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return getDefaultCards();
    }
};
