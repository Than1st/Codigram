import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LuSearchX} from "react-icons/lu";
import {SearchPostsAction} from "../actions/PostsActions";

export const SearchPosts = () => {
    const [keyword, setKeyword] = useState('')
    const {searchPostsResult, searchPostsLoading, searchPostsError} = useSelector((state) => state.PostsReducers)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const searchHandler = (event, key) => {
        event.preventDefault()
        dispatch(SearchPostsAction({keyword: key}))
    }
    useEffect(() => {

    }, [searchPostsResult]);
    return (
        <div className='container pt-5'>
            <form>
                <input type="text" className='form-control' placeholder='Keyword'
                       onChange={(event) => searchHandler(event, event.target.value)}
                       // onChange={(event) => setKeyword(event.target.value)}
                />
            </form>
            {
                searchPostsResult.length > 0 ? (
                    searchPostsResult.map((value) => {
                        const PostsDate = new Date(value.createdAt)
                        return (
                            <div className='mt-4'>
                                <Link to={'/posts/' + value.id} style={{textDecoration: "none"}} key={value.id}>
                                    <div className="card mb-4 shadow-sm">
                                        <img
                                            src={value.image}
                                            className="card-img-top object-fit-cover" height={300} alt="..."/>
                                        <div className="card-body">
                                            <p className="card-text text-truncate">{value.caption}</p>
                                            <hr/>
                                            <div style={{fontSize: "13px"}}>
                                                <img className='rounded-circle me-2 object-fit-cover'
                                                     style={{height: "35px", width: "35px"}}
                                                     src={value.User.image}
                                                     alt=''/>
                                                <b>{value.User.username}</b> | {`${PostsDate.getDate().toString().length === 1 ? '0' + PostsDate.getDate() : PostsDate.getDate()}-${PostsDate.getMonth().toString().length === 1 ? '0' + PostsDate.getMonth() : PostsDate.getMonth()}-${PostsDate.getFullYear()}
                                            `} {`${PostsDate.getHours().toString().length === 1 ? '0' + PostsDate.getHours() : PostsDate.getHours()}:${PostsDate.getMinutes().toString().length === 1 ? '0' + PostsDate.getMinutes() : PostsDate.getMinutes()}:${PostsDate.getSeconds().toString().length === 1 ? '0' + PostsDate.getSeconds() : PostsDate.getSeconds()}`}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                ) : searchPostsLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    <div>{searchPostsError ? searchPostsError :
                        <div className='d-flex justify-content-center align-content-center py-5'>
                            <div className='border p-5'>
                                <div className='d-flex justify-content-center'>
                                    <LuSearchX size={80}/>
                                </div>
                                <div>
                                    <h3>Not Found</h3>
                                </div>
                            </div>
                        </div>}</div>
                )
            }
            <p className='text-center'>{searchPostsResult.length === 0 ? '' : "End of post"}</p>
        </div>
    )
}
