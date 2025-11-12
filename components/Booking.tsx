import React, { useState } from 'react';
import { Service, Appointment } from '../types';
import { TIME_SLOTS } from '../constants';
import SectionTitle from './SectionTitle';

interface BookingProps {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  services: Service[];
}

const Booking: React.FC<BookingProps> = ({ appointments, addAppointment, services }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientDetails, setClientDetails] = useState({ clientName: '', clientPhone: '' });
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const isSlotBooked = (time: string) => {
      return appointments.some(app => app.date === selectedDate && app.time === time);
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientDetails({ ...clientDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService && selectedDate && selectedTime && clientDetails.clientName && clientDetails.clientPhone) {
      addAppointment({
        ...clientDetails,
        serviceId: selectedService.id,
        date: selectedDate,
        time: selectedTime,
      });
      setIsConfirmed(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStep(1);
        setSelectedService(null);
        setSelectedDate('');
        setSelectedTime('');
        setClientDetails({ clientName: '', clientPhone: '' });
        setIsConfirmed(false);
      }, 5000);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-cyan-400 font-serif">1. Escolha o Serviço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map(s => (
                <button key={s.id} onClick={() => handleServiceSelect(s)} className="p-4 text-left bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 hover:border-cyan-500 transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-white">{s.name}</p>
                      <p className="text-cyan-400 font-semibold">R$ {s.price.toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{s.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-cyan-400 font-serif">2. Escolha a Data e Hora</h3>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-2">Data</label>
                    <input 
                        type="date" 
                        id="date"
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                          setSelectedTime(''); // Reset time when date changes
                        }}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
                <div className="flex-1">
                     <label className="block text-sm font-medium text-slate-300 mb-2">Horário</label>
                     <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                         {TIME_SLOTS.map(time => (
                             <button 
                                key={time} 
                                type="button"
                                onClick={() => handleTimeSelect(time)}
                                disabled={!selectedDate || isSlotBooked(time)}
                                className={`p-2 rounded-lg border transition-colors ${selectedTime === time ? 'bg-cyan-500 text-slate-900 border-cyan-500' : 'bg-slate-800 border-slate-700 hover:border-cyan-500'} disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed disabled:line-through`}
                             >
                                 {time}
                             </button>
                         ))}
                     </div>
                     {!selectedDate && <p className="text-xs text-slate-500 mt-2">Selecione uma data para ver os horários.</p>}
                </div>
            </div>
            <div className="flex justify-between mt-8">
                <button type="button" onClick={() => setStep(1)} className="text-cyan-400 hover:text-cyan-300">Voltar</button>
                <button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime} className="bg-cyan-500 text-slate-900 font-bold py-2 px-6 rounded-sm hover:bg-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed">Próximo</button>
            </div>
          </div>
        );
      case 3:
         return (
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-cyan-400 font-serif">3. Seus Detalhes</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="clientName" placeholder="Nome Completo" value={clientDetails.clientName} onChange={handleDetailsChange} required className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500" />
                <input type="tel" name="clientPhone" placeholder="Celular com DDD" value={clientDetails.clientPhone} onChange={handleDetailsChange} required className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500" />
                 <div className="flex justify-between mt-8">
                    <button type="button" onClick={() => setStep(2)} className="text-cyan-400 hover:text-cyan-300">Voltar</button>
                    <button type="submit" className="bg-cyan-500 text-slate-900 font-bold py-2 px-6 rounded-sm hover:bg-cyan-400">Confirmar Agendamento</button>
                </div>
            </form>
          </div>
         );
      default:
        return null;
    }
  };
  
  if (isConfirmed) {
      return (
        <div className="max-w-4xl mx-auto">
             <div className="bg-slate-800/50 border border-emerald-500/50 p-8 md:p-12 rounded-lg shadow-2xl text-center transition-all animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-3xl font-bold font-serif text-emerald-400">Agendamento Confirmado!</h2>
                <p className="text-slate-300 mt-2">Obrigado, {clientDetails.clientName}. Esperamos por você!</p>
                <p className="text-slate-400 text-sm mt-1">Você receberá uma notificação 1 hora antes do seu horário.</p>
            </div>
        </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto">
        <SectionTitle title="Agende seu Horário" subtitle="Simples, rápido e sem esperas." />
        <div className="bg-slate-800/50 border border-slate-700 p-6 sm:p-8 md:p-12 rounded-lg shadow-2xl">
          {renderStep()}
        </div>
      </div>
  );
};

export default Booking;