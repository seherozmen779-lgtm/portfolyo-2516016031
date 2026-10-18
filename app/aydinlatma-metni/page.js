import Link from 'next/link';

export const metadata = {
  title: 'KVKK Aydınlatma Metni',
};

export default function AydinlatmaMetni() {
  return (
    <main style={{ maxWidth: 720, margin: '40px auto', padding: 16, lineHeight: 1.6 }}>
      <p><Link href="/iletisim">← İletişim formuna dön</Link></p>

      <h1>Kişisel Verilerin Korunması Aydınlatma Metni</h1>
      <p>
        Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) md. 10 ve
        Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar
        Hakkında Tebliğ kapsamında hazırlanmıştır.
      </p>

      <h2>1. Veri sorumlusunun kimliği</h2>
      <p>
        Veri sorumlusu: Seher Özmen (Manisa Celal Bayar Üniversitesi öğrencisi,
        bu site bir ders ödevi kapsamında hazırlanmıştır).<br />
        İletişim: [seherozmen779@gmail.com]
      </p>

      <h2>2. İşlenen kişisel veriler</h2>
      <p>
        İletişim formunda paylaştığınız ad soyad, e-posta adresi ve mesaj içeriği
        ile formun gönderildiği tarih ve saat.
      </p>

      <h2>3. Kişisel verilerin işlenme amacı</h2>
      <p>
        Verileriniz yalnızca gönderdiğiniz mesajı almak, değerlendirmek ve size
        geri dönüş yapmak amacıyla işlenir.
      </p>

      <h2>4. Verilerin toplanma yöntemi ve hukuki sebebi</h2>
      <p>
        Verileriniz, bu sitedeki iletişim formu aracılığıyla elektronik ortamda
        otomatik yöntemle toplanır. İşlemenin hukuki sebebi KVKK md. 5/2-(f):
        ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri
        sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olmasıdır
        (gelen mesajlara yanıt verebilmek).
      </p>

      <h2>5. Verilerin aktarılması</h2>
      <p>
        Verileriniz, hukuka uygun olarak yalnızca hizmet sağlayıcılara aktarılır:
      </p>
      <ul>
        <li>
          <strong>Neon (veritabanı hizmeti):</strong> Mesajlarınızın saklandığı
          veritabanını barındırır.
        </li>
        <li>
          <strong>Vercel (barındırma hizmeti):</strong> Sitenin ve formun
          çalıştığı sunucu altyapısını sağlar.
        </li>
      </ul>
      <p>
        Bu hizmet sağlayıcıların sunucuları yurt dışında bulunabilir; bu nedenle
        verileriniz yurt dışına aktarılabilir. Verileriniz bunların dışında
        üçüncü kişilerle paylaşılmaz.
      </p>

      <h2>6. Saklama süresi</h2>
      <p>
        Verileriniz, mesajınızın yanıtlanması için gereken süre boyunca ve ders
        ödevinin değerlendirme süreci tamamlanana kadar saklanır; sonrasında
        silinir.
      </p>

      <h2>7. KVKK md. 11 kapsamındaki haklarınız</h2>
      <p>İlgili kişi olarak şu haklara sahipsiniz:</p>
      <ul>
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
        <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
        <li>Kanun şartları çerçevesinde silinmesini veya yok edilmesini isteme,</li>
        <li>Düzeltme ve silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
        <li>İşlenen verilerin analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme,</li>
        <li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
      </ul>

      <h2>8. Başvuru yolu</h2>
      <p>
        Yukarıdaki haklarınızı kullanmak için [seherozmen779@gmail.com]
        adresine yazabilirsiniz. Başvurularınız en geç 30 gün içinde
        sonuçlandırılır.
      </p>
    </main>
  );
}