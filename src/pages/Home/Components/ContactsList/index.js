import { ListHeader, Card, EditButton, DeleteButton } from "./styles";
import PropTypes from "prop-types";
import setar from "../../assets/images/icons/setar.svg";
import edit from "../../assets/images/icons/edit.svg";
import remove from "../../assets/images/icons/delete.svg";


export default function ContactsList({
  filteredContacts,
  onToggleOrderBy,
  orderBy,
  navigate,
  onDeleteContact
}) {
    return (
      <>
        <ListHeader $orderBy={orderBy}>
            {filteredContacts.length > 0 && (
              <button type="button" onClick={onToggleOrderBy}>
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
              <DeleteButton type="button" onClick={() => onDeleteContact(contact)}>
                <img src={remove} alt="Deletar" />
              </DeleteButton>
            </div>
          </Card>
        ))}

      </>
    )
}

ContactsList.propTypes = {
    filteredContacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        category: PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
    })).isRequired,
    onToggleOrderBy: PropTypes.func.isRequired,
    orderBy: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}
