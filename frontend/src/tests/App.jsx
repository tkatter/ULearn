import googleButton from './assets/btn_google_signin_light_normal_web@2x.png';
// import './App.css';

function navigate(url) {
  window.location.href = url;
}

function App() {
  // const [userData, setUserData] = useState({});

  async function auth() {
    try {
      const res = await fetch(`/api/v1/oauth/request`, {
        method: 'POST',
      });

      const data = await res.json();
      navigate(data.data.url);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <h1>Testing oAuth</h1>
      <button type="button" onClick={() => auth()}>
        <img src={googleButton} alt="Google Button" />
      </button>
    </>
  );
}

export default App;
