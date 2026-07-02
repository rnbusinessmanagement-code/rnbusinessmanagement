# Product Requirements Document (PRD) — RN Business Management

## 1. Project Overview & Brand Positioning
- **Client**: Rafael Norat, Managing Director of RN Business Management
- **Brand Positioning**: "Engineered for investors. Built for the busy."
- **Brand Voice**: Credible, no-nonsense, and engineered. Bridging Rafael Norat's 17 years of U.S. Army Engineering/PM discipline (cost, schedule, performance) with structured real estate portfolio scaling.
- **Core Audience**: Busy analytical professionals who want to build wealth through real estate safely but lack the time to figure it out alone.
- **Color Palette**: 
  - Deep Navy (`#0A1628`) as primary theme color
  - Gold/Champagne (`#C9A84C`) as accent color
  - Off-White (`#F5F5F0`) as global background
  - Soft White (`#FFFFFF`) as container surface background
- **Typography**: Montserrat for prominent titles and headings; Inter for body copies.

---

## 2. Implemented Architecture & System Design
The application is structured as a premium, highly responsive Single Page Application (SPA) with smooth scroll transition mapping and a secure, audited administrative dashboard.

### Core Stack:
- **Frontend**: React.js with Tailwind CSS, Lucide icons, and modern glassmorphic headers.
- **Backend**: FastAPI (Python) serving REST APIs prefixed with `/api`.
- **Database**: MongoDB (via Motor client) for robust, schema-less lead and waitlist storage.
- **CORS & Cookies**: Secure cross-origin sessions using dynamic CORS matching and HTTPOnly state cookies.

---

## 3. Core Requirements Met (Completed Features — July 2, 2026)
### A. Public Consultation Website
1. **Hero / Home**:
   - Headline: "Your Real Estate Portfolio, Built with Military Precision."
   - Subhead addressing busy, analytical investor-class professionals.
   - Dual Call-to-Actions (CTAs) pointing directly to the Contact Form and the Interactive Calculator.
2. **About Section**:
   - Compelling professional biography detailing Rafael's 17 years of Army Engineering experience at Picatinny Arsenal and his 40+ unit real estate acquisition history.
   - Custom-cropped, high-resolution portrait from the client's family collage (Option 2 - Outdoors with sunny natural tones) styled in an elegant geometric bento grid border.
3. **Services (3-Tier Bento Grid)**:
   - **Tier 1 (Low-Ticket)**: Tools & Templates (Financial Clarity Tool, inspection checklists, custom calculators).
   - **Tier 2 (Mid-Tier)**: Done-For-You Packages (Refinance packets and Investor Presentation prep).
   - **Tier 3 (Premium)**: Consulting Retainer (Fractional Chief Strategic Officer monthly advisory, visually highlighted with premium dark-mode styling and a custom banner badge).
4. **Financial Clarity Tool**:
   - Headline: "Know Your Number."
   - **Interactive Live Calculator**: Enables visitors to enter Property Names, Rent, and Expenses, instantly computing their Monthly Portfolio Cashflow in real time to demonstrate the low-ticket tool's core value.
   - Waitlist Sign-up form (captures Name, Email and stores in MongoDB).
5. **Coming Soon - Content Hub**:
   - Clean, minimal teaser blocks for the **Everyday Estate Podcast** and **The Blog**.
   - Side-by-side newsletter subscription captures (stores in MongoDB waitlists collection).
6. **Contact Section**:
   - Minimalist form capturing Name, Email, and message ("What are you working on?").
   - Transmits submissions directly to MongoDB under the `contact_submissions` collection.
7. **Public Navigation & Footer**:
   - Glassmorphism header with active section tracking.
   - Footer containing direct bio blurb, email (`rnbusinessmanagement@gmail.com`), social icons (LinkedIn, Instagram, Facebook), and the brand tagline.

### B. Secure Admin Dashboard (`/admin`)
- Secure, password-protected admin portal with JWT/session token authentication.
- Default administrator account pre-seeded on database startup (`rafael.norat@rnbusiness.com`).
- High-contrast, dense data tables (Contact Briefs and Software Waitlists) loaded directly from MongoDB.
- Full operational control: update submission statuses ("New", "In Review", "Resolved", "Archived") or perform safe row deletions.
- Dedicated logout handling.

---

## 4. Prioritized Backlog (Future Enhancements)
- **P0**: Direct Email Alert Integration (Forwarding MongoDB submission documents to `rnbusinessmanagement@gmail.com` using a secure Resend/SendGrid API key upon form submission).
- **P1**: Interactive Download System (Providing automated PDF downloads for the low-ticket checklists and spreadsheets once waitlist is validated).
- **P2**: Dark Mode Toggle (Providing high-contrast dark theme option for late-night analytical readers).
