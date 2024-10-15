import { useEffect, useState } from 'react';
import TrangChuServices from '../../services/User/TrangChuServices'
import { Link } from 'react-router-dom';

function getShortDescription(content, length = 100) {
    // Loại bỏ các thẻ HTML
    const plainText = content.replace(/<[^>]+>/g, '');
    // Lấy một số ký tự đầu tiên làm mô tả ngắn
    return plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
}

const XuHuong = () => {
    const [articles, setArticles] = useState([])
    const [newArticles, setNewArticles] = useState([])
    const [totalPages, setTotalPages] = useState(1);
    const [lastComments, setLastComments] = useState([])
    const [mostPopular, setMostPopular] = useState([])

    const fetchArticles = async (page = 1) => {
        try {
            const response = await TrangChuServices.getTopMonth(page);
            setArticles(response.data.articles);
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

    const fetchLastComments = async () => {
        try {
            const response = await TrangChuServices.getLastComment();
            setLastComments(response.data.comments);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

    const fetchMostPopular = async () => {
        try {
            const response = await TrangChuServices.getMostPopular();
            setMostPopular(response.data.articles);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

    const fetchNewArticles = async (page = 1) => {
        try {
            const response = await TrangChuServices.getListArticles(page);
            setNewArticles(response.data.articles);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

    useEffect(() => {
        fetchArticles();
        fetchLastComments();
        fetchMostPopular();
        fetchNewArticles();
    }, []);

    const handlePageChange = (page) => {
        fetchArticles(page);
        window.scroll(0,0); 
    }

    return (
        <>
            <main className="position-relative">
                <div className="archive-header text-center mb-50">
                    <div className="container">
                        <h2>
                            <span className="text-success">Xu Hướng</span>
                        </h2>
                        <div className="breadcrumb">
                            <span className="no-arrow">Bạn đang xem:</span>
                            <Link to="/" rel="nofollow">
                                Trang Chủ
                            </Link>
                            <span />
                            Xu Hướng
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-9 order-1 order-md-2">
                            <div className="row mb-50">
                                <div className="col-lg-8 col-md-12">
                                    <div className="latest-post mb-50">
                                        <div className="loop-list-style-1">
                                            {articles.map((article, index) => (
                                                index == 0
                                                    ?
                                                    <article key={index} className="first-post p-10 background-white border-radius-10 mb-30 wow fadeIn animated">
                                                        <div className="img-hover-slide border-radius-15 mb-30 position-relative overflow-hidden">
                                                            <span className="top-right-icon bg-dark">
                                                                <i className="mdi mdi-flash-on" />
                                                            </span>
                                                            <Link to={`/bai-viet/${article.slug}`}>
                                                                <img style={{ height: '480px', width: '100%' }} src={`http://127.0.0.1:3001/${article.image_url}`} alt="post-slider" />
                                                            </Link>
                                                        </div>
                                                        <div className="pr-10 pl-10">
                                                            <h4 className="post-title mb-20">
                                                                <Link to={`/bai-viet/${article.slug}`}>
                                                                    {article.title}
                                                                </Link>
                                                            </h4>
                                                            <p className="post-exerpt font-medium text-muted mb-30">
                                                                {
                                                                    getShortDescription(article.content, 150)
                                                                }
                                                            </p>
                                                            <div className="mb-20 overflow-hidden">
                                                                <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                                    <span className="post-by">
                                                                        Đăng bởi <Link to={`/nguoi-dung/${article.username}`}>{article.fullname}</Link>
                                                                    </span>
                                                                    <span className="post-on">
                                                                        {
                                                                            new Date(article.createdAt).toLocaleDateString('vi-VN')
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="float-right">
                                                                    <Link to={`/bai-viet/${article.slug}`}>
                                                                        <span className="mr-10">
                                                                            <i className="fa-solid fa-angles-right"></i>
                                                                        </span>
                                                                        Xem Thêm
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </article>
                                                    :
                                                    <article key={index} className="p-10 background-white border-radius-10 mb-30 wow fadeIn animated">
                                                        <div className="d-md-flex d-block">
                                                            <div className="post-thumb post-thumb-big d-flex mr-15 border-radius-15 img-hover-scale">
                                                                <Link className="color-white" to={`/bai-viet/${article.slug}`}>
                                                                    <img
                                                                        className="border-radius-15"
                                                                        src={`http://127.0.0.1:3001/${article.image_url}`}
                                                                        alt=""
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="post-content media-body">
                                                                <div className="entry-meta mb-15 mt-10">
                                                                    <Link className="entry-meta meta-2" to="#">
                                                                        <span className="post-in text-danger font-x-small">
                                                                            {
                                                                                new Date(article.createdAt).toLocaleDateString('vi-VN')
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                                <h5 className="post-title mb-15 text-limit-2-row">
                                                                    <Link to={`/bai-viet/${article.slug}`}>
                                                                        {article.title}
                                                                    </Link>
                                                                </h5>
                                                                <p className="post-exerpt font-medium text-muted mb-30 d-none d-lg-block">
                                                                    {
                                                                        getShortDescription(article.content, 150)
                                                                    }
                                                                </p>
                                                                <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                                    <span className="post-by">
                                                                        Đăng bởi <Link to={`/nguoi-dung/${article.username}`}>{article.fullname}</Link>
                                                                    </span>
                                                                    <Link to={`/bai-viet/${article.slug}`}>
                                                                        <span className="mr-10">
                                                                            <i className="fa-solid fa-angles-right"></i> Xem Thêm
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </article>
                                            ))}
                                        </div>
                                    </div>
                                    {
                                        articles.length != 0
                                            ?
                                            <div className="pagination-area mb-30">
                                                <nav aria-label="Page navigation example">
                                                    <ul className="pagination justify-content-start">
                                                        {Array.from({ length: totalPages }, (_, index) => (
                                                            <li key={index} className="page-item active">
                                                                <a className="page-link" onClick={() => handlePageChange(index + 1)}>
                                                                    {index + 1}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </nav>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                                <div className="col-lg-4 col-md-12 sidebar-right">
                                    <div className="sidebar-widget mb-50">
                                        <div className="widget-header mb-30 bg-white border-radius-10 p-15">
                                            <h5 className="widget-title mb-0">
                                                Bài Viết <span>Mới</span>
                                            </h5>
                                        </div>
                                        <div className="post-aside-style-2">
                                            <ul className="list-post">
                                                {newArticles.map((article, index) => (
                                                    <li
                                                        className="mb-30 wow fadeIn  animated"
                                                        style={{ visibility: "visible", animationName: "fadeIn" }}
                                                        key={index}
                                                    >
                                                        <div className="d-flex">
                                                            <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                                                <Link className="color-white" to={`/bai-viet/${article.slug}`}>
                                                                    <img src={`http://127.0.0.1:3001/${article.image_url}`} style={{ height: '80px', width: '80px' }} alt="" />
                                                                </Link>
                                                            </div>
                                                            <div className="post-content media-body">
                                                                <h6 className="post-title mb-10 text-limit-2-row">
                                                                    <Link to={`/bai-viet/${article.slug}`}>
                                                                        {article.title}
                                                                    </Link>
                                                                </h6>
                                                                <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                                    <span className="post-by">
                                                                        Đăng bởi <Link to={`/nguoi-dung/${article.user.username}`}>{article.user.fullname}</Link>
                                                                    </span>
                                                                    <span className="post-on">{article.views.length == 0 ? 0 : article.views[0].view_count} lượt xem</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-widget mb-50">
                                        <div className="widget-header mb-30">
                                            <h5 className="widget-title">
                                                Phổ <span>Biến</span>
                                            </h5>
                                        </div>
                                        <div className="post-aside-style-3">
                                            {mostPopular.map((article, index) => (
                                                <article key={index} className="bg-white border-radius-15 mb-30 p-10 wow fadeIn animated">
                                                    <div className="post-thumb d-flex mb-15 border-radius-15 img-hover-scale">
                                                        <Link to={`/bai-viet/${article.slug}`} style={{ width: '100%' }}>
                                                            <img style={{ height: '250px', width: '100%' }} src={`http://127.0.0.1:3001/${article.image_url}`} />
                                                        </Link>
                                                    </div>
                                                    <div className="pl-10 pr-10">
                                                        <h5 className="post-title mb-15">
                                                            <Link to={`/bai-viet/${article.slug}`}>
                                                                {article.title}
                                                            </Link>
                                                        </h5>
                                                        <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                                            <span className="post-in">
                                                                TOP {index + 1}
                                                            </span>
                                                            <span className="post-by">
                                                                Bởi <Link to={`/nguoi-dung/${article.username}`}>{article.fullname}</Link>
                                                            </span>
                                                            <span className="post-on">{article.total_views} lượt xem</span>
                                                        </div>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="sidebar-widget p-20 border-radius-15 bg-white widget-latest-comments wow fadeIn animated">
                                        <div className="widget-header mb-30">
                                            <h5 className="widget-title">
                                                Binh Luận <span>Mới</span>
                                            </h5>
                                        </div>
                                        <div className="post-block-list post-module-6">
                                            {lastComments.map((comment, index) => (
                                                <div key={index} className="last-comment mb-20 d-flex wow fadeIn animated">
                                                    <span className="item-count vertical-align">
                                                        <Link
                                                            className="red-tooltip author-avatar"
                                                            to={`/nguoi-dung/${comment.user.username}`}
                                                            data-toggle="tooltip"
                                                            data-placement="top"
                                                            title={comment.user.fullname}
                                                        >
                                                            <img
                                                                src={`http://127.0.0.1:3001/${comment.user.avatar_url}`}
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </span>
                                                    <div className="alith_post_title_small">
                                                        <p className="font-medium mb-10">
                                                            <Link to={`/bai-viet/${comment.article.slug}`}>
                                                                {comment.content}
                                                            </Link>
                                                        </p>
                                                        <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                                            <span className="post-by">
                                                                Bởi <Link to={`/nguoi-dung/${comment.user.username}`}>{comment.user.fullname}</Link>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default XuHuong;