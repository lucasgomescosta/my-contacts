import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, getCategoryByName } from "../../services/CategoriesService";
import toast from "../../utils/toast";

export default function useCategoryNew() {

    const categoryFormRef = useRef(null);
    const queryClient = useQueryClient();

    const createMutation = useMutation({
      mutationFn: (category) => createCategory(category),
      onSuccess: () => {
        categoryFormRef.current.resetFields();
        queryClient.invalidateQueries({ queryKey: ['categories'] });

        toast({
          type: "success",
          text: "Categoria cadastrada com sucesso",
        });
      },
      onError: (error) => {
        console.log(error);
        toast({
          type: "danger",
          text: "Erro ao cadastrar categoria",
        });
      },
    });

  async function handleSubmit(formData) {
    try {
      const category = {
        name: formData.name,
      };

      const existingCategory = await getCategoryByName(category.name);

      if (existingCategory && existingCategory.length > 0) {
        toast({
          type: "danger",
          text: "Já existe uma categoria com esse nome",
        });
        return;
      }

      createMutation.mutate(category);
    } catch (error) {
      console.log(error);
      toast({
        type: "danger",
        text: "Erro ao cadastrar categoria",
      });
    }
  }

  return {
    categoryFormRef,
    handleSubmit,
  };
}
