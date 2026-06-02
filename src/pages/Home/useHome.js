import { useState, useCallback, useDeferredValue, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listContacts, deleteContact } from "../../services/ContactsService";
import toast from "../../utils/toast";
import usePagination from "../../hooks/usePagination";

const PAGE_SIZE = 10;

export default function useHome() {
  const [orderBy, setOrderBy] = useState('asc');

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const queryClient = useQueryClient();

  const {
    page,
    setPage,
    setTotalPages,
    pages,
    handlePrevPage,
    handleNextPage,
    handleGoToPage
  } = usePagination();

  const {
    data,
    isLoading,
    isError: hasError,
    refetch,
  } = useQuery({
    queryKey: ['contacts', orderBy, page],
    queryFn: () => listContacts({ page, pageSize: PAGE_SIZE, orderBy }),
    placeholderData: (prev) => prev,
  });

  const contacts = useMemo(() => data?.contacts ?? [], [data?.contacts]);
  const total = data?.pagination?.total ?? 0;
  const totalPages = data?.pagination?.totalPages ?? 1;

  useEffect(() => {
    setTotalPages(totalPages);
  }, [totalPages, setTotalPages]);

  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ['contacts', orderBy, page + 1],
        queryFn: () => listContacts({ page: page + 1, pageSize: PAGE_SIZE, orderBy }),
      });
    }
  }, [page, totalPages, orderBy, queryClient]);


  const deleteMutation = useMutation({
    mutationFn: (contactId) => deleteContact(contactId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      handleCloseDeleteModal();
      if (contacts.length === 1 && page > 1) {
        setPage((p) => p - 1);
      }
      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
    },
    onError: () => {
      toast({
        type: 'danger',
        text: 'Erro ao deletar contato!',
      });
    },
  });

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()));
  }, [contacts, deferredSearchTerm]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
    setPage(1);
  }, [setPage]);

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  function handleChangeSearchTerm(e) {
    const { value } = e.target;
    setSearchTerm(value);
  }

  function handleTryAgain() {
    refetch();
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  function handleConfirmDeleteContact() {
    deleteMutation.mutate(contactBeingDeleted.id);
  }

  return {
    isLoading,
    isLoadingDeleting: deleteMutation.isPending,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    total,
    page,
    totalPages,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
    filteredContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
    pages,
    handlePrevPage,
    handleNextPage,
    handleGoToPage,
  };
}
