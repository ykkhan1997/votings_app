import '@/styles/globals.css'
import './styles.css';
import './styles.css?ver=1';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import VoterProvider from '@/context/Voter';
import { Navbar } from '@/Components';
export default function App({ Component, pageProps }) {
  return(
    <VoterProvider>
      <ToastContainer/>
      <Navbar/>
       <div>
       <Component {...pageProps} />
       </div>
    </VoterProvider>
  )
}
