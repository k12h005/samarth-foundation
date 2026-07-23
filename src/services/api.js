const getHeaders = (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res, onAuthError) => {
  if (res.status === 401 && onAuthError) {
    onAuthError();
  }
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
};

export const api = {
  // Config / Settings
  getSettings: async () => {
    const res = await fetch('/api/settings');
    return res.json();
  },
  
  updateSettings: async (settings, token, onAuthError) => {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(settings)
    });
    return handleResponse(res, onAuthError);
  },

  // Auth
  login: async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },

  login2FA: async (email, token) => {
    const res = await fetch('/api/auth/login-2fa', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, token })
    });
    return handleResponse(res);
  },

  setup2FA: async (token, onAuthError) => {
    const res = await fetch('/api/auth/setup-2fa', {
      method: 'POST',
      headers: getHeaders(token)
    });
    return handleResponse(res, onAuthError);
  },

  // Generic CRUD
  getList: async (collection) => {
    const res = await fetch(`/api/${collection}`);
    if (!res.ok) throw new Error(`Failed to load ${collection}`);
    return res.json();
  },

  getAdminList: async (collection, token, onAuthError) => {
    const res = await fetch(`/api/${collection}`, {
      headers: getHeaders(token)
    });
    return handleResponse(res, onAuthError);
  },

  saveItem: async (collection, payload, id, token, onAuthError) => {
    const url = id ? `/api/${collection}/${id}` : `/api/${collection}`;
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: getHeaders(token),
      body: JSON.stringify(payload)
    });
    return handleResponse(res, onAuthError);
  },

  deleteItem: async (collection, id, token, onAuthError) => {
    const res = await fetch(`/api/${collection}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token)
    });
    return handleResponse(res, onAuthError);
  },

  // Operations
  triggerBackup: async (token, onAuthError) => {
    const res = await fetch('/api/backup', {
      method: 'POST',
      headers: getHeaders(token)
    });
    return handleResponse(res, onAuthError);
  },

  uploadImage: async (file, slug, token) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('slug', slug);
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Upload failed');
    }
    return data;
  },

  submitBooking: async (payload) => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    return handleResponse(res);
  },

  submitDonation: async (payload) => {
    const res = await fetch('/api/donations', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    return handleResponse(res);
  }
};
