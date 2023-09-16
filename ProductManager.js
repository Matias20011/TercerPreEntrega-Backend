import  {promises as fsPromises} from "fs";


class ProductManager {
  constructor(path) {
      this.path = path;
  }

    static id = 0

    addProduct = async (title, description, price, imagen, code, stock) => {
        ProductManager.id++   
        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id
        };

    this.products.push(newProduct);
        
        
        await fsPromises.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fsPromises.readFile(this.patch, "utf-8");
        return JSON.parse(respuesta)
    }    

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
       return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)){
            console.log("Producto no Encontrado")
        } else {
          console.log(respuesta3.find(product => product.id === id))
        }
    
    };

    deleteProductsById = async () => {
        let respuesta3 = await this.readProducts();
        let productsFilter = respuesta3.filter(products => products.id != id)
        await fsPromises.writefile(this.patch, JSON.stringify(productsFilter));
        console.log("Producto Eliminado")
    };
    
    
    updateProducts = async ({id, ...producto}) => {
       await this.deleteProductsById(id);
       let productOld = await this.readProducts()
       console.log(productOld);
       let productsModif = [{...producto, id }, ...productOld];
       await fsPromises.writefile(this.patch, JSON.stringify(productsModif));
    };
}

export default ProductManager;

