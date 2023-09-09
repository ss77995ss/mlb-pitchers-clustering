'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import ClusteredTable from './components/ClusteredTable';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ClusteredTable />
      </main>
    </QueryClientProvider>
  );
}
