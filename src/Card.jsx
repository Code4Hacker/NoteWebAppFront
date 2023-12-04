import React, { useState } from 'react'

import styles from './home.module.css'
import axios from 'axios';

const Card = ({ data, setNotee}) => {
    const [title, setTitle] = useState(data.title);
    const [hide1, setHide1] = useState(true);
    const [descr, setDescr] = useState(data.descr);
    const del = async () => {

        const url = "http://localhost:80/IAA/delete_and_update_notes.php";
        const getNote = await axios.get(`${url}?id=${data.noteId}`);
        console.log("response ", getNote.data);
        const getNotee = await axios.get("http://localhost:80/IAA/post_and_get_note.php");
        setNotee(getNotee.data)

    }
    return (
        <div className={styles['card_']} style={{
            backgroundColor: `${data.bgColor}`
        }}>
            <h2>{data.title}</h2>
            <div className={styles['desc']}>
                {data.descr}
            </div>
            <div className={styles['border_top']}>
                <div className="">
                    <i className="bi bi-pen" onClick={() => setHide1(false)}></i>
                    <i className="bi bi-trash3" onClick={del}></i>
                </div>
                <div className="">
                    <span>Added on: {data.date_created}</span>
                </div>
            </div>
            <div className={`${styles['fixed_all']}`} style={{
                display: `${hide1 ? 'none' : 'block'}`
            }}>
                <div className="input_bx">
                    <div className="text-center">
                        <h1>CREATE  NOTE</h1>
                    </div>
                    <input type="text" placeholder='Title' className='input input-primary' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder='Description' value={descr} onChange={(e) => setDescr(e.target.value)} />
                    <button className='btn btn-primary p-3 m-3'>Add Note</button>
                    <button className='btn btn-primary p-3' onClick={() => setHide1(true)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Card