import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from '../../utils/toast';

export default function useSignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  async function handleSubmit(formValues) {
    try {
      await signUp(formValues);
      toast({ type: 'success', text: 'Conta criada com sucesso!' });
      navigate('/');
    } catch {
      toast({ type: 'danger', text: 'Não foi possível criar sua conta.' });
    }
  }

  return {
    handleSubmit,
  };
}
