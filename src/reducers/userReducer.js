import { userConstants } from "../constants/userConstant";

const initialState = {
    dataUser: {},
    isLogin: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.USER_UNSHARE_IMAGE_WITH_ME:
            return {
                ...state,
                dataUser: {
                    ...state.dataUser,
                    imagesShare: state.dataUser.imagesShare.filter(image => image._id !== action.payload.idImage)
                }
            }
        case userConstants.USER_UNSHARE_ALBUM_WITH_ME:
            return {
                ...state,
                dataUser: {
                    ...state.dataUser,
                    albumsShare: state.dataUser.albumsShare.filter(album => album._id !== action.payload.idAlbum)
                }
            }
        case userConstants.USER_LOGIN:
            return {
                dataUser: action.payload.dataUser,
                isLogin: true,
            }
        case userConstants.USER_LOGOUT:
            return {
                dataUser: {},
                isLogin: false,
            }
        case userConstants.USER_UPDATE_ALBUM:
            state.dataUser.albums = action.payload.albums
            return {
                ...state,
            }
        case userConstants.USER_UPDATE_ONE_ALBUM:
            const albumsUser = state.dataUser.albums
            state.dataUser.albums = albumsUser.map(album => {
                if (album._id === action.payload.album._id) {
                    return action.payload.album
                } else {
                    return album
                }
            })
            return {
                ...state
            }
        default:
            return state
    }
}

export default userReducer