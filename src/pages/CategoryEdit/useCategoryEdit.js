import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";
import toast from "../../utils/toast";
import {
    getCategoryById,
    updateCategory,
    getCategoryByName
} from "../../services/CategoriesService";

export default function useCategoryEdit() {

  const { id } = useParams();
      const navigate = useNavigate();
      const safeAsyncAction = useSafeAsyncAction();
      const categoryFormRef = useRef(null);

      const [isLoading, setIsLoading] = useState(true);
      const [categoryName, setCategoryName] = useState('');

      useEffect(() => {
          async function loadCategory() {
              try {
                  const category = await getCategoryById(id);
                  safeAsyncAction(() => {
                      setCategoryName(category.name);
                      categoryFormRef.current.setFieldsValue({ name: category.name });
                      setIsLoading(false);
                  });
              } catch (error) {
                  console.log(error);
                  safeAsyncAction(() => {
                      navigate('/');
                      toast({ type: 'danger', text: 'Categoria não encontrada' });
                  });
              }
          }
          loadCategory();
      }, [id, navigate, safeAsyncAction]);

      async function handleSubmit(categoryData) {
          try {

              const existingCategories = await getCategoryByName(categoryData.name);

              const categoryAlreadyExists = existingCategories.some(
                (category) =>
                  String(category.id) !== String(id) &&
                  category.name.trim().toLowerCase() === categoryName.toLowerCase()
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

              await updateCategory(id, categoryData);
              setCategoryName(categoryData.name);

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
