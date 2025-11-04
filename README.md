# MedConnect - Full API Scaffold

NestJS + Prisma + OAuth + Stripe + S3 (MinIO dev) scaffold.
MedConnect — AI-Powered Doctor Social & Communication Platform

MedConnect is an AI-driven, secure, and compliant social and communication ecosystem built exclusively for verified doctors and healthcare professionals.
Inspired by WeChat + Twitter, it empowers doctors to connect, consult, and create with the help of built-in AI assistants — all within a compliant, monetizable platform.


---

## Key Highlights

Doctor-Only Network: Verified doctors (license + KYC) join a private, secure ecosystem.

AI-Powered Interaction: Generate posts, summarize consultations, and triage patient messages using AI.

Secure Chat & Video Calls: HIPAA-compliant encrypted messaging, voice, and video consultations.

In-App Monetization: Paid consultations, subscriptions, and tips integrated with Stripe & Razorpay.

Multi-Platform: React Web + React Native Mobile (planned).

Compliant by Design: HIPAA/GDPR-ready encryption, consent flows, and audit logging.



---

## Core Features Overview

Feature	Description

Doctor Verification	Mandatory license + KYC verification before account activation.
Social Feed	Twitter-like posts, threads, and AI-assisted content generation.
Chat & Consultations	Encrypted text, audio, and video (WebRTC / LiveKit).
AI Assistant	Drafts posts, summarizes notes, triages patient questions, and more.
Consent-Based Communication	Doctors & patients connect only after mutual consent.
Payments & Monetization	Stripe + Razorpay for consultations, subscriptions, and tips.
Admin Dashboard	Manage users, payments, verifications, reports, and analytics.
Compliance & Security	HIPAA/GDPR-ready, AES-encrypted data storage, and consent tracking.



---

##  Tech Stack

Frontend

React / React Native (Next.js planned)

Tailwind CSS / ShadCN UI

TypeScript + Zustand + React Query


Backend

NestJS (TypeScript) + Prisma (PostgreSQL)

Redis (sessions, queues)

BullMQ for background jobs

Stripe + Razorpay SDKs

AWS S3 (storage)

Passport OAuth (Google, Apple, LinkedIn)


## AI Microservice

FastAPI (Python)

LangChain + OpenAI API (GPT-4 / GPT-5)

Whisper (speech-to-text)

ElevenLabs (text-to-speech)

Celery + Redis workers for async AI jobs


## Infrastructure

Docker + Docker Compose

Terraform (AWS setup)

Helm Charts (Kubernetes deployment)

GitHub Actions (CI/CD)

Sentry (error monitoring)

Prometheus + Grafana (metrics)
## Folder Structure


medconnect-ai-platform/
│
├── services/
│   ├── api/                # NestJS backend
│   │   ├── src/
│   │   │   ├── auth/       # OAuth + JWT + Refresh Tokens
│   │   │   ├── doctors/    # Doctor profiles & verification
│   │   │   ├── posts/      # Social feed module
│   │   │   ├── consults/   # Consultations & chats
│   │   │   ├── payments/   # Stripe + Razorpay logic
│   │   │   ├── ai/         # Proxy to AI microservice
│   │   │   └── common/     # Utils, filters, interceptors
│   │   ├── prisma/         # Schema, migrations, seed
│   │   ├── test/           # Jest + e2e tests
│   │   └── Dockerfile
│   │
│   └── ai/                 # FastAPI microservice
│       ├── app/
│       │   ├── routes/     # AI endpoints (draft, summarize, triage)
│       │   ├── services/   # OpenAI, Whisper, ElevenLabs integrations
│       │   ├── workers/    # Celery tasks
│       │   └── core/       # Config, logging, utils
│       └── Dockerfile
│
├── infra/
│   ├── docker-compose.override.yml
│   ├── terraform/
│   ├── helm/
│   ├── k8s/
│   └── ci-cd/
│
└── .github/
    └── workflows/
        ├── ci.yml
        ├── cd.yml
        └── notify.yml

## Environment Variables
.env file
DATABASE_URL=postgresql://user:password@localhost:5432/medconnect
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_key
WHISPER_API_KEY=your_whisper_key
ELEVENLABS_API_KEY=your_elevenlabs_key
GOOGLE_CLIENT_ID=your_google_id
APPLE_CLIENT_ID=your_apple_id
LINKEDIN_CLIENT_ID=your_linkedin_id
STRIPE_SECRET_KEY=your_stripe_key
RAZORPAY_KEY_ID=your_razorpay_id
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret

## Development Setup

# clone repo
git clone https://github.com/your-username/medconnect-ai-platform.git
cd medconnect-ai-platform

# start backend services
cd services/api
yarn install
yarn prisma:generate
yarn prisma:migrate
yarn seed
yarn start:dev

# start AI microservice
cd ../ai
docker build -t medconnect-ai .
docker run -p 8000:8000 medconnect-ai

For local infra (Postgres, Redis, MinIO):

docker-compose -f infra/docker-compose.override.yml up --build

## Deployment (Production)

Option 1: Docker Compose (Single Server)

docker-compose -f infra/docker-compose.prod.yml up -d

Option 2: Kubernetes (Helm)

helm install medconnect infra/helm/ -n medconnect --create-namespace

Option 3: AWS Deployment

cd infra/terraform
terraform init
terraform apply

## CI/CD Overview

GitHub Actions Workflows

ci.yml → Lint, test, and build checks

cd.yml → Docker build, push, and deploy via Helm

notify.yml → Slack deployment notification

## Testing

# Run unit + e2e tests
yarn test
yarn test:e2e


---

##  Compliance & Security

HIPAA/GDPR-ready encryption (AES-256 at rest + HTTPS in transit)

Consent-based access for patient data

JWT + Refresh Tokens (rotating, hashed)

Audit logging + Sentry error tracking



---

##  License

Copyright © 2025 MedConnect
All rights reserved.


---
Built & Maintained By

Pappu
MedConnect — AI-powered platform for doctors and healthcare professionals.
