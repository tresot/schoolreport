// firebase-config.js - SchoolReport (Firebase UNIFIÉ)

// Import des modules Firebase
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

// === Configuration Firebase UNIFIÉE ===
const firebaseConfig = {
    apiKey: "AIzaSyAgbZ8YHHPbaKWmEMzwI65jXflv-8qYCVM",
    authDomain: "schoolreport-f8db0.firebaseapp.com",
    databaseURL: "https://schoolreport-f8db0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "schoolreport-f8db0",
    storageBucket: "schoolreport-f8db0.appspot.com",
    messagingSenderId: "313069994450",
    appId: "1:313069994450:web:37b009be4f1812fdca880b",
    measurementId: "G-N8YF0VKWCD"
};

// Initialisation unique
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialisation des services
const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// ✅ Export des modules Firebase
export { app, auth, db, firestore, storage };

// 🧰 Utilitaires de sécurité
export const SecurityUtils = {
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
            .trim();
    },

    validateInput(input, minLength = 1, maxLength = 255) {
        if (typeof input !== 'string') return false;
        const trimmed = input.trim();
        return trimmed.length >= minLength && trimmed.length <= maxLength;
    },

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

// 🕒 Utilitaires de date
export const DateUtils = {
    formatDate(date) {
        if (!(date instanceof Date)) date = new Date(date);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    formatDateKey(date) {
        if (!(date instanceof Date)) date = new Date(date);
        return date.toISOString().split('T')[0];
    },
    formatTime(date) {
        if (!(date instanceof Date)) date = new Date(date);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    isToday(date) {
        const today = new Date();
        const checkDate = new Date(date);
        return checkDate.toDateString() === today.toDateString();
    },
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
};

// 🛡️ Gestion des erreurs Firebase
export function handleFirebaseError(error) {
    console.error('Erreur Firebase:', error);
    switch (error.code) {
        case 'auth/user-not-found':
            return 'Utilisateur non trouvé';
        case 'auth/wrong-password':
            return 'Mot de passe incorrect';
        case 'auth/email-already-in-use':
            return 'Cette adresse email est déjà utilisée';
        case 'auth/weak-password':
            return 'Le mot de passe est trop faible';
        case 'auth/invalid-email':
            return 'Adresse email invalide';
        case 'permission-denied':
            return 'Accès refusé';
        case 'unavailable':
            return 'Service temporairement indisponible';
        case 'failed-precondition':
            return 'Conditions préalables non remplies';
        default:
            return error.message || 'Une erreur est survenue';
    }
}

// 🔔 Notifications simples
export const NotificationUtils = {
    show(message, type = 'info', duration = 4000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'error' ? '#e63946' : type === 'success' ? '#2ecc71' : '#3498db'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            font-size: 14px;
            font-family: 'Segoe UI', sans-serif;
        `;
        notification.innerText = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, duration);
    }
};
