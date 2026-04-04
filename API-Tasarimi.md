# API Tasarımı - OpenAPI Specification Örneği

**OpenAPI Spesifikasyon Dosyası:** [careerpilot.yaml](careerpilot.yaml)

Bu doküman, OpenAPI Specification (OAS) 3.0 standardına göre hazırlanmış örnek bir API tasarımını içermektedir.

## OpenAPI Specification

```yaml
openapi: 3.0.3
info:
  title: CareerPilot API
  description: |
    CareerPilot platformu için RESTful API.

    ## Özellikler
    - Kullanıcı kayıt ve kimlik doğrulama
    - Görev yönetimi
    - Yetenek (Skill Matrix) takibi
    - Kariyer yol haritası
    - Günlük ve haftalık ilerleme takibi
    - JWT tabanlı kimlik doğrulama
  version: 1.0.0
  contact:
    name: SoloSoft - Aysel Huseynova
    email: aysel@careerpilot.com
    url: https://api.careerpilot.com/support
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.careerpilot.com/v1
    description: Production server
  - url: https://staging-api.careerpilot.com/v1
    description: Staging server
  - url: http://localhost:3000/v1
    description: Development server

tags:
  - name: auth
    description: Kimlik doğrulama işlemleri
  - name: tasks
    description: Görev yönetimi işlemleri
  - name: skills
    description: Yetenek (Skill Matrix) işlemleri
  - name: roadmap
    description: Kariyer yol haritası işlemleri
  - name: progress
    description: İlerleme takip işlemleri
  - name: users
    description: Kullanıcı yönetimi işlemleri

paths:

  /auth/register:
    post:
      tags:
        - auth
      summary: Kayıt Ol
      description: Ad, kariyer hedefi ve yetkinliklerle ilk kayıt işlemini gerçekleştirir
      operationId: registerUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserRegistration'
            examples:
              example1:
                summary: Örnek kullanıcı kaydı
                value:
                  fullName: Aysel Huseynova
                  email: aysel@example.com
                  password: Guvenli123!
                  careerGoal: Backend Developer
                  skills:
                    - Python
                    - Flask
                    - SQL
      responses:
        '201':
          description: Kullanıcı başarıyla oluşturuldu
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          $ref: '#/components/responses/BadRequest'
        '409':
          description: Email adresi zaten kullanımda
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /auth/login:
    post:
      tags:
        - auth
      summary: Giriş Yap
      description: Kayıtlı kullanıcının kişisel çalışma planına güvenli erişim sağlar, JWT token döner
      operationId: loginUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginCredentials'
            examples:
              example1:
                summary: Örnek giriş
                value:
                  email: aysel@example.com
                  password: Guvenli123!
      responses:
        '200':
          description: Giriş başarılı
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthToken'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /tasks:
    post:
      tags:
        - tasks
      summary: Görev Ekle
      description: Günlük çalışma listesine yeni madde ekler
      operationId: createTask
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TaskCreate'
            examples:
              example1:
                summary: Örnek görev ekleme
                value:
                  title: Flask çalışılacak
                  description: Flask route yapılarını öğren
                  dueDate: "2026-04-01"
      responses:
        '201':
          description: Görev başarıyla eklendi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /tasks/{taskId}:
    put:
      tags:
        - tasks
      summary: Görev Durumu Güncelle
      description: Görevi "Tamamlandı" olarak işaretleyip durumunu değiştirir
      operationId: updateTask
      security:
        - BearerAuth: []
      parameters:
        - name: taskId
          in: path
          required: true
          schema:
            type: string
          description: Güncellenecek görevin ID'si
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TaskUpdate'
            examples:
              example1:
                summary: Görevi tamamla
                value:
                  status: completed
      responses:
        '200':
          description: Görev durumu başarıyla güncellendi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'

    delete:
      tags:
        - tasks
      summary: Hatalı Görevi Sil
      description: Yanlış eklenen veya vazgeçilen maddeleri sistemden kaldırır
      operationId: deleteTask
      security:
        - BearerAuth: []
      parameters:
        - name: taskId
          in: path
          required: true
          schema:
            type: string
          description: Silinecek görevin ID'si
      responses:
        '204':
          description: Görev başarıyla silindi
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'

  /skills/matrix:
    get:
      tags:
        - skills
      summary: Hedeflenen Yetkinlikler
      description: Hedefe ulaşmak için gereken teknik becerilerin (Skill Matrix) listesini getirir
      operationId: getSkillMatrix
      security:
        - BearerAuth: []
      parameters:
        - name: userId
          in: query
          required: false
          schema:
            type: string
          description: Kullanıcı ID'si
        - name: category
          in: query
          required: false
          schema:
            type: string
          description: Kategori bazlı filtreleme
      responses:
        '200':
          description: Skill Matrix listesi başarıyla getirildi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SkillMatrix'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /skills/{skillId}:
    put:
      tags:
        - skills
      summary: Yetenek Seviyesi Güncelle
      description: Öğrenilen yeni becerilerin veya puanların sistemde güncellenmesini sağlar
      operationId: updateSkill
      security:
        - BearerAuth: []
      parameters:
        - name: skillId
          in: path
          required: true
          schema:
            type: string
          description: Güncellenecek yeteneğin ID'si
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SkillUpdate'
            examples:
              example1:
                summary: Yetenek seviyesi güncelleme
                value:
                  skillName: Python
                  level: Advanced
                  score: 85
      responses:
        '200':
          description: Yetenek seviyesi başarıyla güncellendi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Skill'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'

  /roadmap/{userId}:
    get:
      tags:
        - roadmap
      summary: Yol Haritasını Görüntüle
      description: 3 veya 6 aylık planın zaman çizelgesini getirir
      operationId: getRoadmap
      security:
        - BearerAuth: []
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
          description: Kullanıcı ID'si
        - name: duration
          in: query
          schema:
            type: string
            enum: [3months, 6months]
            default: 3months
          description: Plan süresi
      responses:
        '200':
          description: Yol haritası başarıyla getirildi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Roadmap'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'

  /progress/daily/{userId}:
    get:
      tags:
        - progress
      summary: Günlük İlerleme Grafiği
      description: Tamamlanan görevlerin hedefe yakınlığını yüzde (%) olarak getirir
      operationId: getDailyProgress
      security:
        - BearerAuth: []
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
          description: Kullanıcı ID'si
      responses:
        '200':
          description: Günlük ilerleme yüzdesi başarıyla getirildi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DailyProgress'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'

  /progress/weekly/{userId}:
    get:
      tags:
        - progress
      summary: Haftalık Çizelge
      description: Haftalık tamamlanan görevlerin grafiğini getirir
      operationId: getWeeklyProgress
      security:
        - BearerAuth: []
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
          description: Kullanıcı ID'si
      responses:
        '200':
          description: Haftalık tamamlanan görevler başarıyla getirildi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WeeklyProgress'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'

  /users/{userId}/theme:
    put:
      tags:
        - users
      summary: Tema Ayarını Güncelle
      description: Görünümü Dark Mode veya Aydınlık Mod olarak değiştirir
      operationId: updateTheme
      security:
        - BearerAuth: []
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
          description: Kullanıcı ID'si
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ThemeUpdate'
            examples:
              example1:
                summary: Dark mode aktif et
                value:
                  theme: dark
      responses:
        '200':
          description: Tema başarıyla güncellendi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ThemeResponse'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'

  /users/{userId}:
    delete:
      tags:
        - users
      summary: Hesabı Sil
      description: Tüm kariyer planlarını ve geçmiş verileri kalıcı olarak temizler
      operationId: deleteUser
      security:
        - BearerAuth: []
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
          description: Silinecek kullanıcının ID'si
      responses:
        '204':
          description: Hesap ve tüm veriler kalıcı olarak silindi
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/NotFound'

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: JWT token ile kimlik doğrulama

  schemas:
    UserRegistration:
      type: object
      required:
        - fullName
        - email
        - password
        - careerGoal
      properties:
        fullName:
          type: string
          minLength: 2
          example: Aysel Huseynova
        email:
          type: string
          format: email
          example: aysel@example.com
        password:
          type: string
          format: password
          minLength: 8
          example: Guvenli123!
        careerGoal:
          type: string
          example: Backend Developer
        skills:
          type: array
          items:
            type: string
          example:
            - Python
            - Flask
            - SQL

    LoginCredentials:
      type: object
      required:
        - email
        - password
      properties:
        email:
          type: string
          format: email
          example: aysel@example.com
        password:
          type: string
          format: password
          example: Guvenli123!

    User:
      type: object
      properties:
        id:
          type: string
          example: user_123
        fullName:
          type: string
          example: Aysel Huseynova
        email:
          type: string
          format: email
          example: aysel@example.com
        careerGoal:
          type: string
          example: Backend Developer
        skills:
          type: array
          items:
            type: string
          example:
            - Python
            - Flask
            - SQL
        theme:
          type: string
          enum: [light, dark]
          example: light
        createdAt:
          type: string
          format: date-time
          example: "2026-03-06T14:00:00Z"

    AuthToken:
      type: object
      properties:
        token:
          type: string
          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
        tokenType:
          type: string
          example: Bearer
        expiresIn:
          type: integer
          description: Saniye cinsinden geçerlilik süresi
          example: 86400
        user:
          $ref: '#/components/schemas/User'

    TaskCreate:
      type: object
      required:
        - title
      properties:
        title:
          type: string
          minLength: 2
          example: Flask çalışılacak
        description:
          type: string
          example: Flask route yapılarını öğren
        dueDate:
          type: string
          format: date
          example: "2026-04-01"

    TaskUpdate:
      type: object
      required:
        - status
      properties:
        status:
          type: string
          enum: [pending, completed]
          example: completed

    Task:
      type: object
      properties:
        id:
          type: string
          example: task_456
        title:
          type: string
          example: Flask çalışılacak
        description:
          type: string
          example: Flask route yapılarını öğren
        status:
          type: string
          enum: [pending, completed]
          example: pending
        dueDate:
          type: string
          format: date
          example: "2026-04-01"
        createdAt:
          type: string
          format: date-time
          example: "2026-03-06T14:00:00Z"
        completedAt:
          type: string
          format: date-time
          example: "2026-03-06T16:00:00Z"

    SkillUpdate:
      type: object
      required:
        - skillName
        - level
        - score
      properties:
        skillName:
          type: string
          example: Python
        level:
          type: string
          enum: [Beginner, Intermediate, Advanced]
          example: Advanced
        score:
          type: integer
          minimum: 0
          maximum: 100
          example: 85

    Skill:
      type: object
      properties:
        id:
          type: string
          example: skill_001
        skillName:
          type: string
          example: Python
        level:
          type: string
          enum: [Beginner, Intermediate, Advanced]
          example: Advanced
        score:
          type: integer
          minimum: 0
          maximum: 100
          example: 85
        required:
          type: boolean
          description: Kariyer hedefi için gerekli mi
          example: true
        updatedAt:
          type: string
          format: date-time
          example: "2026-03-06T14:00:00Z"

    SkillMatrix:
      type: object
      properties:
        userId:
          type: string
          example: user_123
        careerGoal:
          type: string
          example: Backend Developer
        skills:
          type: array
          items:
            $ref: '#/components/schemas/Skill'

    Roadmap:
      type: object
      properties:
        userId:
          type: string
          example: user_123
        duration:
          type: string
          enum: [3months, 6months]
          example: 3months
        startDate:
          type: string
          format: date
          example: "2026-03-06"
        endDate:
          type: string
          format: date
          example: "2026-06-06"
        milestones:
          type: array
          items:
            type: object
            properties:
              month:
                type: integer
                example: 1
              title:
                type: string
                example: Temel Python
              tasks:
                type: array
                items:
                  type: string
                example:
                  - Değişkenler
                  - Döngüler
                  - Fonksiyonlar
              completionRate:
                type: integer
                minimum: 0
                maximum: 100
                example: 40

    DailyProgress:
      type: object
      properties:
        userId:
          type: string
          example: user_123
        date:
          type: string
          format: date
          example: "2026-03-06"
        totalTasks:
          type: integer
          example: 10
        completedTasks:
          type: integer
          example: 4
        completionRate:
          type: integer
          minimum: 0
          maximum: 100
          example: 40
        progressToGoal:
          type: integer
          minimum: 0
          maximum: 100
          example: 25

    WeeklyProgress:
      type: object
      properties:
        userId:
          type: string
          example: user_123
        weekStart:
          type: string
          format: date
          example: "2026-03-02"
        weekEnd:
          type: string
          format: date
          example: "2026-03-08"
        days:
          type: array
          items:
            type: object
            properties:
              day:
                type: string
                example: Pazartesi
              completed:
                type: integer
                example: 3
              total:
                type: integer
                example: 5
        weeklyCompletionRate:
          type: integer
          minimum: 0
          maximum: 100
          example: 63

    ThemeUpdate:
      type: object
      required:
        - theme
      properties:
        theme:
          type: string
          enum: [light, dark]
          example: dark

    ThemeResponse:
      type: object
      properties:
        userId:
          type: string
          example: user_123
        theme:
          type: string
          enum: [light, dark]
          example: dark
        updatedAt:
          type: string
          format: date-time
          example: "2026-03-06T14:00:00Z"

    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: string
          example: VALIDATION_ERROR
        message:
          type: string
          example: Geçersiz istek parametreleri
        details:
          type: array
          items:
            type: object
            properties:
              field:
                type: string
                example: email
              message:
                type: string
                example: Email formatı geçersiz

  responses:
    BadRequest:
      description: Geçersiz istek
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: BAD_REQUEST
            message: İstek parametreleri geçersiz

    Unauthorized:
      description: Kimlik doğrulama gerekli
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: UNAUTHORIZED
            message: Kimlik doğrulama başarısız

    NotFound:
      description: Kaynak bulunamadı
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: NOT_FOUND
            message: İstenen kaynak bulunamadı

    Forbidden:
      description: Erişim reddedildi
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            code: FORBIDDEN
            message: Bu işlem için yetkiniz bulunmamaktadır
```
