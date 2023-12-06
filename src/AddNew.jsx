import React, { useState } from 'react'

import styles from './home.module.css'
import axios from 'axios';
import { live } from './BaseURL';
import toast from 'react-hot-toast';

const AddNew = ({ setHide, hide, setNotee }) => {
    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const handleSubmit = async () => {
        let data = new FormData();
        data.append('title', title);
        data.append('desc', descr);
        data.append('bgcolor', `hsl(${Math.random() * 360}, 90%, 80%)`);



        const body = data;
        const request = await axios.request({
            method: 'POST',
            url: `${live}post_and_get_note.php`,
            data: body
        }).then((response) => {
            if (response.data.STATUS === '200') {
                const url = `${live}post_and_get_note.php`;
                const getAll = async () => {
                    const getNote = await axios.get(url);
                    toast.success(' Note Created Successiful!');
                    // console.log("DAta:; ", getNote.data);
                    setNotee(getNote.data);
                    setHide(true);
                }
                getAll();
            }
        }).catch((error) => {
            console.log(error);
        });

    }
    return (
        <div className={styles['fixed_all']} style={{
            display: `${hide ? 'none' : 'block'}`
        }}>
            <div className="input_bx">
                <div className="text-center">
                    <h1>CREATE  NOTE</h1>
                </div>
                <input type="text" placeholder='Title' className='input input-primary' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Description' value={descr} onChange={(e) => setDescr(e.target.value)} />
                <button className='btn btn-primary p-3 m-3' onClick={handleSubmit}>Add Note</button>
                <button className='btn btn-primary p-3' onClick={() => setHide(true)}>Cancel</button>
            </div>
        </div>
    )
}

export default AddNew