🌿 HabitSprout — Agentic Behavioral Escrow Protocol
Explore Live Demo · Watch 3-Min Video · API Documentation

🚀 1. Abstract & Problem Statement
The Problem
Traditional self-reported habit-tracking applications suffer from an 80% abandonment rate within the first two weeks. Without meaningful stakes, psychological loss aversion is absent, causing users to easily skip daily personal and professional milestones.

The Solution: HabitSprout
HabitSprout is an autonomous Agentic Behavioral Escrow Protocol that bridges financial accountability with generative AI. Users lock monetary wagers behind daily personal goals via secure PayPal escrow. Instead of relying on trust, Sprout AI visually audits user-submitted evidence (notes, workspace captures, flashcards). Upon successful verification, HabitSprout triggers PayPal REST API endpoints to instantly return funds or redistribute unverified wagers into community reward pools.

📐 2. System Architecture & Workflow

[ User Habit Setup ] 
       │
       ▼
[ PayPal REST Escrow Checkout ] ──► Status: PENDING (Funds Locked)
       │
       ▼
[ Sprout AI Verification Chamber ] 
       ├─► Negative Test Case (Rejected)  ──► Retains PENDING Escrow Lock
       └─► Positive Test Case (Verified)  ──► Triggers Refund / Payout Endpoint
       │
       ▼
[ AG Grid Reactive Ledger ] ──► Status: DISBURSED (Real-time update)

✨ 3. Key Features & Modules
Embedded PayPal Escrow Checkout

Simulated escrow creation powered by PayPal REST APIs and JavaScript SDK sandbox environment.

Wagers enter a strict PENDING state to signify locked collateral before proof validation.

Sprout AI Verification Chamber

Multimodal AI pipeline that extracts handwritten text via OCR, cross-references signatures, and evaluates timeline metrics.

Features rigorous error-handling and automated rejection workflows for negative test cases.

Reactive AG Grid Ledgers

Advanced financial ledger built using AG Grid Community Edition.

Employs real-time row transactions (applyTransaction) to smoothly animate status shifts from PENDING to DISBURSED.

APIMatic Code Portal & SDKs

Auto-generated OpenAPI 3.1 specification.

Typed, multi-language SDK code snippets (Node.js, Python, cURL) for developer integration.

Global Community Reward Pools

Decentralized economic loops (Momentum Pool, Focus Pool, Kindness Pool) that pool forfeited wagers to reward consistent streak-keepers.

🛠️ 4. Technology Stack
Frontend UI: React, Vite, Tailwind CSS, Lucide Icons

Data Grid Engine: AG Grid React Community Edition

Payments & Escrow: PayPal REST API, JavaScript SDK (Sandbox Mode)

AI Engine: Sprout AI Multimodal Vision & OCR Framework

Developer Tooling: APIMatic Context Plugins (OpenAPI 3.1)

Hosting & Edge: Render Platform

🚀 5. Quick Start & Local Setup
Prerequisites
Node.js (v18.0.0 or higher)

npm or yarn package manager

Installation Steps
1.  Clone the repository:
git clone https://github.com/riya-tiwari/HabitSprout.git
cd HabitSprout
2.  Install dependencies:
npm install
3.  Configure environment variables:
Create a .env file in the root directory:
VITE_PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
VITE_SPROUT_AI_KEY=your_ai_agent_key
4.  Run the development server:
npm run dev
Open http://localhost:5173 to view the app locally.

🎬 6. Submission Artifacts
3-Minute Video Demo: [suspicious link removed]

Live Hosted Application: https://shaggy-sprout-habit-grow.base44.app/

Devpost Project Page: [suspicious link removed]

👥 7. Team & Contributors
Riya Tiwari — First-Year B.Tech ECE, IGDTUW (Lead Architect & Full-Stack Developer)

📄 8. License
This project is licensed under the terms of the MIT License.