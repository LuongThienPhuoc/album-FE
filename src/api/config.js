const URL_SYSTEM_V1 = "http://localhost:5001/api/v1"
export default {
    URL_LOGIN_USER: URL_SYSTEM_V1 + "/users/login",
    URL_SENT_TOTP: URL_SYSTEM_V1 + "/users/sendTotp",
    URL_REGISTER_USER: URL_SYSTEM_V1 + "/users/resgister",
    URL_SENT_OTP: URL_SYSTEM_V1 + "/users/send-otp",
    URL_REFRESH: URL_SYSTEM_V1 + "/users/refresh",
    URL_SEARCH_USER: URL_SYSTEM_V1 + "/users/search",

    URL_ADD_ALBUM: URL_SYSTEM_V1 + "/album/add-album",
    URL_DELETE_ALBUM: URL_SYSTEM_V1 + "/album/delete-album",
    URL_GET_IMAGES_ALBUM: URL_SYSTEM_V1 + "/album/get-images-album",
    URL_SHARE_ALBUM: URL_SYSTEM_V1 + "/album/share-album",
    URL_UNSHARE_ALBUM: URL_SYSTEM_V1 + "/album/unshare-album",
    URL_UNSHARE_ALBUM_WITH_ME: URL_SYSTEM_V1 + "/album/unshare-album-with-me",

    URL_UNSHARE_IMAGE: URL_SYSTEM_V1 + "/image/unshare-image",
    URL_UPLOAD_USER: URL_SYSTEM_V1 + "/image/upload",
    URL_GET_IMAGE: URL_SYSTEM_V1 + "/image/get-image",
    URL_SHARE_IMAGE: URL_SYSTEM_V1 + "/image/share-image",
    URL_CHECK_UPLOAD_IMAGE: URL_SYSTEM_V1 + "/image/check-upload",
    URL_DELETE_IMAGE: URL_SYSTEM_V1 + "/image/delete-image",
    URL_UNSHARE_IMAGE_WITH_ME: URL_SYSTEM_V1 + "/image/unshare-image-with-me",
}