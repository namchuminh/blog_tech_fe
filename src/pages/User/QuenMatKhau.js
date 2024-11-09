import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DangNhapServices from '../../services/User/DangNhapServices';
import { useNavigate } from 'react-router-dom';

const QuenMatKhau = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    // Check for access token in localStorage
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/tai-khoan');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here (e.g., API call)
        const password_reset = await DangNhapServices.password_reset({ email });
        if(password_reset.response && password_reset.response.status == 400){
          //Hiển thị thông báo login.response.data.message
          toast.error(password_reset.response.data.message);
        }else{
          toast.success("Yêu cầu đổi mật khẩu đã được gửi tới Email của bạn!");
          navigate('/dang-nhap');
        }
    };

    return (
        <>
            <main className="position-relative">
                <div className="archive-header text-center mb-30">
                    <div className="container">
                        <h2>
                            <span className="text-dark">Quên Mật Khẩu?</span>
                        </h2>
                        <div className="breadcrumb">
                            Cấp lại mật khẩu cho tài khoản của bạn để truy cập hệ thống.
                        </div>
                    </div>
                </div>
                <div className='container-fluid pb-50'>
                    <form className="form-contact comment_form w-50 m-auto" action="#" id="commentForm" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        type="text"
                                        placeholder="Nhập email của tài khoản"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-15 w-100">
                            <button type="submit" className="button button-contactForm w-100">
                                LẤY MẬT KHẨU
                            </button>
                        </div>
                        <div className="form-group mt-25 w-100 d-flex justify-content-between">
                            <div className="text-left">
                                Đã có tài khoản? <Link to='/dang-nhap'>Đăng Nhập</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default QuenMatKhau;