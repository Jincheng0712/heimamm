const KEY = "heimamm_token"
 
const setToken = token => {
    return localStorage.getItem(KEY,token)
};

const getToken = () => {
    return localStorage.getItem(KEY)
};

const removeToken = () => {
    return localStorage.removeItem(KEY)
};

// 按需导出
export {
    setToken,
    getToken,
    removeToken,
}