import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
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
  ActionButton,
} from "./styles";

export default function Header() {
  const { signedIn, user, signOut } = useAuth();
  const userName = user?.name || 'Usuário';
  const userRole = user?.role || 'Conta ativa';

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
          {signedIn && (
            <>
              <MenuItem>
                <NavLink to="/">Home</NavLink>
              </MenuItem>

              <MenuItem>
                <NavLink to="/categorias">Categorias</NavLink>
              </MenuItem>
            </>
          )}

          {!signedIn && (
            <>
              <MenuItem>
                <NavLink to="/sign-in">Entrar</NavLink>
              </MenuItem>

              <MenuItem>
                <NavLink to="/sign-up">Cadastrar</NavLink>
              </MenuItem>
            </>
          )}
        </Menu>
      </Center>

      <Right>
        {signedIn && (
          <UserWrapper>
            <Avatar>{userName.charAt(0).toUpperCase()}</Avatar>

            <UserInfo>
              <UserName>{userName}</UserName>
              <UserRole>{userRole}</UserRole>
            </UserInfo>

            <ActionButton type="button" onClick={signOut}>
              Sair
            </ActionButton>
          </UserWrapper>
        )}
      </Right>
    </Container>
  );
}
