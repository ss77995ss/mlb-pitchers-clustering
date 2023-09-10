'use client';

import { useMatchupTable } from './useMatchupTable';

export default function MatchupTable({ playerId }: { playerId: string }) {
  const { isLoading, data } = useMatchupTable(playerId);

  if (isLoading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>查無資料</div>;

  return <div>{JSON.stringify(data)}</div>;
}
