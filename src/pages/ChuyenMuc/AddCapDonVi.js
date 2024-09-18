import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const AddCapDonVi = () => {
    const { id } = useParams();

    const breadcrumbs = [
        { label: 'Trang Chủ', url: '/' },
        { label: 'Nhóm Đơn Vị', url: '/NhomDonVi' },
        { label: 'Thêm Cấp Đơn Vị', url: '' },
    ];

    return (
        <div className="content-wrapper" style={{ minHeight: '1203.31px' }}>
            <ContentHeader title='Thêm Cấp Đơn Vị' breadcrumbs={breadcrumbs} />
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-default">
                        {/* /.card-header */}
                        <div className="card-body">
                            <form method="post" encType="multipart/form-data">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="nhomDonVi">Nhóm Đơn Vị</label>
                                            <input type="text" className="form-control" id="nhomDonVi" name="nhomDonVi" placeholder='Tên nhóm đơn vị' required value={id}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="tenCap">Tên Cấp</label>
                                            <input type="text" className="form-control" id="tenCap" name="tenCap" placeholder='Tên cấp đơn vị' required />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="tenCapTren">Tên Cấp Trên</label>
                                            <select className="form-control" id="tenCapTren" name="tenCapTren" required>
                                                <option>
                                                    Cấp Đơn Vị 1
                                                </option>
                                                <option>
                                                    Cấp Đơn Vị 2
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <Link className="btn btn-success mr-2" to={`/NhomDonVi/thongtin/${id}`}>Quay Lại</Link>
                                <button className="btn btn-primary">Thêm Cấp Đơn Vị</button>
                            </form>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
        </div>
    );
};

export default AddCapDonVi;
