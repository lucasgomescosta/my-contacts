import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listContacts, deleteContact } from "../../services/ContactsService";
import toast from "../../utils/toast";

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDeleting, setIsLoadingDeleting] = useState(false);

  const navigate = useNavigate();

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await listContacts(orderBy);

      setHasError(false);
      setContacts(response);
    } catch {
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleChangeSearchTerm(e) {
    setSearchTerm(e.target.value);
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
