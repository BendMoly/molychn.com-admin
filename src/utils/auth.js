import Cookies from 'js-cookie'

export function getCookie (target) {
  return Cookies.get(target)
}

export function setCookie (target, token) {
  return Cookies.set(target, token)
}

export function removeCookie (target) {
  return Cookies.remove(target)
}
