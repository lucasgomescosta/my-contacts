import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getContactById, updateContact } from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function useEditContact() {
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, data: contactData, isError } = useQuery({
    queryKey: ['contact', id],
    queryFn: () => getContactById(id),
  });

  useEffect(() => {
    if (isError) {
      navigate('/', { replace: true });
      toast({ type: 'danger', text: 'Contato não encontrado' });
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (contactData && contactFormRef.current) {
      contactFormRef.current.setFieldsValue(contactData);
    }
  }, [contactData]);

  const contactName = contactData?.name ?? '';

  async function handleSubmit(contact) {
    try {
      const payload = { ...contact };
      if (payload.email === contactData?.email) {
        delete payload.email;
      }

      await updateContact(id, payload);

      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact', id] });

      toast({ type: 'success', text: 'Contato atualizado com sucesso' });
    } catch (error) {
      console.log(error);
      toast({ type: 'danger', text: 'Erro ao atualizar contato' });
    }
  }

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
