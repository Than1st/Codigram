import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {UpdatePosts} from "../actions/PostsActions";
import Swal from "sweetalert2";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export const EditPosts = () => {
    const getDataSession = () => {
        const keyString = sessionStorage.getItem('userdata')
        return JSON.parse(keyString)
    }
    const dataUser = getDataSession() ? getDataSession() : false
    const {
        updatePostsResult,
    } = useSelector((state) => state.PostsReducers)
    const [data, setData] = useState({
        caption: "",
        image: "https://via.placeholder.com/100",
        status: "",
        UserId: dataUser ? dataUser.data.id : '',
    })
    const [isUpdate, setIsUpdate] = useState(false)
    const [imageSave, setImageSave] = useState(null)
    const [oldImage, setOldImage] = useState("https://via.placeholder.com/100")
    const dispatch = useDispatch()
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    const updatePost = () => {
        Swal.fire({
            title: 'Apakah data sudah sesuai?',
            showCancelButton: true,
            confirmButtonText: 'Submit',
        }).then((res) => {
            if (res.isConfirmed) {
                const formData = new FormData()
                formData.append('image', imageSave)
                formData.append('oldImage', oldImage)
                formData.append('caption', data.caption)
                formData.append('status', data.status)
                formData.append('userid', data.userid)
                setIsUpdate(true)
                dispatch(UpdatePosts(formData, params.id, dataUser ? dataUser.token : ''))
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
        if (isUpdate) {
            navigate(-1)
            let timerInterval
            Swal.fire({
                title: 'Edit Posts Success',
                html: 'Auto Close',
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then(r => {

            })
        }
        setData({
            caption: location.state.value.caption,
            image: location.state.value.image,
            status: location.state.value.status,
            UserId: dataUser.data.id
        })
        setOldImage(location.state.value.image)
    }, [updatePostsResult]);
    return (
        <div className='container pt-5'>
            <div className='card'>
                <div className='card-header'>
                    <h3>Edit Posts</h3>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit(updatePost)}>
                        <div className='w-100'>
                            <img src={data.image} style={{width: "150px", height: "150px"}} alt=''
                                 className='mb-2 object-fit-contain'/>
                        </div>
                        <label htmlFor='image'>Choose file to change image</label>
                        <input type='file' className='form-control mb-2' onChange={(e)=> {
                            setImageSave(e.target.files[0])
                            setData({...data, image: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "https://via.placeholder.com/100"})
                        }} id='image' minLength='10'/>
                        <label htmlFor='caption'>Caption</label>
                        <input type='text' className='form-control mb-2' onChange={(event) => setData({
                            ...data,
                            image: event.target.value
                        })} value={dataUser.data.id} id='caption' hidden minLength='10' required/>
                        <textarea name='content' onChange={(event) => setData({
                            ...data,
                            caption: event.target.value
                        })} value={data.caption} className='form-control mb-2' placeholder='Caption' minLength='10' required></textarea>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="inlineFormCheck"
                                   checked={data.status}
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
