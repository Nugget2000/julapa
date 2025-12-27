## 2025-01-20 - Defense in Depth: CSP & JS Consolidation
**Vulnerability:** The application relied on inline scripts and `onclick` handlers, making it impossible to implement a strict Content Security Policy (CSP) without `unsafe-inline`, which leaves the site vulnerable to XSS.
**Learning:** Static sites often accumulate inline logic that can be easily centralized. Refactoring to external files enables strict CSP headers, significantly hardening the application against script injection attacks.
**Prevention:** Always separate logic from markup. Use `addEventListener` instead of inline handlers. Implement a strict CSP (`script-src 'self'`) from the start.
