## Fonksiyonel Gereksinim Listesi

1. *Kayıt Ol (POST):* Kullanıcının ad, kariyer hedefi (Örn: Python Developer) ve mevcut yetkinliklerini sisteme ilk kez kaydetmesi.
2. *Giriş Yap (POST):* Daha önce kayıt olan kullanıcının kendi çalışma planına erişim sağlaması.
3. *Görev Ekle (POST):* Kullanıcının o gün yapacağı yeni bir çalışma maddesini (Örn: "2 saat Flask çalışılacak") listesine eklemesi.
4. *Hedeflenen Yetkinlikleri Görüntüle (GET):* Kullanıcının hedefine ulaşması için öğrenmesi gereken teknik becerilerin (Skill Matrix) ekranda listelenmesi.
5. *Yol Haritasını Görüntüle (GET):* Kullanıcının 3 veya 6 aylık planının bir zaman çizelgesi üzerinde görsel olarak sunulması.
6. *Günlük İlerleme Grafiğini Görüntüle (GET):* Kullanıcının o güne kadar tamamladığı görevlerin hedefe olan yakınlığını yüzde bazında görmesi.
7. *Haftalık Çalışma Çizelgesini Görüntüle (GET):* Haftanın günlerine göre tamamlanan görevlerin bir grafik üzerinde gösterilmesi.
8. *Mevcut Yetenek Seviyesini Güncelle (UPDATE):* Kullanıcının öğrendiği yeni bir beceriyi veya değişen yetenek puanını sistemde güncellemesi.
9. *Görev Durumunu Güncelle (UPDATE):* Bekleyen bir görevin "Tamamlandı" olarak işaretlenerek durumunun değiştirilmesi.
10. *Tema Ayarını Güncelle (UPDATE):* Uygulama görünümünün dark mode veya aydınlık mod olacak şekilde değiştirilmesi.
11. *Hatalı Görevi Sil (DELETE):* Yanlışlıkla listeye eklenen veya vazgeçilen bir çalışma maddesinin sistemden kaldırılması.
12. *Hesabı Sil (DELETE):* Kullanıcının tüm kariyer planlarını ve geçmiş verilerini sistemden tamamen temizlemesi.
