import { Container, AddContactButton } from "./styles";
import PropTypes from 'prop-types';

export default function Header({ quantityOfContacts, quantityOffilteredContacts, hasError }) {
  const justifyContent = hasError ?
    'flex-end' :
    (
      quantityOfContacts > 0 ?
      'space-between' :
      'center'
    );

  return (
    <Container
      $justifyContent={justifyContent}
    >
      {(!hasError && quantityOfContacts > 0) && (
        <strong>
          {quantityOffilteredContacts}
          {quantityOffilteredContacts === 1 ? ' contato' : ' contatos'}
        </strong>
      )}
      <AddContactButton to="/new">
        Novo contato
      </AddContactButton>
    </Container>
  );
}

Header.propTypes = {
  quantityOfContacts: PropTypes.number.isRequired,
  quantityOffilteredContacts: PropTypes.number.isRequired,
  hasError: PropTypes.bool.isRequired,
}

