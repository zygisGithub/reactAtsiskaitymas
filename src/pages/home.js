import React, { useEffect, useState } from 'react';
import useStore from "../store/store";
import {useNavigate} from "react-router-dom";
import formatTimestamp from '../plugins/formatTimestamp.js'

const Home = () => {
    const nav = useNavigate()
    const { posts, setPosts, toggleFavorite, favorites, setFavorites } = useStore();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 15;

    const [filterUsername, setFilterUsername] = useState('');
    const [filterDateFrom, setFilterDateFrom] = useState('');
    const [filterDateTo, setFilterDateTo] = useState('');
    const [filterTitle, setFilterTitle] = useState('');

    const secret = localStorage.getItem('secretKey');

    useEffect(() => {
        fetch('http://167.99.138.67:1111/getallposts')
            .then(res => res.json())
            .then(data => {
                setPosts(data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        const savedFavorites = JSON.parse(localStorage.getItem(secret)) || [];
        setFavorites(savedFavorites);
    }, [setPosts, secret, setFavorites]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;


    const isFavorited = (postId) => {
        return favorites.includes(postId);
    };

    const filteredPosts = posts.filter((post) => {
        const postDate = new Date(post.timestamp);
        const filterDateFromObj = filterDateFrom ? new Date(filterDateFrom) : null;
        const filterDateToObj = filterDateTo ? new Date(filterDateTo) : null;

        return (
            (!filterUsername || post.username.includes(filterUsername)) &&
            (!filterDateFrom || postDate >= filterDateFromObj) &&
            (!filterDateTo || postDate <= filterDateToObj) &&
            (!filterTitle || post.title.includes(filterTitle))
        );
    });

    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const clearFilter = () => {
        setFilterUsername('');
        setFilterDateTo('');
        setFilterDateFrom('');
        setFilterTitle('');
    };

    return (
        <div className='home'>
            <div className='filter'>
                <input
                    type="text"
                    placeholder='Autoriaus vartotojo vardas'
                    value={filterUsername}
                    onChange={(e) => setFilterUsername(e.target.value)}
                />
                <div className='dateDisplay'>
                    <p>Nuo:</p>
                    <input
                        type="date"
                        placeholder='Data nuo'
                        value={filterDateFrom}
                        onChange={(e) => setFilterDateFrom(e.target.value)}
                    />
                    <p>Iki:</p>
                    <input
                        type="date"
                        placeholder='Data iki'
                        value={filterDateTo}
                        onChange={(e) => setFilterDateTo(e.target.value)}
                    />
                </div>
                <input
                    type="text"
                    placeholder='Įrašo pavadinimas'
                    value={filterTitle}
                    onChange={(e) => setFilterTitle(e.target.value)}
                />
                <div className='button' onClick={clearFilter}>Išvalyti Filtrus</div>
            </div>
            <div className='posts'>
                {currentPosts.length > 0 ? (
                    currentPosts.map((user) => (
                        <div className='post' key={user.id}>
                            <div className='postContent'>
                                {secret && (
                                    <svg
                                        className='favoriteIcon'
                                        width="50px"
                                        height="50px"
                                        viewBox="0 0 64 64"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => toggleFavorite(user.id, secret)}
                                        style={{ cursor: 'pointer', fill: isFavorited(user.id) ? 'yellowgreen' : '#999999' }}>
                                        <path d="M45.35 6.1709H19.41C16.8178 6.17618 14.3333 7.20827 12.5003 9.04123C10.6674 10.8742 9.63528 13.3587 9.62999 15.9509V52.2709C9.6272 53.3655 9.92973 54.4392 10.5036 55.3713C11.0775 56.3034 11.9 57.057 12.8787 57.5474C13.8573 58.0377 14.9533 58.2454 16.0435 58.1471C17.1337 58.0488 18.1748 57.6484 19.05 56.9909L31.25 47.8509C31.5783 47.6074 31.9762 47.4759 32.385 47.4759C32.7938 47.4759 33.1917 47.6074 33.52 47.8509L45.71 56.9809C46.5842 57.6387 47.6246 58.0397 48.7142 58.1387C49.8038 58.2378 50.8994 58.0311 51.8779 57.5418C52.8565 57.0525 53.6793 56.3001 54.2537 55.3689C54.8282 54.4378 55.1317 53.365 55.13 52.2709V15.9509C55.1247 13.3587 54.0926 10.8742 52.2597 9.04123C50.4267 7.20827 47.9422 6.17618 45.35 6.1709Z"
                                        />
                                    </svg>
                                )}
                                <img style={{ width: '300px', height: '300px', cursor:'pointer' }} src={user.image} alt=""/>
                                <div>
                                    <h2 onClick={()=> nav(`/userposts/${user.username}`)}>Autorius: {user.username}</h2>
                                    <h2>{user.title}</h2>
                                    <h3>Paskelbta: {formatTimestamp(user.timestamp)}</h3>
                                    <div onClick={()=> nav(`/singlepost/${user.username}/${user.id}`)}  className='button'>Skaityti</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Kraunasi...</p>
                )}
                <div className="pagination">
                    {[...Array(totalPages).keys()].map(number => (
                        <button
                            key={number + 1}
                            onClick={() => paginate(number + 1)}
                            className={number + 1 === currentPage ? 'active' : ''}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
