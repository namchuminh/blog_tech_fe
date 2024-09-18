import React, { useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import { Link, useNavigate } from 'react-router-dom';
import ChuyenMucServices from '../../services/ChuyenMucServices'; // Import service để gọi API
import { toast } from 'react-toastify';

const Add = () => {
  const [name, setName] = useState(''); // State cho tên chuyên mục
  const [slug, setSlug] = useState(''); // State cho slug/đường dẫn
  const [image, setImage] = useState(null); // State cho file hình ảnh
  const navigate = useNavigate(); // Điều hướng sau khi thêm thành công

  const breadcrumbs = [
    { label: 'Trang Chủ', url: '/' },
    { label: 'Chuyên Mục', url: '/admin/chuyen-muc' },
    { label: 'Thêm Chuyên Mục', url: '' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('image_url', image);
    
    const addCategory = await ChuyenMucServices.add(formData);

    if(addCategory.status == 201){
      toast.success(addCategory.data.message);
      navigate('/admin/chuyen-muc'); 
    }else{
      toast.success(addCategory.response.data.message);
    }
  };

  return (
    <div className="content-wrapper" style={{ minHeight: '1203.31px' }}>
      <ContentHeader title='Thêm Chuyên Mục' breadcrumbs={breadcrumbs} />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="name">Tên Chuyên Mục</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Tên chuyên mục"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Cập nhật state name
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="slug">Đường Dẫn</label>
                      <input
                        type="text"
                        className="form-control"
                        id="slug"
                        name="slug"
                        placeholder="Đường dẫn"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)} // Cập nhật state slug
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="image">Hình Ảnh</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])} // Cập nhật file ảnh
                        required
                      />
                    </div>
                  </div>
                </div>
                <Link className="btn btn-success mr-2" to="/admin/chuyen-muc">Quay Lại</Link>
                <button className="btn btn-primary" type="submit">Thêm Chuyên Mục</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Add;
