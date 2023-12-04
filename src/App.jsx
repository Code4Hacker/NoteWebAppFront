import { useEffect, useState } from 'react'
import Card from './Card'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import styles from './home.module.css'
import AddNew from './AddNew';

const App = (props) => {
  const [notee, setNotee] = useState();
  const [hide, setHide] = useState(true);
  const url = "http://localhost:80/IAA/post_and_get_note.php";
  const getAll = async () => {
    const getNote = await axios.get(url);
    console.log("DAta:; ",getNote.data);
    setNotee(getNote.data)
  }
  useEffect(()  => {
    getAll();
  }, []);
  return (
    <div className="container mt-5">
      <div className="banner_">
        <h1>GEMINI FREE NOTE WRITTER</h1>
      </div>
      <div className={styles['flex_cards']}>
       {
         notee !== undefined && notee.NOTES?.length > 0 ? notee.NOTES.map( ( i, k) =>  <Card data={i} key={k} setNotee={setNotee} />):"Loading ..."
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
