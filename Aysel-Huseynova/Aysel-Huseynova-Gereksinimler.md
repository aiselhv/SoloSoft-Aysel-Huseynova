#  CareerPilot Proje Gereksinimleri

| No | Fonksiyon | Metot | Açıklama |
|:---|:--- |:---:|:---|
| 1 | *Kayıt Ol* | POST | Ad, kariyer hedefi ve yetkinliklerle ilk kayıt işlemini gerçekleştirme. |
| 2 | *Giriş Yap* | POST | Kayıtlı kullanıcının kişisel çalışma planına güvenli erişim sağlaması. |
| 3 | *Görev Ekle* | POST | Günlük çalışma listesine yeni maddeler (Örn: Flask çalışılacak) ekleme. |
| 4 | *Hedeflenen Yetkinlikler* | GET | Hedefe ulaşmak için gereken teknik becerilerin (Skill Matrix) listelenmesi. |
| 5 | *Yol Haritasını Görüntüle* | GET | 3 veya 6 aylık planın zaman çizelgesi üzerinde görsel sunumu. |
| 6 | *Günlük İlerleme Grafiği* | GET | Tamamlanan görevlerin hedefe yakınlığını yüzde (%) olarak görme. |
| 7 | *Haftalık Çizelge* | GET | Haftalık tamamlanan görevlerin grafik üzerinde gösterilmesi. |
| 8 | *Yetenek Seviyesi Güncelle* | UPDATE | Öğrenilen yeni becerilerin veya puanların sistemde güncellenmesi. |
| 9 | *Görev Durumu Güncelle* | UPDATE | Görevi "Tamamlandı" olarak işaretleyip durumunu değiştirme. |
| 10 | *Tema Ayarını Güncelle* | UPDATE | Görünümü Dark Mode veya Aydınlık Mod olarak değiştirme. |
| 11 | *Hatalı Görevi Sil* | DELETE | Yanlış eklenen veya vazgeçilen maddelerin sistemden kaldırılması. |
| 12 | *Hesabı Sil* | DELETE | Tüm kariyer planlarını ve geçmiş verileri kalıcı olarak temizleme. |
