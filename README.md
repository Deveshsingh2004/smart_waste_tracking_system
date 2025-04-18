# 🗑️ Smart Waste Management System

A **Smart Waste Management System** that leverages an **Arduino-based setup** with **ultrasonic and weight sensors** to monitor dustbin fill levels. The system collects real-time data and triggers notifications when bins reach capacity. Additionally, a **web dashboard** allows for real-time monitoring and management.

## 🚀 Features

- 📊 **Real-time Monitoring:** Collects bin data (fill percentage, weight, location) and updates a database.
- 🌍 **Geolocation Tracking:** Stores the **latitude and longitude** of bins for optimized waste collection.
- 🔔 **Automated Alerts:** Triggers **SMS and push notifications** when a bin reaches 80% capacity.
- 📡 **Cloud Integration:** Uses an **API Gateway and AWS Lambda** to handle notifications.
- 🖥️ **Web Dashboard:** Displays real-time bin status and analytics.

## 🛠️ Tech Stack

- **Hardware:** Arduino, Ultrasonic Sensor, Weight Sensor
- **Software:** C++ (Arduino), Python/Node.js (Server)
- **Cloud Services:** AWS Lambda, API Gateway, DynamoDB (or any other database)
- **Frontend:** HTML, CSS, JavaScript (for the web dashboard)
- **Backend:** Node.js/Python (to manage API requests)

## ⚙️ System Workflow

1. **Data Collection:** Sensors detect bin fill levels and weight.
2. **Database Update:** Bin data (address, lat, long, weight, fill %) is stored.
3. **Notification Trigger:** When a bin reaches **80% capacity**, a **POST request** is sent to the API Gateway.
4. **AWS Lambda Execution:** The function sends an **SMS & push notification** to the authorities.
5. **Web Dashboard:** Displays bin statuses for real-time monitoring.

## 📦 Installation

### 🔌 Hardware Setup
1. Connect the **Ultrasonic Sensor** to measure fill levels.
2. Connect the **Weight Sensor** to measure bin weight.
3. Upload the **Arduino code** to read sensor data.
