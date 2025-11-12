import React, { useState } from 'react';
import { Appointment, Service, ShopDetails, Tab } from '../types';
import SectionTitle from './SectionTitle';

interface OwnerViewProps {
  appointments: Appointment[];
  updateAppointmentStatus: (id: string, status: 'completed' | 'no-show') => void;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  shopDetails: ShopDetails;
  setShopDetails: React.Dispatch<React.SetStateAction<ShopDetails>>;
}

const TABS: Tab[] = [
    { id: 'appointments', label: 'Agendamentos', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { id: 'settings', label: 'Configurações', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
];

const OwnerView: React.FC<OwnerViewProps> = ({ appointments, updateAppointmentStatus, services, setServices, shopDetails, setShopDetails }) => {
    const [activeTab, setActiveTab] = useState('appointments');

    const handleServicePriceChange = (id: number, price: number) => {
        setServices(services.map(s => s.id === id ? {...s, price: price} : s));
    }

    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShopDetails(prev => ({...prev, [name]: value}));
    }

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShopDetails(prev => ({...prev, socialLinks: {...prev.socialLinks, [name]: value}}))
    }

    const getServiceName = (serviceId: number) => services.find(s => s.id === serviceId)?.name || 'Serviço desconhecido';

    const sortedAppointments = [...appointments].sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
    });

    const getStatusInfo = (status: Appointment['status']) => {
        switch(status) {
            case 'pending': return { text: 'Pendente', classes: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' };
            case 'completed': return { text: 'Finalizado', classes: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 opacity-60' };
            case 'no-show': return { text: 'Faltou', classes: 'bg-rose-500/20 text-rose-300 border-rose-500/30 opacity-60 line-through' };
        }
    }

  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="Painel do Dono" subtitle={`Bem-vindo, gerencie sua barbearia.`} />
      
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-2xl p-4 sm:p-6">
        <div className="border-b border-slate-700 mb-6">
            <nav className="-mb-px flex space-x-6">
                {TABS.map(tab => (
                     <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${activeTab === tab.id ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'}`}>
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </nav>
        </div>

        {activeTab === 'appointments' && (
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-300 uppercase bg-slate-800/50">
                    <tr>
                        <th scope="col" className="px-4 py-3">Cliente</th>
                        <th scope="col" className="px-4 py-3 hidden md:table-cell">Data & Hora</th>
                        <th scope="col" className="px-4 py-3 hidden sm:table-cell">Serviço</th>
                        <th scope="col" className="px-4 py-3">Status</th>
                        <th scope="col" className="px-4 py-3 text-right">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedAppointments.length === 0 ? (
                        <tr><td colSpan={5} className="text-center py-10 text-slate-500">Nenhum agendamento encontrado.</td></tr>
                    ) : (
                        sortedAppointments.map(app => {
                            const statusInfo = getStatusInfo(app.status);
                            return (
                            <tr key={app.id} className={`border-b border-slate-800 hover:bg-slate-800/70 ${app.status !== 'pending' ? 'opacity-70' : ''}`}>
                                <td className="px-4 py-4 font-medium text-white whitespace-nowrap">
                                    {app.clientName}
                                    <div className="md:hidden text-xs text-slate-400">{new Date(app.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})} - {app.time}</div>
                                </td>
                                <td className="px-4 py-4 hidden md:table-cell">{new Date(app.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})} - {app.time}</td>
                                <td className="px-4 py-4 hidden sm:table-cell">{getServiceName(app.serviceId)}</td>
                                <td className="px-4 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full border ${statusInfo.classes}`}>{statusInfo.text}</span></td>
                                <td className="px-4 py-4 text-right">
                                    {app.status === 'pending' && (
                                        <div className="flex space-x-2 justify-end">
                                            <button onClick={() => updateAppointmentStatus(app.id, 'completed')} className="text-emerald-400 hover:text-emerald-300" title="Marcar como Finalizado (✓)"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></button>
                                            <button onClick={() => updateAppointmentStatus(app.id, 'no-show')} className="text-orange-400 hover:text-orange-300" title="Marcar como Falta (X)"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                            )
                        })
                    )}
                    </tbody>
                </table>
            </div>
        )}

        {activeTab === 'settings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-4">Detalhes da Loja</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Nome da Barbearia</label>
                            <input type="text" name="name" value={shopDetails.name} onChange={handleDetailsChange} className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">URL do Logo</label>
                            <input type="text" name="logo" value={shopDetails.logo} onChange={handleDetailsChange} placeholder="https://example.com/logo.png" className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                    </div>
                     <h3 className="text-lg font-semibold text-cyan-400 mb-4 mt-8">Redes Sociais</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Instagram URL</label>
                            <input type="text" name="instagram" value={shopDetails.socialLinks.instagram} onChange={handleSocialChange} placeholder="https://instagram.com/suabarbearia" className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Facebook URL</label>
                            <input type="text" name="facebook" value={shopDetails.socialLinks.facebook} onChange={handleSocialChange} placeholder="https://facebook.com/suabarbearia" className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">WhatsApp Link</label>
                            <input type="text" name="whatsapp" value={shopDetails.socialLinks.whatsapp} onChange={handleSocialChange} placeholder="https://wa.me/55119..." className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                    </div>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-4">Preços dos Serviços</h3>
                    <div className="space-y-4">
                        {services.map(service => (
                            <div key={service.id}>
                                <label className="block text-sm font-medium text-slate-300 mb-1">{service.name}</label>
                                <div className="flex items-center">
                                    <span className="text-slate-400 mr-2">R$</span>
                                    <input type="number" value={service.price} onChange={(e) => handleServicePriceChange(service.id, parseFloat(e.target.value) || 0)} className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default OwnerView;