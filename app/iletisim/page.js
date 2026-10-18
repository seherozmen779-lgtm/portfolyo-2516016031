import Link from 'next/link';
import { mesajGonder } from './actions';

export default async function IletisimSayfasi({ searchParams }) {
  const { hata, durum } = await searchParams;

  return (
    <main style={{ maxWidth: 480, margin: '60px auto', padding: 16 }}>
      <h1>İletişim</h1>

      {durum === 'ok' && (
        <p style={{ color: 'green' }}>Mesajınız gönderildi, teşekkürler!</p>
      )}
      {hata && <p style={{ color: 'crimson' }}>{hata}</p>}

      <form action={mesajGonder} style={{ display: 'grid', gap: 10 }}>
        <input name="ad_soyad" placeholder="Ad soyad" required maxLength={100} />
        <input name="eposta" type="email" placeholder="E-posta" required maxLength={200} />
        <textarea name="mesaj" placeholder="Mesajınız" rows={6} required maxLength={2000} />

        <label style={{ fontSize: 14 }}>
          <input type="checkbox" name="kvkk" required />{' '}
          <Link href="/aydinlatma-metni">Aydınlatma metnini</Link> okudum.
        </label>

        <button type="submit">Gönder</button>
      </form>
    </main>
  );
}