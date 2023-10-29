import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import {LoginUsers} from "../actions/AuthAction";
import {useEffect, useState} from "react";

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState("")
    const {loginUsersResult, loginUsersError} = useSelector((state) => state.AuthReducers)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getDataSession = () => {
        const keyString = sessionStorage.getItem('userdata')
        return JSON.parse(keyString)
    }
    const data = getDataSession() ? getDataSession() : false
    const loginUsers = (event) => {
        event.preventDefault()
        setIsLogin(true)
        dispatch(LoginUsers({username: username, password: password}))
    }
    useEffect(() => {
        if (data) {
            let timerInterval
            isLogin ?
            loginUsersResult.data ?
                Swal.fire({
                    title: 'Login Success',
                    html: 'You\'ll be directed',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss) {
                        navigate('/')
                    }
                }) :
                Swal.fire(
                    "Login Failed",
                    loginUsersError,
                    "error"
                ):
                navigate('/')
        }
        if (loginUsersError){
            Swal.fire(
                "Login Failed",
                loginUsersError,
                "error"
            )
        }
    }, [loginUsersResult, loginUsersError]);
    return (
        <div className='container d-flex align-items-center justify-content-center min-vh-100'>
            <div className='card w-75' style={{border: "rgb(97,218,251) solid 1px"}}>
                <div className='card-body m-0 p-0'>
                    <div className='row m-0 p-0'>
                        <div className='col-sm-8 my-5' style={{paddingBottom: '150px', paddingTop: '150px'}}>
                            <h1 className='text-center mb-4'>Login Account</h1>
                            <form onSubmit={(event) => loginUsers(event)}>
                                <div className='d-flex align-items-center justify-content-center w-100'>
                                    <input type='text'
                                           value={username}
                                           onChange={(event) => setUsername(event.target.value)}
                                           className='form-control mb-2 w-50' name='username' placeholder='Username'
                                           required/>
                                </div>
                                <div className='d-flex align-items-center justify-content-center w-100'>
                                    <input type='password'
                                           value={password}
                                           onChange={(event) => setPassword(event.target.value)}
                                           className='form-control mb-2 w-50' name='password'
                                           placeholder='Password' required/>
                                </div>
                                <div className='d-flex align-items-center justify-content-center w-100'>
                                    <button type='submit' className='btn btn-primary mb-2 w-25' name='submit'
                                            placeholder='Password'>Login
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className='col-sm-4 text-white'
                             style={{backgroundColor: "rgb(97,218,251)", paddingBottom: '150px', paddingTop: '220px'}}>
                            <div className='d-flex align-items-center justify-content-center w-100'>
                                <h2 className=''>New Here?</h2>
                            </div>
                            <div className='d-flex align-items-center justify-content-center w-100'>
                                <p className='w-100 text-center'>Sign Up and share your experience, hobby, bussiness,
                                    and many things with others</p>
                            </div>
                            <div className='d-flex align-items-center justify-content-center w-100'>
                                <button onClick={() => {
                                    navigate('/register')
                                }} className='btn btn-primary mb-2 w-50'>Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
