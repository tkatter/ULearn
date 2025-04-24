export async function getCurrentUserApi() {
  const session = localStorage.getItem('session');
  const user = localStorage.getItem('user');
  if (!session || !user) return null;

  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const token = JSON.parse(localStorage.getItem('session')).token;

  try {
    const res = await fetch(`/api/v1/auth/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    // Throw error for expired JWT
    if (data.status === 'error' && data?.error?.name === 'TokenExpiredError') {
      throw 'Your session has expired, please login again.';
    }

    // Manually throwing error for bad requests for React Query
    if (data.status !== 'success') {
      throw new Error(data.message);
    } else if (data.status === 'success') {
      // return data;
      return data.data.authenticatedUser;
    }
  } catch (err) {
    // Manually throwing error for bad requests for React Query
    throw new Error(err);
  }
}
