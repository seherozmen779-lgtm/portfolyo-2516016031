import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { sql } from '@/lib/db';
import { guncelle } from '../actions';
import HackathonForm from '../Form';

export default async function DuzenleSayfasi({ params }) {
  await requireAdmin();

  const { id } = await params;
  const numara = Number(id);
  if (!Number.isInteger(numara)) notFound();

  const sonuc = await sql`
    SELECT *, to_char(tarih, 'YYYY-MM-DD') AS tarih_str
    FROM hackathonlar WHERE id = ${numara}`;
  const kayit = sonuc[0];
  if (!kayit) notFound();

  const organizatorler = await sql`SELECT id, ad FROM organizatorler ORDER BY ad`;

  return (
    <main style={{ maxWidth: 600, margin: '40px auto', padding: 16 }}>
      <p><Link href="/admin/hackathonlar">← Listeye dön</Link></p>
      <h1>Kaydı düzenle</h1>
      <HackathonForm
        action={guncelle.bind(null, kayit.id)}
        organizatorler={organizatorler}
        kayit={kayit}
        buton="Kaydet"
      />
    </main>
  );
}