
import { catchAsync } from '../../utils/catchAsync';
import { brandServices } from './brand.service';

// add brand controller
const addBrand = catchAsync(async (req, res) => {
  const files = req.files as { [name: string]: Express.Multer.File[] };
  const image = files?.image?.[0];
  const logo = files?.logo?.[0];

  console.log(image, logo, req.body);

  const result = await brandServices.addBrandIntoDB(req.body, image, logo);

  res.status(201).json({
    success: true,
    message: 'New Brand added successfully!',
    data: result,
  });
});

// fetch all brands
const getAllBrands = catchAsync(async (req, res) => {
  const result = await brandServices.getAllBrandsFromDB(req.body);

  res.status(200).json({
    status: true,
    message: 'All Brands retrived successfully!',
    data: result,
  });
});

// update a brand
const updateBrand = catchAsync(async (req, res) => {
  const result = await brandServices.updatedBrandIntoDB(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: 'Brand updated succesfully!',
    data: result,
  });
});

// delete a brand
const deleteBrand = catchAsync(async (req, res) => {
  const result = await brandServices.deletedBrandFromDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Brand deleted succesfully!',
    data: result,
  });
});

export const brandControllers = {
  addCategory: addBrand,
  getAllBrands,
  updateBrand,
  deleteBrand,
};
