export async function loginApi(email, password) {
  try {
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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
