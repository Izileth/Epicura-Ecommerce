import { usePassword } from '@/hooks/usePassword';
import { useForm } from 'react-hook-form';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

interface ForgotPasswordFormData {
  email: string;
}

export function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const { 
    forgotPassword, 
    isForgotPasswordLoading, 
    forgotPasswordError,
    clearForgotPasswordState 
  } = usePassword({
    onForgotPasswordSuccess: (data) => {
      setEmailSent(true);
      console.log('Email enviado:', data);
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setSentEmail(data.email);
    await forgotPassword(data.email);
  };

  const handleTryAgain = () => {
    setEmailSent(false);
    setSentEmail('');
    clearForgotPasswordState();
  };

  if (emailSent) {
    return (
      <div className="max-w-xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-green-600">Email Enviado!</h2>
            <p className="text-gray-600">
              Enviamos um link de recuperação para <strong>{sentEmail}</strong>
            </p>
          </div>

          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              Verifique sua caixa de entrada e spam. O link expira em 15 minutos.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleTryAgain}
              className="w-full bg-zinc-950 text-white py-2 px-4 rounded hover:bg-zinc-800"
            >
              Tentar com outro email
            </button>
            
            <Link 
              to="/login" 
              className="block w-full text-center text-zinc-950 hover:underline"
            >
              Voltar ao login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Recuperar Senha</h2>
      <p className="text-gray-600 text-center mb-6">
        Digite seu email para receber um link de recuperação
      </p>
      
      {forgotPasswordError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {forgotPasswordError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'Email é obrigatório',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Digite um email válido'
              }
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-950"
            placeholder="Digite seu email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isForgotPasswordLoading}
          className="w-full bg-zinc-950 text-white py-2 px-4 rounded hover:bg-zinc-800 disabled:bg-gray-300"
        >
          {isForgotPasswordLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
        </button>

        <div className="flex flex-row justify-between items-center text-center mt-4 gap-2">
          <Link to="/login" className="text-zinc-950 hover:underline">
            Voltar ao login
          </Link>
          <Link to="/register" className="text-zinc-950 hover:underline hover:text-zinc-700">
            Criar uma conta
          </Link>
        </div>
      </form>
    </div>
  );
}