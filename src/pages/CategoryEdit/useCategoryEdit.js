import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "../../utils/toast";
import {
  getCategoryById,
  updateCategory,
  getCategoryByName
} from "../../services/CategoriesService";

export default function useCategoryEdit() {

  const { id } = useParams();
  const navigate = useNavigate();
  const categoryFormRef = useRef(null);
  const queryClient = useQueryClient();

  const { isLoading, data: categoryData, isError } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
  });

  useEffect(() => {
    if (isError) {
      navigate('/', { replace: true });
      toast({ type: 'danger', text: 'Categoria não encontrada' });
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (categoryData && categoryFormRef.current) {
      categoryFormRef.current.setFieldsValue({ name: categoryData.name });
    }
  }, [categoryData]);

  const categoryName = categoryData?.name ?? '';

  async function handleSubmit(categoryFormData) {
    try {

      const existingCategories = await getCategoryByName(categoryFormData.name);

      const categoryAlreadyExists = existingCategories.some(
        (category) =>
          String(category.id) !== String(id) &&
          category.name.trim().toLowerCase() === categoryFormData.name.toLowerCase()
      );

      if (categoryAlreadyExists) {
        categoryFormRef.current.setFieldError(
          'name',
          'Já existe uma categoria com esse nome'
        );

        toast({
          type: "danger",
          text: "Já existe uma categoria com esse nome",
        });
        return;
      }

      categoryFormRef.current.clearFieldError('name');

      await updateCategory(id, categoryFormData);

      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', id] });

      toast({ type: 'success', text: 'Categoria atualizada com sucesso' });
    } catch (error) {
      console.log(error);
      toast({ type: 'danger', text: 'Erro ao atualizar categoria' });
    }
  }

  return {
    isLoading,
    categoryName,
    categoryFormRef,
    handleSubmit,
  };
}
