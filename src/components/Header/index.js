// components/Header/index.jsx
import { NavLink } from "react-router-dom";
import {
  Container,
  Left,
  Center,
  Right,
  Brand,
  BrandText,
  Menu,
  MenuItem,
  UserWrapper,
  Avatar,
  UserInfo,
  UserName,
  UserRole,
} from "./styles";

export default function Header() {
  const user = {
    name: "Lucas Gomes",
    role: "Administrador",
  };

  return (
    <Container>
      <Left>

        <Brand>
          <strong>MyContacts</strong>
          <BrandText>Gestão inteligente de contatos</BrandText>
        </Brand>
      </Left>

      <Center>
        <Menu>
          <MenuItem>
            <NavLink to="/">Home</NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/categorias">Categorias</NavLink>
          </MenuItem>
        </Menu>
      </Center>

      <Right>
        <UserWrapper>
          <Avatar>{user.name.charAt(0)}</Avatar>

          <UserInfo>
            <UserName>{user.name}</UserName>
            <UserRole>{user.role}</UserRole>
          </UserInfo>
        </UserWrapper>
      </Right>
    </Container>
  );
}
