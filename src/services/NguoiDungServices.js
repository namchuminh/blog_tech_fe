import axiosInstance from './index';

const NguoiDungServices = {

    // Lấy danh sách người dùng
    list: async (page = 1, search = "") => {
        try {
            const response = await axiosInstance.get(`/users/?page=${page}&search=${search}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Lấy chi tiết người dùng
    show: async (id) => {
        try {
            const response = await axiosInstance.get(`/users/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Cấm nguời dùng
    block: async (id) => {
        try {
            const response = await axiosInstance.patch(`/users/${id}/block`);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default NguoiDungServices;
