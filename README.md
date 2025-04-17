<p align="center">
  <h3 align="center">GamePlatform</h3>
  <p align="center">
    <br/>
    <a href="https://github.com/FatihArslan-cmd/GamePlatform-Toyota32Bit"><strong>🌟 Explore the docs »</strong></a>
    <br/>
    <a href="https://github.com/FatihArslan-cmd/GamePlatform-Toyota32Bit/issues">🐛 Report Bug</a>
    .
    <a href="https://github.com/FatihArslan-cmd/GamePlatform-Toyota32Bit/issues">✨ Request Feature</a>
  </p>
</p>

## 📖 Table of Contents

1. [📘 About The Project](#about-the-project)
2. [🚀 Getting Started](#getting-started)
    - [📋 Prerequisites](#prerequisites)
    - [📋 Environment Configuration](#env)
    - [⚙️ Installation](#installation)
    - [🛠️ Usage](#usage)
3. [📷 Screenshots](#screenshots)
4. [📦 Dependencies](#dependencies)
5. [🤝 Contributing](#contributing)
6. [📞 Contact](#contact)
7. [📌 Important Versions](#important-versions)

## <a id="about-the-project"></a>📘 About The Project.

This project was developed using a monorepo structure with Lerna. GamePlatform is built with React Native and includes submodules such as the game Tombala (Bingo).

GamePlatform is a gaming platform that currently includes one game: Tombala. To get started, launch the server and log into the app. You can create or join a lobby, add friends using a barcode or code, and exchange private messages via WebSocket. Group messaging is also supported.

Once a lobby is created, the host can start the game, and all players will be navigated to the game screen. The first player to get Bingo wins the game.

The backend is developed using Express.js and handles real-time communication using WebSocket. All runtime data such as active lobbies, players, and game states are stored in MemoryStore, meaning the data is kept in memory during server uptime and is not persisted after restarts.

🔗 Check out the Tombala (Bingo) game on GitHub:
<a href="https://github.com/FatihArslan-cmd/Bingo" target="_blank">Tombala GitHub Repository</a>

For the full experience, download and try out the app!
<hr>

<br/>
## <a id="screenshots">📷 Screenshots</a>
<br/>

<img src="https://github.com/user-attachments/assets/643bbab3-393d-403d-ac91-5505f519cb44" width="300" alt="Screenshot 1"/>
<img src="https://github.com/user-attachments/assets/d3dd6040-3a58-43a5-bc2e-f3858860f6d9" width="300" alt="Screenshot 1"/>
<img src="https://github.com/user-attachments/assets/605eddca-fc0f-435a-92c4-c621ca68119f" width="300" alt="Screenshot 2"/>
<img src="https://github.com/user-attachments/assets/785abd2a-dc15-4c57-a694-7aee9b2c100d" width="300" alt="Screenshot 3"/>
<img src="https://github.com/user-attachments/assets/669acd0b-2138-47c2-b316-53db4acc112e" width="300" alt="Screenshot 4"/>
<img src="https://github.com/user-attachments/assets/f8217818-1e8a-432d-a344-5af2ee62d51c" width="300" alt="Screenshot 5"/>

<br/>
<br/>

<hr>

### <a id="prerequisites"></a>📋 Prerequisites

Ensure you have the following software installed:
- [Node.js](https://nodejs.org/) (v22.14.0) 🟢
- npm (v10.2.4 or later) or Yarn 🧶

This project was bootstrapped with [Create React Native App](https://github.com/expo/create-react-native-app?tab=readme-ov-file).


## <a id="env"></a>📄 Environment Configuration

To run the server properly, create a .env file inside the server directory with the following structure:
  ```bash
SECRET_KEY=your_secret_key_here
SESSION_SECRET=your_session_secret_here
HMAC_SECRET=your_hmac_secret_here
REFRESH_SECRET_KEY=your_refresh_secret_key_here

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
  ```
## <a id="getting-started"></a>🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### <a id="installation"></a>⚙️ Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/FatihArslan-cmd/GamePlatform-Toyota32Bit.git
    ```
2. Navigate to the project directory:
    ```bash
    cd GamePlatform-Toyota32Bit
    ```
3. Navigate to the packages directory and clone the Bingo submodule:
    ```bash
    cd packages
    git clone https://github.com/FatihArslan-cmd/Bingo.git
    ```
4. Return to the root directory and install dependencies:
    ```bash
    yarn install
    ```
5. Start Server:
    ```bash
    cd server
    node .\server.js
    ```
6. Start the project:
    ```bash
    yarn gamecenter
    ```

<hr>


## <a id="contributing"></a>🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:

1. Fork the Project  
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to the Branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request  
<br/>

<hr>

## <a id="dependencies"></a>📦 Dependencies

  "@notifee/react-native": "^9.1.8",  
  "@react-native-clipboard/clipboard": "^1.15.0",  
  "@react-native-community/blur": "^4.4.1",  
  "@react-native-community/datetimepicker": "^8.2.0",  
  "@react-native-community/netinfo": "^6.0.6",  
  "@react-native-firebase/app": "^21.7.2",  
  "@react-native-firebase/messaging": "^21.7.2",  
  "@react-native-masked-view/masked-view": "^0.3.2",  
  "@react-navigation/material-top-tabs": "^7.1.0",  
  "@react-navigation/native": "^7.0.14",  
  "@react-navigation/native-stack": "^7.2.0",  
  "@shopify/flash-list": "^1.7.2",  
  "@shopify/react-native-skia": "^1.7.6",  
  "axios": "^1.7.9",  
  "bingo": "file:../Bingo",  
  "i18next": "^24.2.3",  
  "lottie-react-native": "^7.1.0",  
  "react": "18.3.1",  
  "react-content-loader": "^7.0.2",  
  "react-i18next": "^15.4.1",  
  "react-native": "0.76.5",  
  "react-native-bootsplash": "^6.3.2",  
  "react-native-fast-image": "^8.6.3",  
  "react-native-gesture-handler": "^2.21.2",  
  "react-native-image-picker": "^8.0.0",  
  "react-native-linear-gradient": "^2.8.3",  
  "react-native-mmkv": "^3.2.0",  
  "react-native-pager-view": "^6.6.1",  
  "react-native-paper": "^5.12.5",  
  "react-native-qrcode-skia": "^0.3.1",  
  "react-native-reanimated": "^3.16.6",  
  "react-native-safe-area-context": "^5.0.0",  
  "react-native-screens": "^4.4.0",  
  "react-native-sound": "^0.11.2",  
  "react-native-svg": "^15.10.1",  
  "react-native-tts": "^4.1.1",  
  "react-native-vector-icons": "^10.2.0",  
  "react-native-vision-camera": "^4.6.3"

### <a id="important-versions"></a>📌 Important Versions
  "react-native": "0.76.5",  
  "node": v22.14.0  
  "npm": 10.9.2  
  "yarn": 1.22.22  
  "JDK": 17.0.10  
<hr>

## <a id="contact"></a>📞 Contact

**Fatih Arslan** - *Software Engineering Student* - [Fatih Arslan](https://github.com/FatihArslan-cmd)
