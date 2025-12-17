# Serverless Glassmorphism Weather Dashboard

## 🚀 Live Demo
[Link to your AWS Amplify URL here]

## 💡 Project Overview
A cloud-native weather dashboard that visualizes real-time conditions using a physics-based **Glassmorphism UI**.

Unlike standard weather apps, this project utilizes a **Serverless Architecture**. I engineered a custom proxy server using **AWS Lambda** to securely fetch data from OpenWeatherMap, effectively masking API keys and eliminating CORS issues without spinning up a dedicated backend server.

## 🛠️ Tech Stack
* **Frontend:** React.js, Tailwind CSS, Vite
* **Backend:** AWS Lambda (Node.js)
* **Hosting:** AWS Amplify
* **Design:** Glassmorphism, React-Parallax-Tilt

## ⚙️ Architecture
**[User Client]** -->  **[AWS Amplify Hosting]**
       |
       v
**[AWS Lambda Proxy]** --> **[OpenWeatherMap API]**

## ✨ Key Features
* **Serverless Backend:** Secure API key management via AWS Lambda.
* **Physics-Based UI:** 3D Tilt effects that respond to mouse movement.
* **Vector Assets:** Scalable SVG icons (`react-icons`) for high-DPI displays.
* **Dynamic Styling:** Background gradients change based on weather conditions (Clear, Rain, Snow, etc.).
