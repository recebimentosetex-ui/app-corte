import React, { useState } from 'react';
import PasswordModal from './PasswordModal'; // Import the new component

interface AdminToggleProps {
  currentView: 'client' | 'owner';
  setView: (view: 'client' | 'owner') => void;
}

const AdminToggle: React.FC<AdminToggleProps> = ({ currentView, setView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Add state for modal

  const handleToggle = () => {
    if (currentView === 'owner') {
      setView('client');
    } else {
      setIsModalOpen(true); // Open the modal instead of calling prompt
    }
  };

  const handlePasswordSubmit = (password: string) => {
    if (password === 'admin') {
      setView('owner');
      setIsModalOpen(false); // Close modal on success
    }
    // Error is handled inside the modal now
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="fixed bottom-5 right-5 z-40 bg-cyan-500 text-slate-900 font-bold py-3 px-5 rounded-full shadow-lg hover:bg-cyan-400 transition-all transform hover:scale-110 flex items-center space-x-2"
        aria-label={currentView === 'client' ? 'Acessar painel do dono' : 'Voltar para visão do cliente'}
      >
          {currentView === 'client' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          )}
          <span className="hidden sm:inline">{currentView === 'client' ? 'Painel do Dono' : 'Visão do Cliente'}</span>
      </button>
      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePasswordSubmit}
      />
    </>
  );
};

export default AdminToggle;