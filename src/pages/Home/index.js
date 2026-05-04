import {
  Container
} from "./styles";

import Loader from "../../components/Loader";
import useHome from "./useHome";
import InputSearch from "./Components/InputSearch";
import Header from "./Components/Header";
import ErrorStatus from "./Components/ErrorStatus";
import EmptyList from "./Components/EmptyList";
import SearchNotFound from "./Components/SearchNotFound";
import ContactsList from "./Components/ContactsList";
import Modal from "../../components/Modal";

export default function Home() {

  const {
    isLoading,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
    filteredContacts,
    handleToggleOrderBy,
    orderBy,
    handleDeleteContact,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isLoadingDeleting
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchNotFound = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />


      {hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          placeholder="Pesquise pelo nome..."
        />
      )}

      <Header
        contacts={contacts}
        filteredContacts={filteredContacts}
        hasError={hasError}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchNotFound && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            onToggleOrderBy={handleToggleOrderBy}
            orderBy={orderBy}
            onDeleteContact={handleDeleteContact}
          />

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
        </>
      )}
    </Container>
  );
}
