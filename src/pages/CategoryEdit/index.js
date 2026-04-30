import PageHeader from "../../components/PageHeader";
import CategoryForm from "../../components/CategoryForm";

import Loader from "../../components/Loader";
import useCategoryEdit from "./useCategoryEdit";

export default function CategoryEdit() {
    const {
        isLoading,
        categoryName,
        categoryFormRef,
        handleSubmit
    } = useCategoryEdit();

    return (
        <>
            <Loader isLoading={isLoading} />

            <PageHeader
                title={isLoading ? 'Carregando...' : `Editar ${categoryName}`}
                backTo="/categorias"
            />

            <CategoryForm
                buttonLabel="Salvar alterações"
                onSubmit={handleSubmit}
                ref={categoryFormRef}
            />
        </>
    );
}
