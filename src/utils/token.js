const KEY = "heimamm_token"
 
// 保存令牌
const setToken = token => {
    return localStorage.getItem(KEY,token)
};

// 获取令牌
const getToken = () => {
    return localStorage.getItem(KEY)
};

// 移除令牌
const removeToken = () => {
    return localStorage.removeItem(KEY)
};

// 按需导出令牌操作方法
export {
    setToken,
    getToken,
    removeToken,
}