import { useState } from 'react';

export const usePageClass = () => {
  const [pageClass, setPageClass] = useState('');

  return {pageClass, setPageClass};
};
