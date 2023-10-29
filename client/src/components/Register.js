import {BiArrowBack} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import {RegisterUsers} from "../actions/AuthAction";
import {useEffect, useState} from "react";

export const Register = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    const {registerUsersResult, registerUsersError} = useSelector((state) => state.AuthReducers)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(false)
    const registerUsers = (data) => {
        Swal.fire({
            title: 'Apakah data sudah sesuai?',
            showCancelButton: true,
            confirmButtonText: 'Submit',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const dataJson = {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                }
                setIsRegister(true)
                dispatch(RegisterUsers(dataJson))
            }
        })
    }
    useEffect(() => {
        if (registerUsersResult || registerUsersError) {
            if (isRegister) {
                registerUsersResult ?
                    Swal.fire({
                        title: 'Register Success',
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonText: 'Ok',
                        confirmButtonColor: 'rgb(97,218,251)'
                    }).then(async (res) => {
                        if (res.isConfirmed || res.isDismissed) {
                            await navigate(-1)
                        }
                    }) :
                    Swal.fire(
                        "Gagal Register",
                        registerUsersError,
                        "error"
                    )
            }
        }
    }, [registerUsersResult, registerUsersError]);
    return (
        <div className='container d-flex align-items-center justify-content-center min-vh-100'>
            <div className='card w-75' style={{border: "rgb(97,218,251) solid 1px"}}>
                <div className='card-header'
                     style={{borderBottom: "rgb(97,218,251) solid 1px", backgroundColor: "rgb(97,218,251)"}}>
                    <button onClick={() => {
                        navigate(-1)
                    }} className='btn btn-light pb-2'>
                        <BiArrowBack/>
                    </button>
                </div>
                <div className='card-body'>
                    <div className='w-100' style={{paddingBottom: '100px', paddingTop: '50px'}}>
                        <h2 className='w-100 text-center mb-2'>Register Account</h2>
                        <form onSubmit={handleSubmit(registerUsers)}>
                            <input type='text' {...register('username')} className='form-control mb-2' name='username'
                                   placeholder="Username" minLength='6' required/>
                            <input type='email' {...register('email')} className='form-control mb-2' name='email'
                                   placeholder="Email" required/>
                            <input type='password' {...register('password')} className='form-control mb-2'
                                   name='password' placeholder="password" minLength='6' required/>
                            <button className='btn btn-primary w-100'>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
