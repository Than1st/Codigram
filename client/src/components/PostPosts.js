import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CreatePosts} from "../actions/PostsActions";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export const PostPosts = () => {
    const getDataSession = () => {
        const keyString = sessionStorage.getItem('userdata')
        return JSON.parse(keyString)
    }
    const dataUser = getDataSession() ? getDataSession() : false
    const {createPostsResult} = useSelector((state) => state.PostsReducers)
    const [data, setData] = useState({
        caption: "",
        status: "",
        userid: dataUser ? dataUser.data.id : '',
    })
    const [isPost, setIsPost] = useState(false)
    const [image, setImage] = useState("https://via.placeholder.com/100")
    const [imageSave, setImageSave] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    const addPosts = () => {
        Swal.fire({
            title: 'Apakah data sudah sesuai?',
            showCancelButton: true,
            confirmButtonText: 'Submit',
        }).then((res) => {
            const formData = new FormData()
            formData.append('image', imageSave)
            formData.append('caption', data.caption)
            formData.append('status', data.status)
            formData.append('userid', data.userid)
            if (res.isConfirmed) {
                setIsPost(true)
                dispatch(CreatePosts(formData, dataUser ? dataUser.token : ''))
            }
        })
    }
    useEffect(() => {
        if (!dataUser) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Silahkan Login untuk Post Posts!',
                showConfirmButton: true,
                confirmButtonText: 'Login',
                denyButtonText: 'Cancel',
                showDenyButton: true,
            }).then((res) => {
                if (res.dismiss || res.isDenied) {
                    navigate('/')
                } else if (res.isConfirmed) {
                    navigate('/login')
                }
            })
        }
        if (isPost) {
            let timerInterval
            Swal.fire({
                title: 'Post Posts Success',
                html: 'Auto Close',
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((res) => {
                if (res.dismiss) {
                    navigate('/')
                }
            })
        }
    }, [createPostsResult]);
    return (
        <div className='container pt-5'>
            <div className='card'>
                <div className='card-header'>
                    <h3>Post New Posts</h3>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit(addPosts)}>
                        <div className='w-100'>
                            <img src={image} style={{width: "150px", height: "150px"}} alt=''
                                 className='mb-2 object-fit-contain'/>
                        </div>
                        <input type='file' className='form-control mb-2' name='image' onChange={(e)=> {
                            setImageSave(e.target.files[0])
                            setImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "https://via.placeholder.com/100")
                        }}/>
                        <textarea name='content' onChange={(event) => setData({
                            ...data,
                            caption: event.target.value
                        })} className='form-control mb-2' placeholder='Caption' minLength='10' required></textarea>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="inlineFormCheck"
                                   onChange={(event) => setData({
                                       ...data,
                                       status: event.target.checked
                                   })}/>
                            <label className="form-check-label" htmlFor="inlineFormCheck">
                                Post Now
                            </label>
                        </div>
                        <button type='submit' className='btn btn-primary w-100'>Post Posts</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
