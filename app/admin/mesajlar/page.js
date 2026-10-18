import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { sql } from '@/lib/db';
import { okunduIsaretle, mesajSil } from './actions';

export default async function MesajlarSayfasi() {
  const yonetici = await requireAdmin();
  if (yonetici.rol !== 'admin') redirect('/admin');

  const mesajlar = await sql`
    SELECT id, ad_soyad, eposta, mesaj, okundu,
           to_char(gonderim_zamani AT TIME ZONE 'Europe/Istanbul', 'DD.MM.YYYY HH24:MI') AS zaman
    FROM iletisim_mesajlari
    ORDER BY gonderim_zamani DESC`;

  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: 16 }}>
      <p><Link href="/admin">← Panele dön</Link></p>
      <h1>Mesajlar</h1>

      {mesajlar.length === 0 && <p>Henüz mesaj yok.</p>}

      {mesajlar.map((m) => (
        <article
          key={m.id}
          style={{
            border: '1px solid #999',
            padding: 12,
            marginBottom: 12,
            opacity: m.okundu ? 0.6 : 1,
          }}
        >
          <strong>{m.ad_soyad}</strong> ({m.eposta})
          <div style={{ fontSize: 13 }}>
            {m.zaman} — {m.okundu ? 'Okundu' : 'Okunmadı'}
          </div>
          <p style={{ whiteSpace: 'pre-wrap' }}>{m.mesaj}</p>

          <div style={{ display: 'flex', gap: 8 }}>
            {!m.okundu && (
              <form action={okunduIsaretle.bind(null, m.id)}>
                <button type="submit">Okundu işaretle</button>
              </form>
            )}
            <form action={mesajSil.bind(null, m.id)}>
              <button type="submit">Sil</button>
            </form>
          </div>
        </article>
      ))}
    </main>
  );
}