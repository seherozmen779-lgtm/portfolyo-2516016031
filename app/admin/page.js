import { requireAdmin } from '@/lib/auth';
import { sql } from '@/lib/db';
import { cikisYap } from '../giris/actions';

export default async function AdminAnaSayfa() {
  const yonetici = await requireAdmin();

  const [mesaj] = await sql`
    SELECT COUNT(*)::int AS n FROM iletisim_mesajlari WHERE okundu = false`;
  const [hackathon] = await sql`
    SELECT COUNT(*)::int AS n FROM hackathonlar`;

  return (
    <main style={{ maxWidth: 600, margin: '40px auto', padding: 16 }}>
      <h1>Yönetim Paneli</h1>
      <p>Giriş yapan: {yonetici.eposta} ({yonetici.rol})</p>

      <ul>
        <li>Okunmamış mesaj: {mesaj.n}</li>
        <li>Hackathon kaydı: {hackathon.n}</li>
      </ul>

      <p><a href="/admin/hackathonlar">Hackathonları yönet →</a></p>

      {yonetici.rol === 'admin' && (
        <p><a href="/admin/mesajlar">Mesajları gör →</a></p>
      )}

      <form action={cikisYap}>
        <button type="submit">Çıkış yap</button>
      </form>
    </main>
  );
}