
import { catchAsync } from '../../utils/catchAsync';
import { categoryServices } from './category.service';

// add category controller
const addCategory = catchAsync(async (req, res) => {
  const files = req.files as { [name: string]: Express.Multer.File[] };
  const image = files?.image?.[0];
  const icon = files?.icon?.[0];

  const result = await categoryServices.addCategoryIntoDB(
    req.body,
    image,
    icon
  );

  res.status(201).json({
    success: true,
    message: 'New category added successfully!',
    data: result,
  });
});

// fetch all categories
const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoriesFromDB(req.body);

  res.status(200).json({
    status: true,
    message: 'Categories retrived successfully!',
    data: result,
  });
});

// update a categories
const updateCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.updatedCategoryIntoDB(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: 'Category updated succesfully!',
    data: result,
  });
});

// delete a category
const deleteCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.deletedCategoryFromDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Category deleted succesfully!',
    data: result,
  });
});

export const categoryControllers = {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
