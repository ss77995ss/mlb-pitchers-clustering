'use client';
import Link from 'next/link';
import { useClusteredTable } from './useClusteredTable';

const HEADER_NAME_MAP: Record<string, any> = {
  player_name: '球員名稱',
  FF: '四縫',
  SI: '伸卡',
  FC: '卡特',
  SL: '滑球',
  CH: '變速',
  CU: '曲球',
  FS: '快指',
  ST: '橫掃',
  SV: '滑曲',
};

export default function ClusteredTable() {
  const { isLoading, data, cluster, setCluster } = useClusteredTable();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-row">
        <button
          className={`basis-1/4 ${cluster === 0 ? 'bg-red-600' : 'bg-teal-600'}`}
          value={0}
          onClick={() => setCluster(0)}
        >
          Cluster 0
        </button>
        <button
          className={`basis-1/4 ${cluster === 1 ? 'bg-red-600' : 'bg-teal-600'}`}
          value={1}
          onClick={() => setCluster(1)}
        >
          Cluster 1
        </button>
        <button
          className={`basis-1/4 ${cluster === 2 ? 'bg-red-600' : 'bg-teal-600'}`}
          value={2}
          onClick={() => setCluster(2)}
        >
          Cluster 2
        </button>
        <button
          className={`basis-1/4 ${cluster === 3 ? 'bg-red-600' : 'bg-teal-600'}`}
          value={3}
          onClick={() => setCluster(3)}
        >
          Cluster 3
        </button>
      </div>
      <table style={{ width: '100%' }} className="min-w-full text-center table-fixed">
        <thead>
          {Object.keys(HEADER_NAME_MAP).map((key) => (
            <th key={key}>{HEADER_NAME_MAP[key]}</th>
          ))}
        </thead>
        <tbody>
          {data.map((item: Record<string, any>) => (
            <tr>
              {Object.keys(HEADER_NAME_MAP).map((key) =>
                key === 'player_name' ? (
                  <td>
                    <Link
                      href={`https://baseballsavant.mlb.com/savant-player/${item['pitcher']}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {item[key]}
                    </Link>
                  </td>
                ) : (
                  <td>{item[key]}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
