import { useState } from 'react';
import { useQuery } from 'react-query';

export const useClusteredTable = () => {
  const [cluster, setCluster] = useState(0);
  const { isLoading, data } = useQuery('clustered', async () => {
    const data = await fetch('/api/clustered')
      .then((data) => data.json())
      .then((data) => data);
    return data;
  });

  const clusteredPitchers = data && data.filter((pitcher: Record<string, any>) => pitcher.cluster === cluster);

  return {
    isLoading,
    cluster,
    setCluster,
    data: clusteredPitchers,
  };
};
