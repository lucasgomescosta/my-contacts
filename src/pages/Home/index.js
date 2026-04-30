import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
  SearchContainer,
  AddContactButton,
  EditButton,
  DeleteButton
} from "./styles";


import setar from "../../assets/images/icons/setar.svg";
import remove from "../../assets/images/icons/delete.svg";
import edit from "../../assets/images/icons/edit.svg";
import Loader from "../../components/Loader";
import sad from "../../assets/images/icons/sad.svg";
import Button from "../../components/Button";
import emptyBox from "../../assets/images/empty-box.svg";
import magnifierQuestion from "../../assets/images/magnifier-question.svg";
import Modal from "../../components/Modal";
import useHome from "./useHome";

export default function Home() {

  const {
    isLoading,
    isLoadingDeleting,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
    filteredContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
    navigate,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        cancelLabel="Cancelar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        isLoading={isLoadingDeleting}
      >
        <p>Este contato será deletado permanentemente</p>
      </Modal>

      <SearchContainer>
        <InputSearchContainer>
          <input value={searchTerm} type="text" placeholder="Pesquise pelo nome..." onChange={handleChangeSearchTerm} />
        </InputSearchContainer>
      </SearchContainer>
      <Header
        $justifyContent={
          hasError ?
            'flex-end' :
            (
              contacts.length > 0 ?
                'space-between' :
                'center'
            )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <AddContactButton to="/new">
          Novo contato
        </AddContactButton>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Erro ao listar os contatos</strong>
            <Button type="button" onClick={handleTryAgain}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && (
            <EmptyListContainer>
              <img src={emptyBox} alt="empty box" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Cadastre um novo clicando no botão <strong>"Novo contato"</strong>
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="magnifier question" />
              <span>
                Nenhum resultado foi encontrado para a busca <strong>"{searchTerm}"</strong>
              </span>
            </SearchNotFoundContainer>
          )}

          <ListHeader $orderBy={orderBy}>
            {filteredContacts.length > 0 && (
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span> <img src={setar} alt="seta" />
              </button>
            )}
          </ListHeader>

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <EditButton
                  type="button"
                  onClick={() => navigate(`/edit/${contact.id}`)}>
                  <img src={edit} alt="editar" />
                </EditButton>
                <DeleteButton type="button" onClick={() => handleDeleteContact(contact)}>
                  <img src={remove} alt="Deletar" />
                </DeleteButton>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
