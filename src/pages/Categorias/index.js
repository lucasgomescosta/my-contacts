import {
  Container,
  Header,
  TitleGroup,
  AddButton,
  CategoriesList,
  CategoryCard,
  CategoryInfo,
  CategoryName,
  Actions,
  EditButton,
  DeleteButton,
  EmptyMessage,
} from "./styles";


import Modal from "../../components/Modal";
import Loader from "../../components/Loader";

import remove from "../../assets/images/icons/delete.svg";
import edit from "../../assets/images/icons/edit.svg";
import useCategorias from "./useCategorias.js";

export default function Categorias() {

  const {
    categories,
    isLoading,
    isDeleteModalVisible,
    categoryBeingDeleted,
    isLoadingDeleting,
    handleCloseDeleteModal,
    handleConfirmDeleteCategory,
    handleDeleteCategory,
    navigate,
  } = useCategorias();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Header>
        <TitleGroup>
          <h1>Categorias</h1>
          <span>
            {isLoading
              ? "Carregando..."
              : `${categories.length} categoria(s) cadastrada(s)`}
          </span>
        </TitleGroup>

        <AddButton type="button" onClick={() => navigate("/categorias/nova")}>
          Nova categoria
        </AddButton>
      </Header>

      {!isLoading && categories.length === 0 && (
        <EmptyMessage>Nenhuma categoria cadastrada.</EmptyMessage>
      )}

      <CategoriesList>
        {categories.map((category) => (
          <CategoryCard key={category.id}>
            <CategoryInfo>
              <CategoryName>{category.name}</CategoryName>
            </CategoryInfo>

            <Actions>
              <EditButton
                type="button"
                onClick={
                  () => navigate(`/categorias/${category.id}/editar`)
                }
              >
                <img src={edit} alt="Editar" />
              </EditButton>

              <DeleteButton
                type="button"
                onClick={() => handleDeleteCategory(category)}
              >
                <img src={remove} alt="Deletar" />
              </DeleteButton>
            </Actions>
          </CategoryCard>
        ))}
      </CategoriesList>

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover a categoria "${categoryBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        cancelLabel="Cancelar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteCategory}
        isLoading={isLoadingDeleting}
      >
        <p>Esta categoria será deletada permanentemente</p>
      </Modal>
    </Container>
  );
}
