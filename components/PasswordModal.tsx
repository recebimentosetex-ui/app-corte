import React, { useState } from 'react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (password === 'admin') {
      onSubmit(password);
      setPassword('');
      setError('');
    } else {
      setError('Senha incorreta. Tente novamente.');
      setPassword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          handleSubmit();
      }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-6 w-full max-w-sm m-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold font-serif text-cyan-400 mb-4">Acesso Restrito</h3>
        <p className="text-slate-400 mb-4 text-sm">Por favor, insira a senha de administrador para continuar.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(''); // Clear error on new input
          }}
          onKeyPress={handleKeyPress}
          className={`w-full bg-slate-900 border text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 ${error ? 'border-rose-500' : 'border-slate-600'}`}
          placeholder="Senha"
          autoFocus
        />
        {error && <p className="text-rose-400 text-xs mt-2">{error}</p>}
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={onClose} className="text-slate-400 hover:text-white px-4 py-2 rounded-md transition-colors">Cancelar</button>
          <button onClick={handleSubmit} className="bg-cyan-500 text-slate-900 font-bold py-2 px-6 rounded-sm hover:bg-cyan-400">Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;