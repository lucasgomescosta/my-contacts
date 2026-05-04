import { SearchNotFoundContainer } from "./styles";
import PropTypes from 'prop-types';
import magnifierQuestion from "../../assets/images/magnifier-question.svg";

export default function SearchNotFound({ searchTerm }) {
    return (
        <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="magnifier question" />
              <span>
                Nenhum resultado foi encontrado para a busca <strong>{`"${searchTerm}"`}</strong>
              </span>
        </SearchNotFoundContainer>
    )
}

SearchNotFound.propTypes = {
    searchTerm: PropTypes.string.isRequired,
}
