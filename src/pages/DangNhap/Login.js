import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DangNhapServices from '../../services/DangNhapServices';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // Check for access token in localStorage
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/admin/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
    const login = await DangNhapServices.login({ username, password });
    if(login.response && login.response.status == 400){
      //Hiển thị thông báo login.response.data.message
      toast.error(login.response.data.message);
    }else{
      // Lưu token và refreshToken
      toast.success(login.data.message);
      localStorage.setItem('token', login.data.token);
      localStorage.setItem('refreshToken', login.data.refreshToken);
      navigate('/admin/');
    }
    
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="/admin/login"><b>Đăng Nhập</b></a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Đăng nhập để thực hiện chức năng</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tài khoản"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mật khẩu"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-7">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <label htmlFor="remember">Nhớ mật khẩu?</label>
                  </div>
                </div>
                <div className="col-5">
                  <button type="submit" className="btn btn-primary btn-block">Đăng Nhập</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
