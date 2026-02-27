# Gereksinim Analizi (CareerPilot)

CareerPilot, kullanıcıların kariyer hedeflerine ulaşmaları için kişiselleştirilmiş bir öğrenme yol haritası sunan ve gelişim süreçlerini takip eden bir backend altyapısına sahiptir. Projenin temel işleyişi şu üç ana gereksinim üzerine kurgulanmıştır:

1. *Kariyer Planlama ve Başlangıç:* Kullanıcıların sisteme dahil olurken sadece kimlik bilgilerini değil, aynı zamanda kariyer hedeflerini (Örn: Python Developer) ve mevcut yetkinliklerini tanımlayabilmesi esastır. Bu sayede sistem, kişiye özel bir "Skill Matrix" ve öğrenme planı oluşturabilmektedir.

2. *Görev Takibi ve Süreç Yönetimi:* Kullanıcının günlük çalışma maddelerini sisteme ekleyebilmesi, bu görevlerin durumlarını (tamamlandı/bekliyor) güncelleyebilmesi ve hatalı girişleri silebilmesi sağlanmalıdır. Dinamik bir yapı ile hedeflenen yetkinliklerin seviyeleri zamanla güncellenerek gelişimin dijital kaydı tutulmaktadır.

3. *Veri Görselleştirme ve Analitik:* Sistemin en kritik parçası, toplanan verilerin kullanıcıya anlamlı raporlar olarak sunulmasıdır. Kullanıcının 3-6 aylık yol haritasının zaman çizelgesi olarak sunulması, günlük ilerleme yüzdesinin hesaplanması ve haftalık performansın grafiklerle gösterilmesi temel analiz gereksinimlerini oluşturmaktadır.

Bu gereksinimler ışığında tasarlanan REST API metotları, kullanıcının gelişim serüvenini başından sonuna kadar dijital olarak yönetmesini hedeflemektedir.
