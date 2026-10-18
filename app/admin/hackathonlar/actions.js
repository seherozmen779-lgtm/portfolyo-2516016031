'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

// Formdan gelen verileri okur ve doğrular (sunucu tarafı kontrol)
function oku(formData) {
  const metin = (alan) => String(formData.get(alan) ?? '').trim();

  const sayi = (alan) => {
    const v = metin(alan);
    if (v === '') return null;
    const n = Number(v);
    if (!Number.isInteger(n) || n < 0) throw new Error('Geçersiz sayı');
    return n;
  };

  const ad = metin('ad');
  if (!ad || ad.length > 200) throw new Error('Ad zorunlu ve en fazla 200 karakter olmalı');

  const takimAdi = metin('takim_adi') || null;
  if (takimAdi && takimAdi.length > 100) throw new Error('Takım adı çok uzun');

  const projeUrl = metin('proje_url') || null;
  if (projeUrl && !/^https?:\/\//i.test(projeUrl)) {
    throw new Error('Proje linki http:// veya https:// ile başlamalı');
  }
  if (projeUrl && projeUrl.length > 500) throw new Error('Proje linki çok uzun');

  return {
    ad,
    takimAdi,
    takimKisi: sayi('takim_kisi'),
    sonucSirasi: sayi('sonuc_sirasi'),
    tarih: metin('tarih') || null,
    projeUrl,
    kategoriId: sayi('kategori_id'),
  };
}

function yenile() {
  revalidatePath('/admin/hackathonlar');
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function ekle(formData) {
  await requireAdmin();
  const v = oku(formData);

  await sql`
    INSERT INTO hackathonlar
      (ad, takim_adi, takim_kisi, sonuc_sirasi, tarih, proje_url, kategori_id)
    VALUES
      (${v.ad}, ${v.takimAdi}, ${v.takimKisi}, ${v.sonucSirasi},
       ${v.tarih}, ${v.projeUrl}, ${v.kategoriId})`;

  yenile();
}

export async function guncelle(id, formData) {
  await requireAdmin();
  const v = oku(formData);

  await sql`
    UPDATE hackathonlar SET
      ad = ${v.ad},
      takim_adi = ${v.takimAdi},
      takim_kisi = ${v.takimKisi},
      sonuc_sirasi = ${v.sonucSirasi},
      tarih = ${v.tarih},
      proje_url = ${v.projeUrl},
      kategori_id = ${v.kategoriId}
    WHERE id = ${id}`;

  yenile();
  redirect('/admin/hackathonlar');
}

export async function sil(id) {
  const yonetici = await requireAdmin();
  if (yonetici.rol !== 'admin') {
    throw new Error('Bu işlem için yetkiniz yok');
  }

  await sql`DELETE FROM hackathonlar WHERE id = ${id}`;
  yenile();
}

export async function yayinDegistir(id) {
  await requireAdmin();
  await sql`UPDATE hackathonlar SET yayinda = NOT yayinda WHERE id = ${id}`;
  yenile();
}