import { useEffect, useState } from 'react';

export default function KingChiefVODs() {
  const [vods, setVods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVODs() {
      setLoading(true);
      try {
        const res = await fetch('/api/kick/vods');
        const data = await res.json();
        setVods(data);
      } catch (e) {
        console.error('Failed to fetch VODs', e);
      }
      setLoading(false);
    }
    fetchVODs();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>kingchief.wtf</h1>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading VODs...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '1rem' }}>
          {vods.map((vod) => (
            <div key={vod.id} style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
              <iframe
                src={`https://kick.com/embed/video/${vod.id}`}
                title={vod.title}
                style={{ width: '100%', height: '140px' }}
                allowFullScreen
              />
              <div style={{ padding: '0.5rem' }}>
                <h2 style={{ fontWeight: '600' }}>{vod.title}</h2>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>{new Date(vod.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
