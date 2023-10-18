const product = require("../model/product");

const getAllproducts = async (req, resp) => {
  const { company, name, featured, sort } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = name;
  }

  // let apidata = product.find(queryObject);

  if (sort) {
    let sortfix = sort.replace();
    queryObject.sort = sortfix;
    // apidata = apidata.sort(sortfix);
  }
  console.log(queryObject);

  const myData = await product.find(queryObject).sort(sort);
  // console.log(myData);
  resp.status(200).json({ myData });
};

const getAllproductsTesting = async (req, resp) => {
  const myData = await product.find(req.query).sort("name -price");
  // console.log(
  //   "~ file:product.js~line 10 ~ getAllproductsTesting ~ req.query",
  //   req.query
  // );
  resp.status(200).json({ myData });
};

module.exports = { getAllproducts, getAllproductsTesting };
