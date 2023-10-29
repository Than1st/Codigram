import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetPosts} from "../actions/PostsActions";
import {GrArticle} from "react-icons/gr";

export const Posts = () => {
    const {getPostsResult, getPostsLoading, getPostsError} = useSelector((state) => state.PostsReducers)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetPosts())
    }, []);
    return (
        <div className='container pt-5'>
            {
                getPostsResult.length > 0 ? (
                    getPostsResult.map((value) => {
                        const PostsDate = new Date(value.createdAt)
                        return (
                            <div className='container-fluid w-50'>
                                <div className='mb-2'>
                                    <div className='row mb-2'>
                                        <div className='col-sm-1 d-flex align-items-center'>
                                            <Link to={'/about/' + value.User.id}>
                                                <img className='rounded-circle me-2 object-fit-cover'
                                                     style={{height: "35px", width: "35px"}}
                                                     src={value.User.image}
                                                     alt=''/>
                                            </Link>
                                        </div>
                                        <div className='col-sm-7 d-flex align-items-center p-0 ps-2'>
                                            <Link to={'/about/' + value.User.id} style={{textDecoration: "none", color: 'black'}}>
                                                <b>{value.User.username}</b>
                                            </Link>
                                        </div>
                                        <div
                                            className='col-sm-4 d-flex align-items-center justify-content-end p-0 pe-2 ps-2'>
                                            <Link to={'/posts/' + value.id} style={{textDecoration: "none"}}
                                                  key={value.id}>Go to detail post</Link>
                                        </div>
                                    </div>
                                    <img
                                        src={value.image}
                                        className="card-img-top object-fit-contain mb-2 border rounded border-2"
                                        height={400} alt="..."/>
                                    <div className='mb-2' style={{fontSize: "13px"}}>
                                    </div>
                                    <div className='mb-2'>
                                        <Link to={'/about/' + value.User.id} style={{textDecoration: "none", color: 'black'}}>
                                            <b>{value.User.username}</b>
                                        </Link> {value.caption}
                                    </div>
                                    <div style={{fontSize: '12px'}}>
                                        {`${PostsDate.getDate().toString().length === 1 ? '0' + PostsDate.getDate() : PostsDate.getDate()}-${PostsDate.getMonth().toString().length === 1 ? '0' + PostsDate.getMonth() : PostsDate.getMonth()}-${PostsDate.getFullYear()}`} | {`${PostsDate.getHours().toString().length === 1 ? '0' + PostsDate.getHours() : PostsDate.getHours()}:${PostsDate.getMinutes().toString().length === 1 ? '0' + PostsDate.getMinutes() : PostsDate.getMinutes()}:${PostsDate.getSeconds().toString().length === 1 ? '0' + PostsDate.getSeconds() : PostsDate.getSeconds()}`}
                                    </div>
                                    <hr/>
                                </div>
                            </div>
                            // <Link to={'/posts/' + value.id} style={{textDecoration: "none"}} key={value.id}>
                            //     <div className="card mb-4 shadow-sm">
                            //         <img
                            //             src={value.image}
                            //             className="card-img-top object-fit-cover" height={300} alt="..."/>
                            //         <div className="card-body">
                            //             <p className="card-text text-truncate">{value.caption}</p>
                            //             <hr/>
                            //             <div style={{fontSize: "13px"}}>
                            //                 <img className='rounded-circle me-2 object-fit-cover'
                            //                      style={{height: "35px", width: "35px"}}
                            //                      src={value.User.image}
                            //                      alt=''/>
                            //                 <b>{value.User.username}</b> | {`${PostsDate.getDate().toString().length === 1 ? '0' + PostsDate.getDate() : PostsDate.getDate()}-${PostsDate.getMonth().toString().length === 1 ? '0' + PostsDate.getMonth() : PostsDate.getMonth()}-${PostsDate.getFullYear()}
                            //                 `} {`${PostsDate.getHours().toString().length === 1 ? '0' + PostsDate.getHours() : PostsDate.getHours()}:${PostsDate.getMinutes().toString().length === 1 ? '0' + PostsDate.getMinutes() : PostsDate.getMinutes()}:${PostsDate.getSeconds().toString().length === 1 ? '0' + PostsDate.getSeconds() : PostsDate.getSeconds()}`}
                            //             </div>
                            //         </div>
                            //     </div>
                            // </Link>
                        )
                    })
                ) : getPostsLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    <div>{getPostsError ? getPostsResult :
                        <div className='d-flex justify-content-center align-content-center py-5'>
                            <div className='border p-5'>
                                <div className='d-flex justify-content-center'>
                                    <GrArticle size={80}/>
                                </div>
                                <div>
                                    <h3>Go to Posting to Post your first Posts in this website</h3>
                                </div>
                            </div>
                        </div>}</div>
                )
            }
            <p className='text-center'>{getPostsResult.length === 0 ? '' : "End of post"}</p>
        </div>
    )
}
