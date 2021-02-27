import '../styles/global.css';
import { ChallengesProiver } from '../contexts/ChallengesContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProiver>
      <Component {...pageProps} />
    </ChallengesProiver>
  );
}

export default MyApp;
