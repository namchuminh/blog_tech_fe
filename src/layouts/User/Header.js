import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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
                                                <Link to="/">
                                                    <span className="mr-15">
                                                        <i className="fa-solid fa-house"></i>
                                                    </span>
                                                    TRANG CHỦ
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/xu-huong">
                                                    <span className="mr-15">
                                                        <i className="fa-solid fa-arrow-trend-up"></i>
                                                    </span>
                                                    XU HƯỚNG
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={ !localStorage.getItem('token') ? '/dang-nhap' : '/theo-doi' }>
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
                                        >
                                            <i className="fa-regular fa-pen-to-square ml-15" style={{ fontSize: 20}}></i>
                                        </Link>
                                        <Link
                                            className="red-tooltip text-success"
                                            to="/thong-bao"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title=""
                                            data-original-title="Thông báo"
                                        >
                                            <i className="fa-regular fa-bell ml-15" style={{ fontSize: 20}}></i>
                                            <span className="notification bg-success">5</span>
                                        </Link>
                                        <Link
                                            className="red-tooltip text-primary"
                                            to={ !localStorage.getItem('token') ? '/dang-nhap' : '/tai-khoan' }
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title=""
                                            data-original-title="Tài khoản"
                                        >
                                            <i className="fa-regular fa-user ml-15" style={{ fontSize: 20}}></i>
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
