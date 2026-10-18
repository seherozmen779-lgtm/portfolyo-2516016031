import { girisYap } from './actions';

export default async function GirisSayfasi({ searchParams }) {
  const { hata } = await searchParams;

  return (
    <main style={{ maxWidth: 360, margin: '80px auto', padding: 16 }}>
      <h1>Yönetici Girişi</h1>

      {hata && (
        <p style={{ color: 'crimson' }}>E-posta veya şifre hatalı</p>
      )}

      <form action={girisYap} style={{ display: 'grid', gap: 12 }}>
        <input name="eposta" type="email" placeholder="E-posta" required />
        <input name="sifre" type="password" placeholder="Şifre" required />
        <button type="submit">Giriş yap</button>
      </form>
    </main>
  );
}