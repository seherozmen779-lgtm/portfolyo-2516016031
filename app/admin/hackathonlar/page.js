import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { sql } from '@/lib/db';
import { ekle, sil, yayinDegistir } from './actions';
import HackathonForm from './Form';

export default async function HackathonlarSayfasi() {
  const yonetici = await requireAdmin();

  const liste = await sql`
    SELECT h.id, h.ad, h.takim_adi, h.takim_kisi, h.sonuc_sirasi, h.yayinda,
           to_char(h.tarih, 'DD.MM.YYYY') AS tarih_g,
           o.ad AS kategori_adi
    FROM hackathonlar h
    LEFT JOIN organizatorler o ON o.id = h.kategori_id
    ORDER BY h.id DESC`;

  const organizatorler = await sql`SELECT id, ad FROM organizatorler ORDER BY ad`;

  return (
    <main style={{ maxWidth: 1000, margin: '40px auto', padding: 16 }}>
      <p><Link href="/admin">← Panele dön</Link></p>
      <h1>Hackathonlar</h1>

      <div style={{ overflowX: 'auto' }}>
        <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Ad</th><th>Organizatör</th><th>Takım</th><th>Kişi</th>
              <th>Sıra</th><th>Tarih</th><th>Durum</th><th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {liste.map((h) => (
              <tr key={h.id}>
                <td>{h.ad}</td>
                <td>{h.kategori_adi ?? '-'}</td>
                <td>{h.takim_adi ?? '-'}</td>
                <td>{h.takim_kisi ?? '-'}</td>
                <td>{h.sonuc_sirasi ?? '-'}</td>
                <td>{h.tarih_g ?? '-'}</td>
                <td>{h.yayinda ? 'Yayında' : 'Yayında değil'}</td>
                <td style={{ display: 'flex', gap: 6 }}>
                  <Link href={`/admin/hackathonlar/${h.id}`}>Düzenle</Link>

                  <form action={yayinDegistir.bind(null, h.id)}>
                    <button type="submit">{h.yayinda ? 'Yayından kaldır' : 'Yayınla'}</button>
                  </form>

                  {yonetici.rol === 'admin' && (
                    <form action={sil.bind(null, h.id)}>
                      <button type="submit">Sil</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: 32 }}>Yeni kayıt ekle</h2>
      <HackathonForm action={ekle} organizatorler={organizatorler} buton="Ekle" />
    </main>
  );
}