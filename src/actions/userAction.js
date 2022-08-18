import { userConstants } from "../constants/userConstant";
import { setAccessToken } from "../helper/Cookies";

export const userLogin = (data, token = null) => dispatch => {
    if (token) {
        setAccessToken(token)
    }
    dispatch({
        type: userConstants.USER_LOGIN,
        payload: {
            dataUser: data
        }
    })
}


export const updateAlbumShare = (data) => dispatch => {
    dispatch({
        type: userConstants.USER_UPDATE_ONE_ALBUM,
        payload: {
            album: data
        }
    })
}

export const updateAlbum = (data) => dispatch => {
    dispatch({
        type: userConstants.USER_UPDATE_ALBUM,
        payload: {
            albums: data
        }
    })
}

export const updateDataUser = (data) => dispatch => {
    dispatch({
        type: userConstants.USER_LOGIN,
        payload: {
            dataUser: data
        }
    })
}

export const userLogOut = () => dispatch => {
    setAccessToken("avc")
    dispatch({
        type: userConstants.USER_LOGOUT
    })
}

export const unshareAlbumWithMe = (idAlbum) => dispatch => {

    dispatch({
        type: userConstants.USER_UNSHARE_ALBUM_WITH_ME,
        payload: {
            idAlbum
        }
    })
}

export const unshareImageWithMe = (idImage) => dispatch => {
    dispatch({
        type: userConstants.USER_UNSHARE_IMAGE_WITH_ME,
        payload: {
            idImage
        }
    })
}