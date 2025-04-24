import { catchAsync } from '../../utils/catchAsync';
import { productServices } from './product.service';

// add product controller
const addProduct = catchAsync(async (req, res) => {
  const files = Array.isArray(req.files) ? req.files : [];
  const result = await productServices.addProductIntoDB(files, req.body);

  res.status(201).json({
    success: true,
    message: 'New product added successfully!',
    data: result,
  });
});

// fetch all products
const getAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductsFromDB(req.query);

  res.status(200).json({
    status: true,
    message: 'All products retrived successfully!',
    data: result,
  });
});

// fetch single product
const getSpecificProduct = catchAsync(async (req, res) => {
  const result = await productServices.getSpecificProductFromDB(req.params.id);

  res.status(200).json({
    status: true,
    message: 'Product retrived successfully!',
    data: result,
  });
});

// update a product
const updateProduct = catchAsync(async (req, res) => {
   const { id } = req.params;
   const payload = req.body;
   const images = req.files as Express.Multer.File[];
  const result = await productServices.updatedProductIntoDB(
    id,
    images,
    payload
  );

  res.status(200).json({
    success: true,
    message: 'Product updated succesfully!',
    data: result,
  });
});

// delete a product
const deleteProduct = catchAsync(async (req, res) => {
  const result = await productServices.deletedProductFromDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Product deleted succesfully!',
    data: result,
  });
});

export const productControllers = {
  addProduct,
  getAllProducts,
  getSpecificProduct,
  updateProduct,
  deleteProduct,
};
