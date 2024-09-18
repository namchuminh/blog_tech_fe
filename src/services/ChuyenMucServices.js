import axiosInstance from './index';

const ChuyenMucServices = {
    // Thêm bài viết
    add: async (data) => {
        try {
            const response = await axiosInstance.post('/categories', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Lấy danh sách bài viết
    list: async (page = 1, search = "") => {
        try {
            const response = await axiosInstance.get(`/categories/?page=${page}&search=${search}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Lấy chi tiết bài viết
    show: async (id) => {
        try {
            const response = await axiosInstance.get(`/categories/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Cập nhật bài viết
    update: async (id, data) => {
        try {
            const response = await axiosInstance.put(`/categories/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Xóa bài viết
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`/categories/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default ChuyenMucServices;
