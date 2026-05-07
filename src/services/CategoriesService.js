import { get, post, put, remove } from '../utils/apiService';
import CategoryMapper from './mappers/CategoryMapper';

export async function listCategories(signal) {
  const categories = await get('/categories', {}, { signal });
  return categories.map(CategoryMapper.toDomain);
}

export async function createCategory(category) {
  const categoryPersisted = CategoryMapper.toPersistence(category);
  const categoryCreated = await post('/categories', categoryPersisted);
  return CategoryMapper.toDomain(categoryCreated);
}

export async function updateCategory(id, category) {
  const categoryPersisted = CategoryMapper.toPersistence(category);
  const categoryUpdated = await put(`/categories/${id}`, categoryPersisted);
  return CategoryMapper.toDomain(categoryUpdated);
}

export async function deleteCategory(id) {
  await remove(`/categories/${id}`);
}

export async function getCategoryByName(name) {
  const categories = await get(`/categories/?name=${encodeURIComponent(name)}`);

  if (categories && categories.length > 0) {
    return categories.map(CategoryMapper.toDomain);
  }

  return [];
}

export async function getCategoryById(id) {
  const category = await get(`/categories/${id}`);
  return CategoryMapper.toDomain(category);
}
