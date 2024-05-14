import type Category from '../../interfaces/Category.ts';
import type Product from '../../interfaces/Product.ts';

export const getDefaultCards = (): Product[] => [
    {
        id: 1,
        title: 'Sleek Mirror Finish Phone Case',
        price: 27,
        description:
            "Enhance your smartphone's look with this ultra-sleek mirror finish phone case. Designed to offer style with protection, the case features a reflective surface that adds a touch of elegance while keeping your device safe from scratches and impacts. Perfect for those who love a minimalist and modern aesthetic.",
        images: ['https://i.imgur.com/yb9UQKL.jpeg', 'https://i.imgur.com/m2owtQG.jpeg', 'https://i.imgur.com/bNiORct.jpeg'],
        creationAt: new Date('2024-05-05T05:05:28.404Z'),
        updatedAt: new Date('2024-05-05T05:05:28.404Z'),
        category: {
            id: 2,
            name: 'Electronics',
            image: 'https://i.imgur.com/ZANVnHE.jpeg',
            creationAt: new Date('2024-05-05T05:05:28.330Z'),
            updatedAt: new Date('2024-05-05T05:05:28.330Z'),
        } as Category,
    },
];
