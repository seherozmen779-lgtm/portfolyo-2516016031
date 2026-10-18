export default function HackathonForm({ action, organizatorler, kayit = {}, buton }) {
  return (
    <form action={action} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
      <input name="ad" placeholder="Hackathon adı" defaultValue={kayit.ad ?? ''} required maxLength={200} />
      <input name="takim_adi" placeholder="Takım adı" defaultValue={kayit.takim_adi ?? ''} maxLength={100} />
      <input name="takim_kisi" type="number" min="0" placeholder="Takım kişi sayısı" defaultValue={kayit.takim_kisi ?? ''} />
      <input name="sonuc_sirasi" type="number" min="0" placeholder="Sonuç sırası (boş olabilir)" defaultValue={kayit.sonuc_sirasi ?? ''} />
      <input name="tarih" type="date" defaultValue={kayit.tarih_str ?? ''} />
      <input name="proje_url" placeholder="Proje linki (https://...)" defaultValue={kayit.proje_url ?? ''} maxLength={500} />

      <select name="kategori_id" defaultValue={kayit.kategori_id ?? ''}>
        <option value="">Organizatör seç</option>
        {organizatorler.map((o) => (
          <option key={o.id} value={o.id}>{o.ad}</option>
        ))}
      </select>

      <button type="submit">{buton}</button>
    </form>
  );
}