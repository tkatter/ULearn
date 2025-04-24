export async function logoutApi() {
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  try {
    const res = await fetch(`/api/v1/auth/logout/${userId}`, {
      method: 'GET',
    });

    // Throw error for 500 status code
    if (res?.status === 500)
      throw new Error('Something went wrong, please try again later');

    const data = await res.json();

    // Manually throwing error for bad requests for React Query
    if (data.status === 'fail') throw new Error(data.message);

    return data;
  } catch (err) {
    // Manually throwing error for bad requests for React Query
    throw new Error(err.message);
  }
}
