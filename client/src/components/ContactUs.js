import {BsGithub, BsInstagram} from "react-icons/bs";
import {AiOutlineLinkedin} from "react-icons/ai";
import {IoNavigate} from "react-icons/io5";

export const ContactUs = () => {
    return (
        <div className='container pt-5'>
            <div className='card w-50'>
                <div className='card-header'>
                    <h3>Contact Us</h3>
                </div>
                <div className='card-body'>
                    <a href='https://www.instagram.com/thanfpv/' target='_blank'>
                        <div className='mb-2 d-flex'>
                            <div>
                                <BsInstagram size={50}/>
                            </div>
                            <div className='d-flex ps-2 align-items-center'>
                                <h3>thanfpv</h3>
                            </div>
                            <div className='d-flex ps-2 '>
                                <IoNavigate size={25}/>
                            </div>
                        </div>
                    </a>
                    <a href='https://www.linkedin.com/in/thanfirst/' target='_blank'>
                        <div className='mb-2 d-flex'>
                            <div>
                                <AiOutlineLinkedin size={50}/>
                            </div>
                            <div className='d-flex ps-2 align-items-center'>
                                <h3>Sulthan Laksono Ramadhan</h3>
                            </div>
                            <div className='d-flex ps-2 '>
                                <IoNavigate size={25}/>
                            </div>
                        </div>
                    </a>
                    <a href='https://github.com/Than1st' target='_blank'>
                        <div className='mb-2 d-flex'>
                            <div>
                                <BsGithub size={50}/>
                            </div>
                            <div className='d-flex ps-2 align-items-center'>
                                <h3>Than1st</h3>
                            </div>
                            <div className='d-flex ps-2 '>
                                <IoNavigate size={25}/>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
