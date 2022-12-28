import { Router } from "express";
import Product from "../Model/Product";

const router = Router();

//Add or Create Product
router.post("/add", async (req, res) => {
  const newProduct = await new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Get All Products
router.get("/", async (req, res) => {
  try {
    Product.find({}, function (err, products) {
      res.json(products);
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

//Get Product by brand
/*router.get("/:brand",async(req,res)=>{
    try{
        const productsFilteredByBrand = await Product.find({brand:req.params.brand})
        res.json(productsFilteredByBrand)
    }
    catch(err){
        res.status(404).json(err)
    }
    
})*/

//Get Product by Shoe Type
router.get("/shoes-type/:shoesType", async (req, res) => {
  try {
    const productsFilteredByShoesType = await Product.find({
      shoes_type: req.params.shoesType,
    });
    res.json(productsFilteredByShoesType);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Get Product By Size
router.get("/filter/bySize", async (req, res) => {
  try {
    const sizeArray = req.query;
    const filterProductBySize = await Product.find({
      availabe_size: { $in: sizeArray.size },
    });
    res.json(filterProductBySize);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Get Product By color
router.get("/filter/byColor", async (req, res) => {
  try {
    const sizeArray = req.query;
    const filterProductBySize = await Product.find({
      availabe_color: { $in: sizeArray.color },
    });
    res.json(filterProductBySize);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Get Product Filter by Color and Size
router.get("/filter/byColorAndSize", async (req, res) => {
  try {
    const values = req.query;

    /*const query = {
      ...(values.availabe_color && { availabe_color: {$in: values.color} }),
      ...(values.availabe_size && { availabe_size: {$in: values.size} }),
    };*/

    

    const filterProductBySizeAndColor = await Product.find( values.color && values.size? { $and:[ {availabe_color: { $in: values.color }}, { availabe_size: { $in: values.size } } ] } : values.color? {availabe_color: {$in: values.color}} :{availabe_size: {$in:values.size}} )

    //const filter = await Product.find({ $and:[ {availabe_color: { $in: values.color }}, { availabe_size: { $in: values.size } } ] })
    res.json(filterProductBySizeAndColor);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Filter by price
router.get("/filter/ByPrice", async (req, res) => {
  try {
    const value = req.query;
    const filterProductByPrice = await Product.find({
      $and: [
        { price: { $gte: +value.pgt } },
        { price: { $lte: +value.plt } },
      ],
    });
    res.json(filterProductByPrice);
  } catch (err) {
    res.status(404).json(err);
  }
});

//Get Product By Id
router.get("/:id", async (req, res) => {
  try {
    const filterProductByID = await Product.findById(req.params.id);
    res.json(filterProductByID);
  } catch (err) {
    res.status(404).json(err);
  }
});

export default router;
