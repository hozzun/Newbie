import React from 'react';

interface BoxProps {
  label?: string;
}

const AddressBox: React.FC<BoxProps> = ({ label }) => {

  return (
    <div className='flex flex-col'>
      <label 
      className='text-gray-500 font-kbogothicmedium text-sm mb-1 ml-2'>{label}</label>
    </div>
  );
};

export default AddressBox;
