import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import Footer from './components/Footer';
import Booking from './components/Booking';
import OwnerView from './components/OwnerView';
import AdminToggle from './components/AdminToggle';
import { Appointment, Service, ShopDetails } from './types';
import { SERVICES, DEFAULT_SHOP_DETAILS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useLocalStorage<'client' | 'owner'>('barbershop-view', 'client');
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('barbershop-appointments', []);
  const [services, setServices] = useLocalStorage<Service[]>('barbershop-services', SERVICES);
  const [shopDetails, setShopDetails] = useLocalStorage<ShopDetails>('barbershop-details', DEFAULT_SHOP_DETAILS);

  const addAppointment = (newAppointmentData: Omit<Appointment, 'id' | 'status'>) => {
    const newAppointment: Appointment = {
      ...newAppointmentData,
      id: new Date().toISOString(),
      status: 'pending',
    };
    setAppointments([...appointments, newAppointment]);
  };

  const updateAppointmentStatus = (id: string, status: 'completed' | 'no-show') => {
    setAppointments(
      appointments.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };
  
  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen flex flex-col">
      <Header shopDetails={shopDetails} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-24 sm:py-28">
        {view === 'client' ? (
          <Booking
            services={services}
            appointments={appointments}
            addAppointment={addAppointment}
          />
        ) : (
          <OwnerView
            appointments={appointments}
            updateAppointmentStatus={updateAppointmentStatus}
            services={services}
            setServices={setServices}
            shopDetails={shopDetails}
            setShopDetails={setShopDetails}
          />
        )}
      </main>
      <AdminToggle currentView={view} setView={setView} />
      <Footer shopDetails={shopDetails} />
    </div>
  );
};

export default App;