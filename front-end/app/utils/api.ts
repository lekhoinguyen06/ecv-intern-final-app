// utils/api.ts
import { jwtDecode } from "jwt-decode"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; 

export const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const getUserEmail = () => {
  const idToken = localStorage.getItem('idToken');
  if (!idToken) return null;
  try {
    const decoded: any = jwtDecode(idToken);
    return decoded.email;
  } catch (error) {
    return null;
  }
};

export const fetchUserData = async () => {
  const email = getUserEmail();
  if (!email) throw new Error("No email found in token");

  const res = await fetch(`${API_URL}/api/user?email=${email}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    if (res.status === 401) {
       localStorage.clear();
       window.location.href = '/signin';
    }
    throw new Error('Failed to fetch user data');
  }
  return res.json();
};