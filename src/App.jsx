import { useEffect, useState } from 'react'
import Card from './Card'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import styles from './home.module.css'
import AddNew from './AddNew';
import Loader from './Loader';
import { live } from './BaseURL';
import toast, { Toaster } from 'react-hot-toast';

const App = (props) => {
  const [notee, setNotee] = useState();
  const [hide, setHide] = useState(true);
  const url = `${live}post_and_get_note.php`;
  const getAll = async () => {
    await axios.get(url).then(response => setNotee(response.data)).catch(error => {
      toast.error(error.message);
      if(error.message === "Network Error"){
        document.body.style.backgroundColor="black";
      }
    });
  }
  useEffect(()  => {
    getAll();
  }, []);
  return (
    <div className="container mt-5">
      <Toaster />
      <div className="banner_">
        <h1>GEMINI FREE NOTE WRITTER</h1>
      </div>
      <div className={styles['flex_cards']}>
       {
         notee !== undefined && notee.NOTES?.length > 0 ? notee.NOTES.map( ( i, k) =>  <Card datas={i} key={k} setNotee={setNotee} />):<Loader />
       }
      </div>
      <div className={styles['adding']}>
        <button className="bi bi-plus" onClick={() => setHide(false)}></button>
      </div>
      <AddNew setHide={setHide} hide={hide} setNotee={setNotee} />
    </div>
  )
}

export default App
