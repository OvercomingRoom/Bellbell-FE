import axios from "axios";
import router from "@/router/index.js";

export default {
  async fetchUserInfo() {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 이동
      await router.push('/login');
    }

    try {
      const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_API_URI}/member`,
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "Authorization": "Bearer " + `${token}`
            }
          });
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      await router.push('/login');
    }
  },

  async checkTalkMessage() {
    const token = sessionStorage.getItem('accessToken');
    try {
      const response = await axios.get(
          `${import.meta.env.VITE_APP_KAKAO_USER_SCOPES_URI}?scopes=["talk_message"]`,
          {
            headers: {
              "Authorization": "Bearer " + `${token}`
            }
          });
      const data = response.data;
      return data.scopes[0].agreed;
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

}