import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// create the authentication
let app;
let auth;

const firebaseConfig = {
  apiKey: "AIzaSyC9whWhoVPmXM0XFQV4kJW2uiXDcZKwiVs",
  authDomain: "egco427-2567t2.firebaseapp.com",
  projectId: "egco427-2567t2",
  storageBucket: "egco427-2567t2.firebasestorage.app",
  messagingSenderId: "434671947773",
  appId: "1:434671947773:web:adc52007cd095e2a199394",
  measurementId: "G-03CGT1379F",
};

// Initialize Firebase
initializeApp(firebaseConfig);
auth = getAuth();

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});

// createApp(App).use(router).mount("#app");
