import React from 'react';

interface InputProps {
  label?: string;
  onChange?: (value: string) => void;
}

const AlarmGreen: React.FC<InputProps> = ({ label }) => {
  return (
    <div
      className="flex items-center justify-center bg-green-900 font-kbogothicmedium"
      style={{ width: '326px', height: '46px', borderRadius: '54px' }}
    >
      {label && <label className="text-white text-center">{label}</label>}
    </div>
  );
};

export default AlarmGreen;
