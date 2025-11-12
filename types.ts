import { ReactNode } from "react";

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  whatsapp: string;
}

export interface ShopDetails {
  name: string;
  logo: string;
  socialLinks: SocialLinks;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceId: number;
  date: string;
  time: string;
  status: 'pending' | 'completed' | 'no-show';
}

export interface Tab {
  id: string;
  label: string;
  icon: ReactNode;
}