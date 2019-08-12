import SubCategoryController from '../controller/subcategory';
import Serializer from '../serializer/subcategory';

class SubCategoryRoute {
  constructor(apiRouter) {
    this.router = apiRouter;
    this.SubCategoryRoutes();
  }

  SubCategoryRoutes() {
    this.router.get('/v1/subcategories', (req, res) => {
      SubCategoryController.getSubCategories()
        .then((data) => {
          const jsonapiData = Serializer.serialize(data);
          res.status(200).send(jsonapiData);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    });

    this.router.get('/v1/subcategories/:id', (req, res) => {
      SubCategoryController.getCategory(req.params.id)
        .then((subcategory) => {
          const jsonapiData = Serializer.serialize(subcategory);
          res.status(200).json(jsonapiData);
        })
        .catch(() => {
          res.status(500).json('sorry! an error occurred while fetching records');
        });
    });

    this.router.post('/v1/subcategories', (req, res) => {
      const { subcategory } = req.body;
      SubCategoryController.createCategory(subcategory)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    });

    this.router.put('/v1/subcategories', (req, res) => {
      const { subcategory } = req.body;
      SubCategoryController.updateSubCategory(subcategory)
        .then((data) => {
          const jsonapiData = Serializer.serialize(data);
          res.status(200).send(jsonapiData);
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    });

    this.router.delete('/v1/subcategories', (req, res) => {
      SubCategoryController.removeSubCategory({ req })
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

export default SubCategoryRoute;
