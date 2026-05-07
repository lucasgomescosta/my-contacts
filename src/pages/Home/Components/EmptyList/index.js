import { Container } from "./styles";
import emptyBox from "../../../../assets/images/empty-box.svg";

export default function EmptyList() {
    return (
        <Container>
              <img src={emptyBox} alt="empty box" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Cadastre um novo clicando no botão <strong>&quot;Novo contato&quot;</strong>
              </p>
        </Container>
    )
}
