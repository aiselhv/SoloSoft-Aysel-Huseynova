# REST API Görev Dağılımı

**REST API Adresi:** api.careerpilot.com

Bu dokümanda, proje ekibindeki her üyenin geliştirmekten sorumlu olduğu REST API metotları listelenmektedir.

---

## Grup Üyelerinin REST API Metotları

1. [Aysel Huseynova'nın REST API Metotları](#aysel-huseynovann-rest-api-metotları)

---

## Aysel Huseynova'nın REST API Metotları

### 1. Kayıt Ol

| Alan | Değer |
|------|-------|
| **Method** | `POST` |
| **Endpoint** | `/auth/register` |
| **Açıklama** | Ad, kariyer hedefi ve yetkinliklerle ilk kayıt işlemini gerçekleştirir |
| **Auth Gerekli** | Hayır |

**Request Body:**
```json
{
  "fullName": "Aysel Huseynova",
  "email": "aysel@example.com",
  "password": "Guvenli123!",
  "careerGoal": "Backend Developer",
  "skills": ["Python", "Flask", "SQL"]
}
```

**Başarılı Yanıt (201):**
```json
{
  "id": "user_123",
  "fullName": "Aysel Huseynova",
  "email": "aysel@example.com",
  "careerGoal": "Backend Developer",
  "createdAt": "2026-03-06T14:00:00Z"
}
```

---

### 2. Giriş Yap

| Alan | Değer |
|------|-------|
| **Method** | `POST` |
| **Endpoint** | `/auth/login` |
| **Açıklama** | Kayıtlı kullanıcının kişisel çalışma planına güvenli erişim sağlar, JWT token döner |
| **Auth Gerekli** | Hayır |

**Request Body:**
```json
{
  "email": "aysel@example.com",
  "password": "Guvenli123!"
}
```

**Başarılı Yanıt (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 86400
}
```

---

### 3. Görev Ekle

| Alan | Değer |
|------|-------|
| **Method** | `POST` |
| **Endpoint** | `/tasks` |
| **Açıklama** | Günlük çalışma listesine yeni madde ekler |
| **Auth Gerekli** | Evet |

**Request Body:**
```json
{
  "title": "Flask çalışılacak",
  "description": "Flask route yapılarını öğren",
  "dueDate": "2026-04-01"
}
```

**Başarılı Yanıt (201):**
```json
{
  "id": "task_456",
  "title": "Flask çalışılacak",
  "description": "Flask route yapılarını öğren",
  "status": "pending",
  "dueDate": "2026-04-01",
  "createdAt": "2026-03-06T14:00:00Z"
}
```

---

### 4. Hedeflenen Yetkinlikler

| Alan | Değer |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/skills/matrix` |
| **Açıklama** | Hedefe ulaşmak için gereken teknik becerilerin (Skill Matrix) listesini getirir |
| **Auth Gerekli** | Evet |

**Query Parametreleri:**

| Parametre | Tip | Varsayılan | Açıklama |
|-----------|-----|------------|----------|
| `userId` | string | - | Kullanıcı ID'si |
| `category` | string | - | Kategori bazlı filtreleme |

**Başarılı Yanıt (200):**
```json
{
  "userId": "user_123",
  "careerGoal": "Backend Developer",
  "skills": [
    {
      "id": "skill_001",
      "name": "Python",
      "level": "Intermediate",
      "score": 65,
      "required": true
    },
    {
      "id": "skill_002",
      "name": "Flask",
      "level": "Beginner",
      "score": 30,
      "required": true
    }
  ]
}
```

---

### 5. Yol Haritasını Görüntüle

| Alan | Değer |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/roadmap/{userId}` |
| **Açıklama** | 3 veya 6 aylık planın zaman çizelgesini getirir |
| **Auth Gerekli** | Evet |

**Path Parameters:**
- `userId` (string, required) - Kullanıcı ID'si

**Query Parametreleri:**

| Parametre | Tip | Varsayılan | Açıklama |
|-----------|-----|------------|----------|
| `duration` | string | `3months` | `3months` veya `6months` |

**Başarılı Yanıt (200):**
```json
{
  "userId": "user_123",
  "duration": "3months",
  "startDate": "2026-03-06",
  "endDate": "2026-06-06",
  "milestones": [
    {
      "month": 1,
      "title": "Temel Python",
      "tasks": ["Değişkenler", "Döngüler", "Fonksiyonlar"],
      "completionRate": 40
    },
    {
      "month": 2,
      "title": "Flask & API",
      "tasks": ["Route yapısı", "REST API", "Veritabanı"],
      "completionRate": 0
    }
  ]
}
```

---

### 6. Günlük İlerleme Grafiği

| Alan | Değer |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/progress/daily/{userId}` |
| **Açıklama** | Tamamlanan görevlerin hedefe yakınlığını yüzde (%) olarak getirir |
| **Auth Gerekli** | Evet |

**Path Parameters:**
- `userId` (string, required) - Kullanıcı ID'si

**Başarılı Yanıt (200):**
```json
{
  "userId": "user_123",
  "date": "2026-03-06",
  "totalTasks": 10,
  "completedTasks": 4,
  "completionRate": 40,
  "progressToGoal": 25
}
```

---

### 7. Haftalık Çizelge

| Alan | Değer |
|------|-------|
| **Method** | `GET` |
| **Endpoint** | `/progress/weekly/{userId}` |
| **Açıklama** | Haftalık tamamlanan görevlerin grafiğini getirir |
| **Auth Gerekli** | Evet |

**Path Parameters:**
- `userId` (string, required) - Kullanıcı ID'si

**Başarılı Yanıt (200):**
```json
{
  "userId": "user_123",
  "weekStart": "2026-03-02",
  "weekEnd": "2026-03-08",
  "days": [
    { "day": "Pazartesi", "completed": 3, "total": 5 },
    { "day": "Salı",      "completed": 5, "total": 5 },
    { "day": "Çarşamba",  "completed": 2, "total": 4 },
    { "day": "Perşembe",  "completed": 4, "total": 4 },
    { "day": "Cuma",      "completed": 1, "total": 3 }
  ],
  "weeklyCompletionRate": 63
}
```

---

### 8. Yetenek Seviyesi Güncelle

| Alan | Değer |
|------|-------|
| **Method** | `PUT` |
| **Endpoint** | `/skills/{skillId}` |
| **Açıklama** | Öğrenilen yeni becerilerin veya puanların sistemde güncellenmesini sağlar |
| **Auth Gerekli** | Evet |

**Path Parameters:**
- `skillId` (string, required) - Yetenek ID'si

**Request Body:**
```json
{
  "skillName": "Python",
  "level": "Advanced",
  "score": 85
}
```

**Başarılı Yanıt (200):**
```json
{
  "id": "skill_001",
  "skillName": "Python",
  "level": "Advanced",
  "score": 85,
  "updatedAt": "2026-03-06T14:00:00Z"
}
```

---

### 9. Görev Durumu Güncelle

| Alan | Değer |
|------|-------|
| **Method** | `PUT` |
| **Endpoint** | `/tasks/{taskId}` |
| **Açıklama** | Görevi "Tamamlandı" olarak işaretleyip durumunu değiştirir |
| **Auth Gerekli** | Evet |

**Path Parameters:**
- `taskId` (string, required) - Görev ID'si

**Request Body:**
```json
{
  "status": "completed"
}
```

**Başarılı Yanıt (200):**
```json
{
  "id": "task_456",
  "title": "Flask çalışılacak",
  "status": "completed",
  "completedAt": "2026-03-06T16:00:00Z"
}
```

---

### 10. Tema Ayarını Güncelle

| Alan | Değer |
|------|-------|
| **Method** | `PUT` |
| **Endpoint** | `/users/{userId}/theme` |
| **Açıklama** | Görünümü Dark Mode veya Aydınlık Mod olarak değiştirir |
| **Auth Gerekli** | Evet |

**Path Parameters:**
- `userId` (string, required) - Kullanıcı ID'si

**Request Body:**
```json
{
  "theme": "dark"
}
```

**Başarılı Yanıt (200):**
```json
{
  "userId": "user_123",
  "theme": "dark",
  "updatedAt": "2026-03-06T14:00:00Z"
}
```

---

### 11. Hatalı Görevi Sil

| Alan | Değer |
|------|-------|
| **Method** | `DELETE` |
| **Endpoint** | `/tasks/{taskId}` |
| **Açıklama** | Yanlış eklenen veya vazgeçilen maddeleri sistemden kaldırır |
| **Auth Gerekli** | Evet |

**Path Parameters:**
- `taskId` (string, required) - Görev ID'si

**Başarılı Yanıt (204):** İçerik yok

---

### 12. Hesabı Sil

| Alan | Değer |
|------|-------|
| **Method** | `DELETE` |
| **Endpoint** | `/users/{userId}` |
| **Açıklama** | Tüm kariyer planlarını ve geçmiş verileri kalıcı olarak temizler |
| **Auth Gerekli** | Evet (Kendi hesabını silme yetkisi) |

**Path Parameters:**
- `userId` (string, required) - Kullanıcı ID'si

**Başarılı Yanıt (204):** İçerik yok
