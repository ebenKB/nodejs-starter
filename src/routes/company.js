import Serializer from  '../serializer/company';
import CompanyController from '../controller/company';

class CompanyRoute {
  constructor(apiRouter) {
    this.router = apiRouter;
    this.CompanyRoutes();
    this.Serializer = Serializer;
  }

  CompanyRoutes() {
    this.router.get('/v1/company', (req, res) => {
      CompanyController.getCompanies()
        .then((data) => {
          const jsonapiData = Serializer.serialize(data);
          res.status(200).send(jsonapiData);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    });

    this.router.get('/v1/company/:id', (req, res) => {
      const { id } = req.params;
      CompanyController.getCompanyById(id)
        .then((company) => {
          const jsonapiData = Serializer.serialize(company);
          res.status(200).json(jsonapiData);
        })
        .catch(() => {
          res.status(500).send('an error occured while updating the record');
        });
    });

    this.router.post('/v1/company', (req, res) => {
      const { company } = req.body;
      CompanyController.createNewComapny(company)
        .then((data) => {
          const jsonapiData = Serializer.serialize(data);
          res.status(200).json(jsonapiData);
        })
        .catch(() => {
          res.status(500).send('an error occured while creating a new record');
        });
    });

    this.router.put('/v1/company/:id', (req, res) => {
      CompanyController.updateCompany(req.params.id, req.body.company)
        .then((updated) => {
          const jsonapiData = Serializer.serialize(updated);
          res.status(200).json(jsonapiData);
        })
        .catch(() => {
          res.status(500).json('an error occured while updating the record');
        });
    });

    this.router.delete('/v1/company/:id', (req, res) => {
      const { id } = req.params;
      CompanyController.deleteCompany(id)
        .then((deleted) => {
          const jsonapiData = Serializer.serialize(deleted);
          res.status(200).json(jsonapiData);
        })
        .catch(() => {
          res.send(500).send('an error occured while updating the record');
        });
    });
  }
}
export default CompanyRoute;
