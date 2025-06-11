// firebase/firebase-config.js - Version corrigée et complète
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Configuration Firebase unifiée
const firebaseConfig = {
    apiKey: "AIzaSyAgbZ8YHHPbaKWmEMzwI65jXflv-8qYCVM",
    authDomain: "schoolreport-f8db0.firebaseapp.com",
    databaseURL: "https://schoolreport-f8db0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "schoolreport-f8db0",
    storageBucket: "schoolreport-f8db0.appspot.com", // Corrigé pour être cohérent
    messagingSenderId: "313069994450",
    appId: "1:313069994450:web:37b009be4f1812fdca880b",
    measurementId: "G-N8YF0VKWCD"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);

// Utilitaires de sécurité
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

// Utilitaires de date
export const DateUtils = {
    formatDate(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    formatDateKey(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
    },

    formatTime(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
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

// Gestion des erreurs Firebase
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

// Utilitaires pour les notifications
export const NotificationUtils = {
    show(message, type = 'info', duration = 4000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
            word-wrap: break-word;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;

        const colors = {
            success: '#10b981',
            error: '#e63946',
            warning: '#f8961e',
            info: '#6366f1'
        };

        notification.style.backgroundColor = colors[type] || colors.info;
        notification.textContent = message;

        // Ajouter les styles d'animation si pas déjà présents
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Supprimer automatiquement
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
};

export { app, auth, db, firestore };
