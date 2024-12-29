import { useNavigate } from 'react-router';

export default function LogoutButton() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await fetch('http://localhost:3000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.message === 'Logout successful') {
        alert(data.message);
        navigate('/');
      } else {
        console.error('Logout failed:', data.error);
        alert('Logout failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  }

  return <button onClick={handleLogout}>Sign Out</button>;
}
