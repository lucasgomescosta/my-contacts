import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from '../../utils/toast';

export default function useSignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  async function handleSubmit({ email, password }) {
    try {
      await signIn(email, password);
      navigate('/');
    } catch {
      toast({ type: 'danger', text: 'Credenciais inválidas.' });
    }
  }

  return {
    handleSubmit,
  };
}
