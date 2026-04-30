import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listCategories, deleteCategory } from "../../services/CategoriesService";
import toast from "../../utils/toast";

export default function useCategorias() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryBeingDeleted, setCategoryBeingDeleted] = useState(null);
  const [isLoadingDeleting, setIsLoadingDeleting] = useState(false);

  const navigate = useNavigate();

  async function loadCategories() {
    try {
      setIsLoading(true);

      const data = await listCategories();
      setCategories(data);
    } catch {
      toast({
        type: "danger",
        text: "Erro ao listar categorias",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function handleDeleteCategory(category) {
    setCategoryBeingDeleted(category);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setCategoryBeingDeleted(null);
  }

  async function handleConfirmDeleteCategory() {
      try {
        setIsLoadingDeleting(true);

        await deleteCategory(categoryBeingDeleted.id);

        setCategories(prevState => prevState.filter(
          (category) => category.id !== categoryBeingDeleted.id
        ));

        handleCloseDeleteModal();

        toast({
          type: 'success',
          text: 'Categoria deletada com sucesso!',
        });
      } catch {
        toast({
          type: 'danger',
          text: 'Erro ao deletar categoria!',
        });
      } finally {
        setIsLoadingDeleting(false);
      }
    }

  return {
    categories,
    isLoading,
    isDeleteModalVisible,
    categoryBeingDeleted,
    isLoadingDeleting,
    handleCloseDeleteModal,
    handleConfirmDeleteCategory,
    handleDeleteCategory,
    navigate,
  }
}
