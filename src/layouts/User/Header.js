import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ChungServices from '../../services/ChungServices'; // Import service để gọi API
import { toast } from 'react-toastify';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const fetchNotifications = async () => {
        try {
            const response = await ChungServices.notification();
            if (response.status == 200) {
                setNotifications(response.data.notifications);
            } else {
                console.error("Failed to fetch statistics");
            }
        } catch (error) {
            console.error("Error fetching statistics:", error);
        }
    }

    const toggleDropdown = () => {
        if (!localStorage.getItem('token')) {
            toast.error("Vui lòng đăng nhập!");
            return;
        }

        if (!isDropdownOpen) {
            fetchNotifications(); // Gọi API khi dropdown được mở
        }
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleHiddenNoti = () => {
        if (!localStorage.getItem('token')) {
            toast.error("Vui lòng đăng nhập!");
            return;
        }
        setIsDropdownOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            navigate(`/tim-kiem?s=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <>
            <header className="main-header header-style-2 mb-40" style={{ marginLeft: 0 }}>
                <div className="header-bottom header-sticky background-white text-center">
                    <div className="scroll-progress gradient-bg-1" />
                    <div className="mobile_menu d-lg-none d-block" />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2 col-md-3">
                                <div className="header-logo d-none d-lg-block">
                                    <Link to="/">
                                        <img
                                            className="logo-img d-inline"
                                            src="/logo.svg"
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <div className="logo-tablet d-md-inline d-lg-none d-none">
                                    <Link to="/">
                                        <img
                                            className="logo-img d-inline"
                                            src="/logo.svg"
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <div className="logo-mobile d-block d-md-none">
                                    <Link to="/">
                                        <img
                                            className="logo-img d-inline"
                                            src="assets/imgs/favicon.svg"
                                            alt=""
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-10 col-md-9 main-header-navigation">
                                {/* Main-menu */}
                                <div className="main-nav text-left float-lg-left float-md-right">
                                    <ul
                                        className="mobi-menu d-none menu-3-columns"
                                        id="navigation"
                                    >
                                        <li className="cat-item cat-item-2">
                                            <a href="#">Global Economy</a>
                                        </li>
                                        <li className="cat-item cat-item-3">
                                            <a href="#">Environment</a>
                                        </li>
                                        <li className="cat-item cat-item-4">
                                            <a href="#">Religion</a>
                                        </li>
                                        <li className="cat-item cat-item-5">
                                            <a href="#">Fashion</a>
                                        </li>
                                        <li className="cat-item cat-item-6">
                                            <a href="#">Terrorism</a>
                                        </li>
                                        <li className="cat-item cat-item-7">
                                            <a href="#">Conflicts</a>
                                        </li>
                                        <li className="cat-item cat-item-2">
                                            <a href="#">Scandals</a>
                                        </li>
                                        <li className="cat-item cat-item-2">
                                            <a href="#">Executive</a>
                                        </li>
                                        <li className="cat-item cat-item-2">
                                            <a href="#">Foreign policy</a>
                                        </li>
                                        <li className="cat-item cat-item-2">
                                            <a href="#">Healthy Living</a>
                                        </li>
                                        <li className="cat-item cat-item-3">
                                            <a href="#">Medical Research</a>
                                        </li>
                                        <li className="cat-item cat-item-4">
                                            <a href="#">Children’s Health</a>
                                        </li>
                                        <li className="cat-item cat-item-5">
                                            <a href="#">Around the World</a>
                                        </li>
                                        <li className="cat-item cat-item-6">
                                            <a href="#">Ad Choices</a>
                                        </li>
                                        <li className="cat-item cat-item-7">
                                            <a href="#">Mental Health</a>
                                        </li>
                                        <li className="cat-item cat-item-2">
                                            <a href="#">Media Relations</a>
                                        </li>
                                    </ul>
                                    <nav>
                                        <ul className="main-menu d-none d-lg-inline float-right">
                                            <li>
                                                <Link to="/" onClick={handleHiddenNoti}>
                                                    <span className="mr-15">
                                                        <i className="fa-solid fa-house"></i>
                                                    </span>
                                                    TRANG CHỦ
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/xu-huong" onClick={handleHiddenNoti}>
                                                    <span className="mr-15">
                                                        <i className="fa-solid fa-arrow-trend-up"></i>
                                                    </span>
                                                    XU HƯỚNG
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={!localStorage.getItem('token') ? '/dang-nhap' : '/theo-doi'} onClick={handleHiddenNoti}>
                                                    <span className="mr-15">
                                                        <i className="fa-solid fa-fire"></i>
                                                    </span>
                                                    THEO DÕI
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="off-canvas-toggle-cover">
                                    <form
                                        action="#"
                                        method="get"
                                        className="search-form d-lg-inline float-left position-relative d-none mr-20"
                                        onSubmit={handleSearch}
                                        onClick={handleHiddenNoti}
                                    >
                                        <input
                                            type="text"
                                            className="search_field"
                                            placeholder="Nhập tên bài viết"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            name="s"
                                        />
                                        <span className="search-icon">
                                            <i className="ti-search mr-5" />
                                        </span>
                                    </form>
                                    <div className="d-inline tools-icon">
                                        <Link
                                            className="red-tooltip text-danger"
                                            to="/viet-bai"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title=""
                                            data-original-title="Viết bài mới"
                                            onClick={handleHiddenNoti}
                                        >
                                            <i className="fa-regular fa-pen-to-square ml-15" style={{ fontSize: 20 }}></i>
                                        </Link>
                                        <Link
                                            className="red-tooltip text-success"
                                            to="#"
                                            onClick={toggleDropdown}
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Thông báo"
                                        >
                                            <i className="fa-regular fa-bell ml-15" style={{ fontSize: 20 }}></i>
                                            {/* <span className="notification bg-success">{notifications.length}</span> */}
                                        </Link>

                                        {/* Dropdown thông báo */}
                                        {isDropdownOpen && (
                                            <div
                                                className="notification-dropdown"
                                                style={{
                                                    position: "absolute",
                                                    top: "100%",
                                                    right: 0,
                                                    background: "white",
                                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                                    borderRadius: 4,
                                                    width: 300,
                                                    zIndex: 1000,
                                                    padding: 10,
                                                }}
                                            >
                                                {notifications.length > 0 ? (
                                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                                        {notifications.map((notification) => (
                                                            <li
                                                                key={notification.notification_id}
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    padding: "8px 0",
                                                                    borderBottom: "1px solid #f0f0f0",
                                                                }}
                                                            >
                                                                <img
                                                                    src={(notification.type == "comment") || (notification.type == "like") ? `http://127.0.0.1:3001/${notification.article.image_url}` : `http://127.0.0.1:3001/${notification.user.avatar_url}`}
                                                                    alt={notification.user.fullname}
                                                                    style={{
                                                                        width: 50,
                                                                        height: 50,
                                                                        borderRadius: "100%",
                                                                        marginRight: 10,
                                                                    }}
                                                                />
                                                                <Link 
                                                                    style={{padding: 0, lineHeight: "30px"}}
                                                                    to={(notification.type == "comment") || (notification.type == "like") ? `/bai-viet/${notification.article.slug}` : `/tai-khoan`} 
                                                                    onClick={handleHiddenNoti}>
                                                                    <p style={{ margin: 0, fontSize: 14, textAlign: 'left' }}>
                                                                        <strong>
                                                                            <Link style={{padding: 0}} to={`/nguoi-dung/${notification.user.username}`} onClick={handleHiddenNoti}>
                                                                                {notification.user.fullname}
                                                                            </Link>
                                                                        </strong> 
                                                                        {
                                                                            notification.type == "comment" ? " đã bình luận!" : null
                                                                        }
                                                                        {
                                                                            notification.type == "like" ? " đã thích bài viết!" : null
                                                                        }
                                                                        {
                                                                            notification.type == "follow" ? " đã theo dõi bạn!" : null
                                                                        }
                                                                    </p>
                                                                    <p
                                                                        style={{
                                                                            margin: 0,
                                                                            fontSize: 12,
                                                                            color: "#888",
                                                                            textAlign: 'left'
                                                                        }}
                                                                    >
                                                                        {new Date(notification.createdAt).toLocaleString()}
                                                                    </p>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p style={{ textAlign: "center", margin: 0 }}>Không có thông báo nào.</p>
                                                )}
                                            </div>
                                        )}
                                        <Link
                                            className="red-tooltip text-primary"
                                            to={!localStorage.getItem('token') ? '/dang-nhap' : '/tai-khoan'}
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title=""
                                            data-original-title="Tài khoản"
                                            onClick={handleHiddenNoti}
                                        >
                                            <i className="fa-regular fa-user ml-15" style={{ fontSize: 20 }}></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
