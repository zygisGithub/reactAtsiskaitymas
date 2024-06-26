import React, { useEffect, useRef, useState } from 'react';
import useStore from "../store/store";
import formatTimestamp from '../plugins/formatTimestamp.js'

const YourPosts = () => {
    const { toggleFavorite, favorites} = useStore();
    const [errorCreate, setErrorCreate] = useState('');
    const [errorUpdate, setErrorUpdate] = useState('');
    const [username, setUsername] = useState('');
    const [newData, setNewData] = useState([]);
    const titleInput = useRef();
    const imageInput = useRef();
    const descriptionInput = useRef();
    const idInputUpdate = useRef();
    const titleInputUpdate = useRef();
    const imageInputUpdate = useRef();
    const descriptionInputUpdate = useRef();
    const [secret, setSecret] = useState('');


    useEffect(() => {
        const newSecret = localStorage.getItem('secretKey');
        const newUsername = localStorage.getItem('username');
        setUsername(newUsername);
        setSecret(newSecret);
    }, []);

    useEffect(() => {
        if (username) {
            fetch('http://167.99.138.67:1111/getuserposts/' + username)
                .then(res => res.json())
                .then(data => {
                    if (data && data.data) {
                        setNewData(data.data);
                    } else {
                        console.error('Data format error', data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [username]);

    function createPost() {
        const userData = {
            secretKey: secret,
            title: titleInput.current.value,
            image: imageInput.current.value,
            description: descriptionInput.current.value,
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };

        fetch('http://167.99.138.67:1111/createpost', options)
            .then(res => res.json())
            .then(data => {
                if (!data.success) {
                    setErrorCreate(data.message);
                } else {
                    setErrorCreate('');
                    setNewData([...newData, userData]);
                    titleInput.current.value = '';
                    imageInput.current.value = '';
                    descriptionInput.current.value = '';
                    window.location.reload()
                }
            })
            .catch(error => {
                setErrorCreate('Error creating post');
                console.error('Error creating post:', error);
            });
    }

    function editPost() {
        const userData = {
            id: idInputUpdate.current.value,
            secretKey: secret,
            title: titleInputUpdate.current.value,
            image: imageInputUpdate.current.value,
            description: descriptionInputUpdate.current.value,
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };

        fetch('http://167.99.138.67:1111/updatepost', options)
            .then(res => res.json())
            .then(data => {
                if (!data.success) {
                    setErrorUpdate(data.message)
                } else {
                    setErrorUpdate('')
                    const updatedPosts = newData.map(post => {
                        if (post.id === userData.id) {
                            return { ...post, ...userData }
                        }
                        return post;
                    });
                    setNewData(updatedPosts)
                    idInputUpdate.current.value = ''
                    titleInputUpdate.current.value = ''
                    imageInputUpdate.current.value = ''
                    descriptionInputUpdate.current.value = ''
                }
            })
            .catch(error => {
                setErrorUpdate('Error updating post');
                console.error('Error updating post:', error)
            });
    }


    function deletePost(id) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ secretKey: secret, id }),
        };

        fetch('http://167.99.138.67:1111/deletepost', options)
            .then(res => res.json())
            .then(data => {
                if (!data.success) {
                    console.log('BAD REQUEST')
                }
            })
    }

    const isFavorited = (postId) => {
        return favorites.includes(postId)
    };

    return (
        <div className='yourPosts'>
            <div className='tools'>
                <div className='tool'>
                    <h2>Sukurti įrašą</h2>
                    <div></div>
                    <input ref={titleInput} type="text" placeholder='Įrašo pavadinimas'/>
                    <input ref={imageInput} type="url" placeholder='Nuotraukos URL'/>
                    <textarea className='description' ref={descriptionInput} type="text" placeholder='Aprąšymas'/>
                    <p>{errorCreate}</p>
                    <button onClick={createPost} className='button'>Sukurti</button>
                </div>
                <div className='tool'>
                    <h2>Redagatuoti įrašą</h2>
                    <input ref={idInputUpdate} type="text" placeholder='Įrašo ID'/>
                    <input ref={titleInputUpdate} type="text" placeholder='Įrašo pavadinimas'/>
                    <input ref={imageInputUpdate} type="url" placeholder='Nuotraukos URL'/>
                    <textarea className='description' ref={descriptionInputUpdate} type="text" placeholder='Aprąšymas'/>
                    <p>{errorUpdate}</p>
                    <button onClick={editPost} className='button'>Redaguoti</button>
                </div>
            </div>
            <div className='wrapper'>
                <div className='posts'>
                    {newData.length > 0 ? (
                        newData.map((post) => (
                            <div className='post' key={post.id}>
                                <div className='postContent'>
                                    {secret && (
                                        <svg
                                            className='favoriteIcon'
                                            width="50px"
                                            height="50px"
                                            viewBox="0 0 64 64"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => toggleFavorite(post.id, secret)}
                                            style={{ cursor: 'pointer', fill: isFavorited(post.id) ? 'yellowgreen' : '#999999' }}>
                                            <path d="M45.35 6.1709H19.41C16.8178 6.17618 14.3333 7.20827 12.5003 9.04123C10.6674 10.8742 9.63528 13.3587 9.62999 15.9509V52.2709C9.6272 53.3655 9.92973 54.4392 10.5036 55.3713C11.0775 56.3034 11.9 57.057 12.8787 57.5474C13.8573 58.0377 14.9533 58.2454 16.0435 58.1471C17.1337 58.0488 18.1748 57.6484 19.05 56.9909L31.25 47.8509C31.5783 47.6074 31.9762 47.4759 32.385 47.4759C32.7938 47.4759 33.1917 47.6074 33.52 47.8509L45.71 56.9809C46.5842 57.6387 47.6246 58.0397 48.7142 58.1387C49.8038 58.2378 50.8994 58.0311 51.8779 57.5418C52.8565 57.0525 53.6793 56.3001 54.2537 55.3689C54.8282 54.4378 55.1317 53.365 55.13 52.2709V15.9509C55.1247 13.3587 54.0926 10.8742 52.2597 9.04123C50.4267 7.20827 47.9422 6.17618 45.35 6.1709Z"
                                            />
                                        </svg>
                                    )}
                                    <img style={{ width: '300px', height: '300px' }} src={post.image} alt="" />
                                    <div>
                                        <h2>Autorius: {post.username}</h2>
                                        <h2>{post.title}</h2>
                                        <p>{post.description}</p>
                                        <p>Įrašo ID: {post.id}</p>
                                        <h3>Paskelbta: {formatTimestamp(post.timestamp)}</h3>
                                        <div className='button' onClick={deletePost}>Ištrinti įrašą</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nėra mėgstamiausių įrašų</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YourPosts;
