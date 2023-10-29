import logo from '../logo.svg'
import {AiFillHome, AiOutlineHome} from "react-icons/ai";
import {MdContactMail, MdOutlineContactMail} from "react-icons/md";
import {GiHamburgerMenu} from "react-icons/gi";
import {SlLogin, SlLogout} from "react-icons/sl";
import {BsPerson} from "react-icons/bs";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {RiAddBoxFill, RiAddBoxLine} from "react-icons/ri";
import Swal from "sweetalert2";
import {RegisterUsers} from "../actions/AuthAction";
import {useEffect} from "react";
import {CiSearch} from "react-icons/ci";
import {FiSearch} from "react-icons/fi";
import {FaSearch} from "react-icons/fa";
import {useSelector} from "react-redux";

export const Sidebar = () => {
    const pathname = useLocation()
    const navigate = useNavigate()
    const {
        updatePostsResult,
    } = useSelector((state) => state.PostsReducers)
    const logoutHandler = () => {
        Swal.fire({
            title: 'Apakah anda ingin Logout?',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            icon: "question"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Logout Success',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'rgb(97,218,251)'
                }).then(async (res) => {
                    if (res.isConfirmed || res.isDismissed) {
                        sessionStorage.removeItem('userdata')
                        navigate('/')
                    }
                })
            }
        })

    }
    useEffect(() => {

    }, [updatePostsResult]);
    const getDataSession = () => {
        const keyString = sessionStorage.getItem('userdata')
        return JSON.parse(keyString)
    }
    const data = getDataSession() ? getDataSession() : false
    useEffect(() => {
        // console.log(data)
        // if (!data) {
        //     navigate('/login')
        // }
    }, []);
    return (
        <div className='container-fluid mb-0 position-relative min-vh-100'>
            <div className='row'>
                <div className='col-sm-2 border min-vh-100'>
                    <div className='my-3 mx-1 align-items-center justify-content-center d-flex'>
                        <img src={logo} className='w-50 h-auto'/>
                    </div>
                    <div>
                        <Link to='/'>
                            <button className={`w-100 btn btn-light p-2 mb-1`}>
                                <div className='row w-100'>
                                    <div
                                        className='col-sm-2 m-0 p-0'>{pathname.pathname === '/' || pathname.pathname.toString().split('/')[1] === 'posts' ?
                                        <AiFillHome size={30} className='ms-3'/> :
                                        <AiOutlineHome size={30} className='ms-3'/>}</div>
                                    <div
                                        className={`col-sm-10 text-start fs-5 ${pathname.pathname === '/' || pathname.pathname.toString().split('/')[1] === 'posts' ? 'fw-bold' : ''}`}>Home
                                    </div>
                                </div>
                            </button>
                        </Link>
                        <Link to='/search'>
                            <button className={`w-100 btn btn-light p-2 mb-1`}>
                                <div className='row w-100'>
                                    <div
                                        className='col-sm-2 m-0 p-0'>{pathname.pathname === '/search' ?
                                        <FaSearch size={30} className='ms-3'/> :
                                        <FiSearch size={30} className='ms-3'/>}</div>
                                    <div
                                        className={`col-sm-10 text-start fs-5 ${pathname.pathname === '/search' === 'posts' ? 'fw-bold' : ''}`}>Search
                                    </div>
                                </div>
                            </button>
                        </Link>
                        <Link to='/post'>
                            <button className='w-100 btn btn-light p-2 mb-1'>
                                <div className='row w-100'>
                                    <div className='col-sm-2 m-0 p-0'>{pathname.pathname === '/post' ?
                                        <RiAddBoxFill size={30} className='ms-3'/> :
                                        <RiAddBoxLine size={30} className='ms-3 fw-bold'/>}</div>
                                    <div
                                        className={`col-sm-10 text-start fs-5 ${pathname.pathname === '/post' ? 'fw-bold' : ''}`}>Posting
                                    </div>
                                </div>
                            </button>
                        </Link>
                        <Link to='/contact-us'>
                            <button className='w-100 btn btn-light p-2 mb-1'>
                                <div className='row w-100'>
                                    <div className='col-sm-2 m-0 p-0'>{pathname.pathname === '/contact-us' ?
                                        <MdContactMail size={30} className='ms-3'/> :
                                        <MdOutlineContactMail size={30} className='ms-3'/>}</div>
                                    <div
                                        className={`col-sm-10 text-start fs-5 ${pathname.pathname === '/contact-us' ? 'fw-bold' : ''}`}>Contact
                                        Us
                                    </div>
                                </div>
                            </button>
                        </Link>
                        {
                            data ? (
                                <div className="dropdown">
                                    <button id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                                            className='w-100 btn btn-light p-2 mb-1'>
                                        <div className='row w-100'>
                                            <div className='col-sm-2 m-0 p-0'>
                                                {
                                                    pathname.pathname === '/profile' ?
                                                        <img
                                                            src={data ? data.data.image : "https://via.placeholder.com/100"}
                                                            style={{width: 30, height: 30}}
                                                            className='rounded-circle ms-3 border border-2 border-black'
                                                            alt=''/> :
                                                        <img
                                                            src={data ? data.data.image : "https://via.placeholder.com/100"}
                                                            style={{width: 30, height: 30}}
                                                            className='rounded-circle ms-3'
                                                            alt=''/>
                                                }
                                            </div>
                                            <div
                                                className={`col-sm-10 text-start fs-5 ${pathname.pathname === '/profile' ? 'fw-bold' : ''}`}>{data ? data.data.username:'Name'}
                                            </div>
                                        </div>
                                    </button>
                                    <ul className="dropdown-menu shadow" style={{width: '300px'}}>
                                        <li><Link to='/profile'
                                               className="dropdown-item"
                                               ><BsPerson/> Info Account</Link></li>
                                        <li>
                                            <hr className="dropdown-divider"></hr>
                                        </li>
                                        <li><a className="dropdown-item"
                                               onClick={() => logoutHandler()}><SlLogout/> Logout</a></li>
                                    </ul>
                                </div>
                            ) : (
                                <Link to='/login'>
                                    <button className='w-100 btn btn-light p-2 mb-1'>
                                        <div className='row w-100'>
                                            <div className='col-sm-2 m-0 p-0'>
                                                <SlLogin size={30} className='ms-3 fw-bold'/>
                                            </div>
                                            <div className={`col-sm-10 text-start fs-5`}>Login</div>
                                        </div>
                                    </button>
                                </Link>
                            )
                        }
                    </div>
                </div>
                <div className='col-sm-10 border overflow-auto vh-100'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
