/* eslint-disable no-underscore-dangle */
import Faker from 'faker';
import UserModel from '../model/user';
// import OrderModel from '../model/order';
import ProductModel from '../model/product';
import CategoryModel from '../model/category';
import SubCategoryModel from '../model/category';
import CompanyModel from '../model/company';

const Person = {
  firstName: Faker.name.lastName(),
  lastName: Faker.name.firstName(),
  age: Faker.random.number(45),
  job: Faker.name.jobTitle(),
};

console.log('this is a fake person', Person);


// create a category 
const Category = {
  name: Faker.commerce.product(),
};

const SubCategory = {
  name: Faker.commerce.product(),
};

const Product = {
  name: Faker.commerce.productName(),
  price: Faker.commerce.price(),
  discount: Faker.commerce.price(10),
  image: Faker.image.fashion(),
  status: 0,
};

const Comapny = {
  name: Faker.company.companyName(),
  contact: Faker.phone.phoneNumber(),
  location: Faker.address.streetAddress(),
  docs: {
    url: Faker.image.image(),
    type: 'regID',
    regID: 'ade343fd323233ab334',
  },
  status: 0,
};
// create category in the db
CategoryModel.create(Category)
  .then((cat) => {
    // create a sub category
    SubCategory.category = cat._id;

    SubCategoryModel.create(SubCategory)
      .then((subCat) => {
        console.log('sub category has been created', subCat);

        // create a company
        CompanyModel.create(Comapny)
          .then((company) => {
            console.log('we have created a company');
            // create a product
            Product.owner = company._id;
            Product.category = cat._id;
            Product.subcategory = subCat._id;
            ProductModel.create(Product)
              .then((product) => {
                console.log('we have created a new product', product);
              });
          });
      });
  });
