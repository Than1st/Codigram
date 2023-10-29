import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {GetPosts, GetDetailPosts} from "../actions/PostsActions";

export const DetailPosts = () => {
    const params = useParams()
    const {
        getDetailPostsResult,
        getDetailPostsLoading,
        getDetailPostsError
    } = useSelector((state) => state.PostsReducers)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log(getDetailPostsResult)
    useEffect(() => {
        dispatch(GetDetailPosts(params.id))
    }, []);
    return (
        <div className='container pt-5'>
            {
                getDetailPostsResult.length > 0 ? (
                    getDetailPostsResult.map((value) => {
                        const PostsDate = new Date(value.createdAt)
                        return (
                            <div className="card mb-4 shadow-sm" key={value.id}>
                                <div className='card-body'>
                                    <div style={{fontSize: "13px"}}>
                                        <img className='rounded-circle me-2 object-fit-cover' style={{height: "35px", width: "35px"}}
                                             src={value.User.image}
                                             alt=''/> <Link to={'/about/'+value.User.id} style={{textDecoration: "none", color: 'black'}}><b>{value.User.username}</b></Link> <span className='badge bg-primary'>{value.User.role}</span> | {`${PostsDate.getDate().toString().length === 1 ? '0' + PostsDate.getDate() : PostsDate.getDate()}-${PostsDate.getMonth().toString().length === 1 ? '0' + PostsDate.getMonth() : PostsDate.getMonth()}-${PostsDate.getFullYear()}
                                            `} {`${PostsDate.getHours().toString().length === 1 ? '0' + PostsDate.getHours() : PostsDate.getHours()}:${PostsDate.getMinutes().toString().length === 1 ? '0' + PostsDate.getMinutes() : PostsDate.getMinutes()}:${PostsDate.getSeconds().toString().length === 1 ? '0' + PostsDate.getSeconds() : PostsDate.getSeconds()}`}
                                        <hr/>
                                    </div>
                                </div>
                                <img
                                    src={value.image}
                                    className="px-3 object-fit-contain w-100" height='auto' alt="..."/>
                                <div className="card-body">
                                    <p className="card-text">{value.caption}</p>
                                </div>
                            </div>
                        )
                    })) : getDetailPostsLoading ? (
                    <h4>Loading...</h4>
                ) : (
                    <h3>{getDetailPostsError ? getDetailPostsError : "Error"}</h3>
                )
            }
        </div>
    )
}
