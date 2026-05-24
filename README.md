## 🚗RYDEX – Smart AI-Powered Ride-Hailing & Mobility Platform
<p align="center"> <img src="https://capsule-render.vercel.app/api?type=waving&color=0:00F7FF,100:0055FF&height=200&section=header&text=RYDEX%20Mobility%20Platform&fontSize=40&fontColor=ffffff&animation=fadeIn&fontAlignY=35"/> </p>

## 🚀Overview
RYDEX is a full-stack Uber-inspired ride-hailing platform built using Next.js and Node.js, designed with a strong focus on scalability, security, real-time tracking, and system design principles.
- It includes advanced features like:
  - OTP-based ride verification (pickup & drop)
  - Real-time GPS tracking
  - Vendor onboarding with document & video verification
  - Rate limiting & load balancing concepts
  - DSA-based shortest path optimization
  - Admin-controlled approval system
This project simulates a production-level mobility system with real-world architecture.

## ✨Key Features
1. 👤 User System
   - Secure Sign Up / Login system
   - OTP-based account verification
   - Google OAuth 2.0 authentication
   - Real-time ride booking with GPS location
   - Live ride tracking using maps
   - Chat & call with driver
   - UPI / online payment integration
2. 🚗 Driver / Vendor System
- OTP-based secure onboarding
- Upload verification documents:
    - Aadhaar Card
    - Driving License
    - Vehicle RC
    - Bank Details
- Vehicle categories:
    - Bike, Auto, Car, Truck, Loading Vehicle
- Video KYC verification using Zego Cloud
- Earnings dashboard with analytics & charts
- Vehicle pricing setup after approval
3. 🛡️Admin Panel
- Multi-stage approval workflow:
  - Document Verification → Video Verification → Vehicle Approval → Activation
- Monitor users, drivers, and rides
- Fraud prevention system
- Earnings & revenue tracking
- Modern dashboard UI with animations & charts
## 🔐Security & System Design
- 🔒 Rate Limiting for API protection (OTP, login, booking)
- ⚖️ Load Balancing for scalable traffic handling
- 🔑 JWT Authentication system
- 🔐 Google OAuth 2.0 login
- 📲 OTP-based pickup & drop verification system
- 🧠 Secure role-based access control (User / Driver / Admin)
## 🧠 AI & DSA Integration
- 📍 Shortest path optimization (graph-based routing logic)
- 🚖 Smart ride allocation algorithm
- 💰 Dynamic fare estimation system
- 📊 Scalable logic for future ML-based demand prediction
## ⚙️Tech Stack
<img width="656" height="435" alt="Screenshot 2026-05-24 092714" src="https://github.com/user-attachments/assets/5e7b3aec-fd62-4284-b4ac-d92fb306119f" />

## 🏗️System Architecture
<img width="393" height="492" alt="image" src="https://github.com/user-attachments/assets/9135d824-3133-45fc-a288-a1d2ee1f79d3" />

## 🔄Ride Flow 
- User signs up / logs in (OTP + OAuth)
- User books ride using GPS location
- System assigns nearest driver
- Pickup OTP verification
- Ride tracking via live map
- Drop OTP verification
- Payment completion
- Ride history + analytics 

## 💡Why RYDEX?
- RYDEX is not just a project — it is a real-world system design implementation, focusing on:
- Scalable architecture
- Secure authentication system
- Real-time mobility solution
- AI + DSA integration
- Production-level backend thinking
  
## 🚀Future Improvements
- AI-based demand prediction
- Surge pricing system
- Microservices architecture migration
- Kubernetes deployment
- Advanced fraud detection system

## 👨‍💻Author
- 👨‍💻Developed by: Biswajit Pattanaik  
- 💼Focus: Full Stack Development | System Design | AI Integration | Backend Engineering

## SYSTEM DESING  ARCHITECTURE
<img width="1536" height="1024" alt="RYDEX_SYSTEM DESGINING " src="https://github.com/user-attachments/assets/2dea51fc-5522-4e76-a0d3-277ebd2cbaa3" />
