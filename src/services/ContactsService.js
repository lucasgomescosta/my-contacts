import { get, post, put, remove } from '../utils/apiService';
import ContactMapper from '../services/mappers/ContactMapper';

export async function getContactById(id) {
  const contact = await get(`/contacts/${id}`);

  return ContactMapper.toDomain(contact);
}

export async function listContacts(orderBy = 'asc') {
  const contacts = await get('/contacts', { orderBy });

  return contacts.map(ContactMapper.toDomain);
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
