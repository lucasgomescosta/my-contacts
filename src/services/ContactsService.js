import { get, post, put, remove } from '../utils/apiService';
import ContactMapper from '../services/mappers/ContactMapper';

export async function getContactById(id, signal) {
  const contact = await get(`/contacts/${id}`, {}, { signal });

  return ContactMapper.toDomain(contact);
}

export async function listContacts({ page = 1, pageSize = 10, orderBy = 'asc' } = {}) {
  const response = await get('/contacts', { page, pageSize, orderBy });

  if (Array.isArray(response)) {
    return {
      contacts: response.map(ContactMapper.toDomain),
      pagination: { page: 1, pageSize: response.length, total: response.length, totalPages: 1 },
    };
  }

  return {
    contacts: (response.data ?? []).map(ContactMapper.toDomain),
    pagination: response.pagination ?? { page, pageSize, total: 0, totalPages: 1 },
  };
}

export function createContact(contact) {
  return post('/contacts', ContactMapper.toPersistence(contact));
}

export function updateContact(id, contact) {
  return put(`/contacts/${id}`, ContactMapper.toPersistence(contact));
}

export function deleteContact(id) {
  return remove(`/contacts/${id}`);
}
