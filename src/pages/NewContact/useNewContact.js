import { useRef } from "react";
import { createContact } from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function useNewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {

    await createContact(contact)

    contactFormRef.current.resetFields();

    toast({ type: 'success', text: 'Contato cadastrado com sucesso!', duration: 3000 });
    } catch {
      toast({ type: 'danger', text: 'Erro ao cadastrar contato' });
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  }
}
