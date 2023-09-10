import { useState } from 'react';
import { useQuery } from 'react-query';

export const useMatchupTable = (playerId: string) => {
  const { isLoading, data } = useQuery(`matchup-${playerId}`, async () => {
    const data = await fetch(`/api/matchup/${playerId}`)
      .then((data) => data.json())
      .then((data) => data);
    return data;
  });

  return {
    isLoading,
    data,
  };
};
