import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8 md:mb-12">
      <h2 className="text-3xl md:text-4xl font-bold font-serif text-white">{title}</h2>
      {subtitle && <p className="text-md text-slate-400 mt-2 max-w-xl mx-auto">{subtitle}</p>}
      <div className="w-24 h-1 bg-cyan-500 mx-auto mt-4"></div>
    </div>
  );
};

export default SectionTitle;