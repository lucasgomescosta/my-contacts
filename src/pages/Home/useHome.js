import { useState, useCallback, useEffect, useDeferredValue, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { listContacts, deleteContact } from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDeleting, setIsLoadingDeleting] = useState(false)

  const [searchTerm, setSearchTerm] = useState('');

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const navigate = useNavigate();

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()));
  }, [contacts, deferredSearchTerm]);

  const loadContacts = useCallback(async (signal) => {
    setIsLoading(true);
    try {
      const response = await listContacts(orderBy, signal);

      setHasError(false);
      setContacts(response);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();
    loadContacts(controller.signal);

    return () => {
      controller.abort();
    }
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  function handleChangeSearchTerm(e) {
    const { value } = e.target;
    setSearchTerm(value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDeleting(true);

      await deleteContact(contactBeingDeleted.id);

      setContacts(prevState => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id
      ));

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Erro ao deletar contato!',
      });
    } finally {
      setIsLoadingDeleting(false);
    }
  }

    return {
      isLoading,
      isLoadingDeleting,
      isDeleteModalVisible,
      contactBeingDeleted,
      handleCloseDeleteModal,
      handleConfirmDeleteContact,
      contacts,
      searchTerm,
      handleChangeSearchTerm,
      hasError,
      handleTryAgain,
      filteredContacts,
      orderBy,
      handleToggleOrderBy,
      handleDeleteContact,
      navigate,
    };
}
