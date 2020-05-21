// const KEY = "heimamm_token"

// // 保存令牌
// const setToken = token => {
//     localStorage.getItem(KEY, token)
// };

// // 获取令牌
// const getToken = () => {
//     return localStorage.getItem(KEY)
// };

// // 移除令牌
// const removeToken = () => {
//     localStorage.removeItem(KEY)
// };

// // 按需导出令牌操作方法
// export {
//     setToken,
//     getToken,
//     removeToken,
// }


const KEY = 'heimamm_token'

const setToken = token => {
    localStorage.setItem(KEY, token)
}

const getToken = () => {
    return localStorage.getItem(KEY)
}

const removeToken = () => {
    localStorage.removeItem(KEY)
}

// 按需导出 导出对象
export { setToken, getToken, removeToken }

