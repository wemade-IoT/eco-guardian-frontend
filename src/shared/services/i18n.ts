const translations = {
  en: {
    dashboard: 'Dashboard',
    profile: 'Profile',
    consulting: 'Consulting',
    plants: 'Plants',
    installation: 'Installation',
    scheduleInstallation: 'Schedule Installation',
    orderPayment: 'Order Payment',
    home: 'Dashboard',
    yourAccountDetails: 'Your Account Details',
    userProfile: 'User Profile',
    manageSubscription: 'Manage Subscription',
    editProfile: 'Edit Profile',
    currentSubscription: 'Current Subscription',
    plan: 'Plan',
    name: 'Name',
    lastName: 'Last Name',
    status: 'Status',
    active: 'Active',
    upgradeToDomesticPro: 'Upgrade to Domestic Pro',
    allFeaturesFromCurrentPlan: 'All features from your current plan',
    upTo8Plants: 'Up to 8 Plants',
    extraTipsFromSpecialists: '5 extra tips from our specialists',
    upgradeNow: 'Upgrade now',
    notifications: 'Notifications',
    noNotifications: 'No notifications',
    paymentHistory: 'Payment History',
    Payments: 'Payments',
    ordersHistory: 'Orders History',
    Orders: 'Orders',
    amount: 'Amount',
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',
    email: 'Email:',
    address: 'Address:',
    date: 'Date',
    hour: 'Hour',
    cancel: 'Cancel',
    save: 'Save',
    uploadPhoto: 'Upload a new profile photo',
    locale: 'en', // Default locale
    kitDetails: 'Kit and Sensors Details',
    billingDetails: 'Billing Details',
  },
  es: {
    kitDetails: 'Detalle del Kit y Sensores',
    billingDetails: 'Detalles de Facturación',
    dashboard: 'Tablero',
    profile: 'Perfil',
    consulting: 'Consultoría',
    plants: 'Plantas',
    installation: 'Instalación',
    scheduleInstallation: 'Programar Instalación',
    orderPayment: 'Pago de Pedido',
    home: 'Dashboard',
    yourAccountDetails: 'Detalles de tu cuenta',
    userProfile: 'Perfil de usuario',
    manageSubscription: 'Gestionar suscripción',
    editProfile: 'Editar perfil',
    currentSubscription: 'Suscripción actual',
    plan: 'Plan',
    name: 'Nombre',
    lastName: 'Apellido',
    status: 'Estado',
    active: 'Activo',
    upgradeToDomesticPro: 'Mejorar a Domestic Pro',
    allFeaturesFromCurrentPlan: 'Todas las funciones de tu plan actual',
    upTo8Plants: 'Hasta 8 plantas',
    extraTipsFromSpecialists: '5 consejos extra de nuestros especialistas',
    upgradeNow: 'Mejorar ahora',
    notifications: 'Notificaciones',
    noNotifications: 'Sin notificaciones',
    paymentHistory: 'Historial de pagos',
    Payments: 'Pagos',
    ordersHistory: 'Historial de pedidos',
    Orders: 'Pedidos',
    amount: 'Monto',
    previous: 'Anterior',
    next: 'Siguiente',
    page: 'Página',
    of: 'de',
    email: 'Correo:',
    address: 'Dirección:',
    date: 'Fecha',
    hour: 'Hora',
    cancel: 'Cancelar',
    save: 'Guardar',
    uploadPhoto: 'Sube una nueva foto de perfil',
    locale: 'es', // Default locale
  }
} as const;

import { ref } from 'vue';


type Locale = keyof typeof translations;
type TranslationKey = keyof typeof translations['en'];

const currentLocale = ref<Locale>('en');

export function toggleLanguage() {
  currentLocale.value = currentLocale.value === 'en' ? 'es' : 'en';
  // Guardar en localStorage
  localStorage.setItem('locale', currentLocale.value);
}

export function getCurrentLocale(): Locale {
  return currentLocale.value;
}

export function t(key: TranslationKey): string {
  return translations[currentLocale.value][key] || key;
}


