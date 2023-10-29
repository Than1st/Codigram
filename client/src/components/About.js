import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {DetailsUsers} from "../actions/AuthAction";
import {AiOutlineEdit} from "react-icons/ai";
import {GetUserPosts} from "../actions/PostsActions";
import {GrArticle} from "react-icons/gr";

export const About = () => {
    const {detailsUsersResult, detailsUsersLoading, detailsUsersError} = useSelector((state) => state.AuthReducers)
    const {
        getUsersPostsResult,
        getUsersPostsLoading,
        getUsersPostsError
    } = useSelector((state) => state.PostsReducers)
    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(DetailsUsers(params.id))
        dispatch(GetUserPosts(params.id, {profile: false}))
        console.log(detailsUsersResult)
    }, []);
    return (
        <div className='container pt-5'>
            {
                detailsUsersResult ? (
                    detailsUsersResult.map((value) =>
                        <div key={value.id}>
                            {/*<div className='mb-4'>*/}
                            {/*    <h3>About Creator</h3>*/}
                            {/*</div>*/}
                            <div className='row mb-4'>
                                <div className='col-sm-3 d-flex justify-content-center'>
                                    <img className='rounded-circle object-fit-cover'
                                         style={{height: "200px", width: "200px"}}
                                         src={value.image} alt='...'/>
                                </div>
                                <div className='col-sm-9'>
                                    <h3>{value.username}</h3>
                                    <p>{value.email}</p>
                                    <p><span className='badge bg-primary'>{value.role}</span></p>
                                </div>
                            </div>
                            <h2>{value.username} Post</h2>
                            <hr/>
                        </div>
                    )
                ) : detailsUsersLoading ? (
                    <p>loading...</p>
                ) : (
                    <p>loading...</p>
                )
            }
            <div className='row me-1 ms-1'>
                {
                    getUsersPostsResult.length > 0 ? (
                        getUsersPostsResult.map((value) => {
                            return (
                                <div className='col-sm-4' style={{padding: '2px'}}>
                                    <Link to={'/posts/' + value.id}>
                                        <div className='w-100' style={{border: 'gray solid 1px', borderRadius: '4px'}}>
                                            <img
                                                src={value.image}
                                                height={400} width='100%' className='object-fit-cover'/>
                                        </div>
                                    </Link>
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
