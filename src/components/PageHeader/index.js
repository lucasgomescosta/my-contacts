import { Link } from "react-router-dom";
import { Container } from "./styles";
import setar from "../../assets/images/icons/setar.svg";
import PropTypes from "prop-types";

export default function PageHeader({ title }) {
    return (
        <Container>
          <Link to="/">
            <img src={setar} alt="seta" />
            <span>Voltar</span>
          </Link>
          <h1>{title}</h1>
        </Container>
    );
}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
};
