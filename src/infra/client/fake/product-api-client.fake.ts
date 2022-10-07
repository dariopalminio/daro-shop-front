
import { CategoryType } from 'domain/model/category/category.type';
import { IProductClient } from '../../../domain/service/product-client.interface';

/**
 * A Fake for Product http client thet may simulate the behavior of real impementation code and be a temporary substitute for this. 
 */
export default function ProductClientFake(): IProductClient {

    let productsFake: Map<string, any> = new Map();
    const products_01: any = {
        page: 1,
        limit: 6,
        count: 5,
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
                images: ["https://wallpaperaccess.com/full/5287561.jpg",
                    "https://wallpaperbat.com/img/11896-outrun-sunset-wallpaper.jpg",
                    "https://wallpapercave.com/wp/wp7972377.jpg"],
                grossPrice: 320,
                description: "Las pirámides digitales galácticas.",
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
        ]
    };
    const products_02: any = {
        page: 1,
        limit: 6,
        count: 2,
        list: [
            {
                _id: "5",
                sku: "1333",
                name: "Einstein",
                images: ["https://www.biografiasyvidas.com/monografia/einstein/fotos/einstein_1947.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/a/a0/Einstein_patentoffice.jpg"
                ],
                grossPrice: 100,
                description: "Obras de Albert Einstein completas.",
                stock: 1,
                category: "toy"
            },
            {
                _id: "8",
                sku: "1333",
                name: "Einstein",
                images: [
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Albert_Einstein_photo_1920.jpg/1200px-Albert_Einstein_photo_1920.jpg",
                    "https://historia.nationalgeographic.com.es/medio/2018/02/27/einstein3__550x807.JPG"],
                grossPrice: 100,
                description: "Obras de Albert Einstein completas.",
                stock: 1,
                category: "toy"
            },
        ]
    };
    const products_03: any = {
        page: 1,
        limit: 6,
        count: 1,
        list: [
            {
                _id: "9",
                sku: "13333",
                name: "Stallman",
                images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Richard_Matthew_Stallman.jpeg/1200px-Richard_Matthew_Stallman.jpeg",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/RMS_iGNUcius_techfest_iitb.JPG/1200px-RMS_iGNUcius_techfest_iitb.JPG"],
                grossPrice: 100,
                description: "Obras de Richard Stallman.",
                stock: 1,
                category: "toy"
            },
        ]
    };

    const listOfAll: [] = (products_01.list.concat(products_02.list)).concat(products_03.list);
    const products_all: any = {
        page: 1,
        limit: listOfAll.length,
        count: listOfAll.length,
        list: listOfAll
    };

    productsFake.set("Category 1", products_01);
    productsFake.set("Category 2", products_02);
    productsFake.set("Category 3", products_03);

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
            "https://wallpaperaccess.com/full/5287561.jpg",
            "https://www.biografiasyvidas.com/monografia/einstein/fotos/einstein_1947.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/a/a0/Einstein_patentoffice.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Albert_Einstein_photo_1920.jpg/1200px-Albert_Einstein_photo_1920.jpg",
            "https://historia.nationalgeographic.com.es/medio/2018/02/27/einstein3__550x807.JPG"
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
            "_id": "6338708186b0c1591fc3b123",
            "name": "Category 3",
            "description": "Category 3 description",
            "__v": 0
        }
    ];

    /**
     * Stub function
     */
    function getCatalog(category: string, page: number, limit: number, orderBy: string): Promise<any> {
        
        return new Promise<any>((resolve, reject) => {
            let data: any = products_all;
            if (category && (category.trim() !== ''))
                data = productsFake.get(category) as any;
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
