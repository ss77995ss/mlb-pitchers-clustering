'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import MatchupTable from './MatchupTable';

const queryClient = new QueryClient();

export default function Matchup() {
  const [playerId, setPlayerId] = useState('');
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center px-24 py-4">
        <div>
          <label>輸入球員ID: </label>
          <input
            className="text-black caret-black"
            value={playerId}
            onChange={(event) => setPlayerId(event.target.value)}
          />
        </div>
        <div>{playerId && <MatchupTable playerId={playerId} />}</div>
      </main>
    </QueryClientProvider>
  );
}
