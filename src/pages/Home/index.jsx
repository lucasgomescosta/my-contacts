import {
  Container,
  Pagination,
  PaginationButton,
  PageButton,
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
    total,
    page,
    totalPages,
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
    isLoadingDeleting,
    handlePrevPage,
    handleNextPage,
    handleGoToPage,
    pages,
  } = useHome();



  const hasContacts = total > 0;
  const isListEmpty = !hasError && (!isLoading && total === 0);
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
        quantityOfContacts={total}
        quantityOffilteredContacts={filteredContacts.length}
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

          {totalPages > 1 && (
            <Pagination>
              <PaginationButton type="button" onClick={handlePrevPage} disabled={page === 1}>
                &lsaquo; Anterior
              </PaginationButton>

              {pages.map((p, i) =>
                p === '...'
                  ? <span key={`ellipsis-${i}`}>...</span>
                  : (
                    <PageButton
                      key={p}
                      type="button"
                      $active={p === page}
                      disabled={p === page}
                      onClick={() => handleGoToPage(p)}
                    >
                      {p}
                    </PageButton>
                  )
              )}

              <PaginationButton type="button" onClick={handleNextPage} disabled={page === totalPages}>
                Próxima &rsaquo;
              </PaginationButton>
            </Pagination>
          )}

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
