import CategoryForm from "../../components/CategoryForm";
import PageHeader from "../../components/PageHeader";
import useCategoryNew from "./useCategoryNew";

export default function CategoryNew() {

  const { handleSubmit, categoryFormRef } = useCategoryNew();

  return (
    <>
      <PageHeader
        title="Nova categoria"
        backTo="/categorias"
      />

      <CategoryForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
        ref={categoryFormRef}
      />
    </>
  );
}
