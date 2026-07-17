# ✨ Creator Showcase & Portfolio - Jasim Kareem

A high-end, responsive, Vercel-inspired portfolio website showcasing production-grade projects:
- **Agmoney**: Spend Limit Firewall for AI Agents.
- **SumerSend**: Transactional Zain Cash & WhatsApp Automation.
- **Bank of Agents**: Neobank for AI Agents.
- **Sufrah**: Local food-delivery marketplace.

Features a sleek dark mode, interactive glassmorphic header, card hover spotlight effects, and detailed case study modals for each project.

---

## 🛠️ Tech Stack
- **Framework**: Vite + React + TypeScript
- **Styling**: Vanilla CSS (Vercel-inspired dark theme)
- **Icons**: Lucide React + custom SVGs

---

## 🚀 How to Deploy on Vercel with your Subdomain

1. **Push & Import**:
   - The repository is already public at [github.com/Prudctual/portfolio-showcase](https://github.com/Prudctual/portfolio-showcase).
   - Go to your Vercel Dashboard, click **Add New** -> **Project**, and import `portfolio-showcase`.

2. **Custom Domain**:
   - In Vercel, navigate to **Settings** -> **Domains**.
   - Add your custom subdomain: `portfolio.aiandthings.tech` (or `showcase.aiandthings.tech`).

3. **DNS Setup**:
   - Log in to your domain registrar (e.g. where `aiandthings.tech` is managed).
   - Add a new **CNAME** record:
     - **Host/Name**: `portfolio` (or `showcase`)
     - **Value/Target**: `cname.vercel-dns.com`
     - **TTL**: Automatic / 3600

4. **Verify**:
   - Vercel will automatically obtain an SSL certificate. Once the DNS propagates, your portfolio will be live at `https://portfolio.aiandthings.tech`!
