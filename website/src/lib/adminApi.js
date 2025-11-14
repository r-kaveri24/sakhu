export const API_BASE = (import.meta.env.VITE_ADMIN_API_BASE || '').replace(/\/$/, '');

export async function getNews() {
  if (!API_BASE) return [];
  try {
    const res = await fetch(`${API_BASE}/api/news`, { mode: 'cors' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.items) ? data.items : [];
  } catch (e) {
    return [];
  }
}

export async function getHero() {
  if (!API_BASE) return [];
  try {
    const res = await fetch(`${API_BASE}/api/hero`, { mode: 'cors' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.items) ? data.items : [];
  } catch (e) {
    return [];
  }
}

export async function getGalleryPhotos() {
  if (!API_BASE) return [];
  try {
    const res = await fetch(`${API_BASE}/api/gallery/photo`, { mode: 'cors' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.items) ? data.items : [];
  } catch (e) {
    return [];
  }
}

export async function getGalleryVideos() {
  if (!API_BASE) return [];
  try {
    const res = await fetch(`${API_BASE}/api/gallery/video`, { mode: 'cors' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.items) ? data.items : [];
  } catch (e) {
    return [];
  }
}