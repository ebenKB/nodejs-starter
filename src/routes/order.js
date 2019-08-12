import OrderController from '../controller/oder';
import Serializer from '../serializer/order';

class OrderRoute {
  constructor(apiRouter) {
    this.router = apiRouter;
    this.OrderRoute();
  }

  OrderRoute() {
    this.router.get('/v1/orders', (req, res) => {
      OrderController.getOrders()
        .then((orders) => {
          const jsonapiData = Serializer.serialize(orders);
          res.status(200).json(jsonapiData);
        })
        .catch(() => {
          res.status(500).send('an error occured while fetching orders');
        });
    });

    this.router.get('/v1/orders/:id', (req, res) => {
      const { id } = req.params;
      OrderController.getOrder(id)
        .then((order) => {
          const jsonapiData = Serializer.serialize(order);
          res.status(200).json(jsonapiData);
        })
        .catch(() => {
          res.status(500).send('an error occured while fetching order');
        });
    });

    this.router.post('/v1/orders', (req, res) => {
      const { order } = req.body;
      OrderController.createOrder(order)
        .then((created) => {
          const jsonapiData = Serializer.serialize(created);
          res.status(200).json(jsonapiData);
        })
        .catch(() => {
          res.status(500).send('an error occured while creating a new order');
        });
    });
  }
}
export default OrderRoute;
