import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sql } from './db';

// Çerezdeki token geçerliyse yöneticiyi döndürür, değilse null
export async function getAdmin() {
  const token = (await cookies()).get('oturum')?.value;
  if (!token) return null;

  const sonuc = await sql`
    SELECT y.id, y.eposta, y.rol
    FROM oturumlar o
    JOIN yoneticiler y ON y.id = o.yonetici_id
    WHERE o.token = ${token} AND o.bitis > now()`;

  return sonuc[0] ?? null;
}

// Giriş yoksa /giris sayfasına gönderir
export async function requireAdmin() {
  const yonetici = await getAdmin();
  if (!yonetici) redirect('/giris');
  return yonetici;
}