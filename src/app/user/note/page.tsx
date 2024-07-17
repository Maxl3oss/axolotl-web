import { Metadata } from 'next';
import React from 'react';
import ShowDataNote from './components/ShowDataNote';

export const metadata: Metadata = {
  title: 'Axolotl - Note',
  description: 'Axolotl note page',
};

function page() {
  return (
    <div>
      <ShowDataNote />
    </div>
  );
}

export default page;
