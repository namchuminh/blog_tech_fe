import { useEffect, useState, useRef } from 'react';
import DangKyServices from '../../services/User/DangKyServices';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DangKy = () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [captchaText, setCaptchaText] = useState('');
    const canvasRef = useRef(null);

    // Function to generate random CAPTCHA (alphanumeric string with random length)
    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const captchaLength = Math.floor(Math.random() * 3) + 4; // Random length between 4 and 6
        let captcha = '';
        for (let i = 0; i < captchaLength; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptchaText(captcha); // Store captcha text for validation
        return captcha;
    };

    const drawCaptcha = () => {
        const captchaText = generateCaptcha();
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear the canvas

        // Set styles for CAPTCHA text
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate the spacing dynamically to avoid characters being cut off
        const padding = 10; // Padding between characters
        const totalWidth = captchaText.length * 30 + padding * (captchaText.length - 1); // Adjust for padding
        const startX = (canvasRef.current.width - totalWidth) / 2; // Center the text on the canvas

        // Draw each character with some randomness
        for (let i = 0; i < captchaText.length; i++) {
            const x = startX + i * (30 + padding); // Adjust x position based on character width and padding
            const y = canvasRef.current.height / 2;

            // Random rotation for added difficulty
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.random() * 0.5 - 0.25); // Random rotation
            ctx.fillText(captchaText.charAt(i), 0, 0);
            ctx.restore();
        }
    };

    useEffect(() => {
        // Draw CAPTCHA when component is mounted
        drawCaptcha();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if CAPTCHA is correct
        if (captchaAnswer !== captchaText) {
            toast.error("Câu trả lời CAPTCHA không chính xác!");
            drawCaptcha();  // Redraw CAPTCHA
            return;
        }

        const register = await DangKyServices.register({ fullname, username, email, password });

        if(register.response && register.response.status === 400){
          toast.error(register.response.data.message);
        }else{
          toast.success(register.data.message);
          navigate('/dang-nhap');
        }
    };

    return (
        <>
            <main className="position-relative">
                <div className="archive-header text-center mb-30">
                    <div className="container">
                        <h2>
                            <span className="text-dark">Đăng Ký</span>
                        </h2>
                        <div className="breadcrumb">
                            Tạo tài khoản để truy cập hệ thống
                        </div>
                    </div>
                </div>
                <div className='container-fluid pb-50'>
                    <form 
                        className="form-contact comment_form w-50 m-auto" 
                        action="#" 
                        id="commentForm"
                        onSubmit={handleSubmit}
                    >
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="fullname"
                                        id="fullname"
                                        type="text"
                                        placeholder="Họ tên"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        type="email"
                                        placeholder="Nhập email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="username"
                                        id="username"
                                        type="text"
                                        placeholder="Nhập tài khoản"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12 mt-15">
                                <div className="form-group d-flex align-items-center">
                                    <canvas
                                        ref={canvasRef}
                                        width="200"
                                        height="50"
                                        style={{ border: '1px solid #ccc', background: 'white', borderRadius: 15 }}
                                    />
                                    <input
                                        className="form-control ml-3"
                                        type="text"
                                        placeholder="Nhập câu trả lời CAPTCHA"
                                        value={captchaAnswer}
                                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                                        style={{ maxWidth: '200px' }} // Set maximum width for input field
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-15 w-100">
                            <button type="submit" className="button button-contactForm w-100">
                                ĐĂNG KÝ
                            </button>
                        </div>
                        <div className="form-group mt-25 w-100">
                            <div className="text-center">
                                Đã có tài khoản? <Link to='/dang-nhap'>Đăng Nhập</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default DangKy;
