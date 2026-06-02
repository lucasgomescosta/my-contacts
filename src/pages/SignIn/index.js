import { Link } from 'react-router-dom';
import {
  Wrapper,
  Title,
  Description,
  Footer,
} from './styles';
import SignInForm from '../../components/SignInForm';
import useSignIn from './useSignIn';



export function SignIn() {
  const { handleSubmit } = useSignIn();

  return (
    <Wrapper>
      <Title>Acesse sua conta</Title>
      <Description>Entre para gerenciar contatos e categorias.</Description>

      <SignInForm buttonLabel="Entrar" onSubmit={handleSubmit} />

      <Footer>
        Ainda não tem conta? <Link to="/sign-up">Criar conta</Link>
      </Footer>
    </Wrapper>
  );
}
