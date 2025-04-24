
import { IImageFile } from '../../interface';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { IBrand } from './brand.interface';
import { Brand } from './brand.model';

// add a new brand
const addBrandIntoDB = async (
  payload: Partial<IBrand>,
  image: IImageFile,
  logo: IImageFile
) => {
  return await Brand.create({
    ...payload,
    image: image?.path,
    logo: logo?.path,
  });
};

// fetch all brands
const getAllBrandsFromDB = async (query: Record<string, unknown>) => {
  const brandQuery = new QueryBuilder(Brand.find(), query)
    .search(['name', 'slug'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await brandQuery.modelQuery;
  const meta = await brandQuery.countTotal();

  return {
    data: result,
    meta,
  };
};

// update a brand
const updatedBrandIntoDB = async (id: string, data: Partial<IBrand>) => {
  return await Brand.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// delete a brand
const deletedBrandFromDB = async (id: string) => {
  return await Brand.findByIdAndDelete(id);
};

export const brandServices = {
  addBrandIntoDB,
  getAllBrandsFromDB,
  updatedBrandIntoDB,
  deletedBrandFromDB,
};
