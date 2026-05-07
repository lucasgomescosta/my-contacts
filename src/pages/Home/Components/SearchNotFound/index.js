import { Container } from "./styles";
import PropTypes from 'prop-types';
import magnifierQuestion from "../../../../assets/images/magnifier-question.svg";

export default function SearchNotFound({ searchTerm }) {
    return (
        <Container>
              <img src={magnifierQuestion} alt="magnifier question" />
              <span>
                Nenhum resultado foi encontrado para a busca <strong>{`"${searchTerm}"`}</strong>
              </span>
        </Container>
    )
}

SearchNotFound.propTypes = {
    searchTerm: PropTypes.string.isRequired,
}
