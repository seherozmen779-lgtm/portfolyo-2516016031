'use server';

import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';

export async function girisYap(formData) {
  const eposta = String(formData.get('eposta') ?? '').trim();
  const sifre = String(formData.get('sifre') ?? '');

  const sonuc = await sql`
    SELECT id, sifre_hash FROM yoneticiler WHERE eposta = ${eposta}`;

  const kullanici = sonuc[0];
  const dogru = kullanici && (await bcrypt.compare(sifre, kullanici.sifre_hash));

  if (!dogru) {
    redirect('/giris?hata=1');
  }

  const token = crypto.randomBytes(32).toString('hex');

  await sql`
    INSERT INTO oturumlar (token, yonetici_id, bitis)
    VALUES (${token}, ${kullanici.id}, now() + interval '2 hours')`;

  (await cookies()).set('oturum', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 2,
  });

  redirect('/admin');
}

export async function cikisYap() {
  const jar = await cookies();
  const token = jar.get('oturum')?.value;

  if (token) {
    await sql`DELETE FROM oturumlar WHERE token = ${token}`;
  }

  jar.delete('oturum');
  redirect('/giris');
}