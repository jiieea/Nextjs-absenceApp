### Next.js Absence App

## 🌟 Overview
The Next.js Absence App is a modern and efficient web application designed to streamline student attendance management for lecturers. Built with cutting-edge web technologies, this app provides a seamless experience for lecturers to add students, record their presence, and communicate important updates via WhatsApp notifications, powered by Twilio and Firebase.

## ✨ Features
- **Student Management** : Easily add and manage student records.
- **Attendance Tracking**: Mark student presence with a simple and intuitive interface.
- **Whatsapp Notification** : Send automated notifications to students/parents via Twilio, ensuring timely communication about attendance or other announcements.
- **Firebase Integration** :  Utilizes Firebase for robust and scalable backend services, including authentication and database management.\
- **Responsive Design** :  A sleek, mobile-friendly interface built with Tailwind CSS.

## 🚀 Tech Stack 
- **Framework** : [Next.js](https://nextjs.org/)
- **Language** : [Typescript](https://www.typescriptlang.org/)
- **Styling** : [Tailwind Css](https://tailwindcss.com/)
- **BackEnd / Database** : [Firebase](https://firebase.google.com/)
- **SMS/Whatsapp API : [Twilio](https://www.twilio.com/en-us)


## 🛠️ Installation
Follow this steps to set up project locally :
1. Clone the repository :
  ```bash
  git clone https://github.com/jiieea/Nextjs-absenceApp.git
  cd Nextjs-absenceApp
  ```

2. Install Dependencies
  ```bash
  npm install
  # or
  yarn install
  ```

3.Configure Environment Variables:
  Create a ```.env.local ``` file in the root directory and add your Firebase and Twilio credentials. You'll need:
  - Firebase API Key, Auth Domain, Project ID, Storage Bucket, Messaging Sender ID, App ID.
  - Twilio Account SID, Auth Token, and a Twilio phone number.

 Example ```.env.local```:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```
## 



🏃 Running the Application
To run the development server:
```
npm run dev
# or
yarn dev
```
Open http://localhost:3000 in your browser to see the result.

You can start editing the page by modifying ```pages/index.tsx```. The page auto-updates as you edit the file.

## 📜 License
This project is open source and available under the MIT License.




