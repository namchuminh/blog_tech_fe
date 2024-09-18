import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BaiVietRoutes from './BaiVietRoutes';
import ChuyenMucRoutes from './ChuyenMucRoutes';
import NguoiDungRoutes from './NguoiDungRoutes';
import DangNhapRoutes from './DangNhapRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="admin/bai-viet/*" element={<BaiVietRoutes />} />
      <Route path="admin/chuyen-muc/*" element={<ChuyenMucRoutes />} />
      <Route path="admin/nguoi-dung/*" element={<NguoiDungRoutes />} />
      <Route path="admin/dang-nhap/" element={<DangNhapRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
