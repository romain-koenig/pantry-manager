/**
 * Data coming from Open Food Fact / SIMPLIFIED
 */

const productsSimple = {
    "3123340003023": {
        "product_name_fr": "Jus d'Orange",
        "image_front_url": "https://static.openfoodfacts.org/images/products/312/334/000/3023/front_fr.27.400.jpg",
        "code": "3123340003023"
    },
    "3168930007432":
    {
        "product_name_fr": "Chips Barbecue",
        "image_front_url": "https://static.openfoodfacts.org/images/products/316/893/000/7432/front.13.400.jpg",
        "code": "3168930007432",
    },
    "3596710456727":
    {
        "product_name_fr": "Haricots verts",
        "image_front_url": "https://static.openfoodfacts.org/images/products/359/671/045/6727/front_fr.4.400.jpg",
        "code": "3596710456727"
    }
}


export default productsSimple;
// products[3123340003023].product.categories_tags.filter(x => x === 'en:plant-based-foods-and-beverages' ||
// x === 'en:plant-based-foods' || x === "en:plant-based-beverages").length > 0
