export async function checkTokensBeforeSubmit() {

    console.log("Vérification des tokens avant soumission...");
  const accessToken = localStorage.getItem("accessToken");

  // Si pas d’access token → tenter un refresh
  if (!accessToken) {
    return await refreshAccessToken();
  }

  try {
    const api = import.meta.env.VITE_API_URL;

    const response = await fetch(`${api}/token/isValidTokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Si token valide → backend renvoie un nouveau token
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      return true;
    }

    // Si token expiré
    if (response.status === 401) {
      return await refreshAccessToken();
    }

  } catch (error) {
    console.error("Erreur de vérification des tokens:", error);
    return false;
  }
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    redirectToLogin();
    return false;
  }

  try {
    const api = import.meta.env.VITE_API_URL;

    const response = await fetch(`${api}/token/isValidTokens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("accessToken", data.accessToken);
      return true;
    }

  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token:", error);
  }

  redirectToLogin();
  return false;
}

export function redirectToLogin() {
  alert("Votre session a expiré, veuillez vous reconnecter.");
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
}
