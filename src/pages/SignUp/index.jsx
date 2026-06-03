import { Link } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm';
import {
  Wrapper,
  Title,
  Description,
  Footer,
} from './styles';
import useSignUp from './useSignUp';

export function SignUp() {
  const { handleSubmit } = useSignUp();

  return (
    <Wrapper>
      <Title>Crie sua conta</Title>
      <Description>Cadastre-se para acessar sua agenda de contatos.</Description>

      <SignUpForm buttonLabel="Criar conta" onSubmit={handleSubmit} />

      <Footer>
        Já possui conta? <Link to="/sign-in">Entrar</Link>
      </Footer>
    </Wrapper>
  );
}
