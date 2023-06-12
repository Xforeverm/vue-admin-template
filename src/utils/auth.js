import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  // 由于打包 导致Cookies无效 获取不到token 使用localstorage
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  // 由于打包 导致Cookies无效 获取不到token 使用localstorage
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  // 由于打包 导致Cookies无效 获取不到token 使用localstorage
  return localStorage.removeItem(TokenKey)
}
