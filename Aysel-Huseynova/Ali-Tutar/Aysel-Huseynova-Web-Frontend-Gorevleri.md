# CareerPilot Web Frontend Görevleri

**Front-end Test Videosu:** [Link buraya eklenecek](https://example.com)

---

## 1. Kayıt Ol Sayfası

- **API Endpoint:** `POST /auth/register`
- **Görev:** Kullanıcı kayıt işlemi için web sayfası tasarımı ve implementasyonu
- **UI Bileşenleri:**
  - Responsive kayıt formu (desktop ve mobile uyumlu)
  - Ad (name) input alanı
  - Email input alanı (type="email", autocomplete="email")
  - Şifre input alanı (type="password", şifre gücü göstergesi)
  - Kariyer hedefi input alanı (Örn: "Python Developer")
  - Mevcut yetkinlikler alanı (tag input, çoklu seçim)
  - "Kayıt Ol" butonu (primary button style)
  - "Zaten hesabınız var mı? Giriş Yap" linki
  - Loading spinner (kayıt işlemi sırasında)
  - Form container (card veya centered layout)
- **Form Validasyonu:**
  - HTML5 form validation (required, pattern attributes)
  - JavaScript real-time validation
  - Email format kontrolü (regex pattern)
  - Şifre güvenlik kuralları (min 8 karakter, büyük/küçük harf, rakam)
  - Ad ve kariyer hedefi boş olamaz kontrolü
  - Tüm alanlar geçerli olmadan buton disabled
- **Kullanıcı Deneyimi:**
  - Form hatalarını input altında gösterilmesi (inline validation)
  - Başarılı kayıt sonrası success notification ve otomatik giriş sayfasına yönlendirme
  - Hata durumlarında kullanıcı dostu mesajlar (409 Conflict: "Bu email zaten kullanılıyor")
  - Form submission prevention (double-click koruması)
  - Accessible form labels ve ARIA attributes
  - Keyboard navigation desteği (Tab, Enter)
- **Teknik Detaylar:**
  - Framework: React/Vue/Angular veya Vanilla JS
  - Form library: React Hook Form, Formik veya native HTML5
  - State management (form state, loading state, error state)
  - Routing (kayıt sayfasından giriş sayfasına geçiş)

---

## 2. Giriş Yap Sayfası

- **API Endpoint:** `POST /auth/login`
- **Görev:** Kullanıcı giriş işlemi için web sayfası tasarımı ve implementasyonu
- **UI Bileşenleri:**
  - Responsive giriş formu (desktop ve mobile uyumlu)
  - Email input alanı (type="email", autocomplete="email")
  - Şifre input alanı (type="password", şifreyi göster/gizle toggle)
  - "Giriş Yap" butonu (primary button style)
  - "Hesabınız yok mu? Kayıt Ol" linki
  - Loading spinner (giriş işlemi sırasında)
  - Form container (card veya centered layout)
- **Form Validasyonu:**
  - Email format kontrolü
  - Şifre boş olamaz kontrolü
  - Tüm alanlar geçerli olmadan buton disabled
- **Kullanıcı Deneyimi:**
  - Hatalı giriş durumunda kullanıcı dostu hata mesajı (401: "Email veya şifre hatalı")
  - Başarılı giriş sonrası dashboard/yol haritası sayfasına yönlendirme
  - Bearer Token'ın localStorage'a kaydedilmesi
  - Form submission prevention (double-click koruması)
  - Keyboard navigation desteği (Tab, Enter)
- **Teknik Detaylar:**
  - State management (form state, loading state, error state)
  - Token yönetimi (JWT storage ve yönetimi)
  - Routing (giriş sonrası dashboard'a geçiş)

---

## 3. Görev Ekle Bileşeni

- **API Endpoint:** `POST /tasks`
- **Görev:** Günlük çalışma görevi ekleme bileşeni tasarımı ve implementasyonu
- **UI Bileşenleri:**
  - Responsive görev ekleme formu veya modal
  - Görev başlığı input alanı (Örn: "2 saat Flask çalışılacak")
  - Tarih seçici (date picker, varsayılan: bugün)
  - Süre input alanı (dakika cinsinden veya saat:dakika formatında)
  - "Görevi Ekle" butonu (primary button style)
  - "İptal" butonu (secondary button)
  - Loading spinner (kayıt sırasında)
- **Form Validasyonu:**
  - Görev başlığı boş olamaz
  - Tarih geçerli format kontrolü
  - Süre pozitif sayı olmalı
  - Tüm alanlar geçerli olmadan buton disabled
- **Kullanıcı Deneyimi:**
  - Başarılı ekleme sonrası görev listesinin anlık güncellenmesi (optimistic update)
  - Success notification (toast/snackbar)
  - Hata durumunda kullanıcı dostu mesaj
  - Form temizleme (başarılı eklemeden sonra)
- **Teknik Detaylar:**
  - State management (form state, loading state, error state)
  - Modal/Drawer component kullanımı (opsiyonel)
  - Date picker entegrasyonu

---

## 4. Skill Matrix (Hedeflenen Yetkinlikler) Sayfası

- **API Endpoint:** `GET /users/{userId}/skills`
- **Görev:** Kariyer hedefine göre öğrenilmesi gereken becerilerin listelenmesi
- **UI Bileşenleri:**
  - Responsive skill matrix layout
  - Beceri kartları (skill card: isim, seviye, durum)
  - İlerleme çubuğu her beceri için (progress bar)
  - Beceri kategorileri (gruplandırma: Frontend, Backend, DevOps vb.)
  - Seviye göstergesi (Başlangıç / Orta / İleri)
  - Filtre seçenekleri (tümü, tamamlanan, devam eden)
  - Loading skeleton screen
- **Kullanıcı Deneyimi:**
  - Loading skeleton screen (veri yüklenirken)
  - Empty state (henüz beceri eklenmemişse)
  - Error state (yükleme hatası durumunda retry butonu)
  - Smooth card animasyonları
- **Teknik Detaylar:**
  - Client-side filtreleme ve sıralama
  - State management (skills data, loading, error states)
  - Responsive grid layout (CSS Grid veya Flexbox)

---

## 5. Yol Haritası Sayfası

- **API Endpoint:** `GET /users/{userId}/roadmap`
- **Görev:** 3 veya 6 aylık kariyer planının görsel zaman çizelgesi olarak sunulması
- **UI Bileşenleri:**
  - Zaman çizelgesi (timeline) bileşeni (dikey veya yatay)
  - 3 Ay / 6 Ay toggle butonu (üstte seçim)
  - Her adım için kart (ay, hedef, görevler)
  - İlerleme göstergesi (tamamlanan adımlar için renk/işaret)
  - Aktif adım vurgusu
  - Loading skeleton screen
- **Kullanıcı Deneyimi:**
  - 3 ay / 6 ay geçişinde smooth animasyon
  - Tamamlanan adımlarda görsel geri bildirim (checkmark, renk değişimi)
  - Empty state (yol haritası oluşturulmamışsa)
  - Error state (yükleme hatası durumunda retry butonu)
  - Responsive görünüm (mobilde dikey timeline)
- **Teknik Detaylar:**
  - Timeline component (custom veya kütüphane)
  - State management (roadmap data, selected duration, loading, error)
  - Query parameter yönetimi (`?duration=3months`)

---

## 6. Günlük İlerleme Grafiği Sayfası

- **API Endpoint:** `GET /users/{userId}/progress/daily`
- **Görev:** Tamamlanan görevlerin hedefe yakınlığını yüzde bazında gösteren grafik sayfası
- **UI Bileşenleri:**
  - Circular progress chart (büyük, ortada) veya radial gauge
  - Yüzde değeri (büyük font, merkeze hizalı)
  - Motivasyon mesajı (Örn: "%70 hedefe ulaştınız!")
  - Tamamlanan / Toplam görev sayısı (istatistik kartları)
  - Son güncelleme tarihi
  - Refresh butonu
  - Loading skeleton screen
- **Kullanıcı Deneyimi:**
  - Grafik yüklenirken animasyonlu progress dolumu
  - Empty state (henüz görev tamamlanmamışsa)
  - Error state (yükleme hatası durumunda retry butonu)
  - Responsive grafik boyutlandırma
- **Teknik Detaylar:**
  - Chart kütüphanesi (Chart.js, Recharts veya D3.js)
  - State management (progress data, loading, error)
  - Auto-refresh (opsiyonel, belirli aralıklarla)

---

## 7. Haftalık Çalışma Çizelgesi Sayfası

- **API Endpoint:** `GET /users/{userId}/progress/weekly`
- **Görev:** Haftanın günlerine göre tamamlanan görevlerin grafik üzerinde gösterilmesi
- **UI Bileşenleri:**
  - Bar chart veya heatmap (haftanın günleri X ekseninde)
  - Her güne ait tamamlanan görev sayısı ve süre
  - Hafta seçici (önceki / sonraki hafta navigasyonu)
  - Toplam haftalık çalışma süresi (özet kart)
  - En verimli gün vurgusu
  - Loading skeleton screen
- **Kullanıcı Deneyimi:**
  - Grafik üzerinde hover tooltip (o güne ait detay)
  - Hafta değişiminde smooth animasyon
  - Empty state (o haftada görev yoksa)
  - Error state (yükleme hatası durumunda retry butonu)
  - Responsive grafik boyutlandırma
- **Teknik Detaylar:**
  - Chart kütüphanesi (Chart.js, Recharts veya D3.js)
  - State management (weekly data, selected week, loading, error)
  - Tarih hesaplama (hafta başı/sonu)

---

## 8. Yetenek Seviyesi Güncelleme Bileşeni

- **API Endpoint:** `PUT /users/{userId}/skills/{skillId}`
- **Görev:** Kullanıcının öğrendiği becerinin seviyesini güncelleyebileceği bileşen
- **UI Bileşenleri:**
  - Skill kartı üzerindeki "Güncelle" butonu
  - Modal veya inline düzenleme formu
  - Seviye seçici (slider veya radio button: 1-5 arası)
  - Beceri adı (düzenlenebilir input)
  - "Kaydet" butonu (primary)
  - "İptal" butonu (secondary)
  - Loading spinner
- **Form Validasyonu:**
  - Seviye 1-5 arasında olmalı
  - Beceri adı boş olamaz
  - Değişiklik yoksa "Kaydet" butonu disabled
- **Kullanıcı Deneyimi:**
  - Optimistic update (kaydet butonuna basıldığında UI anında güncellenir)
  - Success notification (toast/snackbar)
  - Hata durumunda değişikliklerin geri alınması
- **Teknik Detaylar:**
  - Modal/Drawer component kullanımı
  - State management (skill data, loading, error)

---

## 9. Görev Durumu Güncelleme Bileşeni

- **API Endpoint:** `PUT /tasks/{taskId}`
- **Görev:** Bekleyen bir görevin "Tamamlandı" olarak işaretlenmesi
- **UI Bileşenleri:**
  - Görev listesi her satırda checkbox veya toggle
  - "Tamamlandı" durumunda üzeri çizili stil (line-through)
  - Durum badge (Bekliyor / Tamamlandı)
  - Loading indicator (güncelleme sırasında)
- **Kullanıcı Deneyimi:**
  - Optimistic update (checkbox işaretlendiğinde UI anında güncellenir)
  - Success notification (toast/snackbar)
  - Hata durumunda checkbox'ın geri alınması
  - Tamamlanan görevlerde görsel farklılaştırma (renk, opaklık)
- **Teknik Detaylar:**
  - State management (task status, loading, error)
  - Optimistic update pattern

---

## 10. Tema Ayarı Bileşeni

- **API Endpoint:** `PUT /users/{userId}/settings/theme`
- **Görev:** Uygulamanın dark/light mod arasında geçişini sağlayan ayar bileşeni
- **UI Bileşenleri:**
  - Toggle switch (dark/light mod)
  - Ay/Güneş ikonu (görsel gösterge)
  - Ayarlar sayfasında veya navbar'da konumlandırma
  - Loading indicator (güncelleme sırasında)
- **Kullanıcı Deneyimi:**
  - Tema değişiminde smooth CSS transition
  - Seçilen temanın localStorage'a kaydedilmesi (sayfa yenilenince korunur)
  - Sistem teması algılama (prefers-color-scheme)
  - Anlık görsel geri bildirim
- **Teknik Detaylar:**
  - CSS custom properties (variables) ile tema yönetimi
  - localStorage ile tema tercihi kalıcılığı
  - State management (theme state)

---

## 11. Görev Silme Bileşeni

- **API Endpoint:** `DELETE /tasks/{taskId}`
- **Görev:** Yanlışlıkla eklenen bir görevin silinmesi için UI bileşeni
- **UI Bileşenleri:**
  - Görev satırı üzerindeki "Sil" ikonu veya butonu (danger style)
  - Confirmation dialog (destructive action için)
  - "Evet, Sil" butonu (danger button)
  - "İptal" butonu (secondary button)
  - Loading indicator (silme sırasında)
- **Kullanıcı Deneyimi:**
  - Tek tıkla silme yerine confirmation dialog (yanlışlık önleme)
  - Başarılı silme sonrası görev listesinin anlık güncellenmesi
  - Success notification (toast/snackbar)
  - Hata durumunda kullanıcı dostu mesaj
- **Teknik Detaylar:**
  - Modal/Dialog component kullanımı
  - State management (task list, loading, error)
  - Optimistic delete (opsiyonel)

---

## 12. Hesap Silme Akışı

- **API Endpoint:** `DELETE /users/{userId}`
- **Görev:** Kullanıcı hesabını ve tüm verilerini silme işlemi için UI akışı
- **UI Bileşenleri:**
  - "Hesabı Sil" butonu (profil/ayarlar sayfasında, danger button style)
  - Modal dialog (destructive action için)
  - Uyarı mesajları ("Bu işlem geri alınamaz, tüm verileriniz silinecek")
  - Onay checkbox'ı ("Hesabımı kalıcı olarak silmek istiyorum")
  - "Hesabı Sil" butonu (danger, yalnızca checkbox işaretliyken aktif)
  - "İptal" butonu (secondary)
  - Loading indicator (silme sırasında)
- **Kullanıcı Deneyimi:**
  - Destructive action için görsel uyarılar (kırmızı renk, warning icons)
  - İptal seçeneği her zaman mevcut
  - Başarılı silme sonrası logout ve giriş sayfasına yönlendirme
  - Session storage ve localStorage temizleme
- **Akış Adımları:**
  1. Ayarlar/profil sayfasında "Hesabı Sil" butonuna tıklama
  2. Uyarı modal dialog'unun gösterilmesi
  3. Onay checkbox'ının işaretlenmesi
  4. Silme işleminin gerçekleştirilmesi
  5. Başarılı silme sonrası logout ve giriş sayfasına yönlendirme
- **Teknik Detaylar:**
  - Modal/Dialog component kullanımı
  - Logout işlemi entegrasyonu (token temizleme)
  - Session storage ve localStorage temizleme
  - Browser history yönetimi (giriş sayfasına yönlendirme)
