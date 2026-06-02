import { get, post, put, remove } from '../utils/apiService';
import CategoryMapper from './mappers/CategoryMapper';

function parsePaginatedResponse(response) {
  if (Array.isArray(response)) {
    return {
      categories: response.map(CategoryMapper.toDomain),
      pagination: { total: response.length, page: 1, pageSize: response.length, totalPages: 1 },
    };
  }

  // Suporta { data: [...], meta: { total, totalPages, page, pageSize } }
  // Suporta { data: [...], total, totalPages, page, pageSize }
  // Suporta { categories: [...], total, totalPages }
  const items = response.data ?? response.categories ?? response.items ?? [];
  const total = response.pagination?.total ?? response.meta?.total ?? response.total ?? items.length;
  const totalPages = response.pagination?.totalPages ?? response.meta?.totalPages ?? response.totalPages ?? 1;
  const page = response.pagination?.page ?? response.meta?.page ?? response.page ?? 1;
  const pageSize = response.pagination?.pageSize ?? response.meta?.pageSize ?? response.pageSize ?? items.length;

  return {
    categories: items.map(CategoryMapper.toDomain),
    pagination: { total, totalPages, page, pageSize },
  };
}

export async function listCategories({ page = 1, pageSize = 10, name = '' } = {}, signal) {
  const params = { page, pageSize };
  if (name) params.name = name;
  const response = await get('/categories', params, { signal });
  return parsePaginatedResponse(response);
}

export async function listAllCategories(signal) {
  const response = await get('/categories', { page: 1, pageSize: 1000 }, { signal });
  const { categories } = parsePaginatedResponse(response);
  return categories;
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
  const { categories } = await listCategories({ name, pageSize: 100 });
  return categories;
}

export async function getCategoryById(id) {
  const category = await get(`/categories/${id}`);
  return CategoryMapper.toDomain(category);
}
