# 🚕 Ride Booking App – Frontend Documentation

This project is the **frontend** for the Ride Booking Application (Uber Clone) built using the **MERN Stack**. The frontend is developed with **React.js** for the user interface, **Socket.io** for real-time communication, **Leaflet.js** for map integration, and **Tailwind CSS** for styling.

---

## **Technologies & Dependencies**

### **React.js**
React is the core JavaScript library used to build the user interface (UI). It allows the creation of reusable UI components and efficient rendering of the app.

### **React Router**
React Router is used for handling client-side navigation. It enables the application to navigate between different pages without reloading the browser, allowing for a seamless user experience.

### **Socket.io**
Socket.io is used to handle real-time bidirectional communication between the frontend and backend. It facilitates live updates on ride status, driver notifications, and location tracking.

### **Leaflet**
Leaflet is a JavaScript library for creating interactive maps. In this project, it is used to display live location data, pickup points, and destinations. It integrates well with React using the `react-leaflet` wrapper.

### **Tailwind CSS**
Tailwind CSS is a utility-first CSS framework used to style the application. It allows for rapid development and customization with predefined classes for layout, spacing, and typography.

### **Context API**
React’s Context API is used for state management across different components. It helps share global data like user information, captain details, and ride status without passing props down manually at every level.

---

## **Project Structure**

- **`src/components/`**  
  Contains reusable components for the user interface, such as buttons, status indicators, and ride components.

- **`src/context/`**  
  Includes context providers for global state management, such as user data, captain data, and socket connections.

- **`src/pages/`**  
  Contains different pages for user actions, including login, signup, home, and ride management.

- **`src/routersPages/`**  
  Includes components related to routing and conditional rendering, such as protected routes for users and captains.

- **`src/utils/`**  
  Houses utility functions for API calls, authentication, and socket event handling.

- **`src/assets/`**  
  Contains static assets such as images, icons, and other media files used throughout the application. This folder includes:
  - **Images**: Logo, user and captain avatars, background images, etc.
  - **Icons**: Custom icons used for markers on the map, status indicators, and buttons.

---

## **Core Components**

### **UserHome**
- Displays user information, available ride options, and navigation to ride booking.
- Allows users to view their ride history and current ride status.

### **UserRides**
- Manages the user's current ride journey, including ride confirmation and payment flow.
- Interacts with the backend through Socket.io to receive real-time updates on ride status.

### **CaptainHomePage**
- Displays the captain’s dashboard with available rides.
- Captains can accept or decline ride requests and track their current ride status.

### **LiveMap**
- Displays a live map using Leaflet.js, showing the user’s current location, the pickup point, and the destination.
- Tracks the real-time position of the user or captain during the ride journey.

---

## **Functionality**

- **Authentication & Authorization:**  
  The app supports user and captain authentication with login, signup, and session management.
  
- **Real-time Ride Updates:**  
  Ride status, including ride initiation, tracking, and completion, is updated in real-time using Socket.io.

- **Live Location Tracking:**  
  Users’ and captains’ locations are tracked and displayed on the map, providing real-time visibility.

- **Map Integration:**  
  Live location data is visualized using Leaflet.js. Maps show the user's current location, pickup point, and destination.

- **Ride Management:**  
  Users can book a ride, track it in real-time, and complete payment upon arrival at their destination.

---

## **Dependencies**

### **Frontend Dependencies**

1. **React.js**  
   - Used to build the UI components and manage the state of the application.
   
2. **React Router**  
   - For client-side routing to navigate between different views (login, signup, home, ride pages).
   
3. **Socket.io Client**  
   - Enables real-time communication with the backend, facilitating live updates on ride status and location.

4. **Leaflet & React-Leaflet**  
   - Used to display interactive maps and visualize real-time locations and routes for users and captains.

5. **Tailwind CSS**  
   - A utility-first CSS framework for styling components rapidly with a clean, responsive layout.

6. **Context API**  
   - Used to manage global state (user data, ride status, socket connection) across different components.

---

## **How to Run the Application Locally**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/annuprajapati3/Ride-Booking-Application
