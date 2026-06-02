import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function useNewContact() {
  const contactFormRef = useRef(null);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (contact) => createContact(contact),
    onSuccess: () => {
      contactFormRef.current.resetFields();
      queryClient.invalidateQueries({ queryKey: ['contacts'] });

      toast({ type: 'success', text: 'Contato cadastrado com sucesso!', duration: 3000 });
    },
    onError: () => {
      toast({ type: 'danger', text: 'Erro ao cadastrar contato' });
    },
  });

  async function handleSubmit(contact) {
    createMutation.mutate(contact);
  }

  return {
    contactFormRef,
    handleSubmit,
  }
}
