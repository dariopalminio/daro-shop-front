
import { CategoryType } from 'domain/model/category/category.type';
import { IProductClient } from '../../../domain/service/product-client.interface';

/**
 * A stub for Product http client thet may simulate the behavior of real impementation code and be a temporary substitute for this. 
 */
export default function ProductClientStub(): IProductClient {

    //Catalog of products hardcoded to simulation
    const productsFake  = {
        page:1,
        limit:6,
        count:6,
        list: [
        {
            _id: "1",
            sku: "1324",
            name: "Paisaje con palmeras",
            images: ["https://i.pinimg.com/originals/95/5d/e2/955de20dd2d6f457a1cfdadb8edc23d4.png"],
            grossPrice: 23.4,
            description: "Cuadro en oleo de u paisaje con palmeras realizado por el pintos Daro 2022.",
            stock: 1,
            category: "toy"
        },
        {
            _id: "2",
            sku: "1234",
            name: "Amanecer digital",
            images: ["https://wallpaperaccess.com/full/2918041.jpg"],
            grossPrice: 34.6,
            description: "Pintura impresión digital con motivo de Amanecer digital.",
            stock: 1,
            category: "toy"
        },
        {
            _id: "3",
            sku: "134",
            name: "Entre montañas 3D",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2SmahEEhWXut-9211CpUtZLrOljU8BfdnBUlt60UwBVemJ0rXC3T9-SEuMAfH6ttUmMg&usqp=CAU"],
            grossPrice: 50,
            description: "Pintura de Entre montañas 3D en colores violetas.",
            stock: 1, category: "toy"
        },
        {
            _id: "4",
            sku: "1222",
            name: "Las pirámides",
            images: ["https://wallpaperaccess.com/full/5287561.jpg", "https://wallpaperbat.com/img/11896-outrun-sunset-wallpaper.jpg", "https://wallpapercave.com/wp/wp7972377.jpg"],
            grossPrice: 320,
            description: "Las pirámides digitales galácticas.",
            stock: 1,
            category: "toy"
        },
        {
            _id: "5",
            sku: "1333",
            name: "Einstein",
            images: ["https://www.biografiasyvidas.com/monografia/einstein/fotos/einstein_1947.jpg", "https://historia.nationalgeographic.com.es/medio/2018/02/27/einstein3__550x807.JPG"],
            grossPrice: 100,
            description: "Obras de Albert Einstein completas.",
            stock: 1,
            category: "toy"
        },
        {
            _id: "6",
            sku: "1444",
            name: "Palmeras al sol",
            images: ["https://wallpaperbat.com/img/11896-outrun-sunset-wallpaper.jpg"],
            grossPrice: 88,
            description: "Ciadro primaveral de palmeras al sol.",
            stock: 1
        },
    ]};

    //Product Detail hardcoded to simulation
    const productDetailed: any = {
        "_id": "632df7695a88c40e4fa634f6",
        "sku": "PIJAMAS-RABAH",
        "barcode": "5111407592",
        "name": "Pijama Unisex Bebé Vaca",
        "description": "Pijama enterito para bebé diseño vaca",
        "images": [
            "https://wallpaperbat.com/img/11896-outrun-sunset-wallpaper.jpg",
            "https://wallpapercave.com/wp/wp7972377.jpg",
            "https://wallpaperbat.com/img/11896-outrun-sunset-wallpaper.jpg",
            "https://wallpaperaccess.com/full/5287561.jpg"
        ],
        "category": "Security",
        "type": "Pijama",
        "brand": "Vaca",
        "color": "Negro",
        "model": "Pulpo",
        "gender": "Unisex",
        "size": "M",
        "grossPrice": 13900,
        "stock": 6,
        "active": true,
        "__v": 0
    };

    const categories_fake = [
        {
            "_id": "6338707686b0c1591fc3b14b",
            "name": "Category 1",
            "description": "Category 1 description",
            "__v": 0
        },
        {
            "_id": "6338708186b0c1591fc3b14d",
            "name": "Category 2",
            "description": "Category 2 description",
            "__v": 0
        },
        {
            "_id": "6338709486b0c1591fc3b150",
            "name": "Category 3",
            "description": "Category 3 description",
            "__v": 0
        },
        {
            "_id": "6338709d86b0c1591fc3b152",
            "name": "Category 4",
            "description": "Category 4 description",
            "__v": 0
        }
    ];
    /**
     * Stub function
     */
    function getCatalog(category: string, page: number, limit: number, orderBy: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const data: any = productsFake;
            resolve(data);
        });
    };

    /**
     * Stub function
     */
    function getProductDetail(id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const data: any = productDetailed;
            resolve(data);
        });
    };

        /**
     * Stub function
     */
    function getCategories(): Promise<Array<CategoryType>> {
            return new Promise<any>((resolve, reject) => {
                const data: Array<CategoryType> = categories_fake;
                resolve(data);
            });
        };

    return {
        getCatalog,
        getProductDetail,
        getCategories
    };
};
