const LS_USER = 'affilia_user';
const LS_SAVED = 'affilia_saved';

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(LS_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(u) {
  try {
    if (!u) localStorage.removeItem(LS_USER);
    else localStorage.setItem(LS_USER, JSON.stringify(u));
  } catch {}
}

export function getStoredSaved() {
  try {
    const raw = localStorage.getItem(LS_SAVED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setStoredSaved(items) {
  try {
    localStorage.setItem(LS_SAVED, JSON.stringify(items || []));
  } catch {}
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function login(email, password) {
  await delay(500);
  if (!email || !password) throw new Error('Invalid credentials');
  // Not secure—mock only.
  return {
    id: 'u_1',
    email,
    firstName: 'Adebayo',
    lastName: 'Azeez',
    gender: 'male',
    avatarUrl: '',
  };
}

export async function signup({ firstName, lastName, email, password }) {
  await delay(600);
  if (!email) throw new Error('Email required');
  return {
    id: 'u_' + Date.now(),
    email,
    firstName,
    lastName,
    gender: 'male',
    avatarUrl: '',
  };
}

export async function uploadImageAndGetProducts(file) {
  await delay(900);
  // Return mock products
  const base = [
    { id: 'p1', name: 'Classic Sneakers', brand: 'SneakCo', price: 69.99, year: 2024, thumbnail: 'https://picsum.photos/200/300?' },
    { id: 'p2', name: 'Canvas Tote Bag', brand: 'CarryAll', price: 24.5, year: 2024, thumbnail: 'https://picsum.photos/200/300?' },
    { id: 'p3', name: 'Denim Jacket', brand: 'BlueWear', price: 89.0, year: 2024, thumbnail: 'https://picsum.photos/200/300?' },
    { id: 'p4', name: 'Analog Watch', brand: 'Timely', price: 129.99, year: 2024, thumbnail: 'https://picsum.photos/200/300?' },
    { id: 'p5', name: 'Wireless Earbuds', brand: 'Soundly', price: 59.0, year: 2024, thumbnail: 'https://picsum.photos/200/300?' },
    { id: 'p6', name: 'Baseball Cap', brand: 'Capster', price: 19.99, year: 2024, thumbnail: 'https://picsum.photos/200/300?' },
  ];
  return base.map((p) => ({ ...p, image: '', matched: Math.random() > 0.5 }));
}

export async function updateAccount(user, updates) {
  await delay(400);
  return { ...user, ...updates };
}
