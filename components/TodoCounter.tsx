import React, { useEffect } from 'react';
import useTodos from '../hooks/useTodos';
import data from '../pages/api/data';

function TodoCounter() {
  // subscribe only to changes in the 'data' prop, which will be the
  // amount of todos because of the select function

  const counterQuery = useTodos({
    select: (data) => data.items.length,
    notifyOnChangeProps: ['data'],
  });

  useEffect(() => {
    console.log('Rendering Counter!!!!!');
  }, []);

  return <div>TodoCOunter: {counterQuery.data ?? 0}</div>;
}

export default TodoCounter;
