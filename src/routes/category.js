import CategoryController from '../controller/user';
import Serializer from '../serializer/category';

class CategoryRoute {
  constructor(apiRouter) {
    this.router = apiRouter;
    this.CategoryRoutes();
  }

  CategoryRoutes() {
    this.router.get('/v1/categories', (req, res) => {
      CategoryController.getCategories()
        .then((data) => {
          const jsonapiData = Serializer.serialize(data);
          res.status(200).send(jsonapiData);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    });

    this.router.get('/v1/categories/:id', (req, res) => {
      CategoryController.getCategory(req.params.id)
        .then((category) => {
          const jsonapiData = Serializer.serialize(category);
          res.status(200).json(jsonapiData);
        })
        .catch(() => {
          res.status(500).json('sorry! an error occured while fetching records');
        });
    });

    this.router.post('/v1/categories', (req, res) => {
      const { category } = req.body;
      CategoryController.createCategory(category)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    });

    this.router.put('/v1/categories', (req, res) => {
      const { category } = req.body;
      CategoryController.updateCategory(category)
        .then((data) => {
          const jsonapiData = Serializer.serialize(data);
          res.status(200).send(jsonapiData);
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    });

    this.router.delete('/v1/categories', (req, res) => {
      CategoryController.deleteCategory({ req })
        .then((data) => {
          const jsonapiData = Serializer.serialize(data);
          res.status(200).json(jsonapiData);
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    });
  }
}

export default CategoryRoute;
