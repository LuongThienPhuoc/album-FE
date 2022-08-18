import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import "./CardNameAlbum.scss"
import { deleteAxios, post } from '../../../../api/axios';
import API from "../../../../api/config";
import { updateDataUser, updateAlbum } from '../../../../actions/userAction';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify"

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

export default function ModalDelete(props) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        props.setOpenModalDelete(false)
    }

    const handleDeleteAlbum = () => {
        post(API.URL_DELETE_ALBUM, {
            nameAlbum: props.album.name,
            _id: props.album._id,
            email: props.user.dataUser.email
        }).then(res => {
            if (res.data.status === 1) {
                dispatch(updateAlbum(res.data.data.albums))
                toast.success("Xóa album thành công")
            }
        }).catch(err => {
            toast.error("Xóa album thất bại")
            alert(err.message)
        })
        handleClose()
    }

    const handleDeleteImage = () => {
        deleteAxios(API.URL_DELETE_IMAGE + `?email=${props.user.dataUser.email}&idImage=${props.image._id}`).then(res => {
            if (res.data.status === 1) {
                toast.success("Xóa image thành công")
                props.deleteImage(res.data.idImage)
            }
        }).catch(err => {
            toast.error("Xóa image thất bại")
            alert(err.message)
        })
        handleClose()
    }

    const handleClickDeleteAlbum = () => {
        if (props.deleteAlbum) {
            handleDeleteAlbum()
        } else {
            handleDeleteImage()
        }
    }

    useEffect(() => {
        setOpen(props.isOpen)
    }, [props.isOpen])


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="server-modal-title" variant="h6" component="h2">
                    Bạn có chắc xóa {props.deleteAlbum ? "album" : "image"} này ?
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: "20px" }}>
                    <Button variant="contained" onClick={handleClickDeleteAlbum} color='error'>Delete</Button>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                </div>
            </Box>
        </Modal>
    )
}
