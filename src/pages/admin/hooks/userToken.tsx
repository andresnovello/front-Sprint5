export default function userToken(){
    return String(window.localStorage.getItem('token'))
}