import { Container } from "./styles";
import sad from "../../assets/images/icons/sad.svg";
import Button from "../../components/Button";
import PropTypes from "prop-types";

export default function ErrorStatus({ onTryAgain }) {
    return (
        <Container>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Erro ao listar os contatos</strong>
            <Button type="button" onClick={onTryAgain}>Tentar novamente</Button>
          </div>
        </Container>
    )
}

ErrorStatus.propTypes = {
    onTryAgain: PropTypes.func.isRequired,
}
