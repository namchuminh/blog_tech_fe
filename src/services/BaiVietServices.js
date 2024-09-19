import axiosInstance from './index';

const ChuyenMucServices = {
    // Thêm bài viết
    add: async (data) => {
        try {
            const response = await axiosInstance.post('/articles', data, {
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
            const response = await axiosInstance.get(`/articles/?page=${page}&search=${search}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Lấy chi tiết bài viết
    show: async (id) => {
        try {
            const response = await axiosInstance.get(`/articles/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Cập nhật bài viết
    update: async (id, data) => {
        try {
            const response = await axiosInstance.put(`/articles/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Duyệt bài viết
    public: async (id) => {
        try {
            const response = await axiosInstance.patch(`/articles/${id}/public`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Xóa bài viết
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`/articles/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default ChuyenMucServices;
