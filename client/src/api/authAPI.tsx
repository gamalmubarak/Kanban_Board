import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try // Send a POST request to '/auth/login' with user login information in JSON format
{
// Send a POST request to '/auth/login' with user login information in JSON format
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    });

    // Check if the response is ok (status code 200-299)
    // If not, throw an error
    if (!response.ok) {
      throw new Error('Invalid login credentials');
    }

    return await response.json(); // Return the token from the server
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export { login };
