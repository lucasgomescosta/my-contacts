// components/Footer/index.jsx
import { Container, Content, Left, Right } from "./styles";

export default function Footer() {
  return (
    <Container>
      <Content>
        <Left>
          © {new Date().getFullYear()} MyContacts
        </Left>

        <Right>
          Desenvolvido por Lucas Gomes
        </Right>
      </Content>
    </Container>
  );
}
