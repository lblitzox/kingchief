import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function KingChiefVODs() {
  const [vods, setVods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with actual Kick API endpoint or proxy server
    async function fetchVODs() {
      setLoading(true);
      try {
        const res = await fetch('/api/kick/vods'); // Proxy endpoint
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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">kingchief.wtf</h1>
      {loading ? (
        <p className="text-center">Loading VODs...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vods.map((vod) => (
            <Card key={vod.id}>
              <CardContent>
                <div className="aspect-video relative">
                  <iframe
                    src={`https://kick.com/embed/video/${vod.id}`}
                    title={vod.title}
                    className="w-full h-64 rounded"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="mt-2">
                  <h2 className="text-lg font-semibold">{vod.title}</h2>
                  <p className="text-sm text-muted-foreground">{new Date(vod.created_at).toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}