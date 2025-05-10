import React from 'react';

interface Props {
  name: string;
}

const Header: React.FC<Props> = ({ name }) => {
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <div>
      <h1 className='text-2xl font-semibold'>Selamat pagi, {name}!</h1>
      <p className='text-gray-500'>{today}</p>
    </div>
  );
};

export default React.memo(Header);
