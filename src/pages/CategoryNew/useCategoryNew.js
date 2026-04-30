import { useRef } from "react";
import { createCategory, getCategoryByName } from "../../services/CategoriesService";
import toast from "../../utils/toast";

export default function useCategoryNew() {

    const categoryFormRef = useRef(null);

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

      await createCategory(category);

      categoryFormRef.current.resetFields();

      toast({
        type: "success",
        text: "Categoria cadastrada com sucesso",
      });
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
