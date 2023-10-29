import {Link, useNavigate} from "react-router-dom";
import {AiOutlineEdit} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {DeletePosts, GetUserPosts} from "../actions/PostsActions";
import Swal from "sweetalert2";
import {GrArticle} from "react-icons/gr";
import {UpdateUsers} from "../actions/AuthAction";

export const Profile = () => {
    const getDataSession = () => {
        const keyString = sessionStorage.getItem('userdata')
        return JSON.parse(keyString)
    }
    const data = getDataSession() ? getDataSession() : false
    const [isUpdate, setIsUpdate] = useState(false)
    const [imageSave, setImageSave] = useState(null)
    const [oldImage, setOldImage] = useState(data ? data.data.image : '')
    const [isUpdateUsers, setIsUpdateUsers] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [biodata, setBiodata] = useState({
        username: '',
        email: '',
        image: '',
    })
    const {
        getUsersPostsResult,
        updatePostsResult,
        deletePostsResult,
        getUsersPostsLoading,
        getUsersPostsError
    } = useSelector((state) => state.PostsReducers)
    const {updateUsersResult} = useSelector((state) => state.AuthReducers)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const deleteHandler = (id, event, image) => {
        Swal.fire({
            title: `Yakin Hapus Postingan ini?`,
            showCancelButton: true,
            confirmButtonText: 'Yakin',
        }).then((res) => {
            if (res.isConfirmed) {
                event.preventDefault()
                setIsDelete(true)
                dispatch(DeletePosts(id, data ? data.token : '', image))
            }
        })
    }

    const updateUsersHandler = (id, event) => {
        Swal.fire({
            title: `Apakah data sudah sesuai?`,
            showCancelButton: true,
            confirmButtonText: 'Sudah',
            icon: "question"
        }).then((res) => {
            if (res.isConfirmed) {
                const formData = new FormData()
                formData.append('image', imageSave)
                formData.append('oldImage', oldImage)
                formData.append('username', biodata.username)
                formData.append('email', biodata.email)
                setIsUpdateUsers(true)
                dispatch(UpdateUsers(formData, id, data ? data.token : ''))
                event.target.value = null
            }
        })
    }

    useEffect(() => {
        if (!data) {
            navigate('/')
        }
        dispatch(GetUserPosts(data ? data.data.id : 0, {profile: true}))
        if (isUpdateUsers) {
            let timerInterval
            Swal.fire({
                title: 'Update Users success',
                html: 'Auto Close',
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
        if (isUpdate) {
            let timerInterval
            Swal.fire({
                title: 'Update success',
                html: 'Auto Close',
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        } else if (isDelete) {
            let timerInterval
            Swal.fire({
                title: 'Delete success',
                html: 'Auto Close',
                timer: 1000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
        setBiodata({
            username: data ? data.data.username : '',
            email: data ? data.data.email : '',
            image: data ? data.data.image : ''
        })
        setImageSave(null)
    }, [updatePostsResult, deletePostsResult, updateUsersResult]);
    return (
        <div className='container pt-5'>
            <div className='row mb-4'>
                <div className='col-sm-3 d-flex justify-content-center'>
                    <img className='rounded-circle object-fit-cover' style={{height: "200px", width: "200px"}}
                         src={data ? data.data.image : "https://via.placeholder.com/100"} alt='...'/>
                </div>
                <div className='col-sm-9'>
                    <h3>{data ? data.data.username : "Name"}</h3>
                    <p>{data ? data.data.email : "Email"}</p>
                    <p><span className='badge bg-primary'>{data ? data.data.role : "Admin"}</span></p>
                    <div className='row'>
                        <div className='col-sm-2'>
                            <button className='btn btn-primary w-100' data-bs-toggle="modal" data-bs-target="#editCv">
                                <AiOutlineEdit className='me-2'/>Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editCv" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label>Username</label>
                            <input className='form-control mb-2' onChange={(event) => setBiodata({
                                ...biodata,
                                username: event.target.value
                            })} value={biodata.username} type='text'/>
                            <label>Email</label>
                            <input className='form-control mb-2' onChange={(event) => setBiodata({
                                ...biodata,
                                email: event.target.value
                            })} value={biodata.email} type='email'/>
                            <img src={biodata.image} className='mb-2' style={{width: '200px', height: "auto"}}
                                 alt='...'/><br/>
                            <label>Image</label>
                            <input type='file' className='form-control mb-2' onChange={(e)=> {
                                setImageSave(e.target.files[0])
                                setBiodata({...biodata, image: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "https://via.placeholder.com/100"})
                            }} id='image' minLength='10'/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={(e) => updateUsersHandler(data ? data.data.id : 0, e)}
                                    className="btn btn-primary" data-bs-dismiss="modal">Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <h2>My Post</h2>
            <hr/>
            <div className='row me-1 ms-1'>
                {
                    getUsersPostsResult.length > 0 ? (
                        getUsersPostsResult.map((value) => {
                            const PostsDate = new Date(value.createdAt)
                            return (
                                <div className='col-sm-4' style={{padding: '2px'}} data-bs-toggle="modal"
                                     data-bs-target={'#exampleModal' + value.id}>
                                    <div className='w-100 position-relative' style={{border: 'gray solid 1px', borderRadius: '4px'}}>
                                        <img
                                            src={value.image}
                                            height={400} width='100%' className='object-fit-cover'/>
                                        {
                                            value.status ?
                                                <span className='badge bg-success position-absolute' style={{marginLeft:'-60px', marginTop:'7px'}}>Posted</span>:
                                                <span className='badge bg-warning position-absolute' style={{marginLeft:'-60px', marginTop:'7px'}}>Draft</span>
                                        }
                                    </div>
                                    <div className="modal fade" id={'exampleModal' + value.id} tabIndex="-1"
                                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-body m-0 p-0 border rounded">
                                                    <Link to={'/posts/' + value.id}>
                                                        <button
                                                            className='btn btn-light w-100 border border-0 border-bottom'
                                                            data-bs-dismiss="modal">View
                                                            Post
                                                        </button>
                                                    </Link>
                                                    <Link to={'/edit/' + value.id} state={{value: value}}>
                                                        <button
                                                            className='btn btn-light w-100 border border-0 border-bottom'
                                                            data-bs-dismiss="modal">Edit
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={(event) => deleteHandler(value.id, event, value.image)}
                                                        data-bs-dismiss="modal"
                                                        className='btn btn-light w-100 border border-0'>Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })) : getUsersPostsLoading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <div>
                            {getUsersPostsError ?
                                getUsersPostsError :
                                <div className='d-flex justify-content-center align-content-center py-5'>
                                    <div className='border p-5'>
                                        <div className='d-flex justify-content-center'>
                                            <GrArticle size={80}/>
                                        </div>
                                        <div>
                                            <h3>Go to Posting to Post your first Posts</h3>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}
