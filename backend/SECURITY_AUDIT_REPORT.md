# CoreInsight Security Audit Report
**Date:** 2026-07-01
**Status:** CRITICAL SECURITY ISSUES FOUND

## Executive Summary
Found 7 critical security vulnerabilities that must be fixed before any real customer data is processed. The most severe issues are: missing authentication on query endpoint, no credential encryption, and tenant ID spoofing vulnerability.

---

## Critical Issues (Must Fix Immediately)

### 1. ❌ Query Endpoint Has No Authentication or Tenant Isolation
**File:** `app/api/query.py`
**Severity:** CRITICAL
**Impact:** Anyone can query any data without authentication

**Current Code:**
```python
@router.post("/query")
async def execute_query(request: QueryRequest):
    result = await query_service.process_question(request.question)
    return result
```

**Issues:**
- No authentication check
- No tenant context set
- No user validation
- Direct access to all data

**Fix Required:**
- Add JWT authentication middleware
- Set tenant context from authenticated user
- Validate user permissions

---

### 2. ❌ Credentials Stored in Plain Text
**File:** `app/services/integration_service.py` (line 55)
**Severity:** CRITICAL
**Impact:** Customer API keys exposed in database breach

**Current Code:**
```python
credentials = str(credentials)  # Line 55 - stored as plain text
```

**Issues:**
- Credentials stored as plain string in database
- No encryption at rest
- Violates security best practices

**Fix Required:**
- Use encryption library (cryptography/Fernet)
- Encrypt credentials before storing
- Decrypt only when needed for API calls
- Never return full credentials in API responses

---

### 3. ❌ Tenant ID Spoofing Vulnerability
**File:** `app/api/integrations.py`
**Severity:** CRITICAL
**Impact:** Users can access other tenants' data by changing tenant_id in requests

**Current Code:**
```python
@router.get("/connections/{tenant_id}")
async def get_connections(tenant_id: str):
    # No validation that user belongs to this tenant
    connections = await service.get_connections(tenant_id)
```

**Issues:**
- Client provides tenant_id in URL/body
- No validation that authenticated user belongs to that tenant
- Users can access any tenant's data by guessing IDs

**Fix Required:**
- Extract tenant_id from JWT token, not from request
- Validate user belongs to requested tenant
- Remove tenant_id from API parameters

---

### 4. ❌ JWT Secret Key Misconfigured
**File:** `app/core/security.py` (line 11)
**Severity:** HIGH
**Impact:** Weak JWT signing, potential token forgery

**Current Code:**
```python
SECRET_KEY = settings.ANTHROPIC_API_KEY if hasattr(settings, 'ANTHROPIC_API_KEY') else "your-secret-key-change-in-production"
```

**Issues:**
- Using Anthropic API key as JWT secret (wrong purpose)
- Fallback to default weak secret
- Secret should be separate, randomly generated value

**Fix Required:**
- Generate strong random JWT secret
- Store in environment variable
- Never use API keys as JWT secrets

---

### 5. ❌ No Authentication Middleware
**File:** `app/main.py`
**Severity:** HIGH
**Impact:** Endpoints don't verify user authentication

**Current Code:**
```python
app.include_router(query.router, prefix="/api", tags=["query"])
app.include_router(integrations.router, prefix="/api", tags=["integrations"])
```

**Issues:**
- No global authentication middleware
- Each endpoint must manually check auth
- Easy to forget auth on new endpoints

**Fix Required:**
- Add dependency injection for authentication
- Create `get_current_user` dependency
- Apply to all protected routes

---

### 6. ❌ No Rate Limiting on Auth Endpoints
**File:** `app/api/auth.py`, `app/main.py`
**Severity:** HIGH
**Impact:** Brute force attacks on login/signup

**Current Code:**
```python
# Rate limiting only on root endpoint
@app.get("/")
@limiter.limit("100/minute")
async def root(request: Request):
```

**Issues:**
- Rate limiting not applied to auth endpoints
- No protection against brute force
- No account lockout mechanism

**Fix Required:**
- Add rate limiting to `/api/auth/login` and `/api/auth/signup`
- Implement account lockout after failed attempts
- Add CAPTCHA for suspicious activity

---

### 7. ⚠️ CORS Configuration
**File:** `app/main.py` (line 28)
**Severity:** MEDIUM
**Impact:** Potential cross-origin attacks

**Current Code:**
```python
allow_origins=settings.ALLOWED_ORIGINS.split(","),
```

**Issues:**
- Default allows only localhost
- Production should restrict to specific domains
- Should validate origins properly

**Fix Required:**
- Set production CORS to specific domains
- Add origin validation
- Consider using allow_origins function for dynamic validation

---

## Positive Security Measures Found

### ✅ Password Hashing
- Uses bcrypt for password hashing (`app/core/security.py`)
- Proper salt and cost factors
- No plain text password storage

### ✅ Tenant Context System
- Has `set_tenant_context` for database isolation
- PostgreSQL session variables for tenant scoping
- Used in integration service

### ✅ JWT Token Structure
- Includes user_id, email, tenant_id in token
- Token expiration (30 minutes)
- Proper token validation

### ✅ Error Logging
- Sentry integration configured
- Global exception handler
- Logging for security events

---

## Recommended Fix Priority

1. **IMMEDIATE (Before any real data):**
   - Fix credential encryption
   - Add authentication to query endpoint
   - Fix tenant ID spoofing

2. **HIGH (Before public launch):**
   - Fix JWT secret key
   - Add authentication middleware
   - Add rate limiting to auth endpoints

3. **MEDIUM (Before production):**
   - Review CORS configuration
   - Add security headers
   - Implement session management

---

## Testing Recommendations

1. **Manual Security Test:**
   - Log in as User A, try to access User B's tenant_id
   - Try to query without authentication
   - Check if credentials are encrypted in database

2. **Automated Security Scan:**
   - Run dependency vulnerability scan
   - Test for SQL injection
   - Test for XSS vulnerabilities

3. **Penetration Testing:**
   - Consider professional security audit
   - Test authentication bypass attempts
   - Test API rate limiting

---

## Compliance Notes

- **GDPR:** Credential encryption required for data protection
- **SOC 2:** Data isolation and access controls mandatory
- **PCI DSS:** If processing payments, additional requirements apply

---

## Next Steps

1. Implement credential encryption immediately
2. Add authentication middleware to all endpoints
3. Fix tenant ID validation
4. Generate proper JWT secret key
5. Add rate limiting to auth endpoints
6. Conduct security testing
7. Document security procedures

**Status:** ⛔ DO NOT PROCESS REAL CUSTOMER DATA UNTIL CRITICAL ISSUES ARE RESOLVED
