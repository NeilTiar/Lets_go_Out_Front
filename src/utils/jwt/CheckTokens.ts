export async function checkTokensBeforeSubmit() {
  const accessToken: string | null = localStorage.getItem('accessToken');

  if (!accessToken) {
    return await refreshAccessToken();
  }

  try {
    const response: Response = await fetch(
      'http://localhost:5001/isValidTokens',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      const data: { accessToken: string } = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      return true;
    }
  } catch (error) {
    console.error('Erreur de vérification des tokens:', error);
    return false;
  }
}

export async function refreshAccessToken(): Promise<boolean> {
  const refreshToken: string | null = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    redirectToLogin();
    return false;
  }

  try {
    const response: Response = await fetch(
      'http://localhost:5001/api/refresh-token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (response.ok) {
      const data: { accessToken: string } = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      return true;
    }
  } catch (error) {
    console.error('Erreur lors du rafraîchissement du token:', error);
  }

  redirectToLogin();
  return false;
}

export function redirectToLogin(): void {
  alert('Votre session a expiré, veuillez vous reconnecter.');
  localStorage.removeItem('accessToken');
  window.location.href = '/login';
}
