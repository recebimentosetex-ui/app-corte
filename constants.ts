import { Service, ShopDetails } from './types';

export const DEFAULT_SHOP_DETAILS: ShopDetails = {
  name: "Gentleman's Cut",
  logo: '',
  socialLinks: {
    instagram: '',
    facebook: '',
    whatsapp: '',
  },
};

export const SERVICES: Service[] = [
  { id: 1, name: "Corte Clássico", description: "Corte tradicional com tesoura e máquina.", price: 50 },
  { id: 2, name: "Barba", description: "Design de barba com toalha quente e navalha.", price: 40 },
  { id: 3, name: "Combo (Corte + Barba)", description: "O pacote completo para um visual impecável.", price: 85 },
];

export const TIME_SLOTS: string[] = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00'
];