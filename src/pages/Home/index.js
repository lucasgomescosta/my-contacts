import { Container, Header, ListContainer, Card, InputSearchContainer } from "./styles";
import { Link } from "react-router-dom";
import setar from "../../assets/images/icons/setar.svg";
import remove from "../../assets/images/icons/delete.svg";
import edit from "../../assets/images/icons/edit.svg";
import Loader from "../../components/Loader";

export default function Home() {
    return (
       <Container>
          <InputSearchContainer>
            <input type="text" placeholder="Pesquise pelo nome..." />
          </InputSearchContainer>
            <Header>
                <strong>Meus contatos</strong>
                <Link to="/new">
                  Novo contato
                </Link>
            </Header>

            <ListContainer>
                <header>
                  <button type="button">
                    <span>Nome</span> <img src={setar} alt="seta" />
                  </button>
                </header>

                <Card>
                    <div className="info">
                      <div className="contact-name">
                        <strong>Lucas Gomes</strong>
                        <small>lucasgomes@email.com</small>
                      </div>
                      <span>teste@gmail.com</span>
                      <span>(95) 991234-5678</span>
                    </div>

                    <div className="actions">
                      <Link to="/edit/123">
                        <img src={edit} alt="editar" />
                      </Link>
                      <button type="button">
                        <img src={remove} alt="Deletar" />
                      </button>
                    </div>
                </Card>


            </ListContainer>
        </Container>
    );
}
