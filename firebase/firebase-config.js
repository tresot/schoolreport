// firebase/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";

// Configuration Firebase de ton projet SchoolReport
const firebaseConfig = {
    apiKey: "AIzaSyAgbZ8YHHPbaKWmEMzwI65jXflv-8qYCVM",
    authDomain: "schoolreport-f8db0.firebaseapp.com",
    databaseURL: "https://schoolreport-f8db0-default-rtdb.firebaseio.com",
    projectId: "schoolreport-f8db0",
    storageBucket: "schoolreport-f8db0.firebasestorage.app",
    messagingSenderId: "313069994450",
    appId: "1:313069994450:web:37b009be4f1812fdca880b",
    measurementId: "G-N8YF0VKWCD"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
