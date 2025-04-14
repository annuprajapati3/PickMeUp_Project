# 🚕 Ride Booking App – Backend API Documentation

This backend powers a real-time ride-booking platform where users can book rides, and nearby captains (drivers) can accept and manage those rides.

Built with: **Node.js**, **Express.js**, **MongoDB**, **Socket.io**

---

## 🔐 Authentication

All authenticated routes require a JWT token in the header:

```
Authorization: Bearer <your_token>
```

Tokens are blacklisted upon logout.

---

## 👤 User APIs

### 📌 POST `/userRegistration`

Register a new user.

**Request Body:**

```json
{
  "userName": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "status": "done",
  "user": { ... },
  "token": "JWT_TOKEN"
}
```

---

### 📌 POST `/userLogin`

Login an existing user.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "user": { ... },
  "token": "JWT_TOKEN"
}
```

---

### 📌 GET `/getUserDetails`

Get profile of the logged-in user.

**Headers:** Requires Auth token.

**Response:**

```json
{
  "_id": "...",
  "userName": "John Doe",
  "email": "john@example.com",
  ...
}
```

---

### 📌 GET `/userLogout`

Logout and blacklist the current token.

---

## 👨‍✈️ Captain APIs

### 📌 POST `/captainRegister`

Register a new captain.

**Request Body:**

```json
{
  "captainName": "Rahul",
  "email": "rahul@example.com",
  "password": "123456",
  "drivingLicence": "DL123456",
  "vehical": {
    "vName": "Swift",
    "vColor": "White",
    "vNumber": "UP16AA1234",
    "vType": "car",
    "vModel": "2020",
    "vCapacity": "4"
  }
}
```

**Response:**

```json
{
  "status": "Successfully registered",
  "captain": { ... },
  "token": "JWT_TOKEN"
}
```

---

### 📌 POST `/captainLogin`

Captain login.

---

### 📌 GET `/getCaptainDetails`

Get profile of the logged-in captain.

---

### 📌 GET `/captainLogout`

Logout and blacklist the captain's token.

---

## 🚕 Ride APIs

### 📌 POST `/rideDetails`

Request a new ride.

**Request Body:**

```json
{
  "pickup": "Noida Sector 62",
  "destination": "Noida Sector 15",
  "vType": "car"
}
```

**Response:**

```json
{
  "_id": "...",
  "fare": 150,
  "status": "waiting",
  ...
}
```

---

### 📌 GET `/rideFare`

Get estimated fare for a trip.

**Query:**

```
/rideFare?pickup=Noida+Sector+62&destination=Noida+Sector+15
```

**Response:**

```json
{
  "status": "ok",
  "fared": {
    "Car": 150,
    "Auto": 100,
    "Motor": 80
  }
}
```

---

### 📌 POST `/captain/ride/confirm`

Captain accepts the ride.

**Request Body:**

```json
{
  "rideId": "6626abc..."
}
```

---

### 📌 POST `/captain/ride/start`

Start ride (requires OTP verification).

**Request Body:**

```json
{
  "rideId": "6626abc...",
  "otp": "123456"
}
```

---

### 📌 POST `/captain/ride/end`

Ends the ride and updates status to `complete`.

---

## 🗺️ Map APIs

### 📌 GET `/getCoordinate`

Get coordinates from address.

**Query:**

```
/getCoordinate?address=Noida+Sector+62
```

---

### 📌 GET `/getDistance`

Calculate distance and time.

**Query:**

```
/getDistance?origin=Noida+Sector+62&destination=Noida+Sector+15
```

---

### 📌 GET `/getSuggestion`

Autocomplete for address search.

**Query:**

```
/getSuggestion?address=noida
```

---

## 🔁 Real-Time Events (Socket.io)

- `join`: Save socket ID for user or captain
- `update-captain-location`: Update captain’s live location
- `new-ride`: Sent to nearby captains when a ride is requested
- `ride-confirm`, `ride-start`, `ride-end`: Updates sent to users

---

## 🔒 Security

- AES encryption for passwords (`crypto-js`)
- JWT for secure authentication
- Blacklist token on logout (expires after 1 hour)

---

## 🧩 Technologies Used

- Node.js, Express.js
- MongoDB, Mongoose
- Socket.io
- Google Maps API (Distance, Geocode, Autocomplete)
