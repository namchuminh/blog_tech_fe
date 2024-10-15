import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BaiVietServices from '../../services/User/BaiVietServices'
import TaiKhoanServices from '../../services/User/TaiKhoanServices'
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';

const decodeJWT = (token) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('JWT không hợp lệ');
    }
    
    const payload = parts[1];
    const decoded = CryptoJS.enc.Base64.parse(payload);
    return JSON.parse(decoded.toString(CryptoJS.enc.Utf8));
};

const colors = ['bg-warning', 'bg-primary', 'bg-success', 'bg-danger', 'bg-info', 'bg-dark'];
const BaiViet = () => {
    const [article, setArticle] = useState({});
    const [author, setAuthor] = useState({});
    const [view, setView] = useState(0);
    const navigate = useNavigate();
    const { slug } = useParams();
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [followerCount, setFollowerCount] = useState(0)
    const [user, setUser] = useState({})
    const [isAuthor, setIsAuthor] = useState(-1);
    const [isFollower, setIsFollower] = useState(false);
    
    const fetchArticle = async () => {
        try {
            const response = await BaiVietServices.showArticle(slug);
            setArticle(response.data.article);
            setView(response.data.view_count);
            setAuthor(response.data.article.user);
            setTags(response.data.article.tags.split(',').map(tag => tag.trim()));
            setCategories(response.data.categories);
            try {
                const responseUser = await TaiKhoanServices.userByUsername(response.data.article.user_id);
                setUser(responseUser.data.user);
                setFollowerCount(responseUser.data.followerCount);
                if(localStorage.getItem('token')){
                    fetchFollowed(responseUser.data.user.username)
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        } catch (error) {
            navigate('/404');
            console.error('Lỗi khi gọi API:', error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const decoded = decodeJWT(localStorage.getItem('token'));
            setIsAuthor(decoded.userId);
        }
        fetchArticle();
        window.scroll(0,0)
    }, []);

    const fetchFollowed = async (username) => {
        try {
            const response = await TaiKhoanServices.checkFollowed(username);
            setIsFollower(response.data.isFollowing);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

    const handelFollow = async (username) => {
        if (!localStorage.getItem('token')) {
            toast.error("Vui lòng đăng nhập để theo dõi!");
        }else{
            try {
                const response = await TaiKhoanServices.follow(username);
                setIsFollower(!isFollower)
                isFollower == true ? setFollowerCount(followerCount - 1) : setFollowerCount(followerCount + 1);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }
    }

    const handelLikeArticle = () => {
        
    }

    return (
        <>
            <main className="position-relative">
                <div className="container">
                    <div className="entry-header entry-header-3 mb-50 mt-50 text-center text-white">
                        <div
                            className="thumb-overlay img-hover-slide border-radius-5 position-relative"
                            style={{ backgroundImage: "url('/bg-articles.jpg')" }}
                        >
                            <div className="position-midded">
                                <div className="entry-meta meta-0 font-small mb-30">
                                    {
                                        categories.map((category, index) => 
                                            <Link key={index} to={`/chuyen-muc/${category.slug}`}>
                                                <span className={`post-cat ${colors[index % colors.length]} color-white`}>
                                                    {category.name}
                                                </span>
                                            </Link>
                                        )
                                    }
                                </div>
                                <h1 className="post-title mb-30 text-white">
                                    {article.title}
                                </h1>
                                <div className="entry-meta meta-1 font-x-small color-grey text-uppercase text-white">
                                    <span className="post-by text-white">
                                        Đăng bởi{" "}
                                        <Link className="text-white" to={`/nguoi-dung/${author.username}`}>
                                            {author.fullname}{" "}
                                        </Link>
                                    </span>
                                    <span className="post-on text-white">{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
                                    <span className="time-reading text-white">{view} lượt xem</span>
                                    <p className="font-x-small mt-10 text-white">
                                        <span className="hit-count">
                                            <i className="ti-comment mr-5" />
                                            82 comments
                                        </span>
                                        <span className="hit-count">
                                            <i className="ti-heart mr-5" />
                                            68 likes
                                        </span>
                                        <span className="hit-count">
                                            <i className="ti-star mr-5" />
                                            8/10
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*end entry header*/}
                    <div className="row mb-50">
                        <div className="col-lg-2 d-none d-lg-block" />
                        <div className="col-lg-8 col-md-12">
                            <div className="single-social-share single-sidebar-share mt-30">
                                <ul>
                                    <li>
                                        <a
                                            className="social-icon facebook-icon text-xs-center"
                                           
                                            to="#"
                                        >
                                            <i className="ti-facebook" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social-icon twitter-icon text-xs-center"
                                           
                                            to="#"
                                        >
                                            <i className="ti-twitter-alt" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social-icon pinterest-icon text-xs-center"
                                           
                                            to="#"
                                        >
                                            <i className="ti-pinterest" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social-icon instagram-icon text-xs-center"
                                           
                                            to="#"
                                        >
                                            <i className="ti-instagram" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social-icon linkedin-icon text-xs-center"
                                           
                                            to="#"
                                        >
                                            <i className="ti-linkedin" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social-icon email-icon text-xs-center"
                                           
                                            to="#"
                                        >
                                            <i className="ti-email" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="entry-main-content" dangerouslySetInnerHTML={{ __html: article.content }} />
                            <div className="entry-bottom mt-50 mb-30">
                                <div className="font-weight-500 entry-meta meta-1 font-x-small color-grey">
                                    <span className="update-on">
                                        <i className="ti ti-reload mr-5" />
                                        Updated 18/09/2020 10:28 EST
                                    </span>
                                    <span className="hit-count">
                                        <i className="ti-comment" />
                                        82 comments
                                    </span>
                                    <span className="hit-count">
                                        <i className="ti-heart" />
                                        68 likes
                                    </span>
                                    <span className="hit-count">
                                        <i className="ti-star" />
                                        8/10
                                    </span>
                                </div>
                                <div className="overflow-hidden mt-30">
                                    <div className="tags float-left text-muted mb-md-30">
                                        <span className="font-small mr-10">
                                            <i className="fa fa-tag mr-5" />
                                            Từ Khóa:{" "}
                                        </span>
                                        {tags.map((tag, index) => (
                                            <Link 
                                                rel="tag" 
                                                key={index} 
                                                to="#"
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="single-social-share float-right">
                                        <ul className="d-inline-block list-inline">
                                            <li className="list-inline-item">
                                                <span className="font-small text-muted">
                                                    <i className="ti-sharethis mr-5" />
                                                    Share:{" "}
                                                </span>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    className="social-icon facebook-icon text-xs-center"
                                                   
                                                    to="#"
                                                >
                                                    <i className="ti-facebook" />
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    className="social-icon twitter-icon text-xs-center"
                                                   
                                                    to="#"
                                                >
                                                    <i className="ti-twitter-alt" />
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    className="social-icon pinterest-icon text-xs-center"
                                                   
                                                    to="#"
                                                >
                                                    <i className="ti-pinterest" />
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    className="social-icon instagram-icon text-xs-center"
                                                   
                                                    to="#"
                                                >
                                                    <i className="ti-instagram" />
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    className="social-icon linkedin-icon text-xs-center"
                                                   
                                                    to="#"
                                                >
                                                    <i className="ti-linkedin" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*author box*/}
                            <div className="author-bio border-radius-10 bg-white p-30 mb-40">
                                <div className="author-image mb-30">
                                    <a href="author.html">
                                        <img
                                            src={`http://127.0.0.1:3001/${user.avatar_url}`}
                                            alt=""
                                            className="avatar"
                                        />
                                    </a>
                                </div>
                                <div className="author-info">
                                    <h3>
                                        <span className="vcard author">
                                            <span className="fn">
                                                {
                                                    article.user_id == isAuthor ?
                                                    <Link to={`/tai-khoan`} title="Posts by Robert" rel="author">
                                                        {user.fullname}
                                                    </Link>
                                                    :
                                                    <Link to={`/nguoi-dung/${user.username}`} title="Posts by Robert" rel="author">
                                                        {user.fullname}
                                                    </Link>
                                                }
                                                
                                            </span>
                                        </span>
                                    </h3>
                                    <h5 className="text-muted">
                                        <span className="mr-15">{user.username}</span>
                                        <i className="ti-star" />
                                        <i className="ti-star" />
                                        <i className="ti-star" />
                                        <i className="ti-star" />
                                        <i className="ti-star" />
                                    </h5>
                                    <div className="author-description">
                                        {user.bio}
                                    </div>
                                    {
                                        article.user_id == isAuthor ?
                                            <>
                                                <Link to={`/tai-khoan`} className="author-bio-link text-muted" style={{ textTransform: 'unset'}}>
                                                    <i className="fa-regular fa-user"></i> Trang Cá Nhân
                                                </Link>
                                                <Link to={`/chinh-sua/${article.article_id}`} className="author-bio-link text-muted" style={{ textTransform: 'unset'}}>
                                                    <i className="fa-regular fa-pen-to-square"></i> Chỉnh Sửa Bài
                                                </Link>
                                            </>
                                        :
                                        <>
                                            <Link to="#" onClick={() => handelLikeArticle} className="author-bio-link text-muted" style={{ textTransform: 'unset'}}>
                                                <i className="fa-solid fa-thumbs-up"></i> Like Bài
                                            </Link>
                                            <Link onClick={() => handelFollow(user.username)} to="#" className="author-bio-link text-muted" style={{ textTransform: 'unset'}}>
                                                {
                                                    isFollower == true ?
                                                    <>
                                                        <i className="fa-solid fa-user-plus"></i> Hủy Theo Dõi
                                                    </>
                                                    :
                                                    <>
                                                        <i className="fa-solid fa-user-plus"></i> Theo Dõi
                                                    </>
                                                }
                                                
                                            </Link>
                                            <Link to="#" className="author-bio-link text-muted" style={{ textTransform: 'unset'}}>
                                                <i className="fa-solid fa-rss"></i> {followerCount} Người Theo Dõi
                                            </Link>
                                        </>
                                            
                                    }
                                    

                                    <div className="author-social">
                                        <ul className="author-social-icons">
                                            <li className="author-social-link-facebook">
                                                <Link to="#">
                                                    <i className="ti-facebook" />
                                                </Link>
                                            </li>
                                            <li className="author-social-link-twitter">
                                                <Link to="#">
                                                    <i className="ti-twitter-alt" />
                                                </Link>
                                            </li>
                                            <li className="author-social-link-pinterest">
                                                <Link to="#">
                                                    <i className="ti-pinterest" />
                                                </Link>
                                            </li>
                                            <li className="author-social-link-instagram">
                                                <Link to="#">
                                                    <i className="ti-instagram" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*related posts*/}
                            <div className="related-posts">
                                <h3 className="mb-30">Related posts</h3>
                                <div className="row">
                                    <article className="col-lg-4">
                                        <div className="background-white border-radius-10 p-10 mb-30">
                                            <div className="post-thumb d-flex mb-15 border-radius-15 img-hover-scale">
                                                <a href="single.html">
                                                    <img
                                                        className="border-radius-15"
                                                        src="assets/imgs/news-2.jpg"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                            <div className="pl-10 pr-10">
                                                <div className="entry-meta mb-15 mt-10">
                                                    <a className="entry-meta meta-2" href="category.html">
                                                        <span className="post-in text-primary font-x-small">
                                                            Politic
                                                        </span>
                                                    </a>
                                                </div>
                                                <h5 className="post-title mb-15">
                                                    <span className="post-format-icon">
                                                        <ion-icon
                                                            name="image-outline"
                                                            role="img"
                                                            className="md hydrated"
                                                            aria-label="image outline"
                                                        />
                                                    </span>
                                                    <a href="single.html">
                                                        The litigants on the screen are not actors
                                                    </a>
                                                </h5>
                                                <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                                    <span className="post-by">
                                                        By <a href="author.html">John Nathan</a>
                                                    </span>
                                                    <span className="post-on">8m ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="col-lg-4">
                                        <div className="background-white border-radius-10 p-10 mb-30">
                                            <div className="post-thumb d-flex mb-15 border-radius-15 img-hover-scale">
                                                <a href="single.html">
                                                    <img
                                                        className="border-radius-15"
                                                        src="assets/imgs/news-5.jpg"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                            <div className="pl-10 pr-10">
                                                <div className="entry-meta mb-15 mt-10">
                                                    <a className="entry-meta meta-2" href="category.html">
                                                        <span className="post-in text-success font-x-small">
                                                            Tech
                                                        </span>
                                                    </a>
                                                </div>
                                                <h5 className="post-title mb-15">
                                                    <span className="post-format-icon">
                                                        <ion-icon
                                                            name="headset-outline"
                                                            role="img"
                                                            className="md hydrated"
                                                            aria-label="headset outline"
                                                        />
                                                    </span>
                                                    <a href="single.html">
                                                        Essential Qualities of Highly Successful Music
                                                    </a>
                                                </h5>
                                                <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                                    <span className="post-by">
                                                        By <a href="author.html">K. Steven</a>
                                                    </span>
                                                    <span className="post-on">24m ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="col-lg-4">
                                        <div className="background-white border-radius-10 p-10">
                                            <div className="post-thumb d-flex mb-15 border-radius-15 img-hover-scale">
                                                <a href="single.html">
                                                    <img
                                                        className="border-radius-15"
                                                        src="assets/imgs/news-7.jpg"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                            <div className="pl-10 pr-10">
                                                <div className="entry-meta mb-15 mt-10">
                                                    <a className="entry-meta meta-2" href="category.html">
                                                        <span className="post-in text-danger font-x-small">
                                                            Global
                                                        </span>
                                                    </a>
                                                </div>
                                                <h5 className="post-title mb-15">
                                                    <a href="single.html">
                                                        Essential Qualities of Highly Successful Music
                                                    </a>
                                                </h5>
                                                <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                                    <span className="post-by">
                                                        By <a href="author.html">K. Jonh</a>
                                                    </span>
                                                    <span className="post-on">24m ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            {/*Comments*/}
                            <div className="comments-area">
                                <h3 className="mb-30">03 Comments</h3>
                                <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex">
                                        <div className="user justify-content-between d-flex">
                                            <div className="thumb">
                                                <img src="assets/imgs/authors/author-2.png" alt="" />
                                            </div>
                                            <div className="desc">
                                                <p className="comment">
                                                    Every secret of a writer’s soul, every experience of his life,
                                                    every quality of his mind, is written large in his works.
                                                    Start writing, no matter what. The water does not flow until
                                                    the faucet is turned on.
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <h5>
                                                            <a to="#">Alice Rose</a>
                                                        </h5>
                                                        <p className="date">December 4, 2020 at 3:12 pm </p>
                                                    </div>
                                                    <div className="reply-btn">
                                                        <a to="#" className="btn-reply text-uppercase">
                                                            reply
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex">
                                        <div className="user justify-content-between d-flex">
                                            <div className="thumb">
                                                <img src="assets/imgs/authors/author-3.png" alt="" />
                                            </div>
                                            <div className="desc">
                                                <p className="comment">
                                                    You don’t start out writing good stuff. You start out writing
                                                    crap and thinking it’s good stuff, and then gradually you get
                                                    better at it. That’s why I say one of the most valuable traits
                                                    is persistence.
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <h5>
                                                            <a to="#">O.Henry</a>
                                                        </h5>
                                                        <p className="date">December 4, 2020 at 3:12 pm </p>
                                                    </div>
                                                    <div className="reply-btn">
                                                        <a to="#" className="btn-reply text-uppercase">
                                                            reply
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex">
                                        <div className="user justify-content-between d-flex">
                                            <div className="thumb">
                                                <img src="assets/imgs/authors/author-16.png" alt="" />
                                            </div>
                                            <div className="desc">
                                                <p className="comment">
                                                    So read on to find some apt quotes for all writing occasions
                                                    from considering to be a writer to experiencing a writers
                                                    block to have already created that masterpiece yet
                                                    contemplating if it’s good enough.
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <h5>
                                                            <a to="#">Lima Azumi</a>
                                                        </h5>
                                                        <p className="date">December 4, 2020 at 3:12 pm </p>
                                                    </div>
                                                    <div className="reply-btn">
                                                        <a to="#" className="btn-reply text-uppercase">
                                                            reply
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*comment form*/}
                            <div className="comment-form">
                                <h3 className="mb-30">Leave a Reply</h3>
                                <form className="form-contact comment_form" action="#" id="commentForm">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    name="name"
                                                    id="name"
                                                    type="text"
                                                    placeholder="Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    name="email"
                                                    id="email"
                                                    type="email"
                                                    placeholder="Email"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    name="website"
                                                    id="website"
                                                    type="text"
                                                    placeholder="Website"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <textarea
                                                    className="form-control w-100"
                                                    name="comment"
                                                    id="comment"
                                                    cols={30}
                                                    rows={9}
                                                    placeholder="Write Comment"
                                                    defaultValue={""}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="button button-contactForm">
                                            Post Comment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/*End row*/}

                </div>
            </main>
        </>
    )
}

export default BaiViet;