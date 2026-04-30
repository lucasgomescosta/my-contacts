import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";
import { getContactById, updateContact } from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const contactFormRef = useRef(null);
  const [contactName, setContactName] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await getContactById(id);
        console.log(contactData);
        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValue(contactData);
          setContactName(contactData.name);
          setIsLoading(false);
        })

      } catch {
        safeAsyncAction(() => {
          navigate('/');
          toast({ type: 'danger', text: 'Contato não encontrado' });
        });
      }
    }

    loadContact();
  }, [id, navigate, safeAsyncAction]);

  async function handleSubmit(contactData) {
    try {

      await updateContact(id, contactData);
      setContactName(contactData.name);

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
