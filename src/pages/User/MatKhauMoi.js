import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DangNhapServices from '../../services/User/DangNhapServices';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MatKhauMoi = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // Lấy giá trị của tham số 'token'

    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    // Check for access token in localStorage
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/tai-khoan');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password != rePassword){
            toast.error("Mật khẩu không trùng khớp!");
            return;
        }

        // Handle login logic here (e.g., API call)
        const reset_password = await DangNhapServices.reset_password({ newPassword: password, token });
        if(reset_password.response && reset_password.response.status == 400){
          //Hiển thị thông báo login.response.data.message
          toast.error(reset_password.response.data.message);
          navigate('/dang-nhap');
        }else{
          toast.success("Thay đổi mật khẩu thành công, vui lòng đăng nhập!");
          navigate('/dang-nhap');
        }
    };

    return (
        <>
            <main className="position-relative">
                <div className="archive-header text-center mb-30">
                    <div className="container">
                        <h2>
                            <span className="text-dark">Lấy Mật Khẩu</span>
                        </h2>
                        <div className="breadcrumb">
                            Thay đổi mật khẩu mới để đăng nhập
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
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Xác nhận mật khẩu"
                                        required
                                        value={rePassword}
                                        onChange={(e) => setRePassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-15 w-100">
                            <button type="submit" className="button button-contactForm w-100">
                                ĐỔI MẬT KHẨU
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

export default MatKhauMoi;