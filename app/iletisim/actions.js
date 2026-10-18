'use server';

import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';

export async function mesajGonder(formData) {
  const ad = String(formData.get('ad_soyad') ?? '').trim();
  const eposta = String(formData.get('eposta') ?? '').trim();
  const mesaj = String(formData.get('mesaj') ?? '').trim();
  const onay = formData.get('kvkk') === 'on';

  let hata = null;

  if (!ad || !eposta || !mesaj) {
    hata = 'Lütfen tüm alanları doldurun.';
  } else if (ad.length > 100 || eposta.length > 200 || mesaj.length > 2000) {
    hata = 'Bir alan izin verilen uzunluğu aşıyor.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta)) {
    hata = 'Geçerli bir e-posta adresi girin.';
  } else if (!onay) {
    hata = 'Devam etmek için aydınlatma metnini okuduğunuzu onaylamalısınız.';
  }

  if (hata) {
    redirect('/iletisim?hata=' + encodeURIComponent(hata));
  }

  await sql`
    INSERT INTO iletisim_mesajlari (ad_soyad, eposta, mesaj, kvkk_onay)
    VALUES (${ad}, ${eposta}, ${mesaj}, ${onay})`;

  redirect('/iletisim?durum=ok');
}