import React, { useState } from 'react'

import styles from './home.module.css'
import axios from 'axios';
import { live } from './BaseURL';

const Card = ({ datas, setNotee}) => {
    const [title, setTitle] = useState(datas.title);
    const [hide1, setHide1] = useState(true);
    const [descr, setDescr] = useState(datas.descr);
    const del = async () => {

        const url = `${live}delete_and_update_notes.php`;
        const getNote = await axios.get(`${url}?id=${datas.noteId}`);
        console.log("response ", getNote.data);
        const getNotee = await axios.get(`${live}post_and_get_note.php`);
        setNotee(getNotee.data)

    }
    const handleSubmit = async () => {
        let data = new FormData();
        data.append('title', title); //===""? title : datas.title
        data.append('desc',  descr); // ===""? descr : datas.descr 
        data.append('id',  datas.noteId );

        const body = data;
        const request = await axios.request({
            method: 'POST',
            url: `${live}delete_and_update_notes.php`,
            data: body
        }).then((response) => {
            if (response.data.STATUS === '200') {
                const url = `${live}post_and_get_note.php`;
                const getAll = async () => {
                    const getNote = await axios.get(url);
                    console.log("updated ", datas.noteId);
                    setNotee(getNote.data);
                    setHide1(true);
                }
                getAll();
            }
        }).catch((error) => {
            console.log(error);
        });

    }
    return (
        <div className={styles['card_']} style={{
            backgroundColor: `${datas.bgColor}`
        }}>
            <h2>{datas.title}</h2>
            <div className={styles['desc']}>
                {datas.descr}
            </div>
            <div className={styles['border_top']}>
                <div className="">
                    <i className="bi bi-pen" onClick={() => setHide1(false)}></i>
                    <i className="bi bi-trash3" onClick={del}></i>
                </div>
                <div className="">
                    <span>Added on: {datas.date_created}</span>
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
                    <button className='btn btn-primary p-3 m-3' onClick={handleSubmit}>Add Note</button>
                    <button className='btn btn-primary p-3' onClick={() => setHide1(true)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Card