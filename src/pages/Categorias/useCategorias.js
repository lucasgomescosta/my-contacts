import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listCategories, deleteCategory } from "../../services/CategoriesService";
import toast from "../../utils/toast";
import usePagination from "../../hooks/usePagination";

const PAGE_SIZE = 10;

export default function useCategorias() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryBeingDeleted, setCategoryBeingDeleted] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    page,
    setPage,
    setTotalPages,
    pages,
    handlePrevPage,
    handleNextPage,
    handleGoToPage,
  } = usePagination();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['categories', page],
    queryFn: () => listCategories({ page, pageSize: PAGE_SIZE }),
    placeholderData: (prev) => prev,
  });

  const categories = useMemo(() => data?.categories ?? [], [data?.categories]);
  const totalPages = data?.pagination?.totalPages ?? 1;
  const total = data?.pagination?.total ?? 0;

  useEffect(() => {
    setTotalPages(totalPages);
  }, [totalPages, setTotalPages]);

  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ['categories', page + 1],
        queryFn: () => listCategories({ page: page + 1, pageSize: PAGE_SIZE }),
      });
    }
  }, [page, totalPages, queryClient]);

  const deleteMutation = useMutation({
    mutationFn: (categoryId) => deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      handleCloseDeleteModal();
      if (categories.length === 1 && page > 1) {
        setPage((p) => p - 1);
      }
      toast({
        type: 'success',
        text: 'Categoria deletada com sucesso!',
      });
    },
    onError: () => {
      toast({
        type: 'danger',
        text: 'Erro ao deletar categoria!',
      });
    },
  });

  const handleDeleteCategory = useCallback((category) => {
    setCategoryBeingDeleted(category);
    setIsDeleteModalVisible(true);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  function handleConfirmDeleteCategory() {
    deleteMutation.mutate(categoryBeingDeleted.id);
  }

  return {
    categories,
    total,
    page,
    totalPages,
    isLoading,
    isDeleteModalVisible,
    categoryBeingDeleted,
    isLoadingDeleting: deleteMutation.isPending,
    handleCloseDeleteModal,
    handleConfirmDeleteCategory,
    handleDeleteCategory,
    pages,
    handlePrevPage,
    handleNextPage,
    handleGoToPage,
    navigate,
  }
}
