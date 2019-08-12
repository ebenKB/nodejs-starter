import ProductController from '../controller/product';
import Serializer from '../serializer/product';

class ProductRoute {
  constructor(apiRouter) {
    this.router = apiRouter;
    this.ProductRoutes();
    this.Serializer = Serializer;
  }

  ProductRoutes() {
    this.router.get('/v1/products', (req, res) => {
      ProductController.getProducts()
        .then((products) => {
          this.sendSuccess(products, res);
        })
        .catch((err) => {
          res.status(500).json({ err: `an error occured while fetching the products.. ${err}` });
        });
    });

    this.router.get('/v1/product/:id', (req, res) => {
      ProductController.getProductById(req.params.id)
        .then((product) => {
          this.sendSuccess(product, res);
        })
        .catch(() => {
          res.status(500).json('an error occured while fetching the product');
        });
    });

    this.router.post('/v1/product', (req, res) => {
      ProductController.addNewProduct(req.body.product)
        .then((createdProduct) => {
          this.sendSuccess(createdProduct);
        })
        .catch(() => {
          res.status(500).send('an error while creating a new products');
        });
    });

    this.router.put('/v1/product/:id', (req, res) => {
      ProductController.updateProduct(req.params.id, req.body.product)
        .then((updated) => {
          this.sendSuccess(updated);
        })
        .catch(() => {
          res.status(500).send('something went wrong whle trying to update product');
        });
    });
  }

  sendSuccess(data, res) {
    const jsonapiData = this.Serializer.serialize(data);
    res.status(200).json(jsonapiData);
  }

  // eslint-disable-next-line class-methods-use-this
  sendError(msg, res) {
    res.status(500).send(msg);
  }
}


export default ProductRoute;
