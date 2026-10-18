import Link from 'next/link';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AnaSayfa() {
  // Görev 3.2'deki sorgu: sadece yayında olanlar arasından en iyi 4
  const onecikanlar = await sql`
    SELECT h.id, h.ad, h.takim_adi, h.sonuc_sirasi
    FROM hackathonlar h
    WHERE h.yayinda = true
    ORDER BY h.sonuc_sirasi ASC NULLS LAST
    LIMIT 4`;

  // Yayında olan tüm katılımlar
  const katilimlar = await sql`
    SELECT h.id, h.ad, h.takim_adi, h.takim_kisi, h.sonuc_sirasi, h.proje_url,
           to_char(h.tarih, 'DD.MM.YYYY') AS tarih_g,
           o.ad AS organizator
    FROM hackathonlar h
    LEFT JOIN organizatorler o ON o.id = h.kategori_id
    WHERE h.yayinda = true
    ORDER BY h.tarih DESC NULLS LAST`;

  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: 16 }}>
      <h1>Seher Özmen</h1>
      <p>
        <Link href="/iletisim">İletişim</Link> ·{' '}
        <Link href="/aydinlatma-metni">Aydınlatma Metni</Link>
      </p>

      <section>
        <h2>Öne Çıkanlar</h2>
        <ul>
          {onecikanlar.map((h) => (
            <li key={h.id}>
              <strong>{h.ad}</strong>
              {h.sonuc_sirasi ? ` — ${h.sonuc_sirasi}. sıra` : ''}
              {h.takim_adi ? ` (${h.takim_adi})` : ''}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Hackathon Katılımlarım</h2>
        <p style={{ fontSize: 13 }}>
          Not: Bu bölümdeki kayıtlar ders ödevi kapsamında hazırlanmış örnek
          (kurgusal) verilerdir.
        </p>

        {katilimlar.length === 0 && <p>Henüz kayıt yok.</p>}

        {katilimlar.map((h) => (
          <article
            key={h.id}
            style={{ border: '1px solid #999', padding: 12, marginBottom: 10 }}
          >
            <h3 style={{ margin: 0 }}>{h.ad}</h3>
            <p style={{ margin: '6px 0' }}>
              {h.organizator ?? 'Organizatör belirtilmemiş'}
              {h.tarih_g ? ` · ${h.tarih_g}` : ''}
            </p>
            <p style={{ margin: '6px 0' }}>
              {h.takim_adi ? `Takım: ${h.takim_adi}` : ''}
              {h.takim_kisi ? ` (${h.takim_kisi} kişi)` : ''}
              {h.sonuc_sirasi ? ` · Sıralama: ${h.sonuc_sirasi}` : ''}
            </p>
            {h.proje_url && (
              <a href={h.proje_url} target="_blank" rel="noopener noreferrer">
                Projeyi gör →
              </a>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}