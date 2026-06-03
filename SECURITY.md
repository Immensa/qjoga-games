# 🔒 Security Policy — QJoga HTML5 Games

This document describes how to report vulnerabilities and which security practices are expected for games in this repository.

---

## 📋 Scope

This repository contains **100% client-side** HTML5 games. There is no backend, database, or user authentication within the games themselves.

However, the games are integrated into the **QJoga platform** — which has a backend and infrastructure — and are served to the public. Therefore, security concerns still apply, especially:

- **XSS (Cross-Site Scripting)**: prevent script injection via inputs, URL params, or external data
- **Vulnerable dependencies**: JS libs with known CVEs
- **CSRF / Clickjacking**: mitigated by the platform, but locally hosted games may be affected
- **Accidental data exposure**: hardcoded keys, tokens, or secrets

For vulnerabilities in the **QJoga platform** (backend, infrastructure, APIs), use the appropriate channels in the main repository.

---

## 🚨 Reporting a Vulnerability

### Reporting Channels

| Channel | When to use |
|---------|-------------|
| **Email** | `immensa@outlook.com.br` — sensitive vulnerabilities |
| **GitHub Issues** | Low-severity issues that do not expose data |

### What to include in the report

- **Clear title** describing the vulnerability
- **Steps to reproduce** (minimal, detailed)
- **Affected version**: tag, commit hash, or branch
- **Potential impact**: what could an attacker do?
- **Proof of concept** (if available): minimal code or payload
- **Mitigation suggestion** (if any): pull requests are welcome

### Sample report

```
Title: Reflected XSS via ?name= parameter in Gael game

Steps:
1. Access Gael/index.html?name=<script>alert(1)</script>
2. The name is rendered without sanitization in the DOM

Impact: An attacker can inject malicious scripts
that steal cookies or redirect the user.

Affected commit: abc1234
```

---

## ⏱️ Response Timeline

| Severity | First response | Expected fix |
|----------|---------------|--------------|
| **Critical** | 48 hours | 7 days |
| **High** | 72 hours | 14 days |
| **Medium** | 1 week | 30 days |
| **Low** | 2 weeks | Next release |

- **Critical**: XSS executable without interaction, remote code execution (unlikely in client-side), sensitive data exposure
- **High**: XSS with interaction, game control bypass, access to other games' LocalStorage data
- **Medium**: Dependency with moderate CVE, bad practices that could evolve into a vulnerability
- **Low**: Hardening, configuration improvements, outdated dependencies without active CVE

---

## ✅ Security Best Practices for Games

### Input Sanitization

Always sanitize external data before inserting into the DOM.

```js
// ✅ Good: textContent is safe against XSS
element.textContent = userInput;

// ❌ Dangerous: innerHTML with external data
element.innerHTML = userInput;

// ✅ Acceptable: innerHTML with static and sanitized content
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(markdownContent);
```

### URL Parameters

Never trust `URLSearchParams` directly in the DOM:

```js
// ❌ Dangerous
const name = new URLSearchParams(location.search).get('name');
document.getElementById('player').innerHTML = name;

// ✅ Safe
const name = new URLSearchParams(location.search).get('name');
document.getElementById('player').textContent = name;
```

### LocalStorage

- **Never store** tokens, passwords, or personal data in LocalStorage
- Assume any data in LocalStorage can be read by other scripts on the same origin
- Consider encrypting save data with a derived key (Web Crypto API) if the game has sensitive saves

### Dependencies

- Keep libraries up to date — use `npm audit` regularly
- Prefer **fewer dependencies**: each lib adds attack surface
- Pin exact versions in `package.json` (`"lib": "1.2.3"`, not `"^1.2.3"`)

### iframe and Embed

If the game is embedded via iframe:
- Use the `X-Frame-Options: SAMEORIGIN` or `DENY` header on the server
- Consider the sandbox attribute: `sandbox="allow-scripts allow-same-origin"`
- Don't rely on `window.top` protection — assume it may be in any context

### Content Security Policy (CSP)

Games served by the QJoga platform must respect the configured CSP. Avoid:

- `eval()` and `new Function()` — blocked by strict CSP
- Inline scripts (`<script>alert(1)</script>`) — use external `.js` files
- Inline styles — use CSS classes or external `.css` files

---

## 🔄 Disclosure Policy

- **Coordinated disclosure**: wait for our confirmation before making the vulnerability public
- **Public credit**: with your consent, we will include your name in release notes and the security hall
- **Safe Harbor**: we consider good-faith security research as authorized activity — you will not be penalized for testing vulnerabilities in this repository's games

---

## 📦 Supported Versions

| Version | Support |
|---------|---------|
| `main` (branch) | ✅ Active support — security fixes |
| Latest release tag | ✅ Active support |
| Previous tags | ❌ Not supported |

Only the main branch and the latest release receive security patches. We encourage keeping games up to date with `main`.

---

## 🧪 Security Checks

Before opening a PR, verify:

```bash
# Audit dependencies (if applicable)
npm audit

# Check for accidentally hardcoded secrets
grep -r "API_KEY\|SECRET\|TOKEN\|password" --exclude-dir=node_modules --exclude-dir=.git .

# Check for innerHTML usage
grep -r "innerHTML" --include="*.js" --include="*.html" --exclude-dir=node_modules --exclude-dir=.git .

# Check for eval usage
grep -r "eval(" --include="*.js" --include="*.html" --exclude-dir=node_modules --exclude-dir=.git .
```

---

## 📧 Contact

- **Email**: `immensa@outlook.com.br`
- **Response time**: up to 48 business hours

Vulnerabilities are treated with priority. Thank you for helping keep the games safe for everyone.
