export async function getCurrentUserApi() {
  const session = localStorage.getItem('session');
  if (!session) return null;

  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const token = JSON.parse(localStorage.getItem('session')).token;

  try {
    const res = await fetch(`/api/v1/auth/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Throw error for 500 status code
    if (res?.status === 500)
      throw new Error('Something went wrong, please try again later');

    const data = await res.json();

    // Manually throwing error for bad requests for React Query
    if (data.status === 'fail') {
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

// rewrite function as follows
// 1. Retrieve current local session (localStoratge)
// 2. If no local session return null
// 3. If there is a current local session, fetch the user using the code written above^
// 4. if (error) throw new Error(error.message)
