import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/store';

const Toolbar = () => {

    const nav = useNavigate();
    const { fav } = useStore();
    const secret = localStorage.getItem('secretKey');

    const handleLogout = () => {
        localStorage.removeItem('secretKey');
        nav('/');
        window.location.reload();
    };

    return (
        <div className='toolbar'>
            <div className='pageIcon'>
                <img src="https://cdn-icons-png.flaticon.com/512/4922/4922073.png" alt="icon" />
                <h1>Blogger</h1>
            </div>
            <div className='tools'>
                <Link className='link' to='/'>Namai</Link>
                <div className='customHrStand'></div>
                {!secret && (
                    <>
                        <Link className='link' to='/login'>Prisijungti</Link>
                        <div className='customHrStand'></div>
                        <Link className='link' to='/register'>Registracija</Link>
                    </>
                )}
                {secret && (
                    <>
                        <Link className='link' to='/yourposts'>Tavo įrašai</Link>
                        <div className='customHrStand'></div>
                        <Link className='link' to='/favorites'>Mėgstamiausi ({fav})</Link>
                        <div className='customHrStand'></div>
                        <p>Sveiki! {localStorage.getItem('username')}</p>
                        <div className='customHrStand'></div>
                        <p className='link' onClick={handleLogout}>Atsijungti</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Toolbar;
