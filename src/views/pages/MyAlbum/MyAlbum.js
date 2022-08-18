import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import "./MyAlbum.scss"
import CardNameAlbum from './components/CardNameAlbum';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux"
import API from '../../../api/config'
import { updateAlbum } from '../../../actions/userAction';
import { toast } from "react-toastify"
import Search from './components/Search';
import { post } from '../../../api/axios';
import CardNameAlbumShare from "./components/CardNameAlbumShare"
import CardImageShare from './components/CardImageShare';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #fff',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
};
export default function MyAlbum() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [nameAlbum, setNameAlbum] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleBlurNameAlbum = (e) => {
        setNameAlbum(e.target.value)
    }
    const handleClickAddAlbum = () => {
        if (nameAlbum !== "") {
            post(API.URL_ADD_ALBUM, { nameAlbum, email: user.dataUser.email })
                .then(res => {
                    dispatch(updateAlbum(res.data.dataUser.albums))
                    toast.success("Tạo album thành công!")
                    handleClose()
                })
                .catch(err => {
                    toast.error("Tên album tồn tại!")
                    alert(err)
                })
        } else {
            toast.warning("Nhập đầy đủ các trường!")
        }
    }

    return (
        <div className='my-album'>
            <Search></Search>
            <div className='my-album-is-me'>
                <Typography sx={{ fontSize: 20, fontWeight: '600' }} variant="h3" color="text.secondary" gutterBottom>
                    Album của bạn
                </Typography>
                <Fab onClick={handleOpen} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="server-modal-title" variant="h6" component="h2">
                            Thêm album
                        </Typography>
                        <TextField fullWidth onBlur={handleBlurNameAlbum} id="outlined-basic" label="Tên album" variant="outlined" />
                        <Button onClick={handleClickAddAlbum} variant="contained" sx={{ width: '100%', marginTop: '10px' }}>Thêm</Button>
                    </Box>
                </Modal>

            </div>
            <Grid container spacing={5}>
                {
                    user.dataUser.albums && user.dataUser.albums.length !== 0 ? user.dataUser.albums.map((infoAlbum, index) => (
                        <CardNameAlbum album={infoAlbum} key={index}></CardNameAlbum>
                    )) : (<Grid item xs={12}>
                        <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Bạn chưa có album nào</h2>
                    </Grid>
                    )
                }
            </Grid>
            <Typography sx={{ fontSize: 20, fontWeight: '600', margin: '40px 0' }} variant="h3" color="text.secondary" gutterBottom>
                Album bạn được chia sẻ
            </Typography>
            <Grid container spacing={2}>
                {
                    user.dataUser.albumsShare && user.dataUser.albumsShare.length !== 0 ? user.dataUser.albumsShare.map((infoAlbum, index) => (
                        <CardNameAlbumShare album={infoAlbum} key={index}></CardNameAlbumShare>
                    )) : (<Grid item xs={12}>
                        <h2 style={{ textAlign: 'center', margin: '40px 0' }}>Bạn chưa có album chia sẻ nào</h2>
                    </Grid>
                    )
                }
            </Grid>
            <Typography sx={{ fontSize: 20, fontWeight: '600', marginTop: '50px' }} variant="h3" color="text.secondary" gutterBottom>
                Ảnh bạn được chia sẻ
            </Typography>
            <Grid container spacing={2}>
                {
                    user.dataUser.imagesShare && user.dataUser.imagesShare.length !== 0 ? user.dataUser.imagesShare.map((infoImage, index) => (
                        <CardImageShare image={infoImage} key={index}></CardImageShare>
                    )) : (<Grid item xs={12}>
                        <h2 style={{ textAlign: 'center', margin: '40px 0' }}>Bạn chưa có ảnh chia sẻ nào</h2>
                    </Grid>
                    )
                }
            </Grid>
        </div >
    )
}
