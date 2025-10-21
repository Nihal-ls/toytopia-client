// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBBov3uEkVcqn7ueYYt9-6Km7xUMRjIig",
  authDomain: "toytopia-35d84.firebaseapp.com",
  projectId: "toytopia-35d84",
  storageBucket: "toytopia-35d84.firebasestorage.app",
  messagingSenderId: "675346224221",
  appId: "1:675346224221:web:c2bba7fae5322a762ea9b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app