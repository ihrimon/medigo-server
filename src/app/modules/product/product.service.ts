import { QueryBuilder } from '../../utils/QueryBuilder';
import { IProduct } from './product.interface';
import { Product } from './product.model';

// add a new product
const addProductIntoDB = async (
  images: Express.Multer.File[],
  payload: Partial<IProduct>
) => {
  payload.images = images.map((image) => image.path);

  return await Product.create(payload);
};

// fetch all products
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const {
    minPrice,
    maxPrice,
    categories,
    brands,
    ratings,
    ...pQuery
  } = query;

  const filter: Record<string, any> = {};

  // Filter by categories
  if (categories) {
    const categoryArray =
      typeof categories === 'string'
        ? categories.split(',')
        : Array.isArray(categories)
        ? categories
        : [categories];
    filter.category = { $in: categoryArray };
  }

  // Filter by brands
  if (brands) {
    const brandArray =
      typeof brands === 'string'
        ? brands.split(',')
        : Array.isArray(brands)
        ? brands
        : [brands];
    filter.brand = { $in: brandArray };
  }

  // Filter by ratings
  if (ratings) {
    const ratingArray =
      typeof ratings === 'string'
        ? ratings.split(',')
        : Array.isArray(ratings)
        ? ratings
        : [ratings];
    filter.averageRating = { $in: ratingArray.map(Number) };
  }

  const productQuery = new QueryBuilder(Product.find(filter), pQuery)
    .search(['name', 'category', 'brand'])
    .filter()
    .sort()
    .paginate()
    .fields()
    .priceRange(Number(minPrice) || 0, Number(maxPrice) || Infinity);

  const products = await productQuery.modelQuery.lean();
  const meta = await productQuery.countTotal();

  return {
    meta,
    data: products,
  };
};

// fetch specific product
const getSpecificProductFromDB = async (id: string) => {
  return await Product.findById(id);
};

// update a product
const updatedProductIntoDB = async (
  id: string,
  images: Express.Multer.File[] | undefined,
  payload: Partial<IProduct>
) => {
  if (images && images.length > 0) {
    payload.images = images.map((image) => image.path);
  }

  return await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

// delete a product
const deletedProductFromDB = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export const productServices = {
  addProductIntoDB,
  getAllProductsFromDB,
  getSpecificProductFromDB,
  updatedProductIntoDB,
  deletedProductFromDB,
};
