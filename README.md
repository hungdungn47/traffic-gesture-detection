# Traffic Gesture Detection

This is a React-based web application front-end that detects traffic police gestures from uploaded videos. The project is built using **Vite** and served using **Nginx** in a Docker container.

## 🚀 Features
- Upload video files of traffic police doing traffic coordinating gesture
- Video preview before processing
- Traffic gesture detection

## 🛠️ Installation & Running with Docker

### **1️⃣ Prerequisites**
Before running the project, ensure you have the following installed on your computer:
- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/downloads)

### **2️⃣ Clone the Repository**
```sh
git clone https://github.com/hungdungn47/traffic-gesture-detection
cd traffic-gesture-detection
```

### **3️⃣ Build & Run the Docker Container**
Run the following command to build the image and start the container:
```sh
docker build -t traffic-gesture-detection .
docker run -p 3000:80 traffic-gesture-detection
```

### **4️⃣ Access the Application**
Once the container is running, open your browser and visit:
```
http://localhost:3000
```

### 🎯 Contributions
Feel free to fork this repository and submit pull requests to improve the project!

