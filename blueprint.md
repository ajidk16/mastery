Baik. Berikut **blueprint SaaS “Jago Bahasa Inggris menggunakan AI”** dengan sudut pandang **Product Strategist**, disusun **ringkas, sistematis, dan siap dieksekusi**.

---

## 1. Masalah yang Diselesaikan

**Masalah utama user Indonesia:**

1. Bisa baca & dengar, tapi **tidak berani dan tidak lancar speaking**
2. Tidak ada **partner latihan konsisten**
3. Belajar tidak terstruktur (loncat-loncat materi)
4. Tidak tahu **progress nyata** (merasa belajar tapi stagnan)
5. Kursus mahal & tidak personal

**Masalah pasar:**

* Aplikasi belajar bahasa terlalu fokus grammar
* AI ada, tapi belum jadi **coach + sparring partner**

---

## 2. Target User

**Primary**

* Pelajar & mahasiswa (16–25)
* Fresh graduate & job seeker
* Pekerja non-English background (admin, CS, marketing, IT junior)

**Secondary**

* Freelancer remote
* Founder non-tech
* Guru / tutor yang ingin tool tambahan

---

## 3. Fitur Inti (Core Features)

### A. AI English Coach (Personalized)

* Assessment awal (CEFR-based)
* Daily learning plan (15–30 menit)
* Adaptif berdasarkan performa

### B. Speaking Practice (AI Partner)

* Roleplay (interview, meeting, casual chat)
* Real-time correction (pronunciation + grammar)
* Feedback setelah sesi (ringkas & actionable)

### C. Writing Practice

* Prompt harian (email, chat, essay)
* AI correction + rewrite suggestion
* Highlight kesalahan berulang

### D. Vocabulary System

* Contextual vocab (bukan hafalan)
* Spaced repetition otomatis
* Vocabulary dari hasil speaking & writing user

### E. Progress & Insight

* Fluency score
* Grammar error trend
* Speaking confidence score

---

## 4. 1 Fitur Killer (Differentiator)

### 🔥 **AI Speaking Twin (Digital Doppelgänger)**

**Konsep:**

* AI meniru **cara bicara user saat ini**
* Menampilkan:

  * “Ini versi kamu sekarang”
  * “Ini versi kamu kalau sudah fluent”
* User bisa **mendengar perbedaannya**

**Value:**

* Sangat emosional & memotivasi
* Progress terasa nyata
* Sulit ditiru kompetitor

---

## 5. Arsitektur High-Level

```
[Web / Mobile App]
   |
   |-- Auth & User Session
   |
[API Gateway]
   |
   |-- User Service
   |-- Learning Engine
   |-- Progress Analytics
   |
[AI Layer]
   |-- LLM (Conversation, Correction)
   |-- Speech-to-Text
   |-- Text-to-Speech
   |
[Database]
   |-- PostgreSQL (Core data)
   |-- Redis (Session & cache)
   |
[Object Storage]
   |-- Audio recordings
```

**Catatan:**

* AI layer dipisah → mudah ganti provider
* Learning Engine = logic utama (bukan di frontend)

---

## 6. Skema Database Awal (Simplified)

### users

```
id
email
password_hash
level_cefr
created_at
```

### user_profile

```
user_id
goal
daily_target_minutes
confidence_score
```

### lessons

```
id
type (speaking, writing)
difficulty
topic
```

### practice_sessions

```
id
user_id
lesson_id
score
feedback
created_at
```

### vocabulary

```
id
word
context
```

### user_vocabulary

```
user_id
vocab_id
mastery_level
last_reviewed
```

---

## 7. Pricing Model

### Free (Entry)

* Daily limit speaking (5 menit)
* Writing correction terbatas
* Basic progress

### Pro (Rp79k–129k / bulan)

* Unlimited speaking
* AI Speaking Twin
* Advanced feedback
* Progress analytics

### Team / Edu

* Dashboard admin
* User monitoring
* Discount volume

---

## 8. Risiko & Mitigasi

### Risiko 1: User cepat bosan

**Mitigasi**

* Daily streak
* Weekly challenge
* Progress visualization

### Risiko 2: Biaya AI tinggi

**Mitigasi**

* Limit free tier
* Cache feedback
* Hybrid rule-based + AI

### Risiko 3: AI feedback terlalu kompleks

**Mitigasi**

* Feedback max 3 poin
* Bahasa sederhana
* Contoh konkret

---

## 9. Roadmap 30 Hari (MVP)

### Week 1 – Foundation

* User auth
* Assessment CEFR
* Basic UI (dashboard, practice)

### Week 2 – Core Learning

* Speaking practice (text-based dulu)
* Writing correction
* Vocabulary extraction

### Week 3 – AI Voice

* Speech-to-text
* Text-to-speech
* Feedback engine

### Week 4 – Killer Feature + Launch

* AI Speaking Twin (basic version)
* Progress dashboard
* Soft launch (beta users)

---

## Ringkasan Value Proposition

> **“Belajar bahasa Inggris bukan soal teori, tapi soal latihan yang konsisten dengan feedback yang tepat.”**

Jika Anda ingin, langkah berikutnya saya bisa:

1. Turunkan blueprint ini ke **PRD**
2. Buat **flow UX lengkap**
3. Susun **prompt AI production-ready**
4. Breakdown ke **task engineering (frontend & backend)**

Silakan tentukan tahap lanjutan yang diinginkan.
