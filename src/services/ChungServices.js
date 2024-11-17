import axiosInstance from './index';

const ChungServices = {

    // Lấy danh sách chuyên mục
    list_categories: async () => {
        try {
            const response = await axiosInstance.get(`/others/list_categories`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Lấy thông báo user
    notification: async () => {
        try {
            const response = await axiosInstance.get(`/notifications`);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default ChungServices;
