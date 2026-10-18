'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

async function sadeceAdmin() {
  const yonetici = await requireAdmin();
  if (yonetici.rol !== 'admin') {
    throw new Error('Bu işlem için yetkiniz yok');
  }
  return yonetici;
}

export async function okunduIsaretle(id) {
  await sadeceAdmin();
  await sql`UPDATE iletisim_mesajlari SET okundu = true WHERE id = ${id}`;
  revalidatePath('/admin/mesajlar');
  revalidatePath('/admin');
}

export async function mesajSil(id) {
  await sadeceAdmin();
  await sql`DELETE FROM iletisim_mesajlari WHERE id = ${id}`;
  revalidatePath('/admin/mesajlar');
  revalidatePath('/admin');
}