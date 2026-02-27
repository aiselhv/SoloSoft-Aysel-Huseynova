# CareerPilot REST API Metotları

**API Test Videosu:** [Link buraya eklenecek](https://example.com)

---

## 1. Kayıt Ol

- **Endpoint:** `POST /auth/register`
- **Request Body:**
  ```json
  {
    "name": "Ahmet Yılmaz",
    "email": "kullanici@example.com",
    "password": "Guvenli123!",
    "careerGoal": "Python Developer",
    "currentSkills": ["HTML", "CSS", "Temel Python"]
  }
  ```
- **Response:** `201 Created` - Kullanıcı başarıyla oluşturuldu

---

## 2. Giriş Yap

- **Endpoint:** `POST /auth/login`
- **Request Body:**
  ```json
  {
    "email": "kullanici@example.com",
    "password": "Guvenli123!"
  }
  ```
- **Response:** `200 OK` - Giriş başarılı, Bearer Token döndürüldü

---

## 3. Görev Ekle

- **Endpoint:** `POST /tasks`
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "title": "2 saat Flask çalışılacak",
    "date": "2025-02-27",
    "duration": 120
  }
  ```
- **Response:** `201 Created` - Görev başarıyla eklendi

---

## 4. Hedeflenen Yetkinlikleri Görüntüle (Skill Matrix)

- **Endpoint:** `GET /users/{userId}/skills`
- **Path Parameters:**
  - `userId` (string, required) - Kullanıcı ID'si
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Kullanıcının kariyer hedefine göre öğrenmesi gereken beceriler listelendi

---

## 5. Yol Haritasını Görüntüle

- **Endpoint:** `GET /users/{userId}/roadmap`
- **Path Parameters:**
  - `userId` (string, required) - Kullanıcı ID'si
- **Query Parameters:**
  - `duration` (string, optional) - `3months` veya `6months` (varsayılan: `3months`)
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - 3 veya 6 aylık zaman çizelgesi başarıyla getirildi

---

## 6. Günlük İlerleme Grafiğini Görüntüle

- **Endpoint:** `GET /users/{userId}/progress/daily`
- **Path Parameters:**
  - `userId` (string, required) - Kullanıcı ID'si
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Tamamlanan görevlerin hedefe yakınlığı yüzde olarak döndürüldü

---

## 7. Haftalık Çalışma Çizelgesini Görüntüle

- **Endpoint:** `GET /users/{userId}/progress/weekly`
- **Path Parameters:**
  - `userId` (string, required) - Kullanıcı ID'si
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Haftanın günlerine göre tamamlanan görevler başarıyla getirildi

---

## 8. Mevcut Yetenek Seviyesini Güncelle

- **Endpoint:** `PUT /users/{userId}/skills/{skillId}`
- **Path Parameters:**
  - `userId` (string, required) - Kullanıcı ID'si
  - `skillId` (string, required) - Beceri ID'si
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "skillName": "Flask",
    "level": 3
  }
  ```
- **Response:** `200 OK` - Yetenek seviyesi başarıyla güncellendi

---

## 9. Görev Durumunu Güncelle

- **Endpoint:** `PUT /tasks/{taskId}`
- **Path Parameters:**
  - `taskId` (string, required) - Görev ID'si
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "status": "completed"
  }
  ```
- **Response:** `200 OK` - Görev durumu başarıyla güncellendi

---

## 10. Tema Ayarını Güncelle

- **Endpoint:** `PUT /users/{userId}/settings/theme`
- **Path Parameters:**
  - `userId` (string, required) - Kullanıcı ID'si
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "theme": "dark"
  }
  ```
- **Response:** `200 OK` - Tema ayarı başarıyla güncellendi

---

## 11. Hatalı Görevi Sil

- **Endpoint:** `DELETE /tasks/{taskId}`
- **Path Parameters:**
  - `taskId` (string, required) - Görev ID'si
- **Authentication:** Bearer Token gerekli
- **Response:** `204 No Content` - Görev başarıyla silindi

---

## 12. Hesabı Sil

- **Endpoint:** `DELETE /users/{userId}`
- **Path Parameters:**
  - `userId` (string, required) - Kullanıcı ID'si
- **Authentication:** Bearer Token gerekli
- **Response:** `204 No Content` - Kullanıcı hesabı ve tüm veriler başarıyla silindi
