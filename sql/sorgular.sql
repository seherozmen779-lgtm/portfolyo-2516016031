-- Görev 3.1
SELECT * FROM hackathonlar
WHERE sonuc_sirasi <= 5 AND takim_kisi < 4;

-- Görev 3.2
SELECT * FROM hackathonlar
ORDER BY sonuc_sirasi ASC NULLS LAST
LIMIT 4;

-- Görev 3.3
SELECT AVG(takim_kisi) AS ortalama_takim, MIN(sonuc_sirasi) AS en_iyi_derece
FROM hackathonlar;

-- Görev 3.4
SELECT o.ad, COUNT(h.id) AS hackathon_sayisi
FROM organizatorler o
LEFT JOIN hackathonlar h ON h.kategori_id = o.id
GROUP BY o.id, o.ad;

-- Görev 3.5
SELECT * FROM hackathonlar WHERE ad ILIKE '%2516016031%';

-- Görev 3.6
UPDATE hackathonlar SET yayinda = false WHERE sonuc_sirasi IS NULL;

-- Görev 3.7
DELETE FROM hackathonlar WHERE tarih < '2022-01-01';

-- Görev 6: rollere göre yönetici sayısı
SELECT rol, COUNT(*) FROM yoneticiler GROUP BY rol;