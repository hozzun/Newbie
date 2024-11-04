import React, { useState } from 'react';

interface SelectBoxProps {
  label?: string;
  selectedValueSi?: string;
  selectedValueGun?: string;
  onChange?: (value: string) => void;    
}

const SelectBox = ({ label, selectedValueSi, selectedValueGun, onChange }: SelectBoxProps) => {

  const [selectedSi, setSelectedSi] = useState(selectedValueSi || "");
  const [selectedGun, setSelectedGun] = useState(selectedValueGun || "");
  const [siActive, setSiActive] = useState(false);
  const [gunActive, setGunActive] = useState(false);

  const options = [ // Back에서 받아올 예정
    { label: '서울', value: 'seoul' },
    { label: '부산', value: 'busan' },
    { label: '대구', value: 'daegu' },
  ];

  const handleSiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedSi(newValue);
    setSelectedGun("");
    setSiActive(true);
    setGunActive(false);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleGunChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedGun(newValue);
    setGunActive(true);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className='flex flex-col m-3'>
      {label && (
        <label className='text-gray-500 font-kbogothicmedium text-sm mb-1 ml-2'>
          {label}
        </label>
      )}
      <div className="flex space-x-2 font-kbogothiclight text-sm">
        <select
          value={selectedSi}
          onChange={handleSiChange}
          className={`border border-gray-200 p-2 rounded-lg outline-none w-1/2 h-10 ${siActive ? 'text-gray-700' : 'text-gray-300'}`}
        >
          <option value="" disabled>시</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className='text-gray-700'>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={selectedGun}
          onChange={handleGunChange}
          className={`border border-gray-200 p-2 rounded-lg outline-none w-1/2 h-10 ${gunActive ? 'text-gray-700' : 'text-gray-300'}`}
          disabled={!selectedSi}
        >
          <option value="" disabled>구</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className='text-gray-700'>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectBox;