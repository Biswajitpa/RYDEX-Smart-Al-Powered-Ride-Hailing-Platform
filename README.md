<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0055FF,100:00F7FF&height=200&section=header&text=RYDEX%20Mobility%20Platform&fontSize=38&fontColor=ffffff&animation=fadeIn&fontAlignY=35" width="100%"/>
</p>

<p align="center">
  <b>Enterprise-Grade AI-Powered Ride-Hailing &amp; Mobility Infrastructure</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_OAuth2.0-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/ZegoCloud-KYC-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/WebSockets-Realtime-blueviolet?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/Architecture-Event--Driven-informational?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/Uptime-99.9%25-success?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" />
  <img src="https://img.shields.io/badge/PRs-Welcome-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Maintained-Yes-green?style=flat-square" />
</p>

<p align="center">
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-executive-summary">Executive Summary</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-core-engineering-modules">Engineering Modules</a> •
  <a href="#-security-model">Security Model</a> •
  <a href="#-scalability--infrastructure-strategy">Scalability</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-author">Author</a>
</p>

---

## 🧭 Executive Summary

**RYDEX** is a full-stack, enterprise-grade mobility platform architected to mirror the operational complexity of real-world ride-hailing systems — comparable in design philosophy to Uber, Ola, and Lyft's core service layers.

It is not a boilerplate clone. RYDEX is a **systems engineering exercise**, deliberately built around the four pillars that define production mobility platforms:

| Pillar | What It Means Here |
|---|---|
| 🔐 **Trust & Identity** | Multi-factor OTP verification, OAuth 2.0, KYC video verification, role-based access |
| ⚡ **Real-Time Infrastructure** | Live GPS sync, live tracking, live chat/call, live earnings dashboards |
| 🧠 **Algorithmic Intelligence** | Graph-based shortest-path routing, nearest-driver allocation, dynamic fare computation |
| 🏗️ **Operational Governance** | Multi-stage admin approval pipelines, fraud detection, revenue analytics |

The result is a platform engineered for **horizontal scale, auditability, and security-first design** — the same principles that govern production fintech and mobility infrastructure.

---

## 🌐 Live Demo

| Environment | Link |
|---|---|
| 🛡️ Admin Command Center | [Launch Admin Dashboard](https://rydex-smart-al-powered-ride-hailing-rho.vercel.app/admin/dashboard) |
| 🎥 Full Walkthrough | [Demo Video (Google Drive)](https://drive.google.com/file/d/1M6gp-WgwNSNYZbsABlcvqf2kXTqDKwCO/view?usp=sharing) |

---

## 🏗️ System Architecture

RYDEX follows a **layered, service-oriented architecture** — cleanly separating identity, ride orchestration, payments, and analytics into independently reasoned-about domains, laying the groundwork for a future microservices migration.

```mermaid
flowchart TB
    subgraph Clients["🖥️ Client Applications"]
        U[Rider App<br/>Next.js]
        D[Driver App<br/>Next.js]
        A[Admin Dashboard<br/>Next.js]
    end

    subgraph Gateway["🌐 API Gateway Layer"]
        RL[Rate Limiter<br/>OTP · Login · Booking]
        LB[Load Balancer]
    end

    subgraph Core["⚙️ Core Services — Node.js / Express"]
        AUTH[Auth Service<br/>JWT · OAuth 2.0 · OTP]
        RIDE[Ride Orchestration Engine<br/>Matching · Routing · Lifecycle]
        VENDOR[Vendor Compliance Service<br/>KYC · Document Verification]
        PAY[Payment Service<br/>UPI · Fare Engine]
        NOTIFY[Notification Service<br/>Push · Chat · Call]
    end

    subgraph RealTime["⚡ Real-Time Layer"]
        WS[WebSocket Server<br/>Live GPS · Live Chat]
    end

    subgraph Data["🗄️ Data Layer"]
        DB[(Primary Database<br/>Users · Rides · Vendors)]
        CACHE[(Cache Layer<br/>Driver Locations)]
    end

    subgraph External["🔌 External Services"]
        GOOGLE[Google OAuth 2.0]
        ZEGO[Zego Cloud<br/>Video KYC]
        MAPS[Maps / GPS Provider]
        UPI[UPI Payment Gateway]
    end

    U & D & A --> LB --> RL
    RL --> AUTH & RIDE & VENDOR & PAY & NOTIFY
    RIDE <--> WS
    U & D -. live location .-> WS
    AUTH --> DB
    RIDE --> DB
    RIDE --> CACHE
    VENDOR --> DB
    PAY --> DB
    AUTH -.-> GOOGLE
    VENDOR -.-> ZEGO
    RIDE -.-> MAPS
    PAY -.-> UPI

    style Clients fill:#0d1b2a,color:#fff,stroke:#00F7FF,stroke-width:2px
    style Gateway fill:#1b263b,color:#fff,stroke:#00F7FF,stroke-width:2px
    style Core fill:#0055FF,color:#fff,stroke:#00F7FF,stroke-width:2px
    style RealTime fill:#274690,color:#fff,stroke:#00F7FF,stroke-width:2px
    style Data fill:#003566,color:#fff,stroke:#00F7FF,stroke-width:2px
    style External fill:#14213d,color:#fff,stroke:#00F7FF,stroke-width:2px
```

### Ride Lifecycle — Sequence Flow

```mermaid
sequenceDiagram
    participant R as Rider App
    participant G as API Gateway
    participant RE as Ride Engine
    participant WS as WebSocket Server
    participant Dr as Driver App
    participant P as Payment Service

    R->>G: Request ride (pickup, drop, GPS)
    G->>RE: Forward ride request
    RE->>RE: Shortest-path + nearest-driver match
    RE->>WS: Broadcast ride offer
    WS->>Dr: Notify nearest available driver
    Dr->>WS: Accept ride
    WS->>R: Driver assigned + live ETA
    Dr->>R: Arrives at pickup
    R->>Dr: Share Pickup OTP
    Dr->>RE: Verify Pickup OTP
    RE-->>WS: Ride status → in-transit
    loop During ride
        Dr->>WS: Stream GPS location
        WS->>R: Live location update
    end
    Dr->>R: Arrives at destination
    R->>Dr: Share Drop OTP
    Dr->>RE: Verify Drop OTP
    RE->>P: Trigger fare settlement
    P->>R: UPI payment request
    R->>P: Payment confirmation
    P-->>RE: Mark ride completed
    RE-->>R: Ride summary + receipt
    RE-->>Dr: Earnings updated
```

### Architectural Principles

- **Separation of concerns** — User, Driver, and Admin domains operate on isolated logic paths with shared core services (auth, notifications, payments)
- **Stateless authentication** — JWT-based sessions enable horizontal scaling without sticky-session dependencies
- **Event-driven ride lifecycle** — Ride state transitions (`requested → assigned → picked-up → in-transit → completed`) are treated as discrete, trackable events
- **Defense-in-depth security** — Multiple independent verification layers (OTP, OAuth, KYC, rate limiting) rather than a single point of trust

---

## ⚙️ Core Engineering Modules

### 1️⃣ Identity & Trust Layer
- OTP-based sign-up/login verification
- Google OAuth 2.0 federated authentication
- Role-based access control (User / Driver / Admin) enforced at the middleware layer
- JWT session tokens with expiry & refresh handling

### 2️⃣ Ride Orchestration Engine
- Real-time GPS-based ride booking
- **Graph-based shortest-path algorithm** for route optimization
- Nearest-available-driver allocation logic
- Dual-checkpoint OTP verification (pickup + drop) as ride-integrity gates
- Live map-based tracking during active rides

### 3️⃣ Vendor Compliance Pipeline
- Structured document ingestion: Aadhaar, Driving License, Vehicle RC, Bank Details
- **Video KYC** verification via Zego Cloud SDK
- Multi-category vehicle onboarding: Bike, Auto, Car, Truck, Loading Vehicle
- Sequential approval gate: `Document Verification → Video Verification → Vehicle Approval → Activation`

### 4️⃣ Financial & Analytics Layer
- UPI / online payment integration
- Dynamic, real-time fare estimation engine
- Day-wise earnings analytics (Admin + Vendor dashboards)
- Today-vs-Yesterday comparative revenue tracking
- Platform-wide revenue aggregation for admin oversight

### 5️⃣ Communication Layer
- In-app chat with assigned driver
- In-app voice call integration
- Real-time ride-status notifications

<p align="center">
  <img width="850" alt="Analytics Dashboard" src="https://github.com/user-attachments/assets/4863b6d4-c018-41b0-b5e8-74d9e691a088" />
</p>

---

## 🔐 Security Model

RYDEX applies a **defense-in-depth** posture — no single mechanism is trusted in isolation.

| Layer | Control | Purpose |
|---|---|---|
| API Gateway | ⏱️ Rate limiting (OTP, login, booking endpoints) | Prevents brute-force & abuse |
| Traffic Layer | ⚖️ Load-balancing design | Distributes load, avoids single points of failure |
| Session Layer | 🔑 JWT authentication | Stateless, horizontally scalable auth |
| Identity Layer | 🔐 Google OAuth 2.0 | Federated, phishing-resistant login option |
| Ride Integrity | 📲 Dual OTP checkpoints | Confirms correct pickup & drop parties |
| Access Layer | 🧠 Role-based access control | Enforces least-privilege per role |
| Vendor Trust | 🎥 Video KYC | Human-verified identity for drivers |
| Platform Oversight | 🚨 Fraud detection system | Flags anomalous ride/payment patterns |

---

## 🧠 AI & Algorithmic Intelligence

- 🧭 **Shortest-path graph routing** — Dijkstra-style optimization for driver-rider matching
- 🚖 **Smart allocation engine** — proximity + availability-weighted driver assignment
- 💰 **Dynamic fare computation** — distance, vehicle class, and demand-aware pricing
- 📈 **ML-ready analytics foundation** — data pipeline structured for future demand-prediction models

---

## 📈 Scalability & Infrastructure Strategy

RYDEX's architecture is designed with a clear scaling path in mind:

```
Current:   Monolithic Next.js + Node.js  →  Rate-limited, load-balanced API layer
Next:      Domain-driven service boundaries (Ride / Vendor / Payment / Admin)
Future:    Microservices  →  Container orchestration (Kubernetes)  →  Auto-scaling pods
```

- **Stateless services** enable safe horizontal scaling behind a load balancer
- **Rate limiting** protects critical endpoints (OTP, auth, booking) from abuse under load
- **Analytics pipeline** structured for future stream-processing (e.g., Kafka-based event ingestion)
- **Multi-stage approval workflows** designed to be queue-based, decoupling verification latency from user-facing performance

---

## 🔄 Ride Lifecycle

```
1. Identity Verification   →  OTP + Google OAuth
2. Ride Request             →  Live GPS location capture
3. Driver Assignment        →  Shortest-path + nearest-available logic
4. Pickup Checkpoint        →  OTP verification #1
5. Live Tracking             →  Real-time map synchronization
6. Drop Checkpoint           →  OTP verification #2
7. Settlement                →  UPI / online payment completion
8. Post-Ride Analytics       →  Ride history + earnings updated
```

---

## ⚙️ Tech Stack

<p align="center">
  <img width="600" alt="Tech Stack" src="https://github.com/user-attachments/assets/5e7b3aec-fd62-4284-b4ac-d92fb306119f" />
</p>

| Domain | Technologies |
|---|---|
| Frontend | Next.js, React, modern responsive UI |
| Backend | Node.js, Express-style API layer |
| Auth | JWT, Google OAuth 2.0, OTP services |
| Real-Time | GPS tracking, live map sync, live chat/call |
| Identity Verification | Zego Cloud (Video KYC) |
| Payments | UPI / online payment gateway integration |
| Deployment | Vercel (current), Kubernetes-ready (future) |

---

## 💡 Engineering Philosophy

RYDEX is built on the belief that a portfolio project should be held to **production standards**, not tutorial standards:

- 🏗️ Architecture that anticipates scale, not just demo traffic
- 🔒 Security modeled as layered defense, not a single login form
- ⚡ Real-time systems treated as first-class citizens, not bolted-on features
- 🧠 Algorithmic decision-making (routing, allocation, pricing) instead of hardcoded logic
- 🎯 Admin governance workflows that mirror real operational compliance needs

---

## 🚀 Roadmap

- [ ] 🤖 ML-based demand prediction
- [ ] 📈 Dynamic surge pricing engine
- [ ] 🧩 Microservices decomposition (Ride / Vendor / Payment / Admin)
- [ ] ☸️ Kubernetes-based container orchestration & auto-scaling
- [ ] 🛡️ Advanced, ML-driven fraud detection
- [ ] 📡 Event-streaming pipeline (Kafka) for real-time analytics

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/Biswajitpa.png" width="100" style="border-radius:50%" />

### **Biswajit Pattanaik**
**Full-Stack Developer • System Design Engineer • AI Integration • Backend Engineering • UI/UX Designer • DevOps & Deployment Engineer**

Designed, engineered, and deployed the **entire RYDEX platform** end-to-end — system architecture, backend services, frontend experience, security model, and production infrastructure — as a single-owner, production-grade build.

<a href="https://github.com/Biswajitpa"><img src="https://img.shields.io/badge/GitHub-Biswajitpa-181717?logo=github&style=for-the-badge" /></a>
<img src="https://img.shields.io/badge/Made%20with-%E2%9D%A4-red?style=for-the-badge" />

<br/><br/>

⭐ **If this project helped or inspired you, consider giving it a star!** ⭐

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0055FF,100:00F7FF&height=100&section=footer" width="100%"/>

</div>
