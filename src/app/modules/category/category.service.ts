import { IImageFile } from '../../interface';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { ICategory } from './category.interface';
import { Category } from './category.model';

// add a new category
const addCategoryIntoDB = async (
  payload: Partial<ICategory>,
  image: IImageFile,
  icon: IImageFile
) => {
  const result = await Category.create({
    ...payload,
    image: image?.path,
    icon: icon?.path,
  });
  console.log(result);
};

// fetch all categories
const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find(), query)
    .search(['name', 'slug'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await categoryQuery.modelQuery;
  const meta = await categoryQuery.countTotal();

  return {
    data: result,
    meta,
  };
};

// update a category
const updatedCategoryIntoDB = async (id: string, data: Partial<ICategory>) => {
  return await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// delete a product
const deletedCategoryFromDB = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};

export const categoryServices = {
  addCategoryIntoDB,
  getAllCategoriesFromDB,
  updatedCategoryIntoDB,
  deletedCategoryFromDB,
};
