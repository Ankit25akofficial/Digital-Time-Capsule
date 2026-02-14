# API Testing Guide for Time Capsule

## Base URL
```
http://localhost:3000
```

## Endpoints

### 1. POST /create - Create a new capsule

**Request:**
```http
POST http://localhost:3000/create
Content-Type: application/json

{
  "message": "Hello from the past!",
  "unlockDate": "2026-02-14T11:15:00"
}
```

**Expected Response (201):**
```json
{
  "id": "ea563362-fc1c-478d-bb5e-8d39e77df361",
  "message": "Capsule created successfully"
}
```

### 2. GET /capsule/:id - Retrieve a capsule (Locked)

**Request:**
```http
GET http://localhost:3000/capsule/ea563362-fc1c-478d-bb5e-8d39e77df361
```

**Expected Response (403 - if still locked):**
```json
{
  "error": "Capsule is locked",
  "unlockDate": "2026-02-14T11:15:00",
  "title": "Untitled Capsule",
  "isLocked": true
}
```

### 3. GET /capsule/:id - Retrieve a capsule (Unlocked)

**Request:**
```http
GET http://localhost:3000/capsule/ea563362-fc1c-478d-bb5e-8d39e77df361
```

**Expected Response (200 - if unlocked):**
```json
{
  "id": "ea563362-fc1c-478d-bb5e-8d39e77df361",
  "message": "Hello from the past!",
  "unlockDate": "2026-02-14T11:15:00",
  "title": "Untitled Capsule",
  "createdAt": "2026-02-14T05:32:59.052Z",
  "isLocked": false
}
```

### 4. GET /capsule/:id - Not Found

**Request:**
```http
GET http://localhost:3000/capsule/invalid-id-123
```

**Expected Response (404):**
```json
{
  "error": "Capsule not found"
}
```

## Testing with cURL (Command Line)

### Create Capsule:
```bash
curl -X POST http://localhost:3000/create -H "Content-Type: application/json" -d "{\"message\":\"Test message\",\"unlockDate\":\"2026-02-14T11:20:00\"}"
```

### Get Capsule:
```bash
curl http://localhost:3000/capsule/YOUR_CAPSULE_ID_HERE
```
