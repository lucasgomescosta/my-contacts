import { get, post, put, remove } from '../utils/apiService';
import ContactMapper from '../services/mappers/ContactMapper';

export async function getContactById(id, signal) {
  const contact = await get(`/contacts/${id}`, {}, { signal });

  return ContactMapper.toDomain(contact);
}

export async function listContacts(orderBy = 'asc', signal) {
  const contacts = await get('/contacts', { orderBy }, { signal });

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
