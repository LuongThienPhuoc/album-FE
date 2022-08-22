import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import "./MyAlbum.scss"
import CardImage from './components/CardImage';
import API from '../../../api/config'
import Search from './components/Search';
import { useParams } from 'react-router-dom';
import { get } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CheckToken from '../../../helper/CheckToken';
import { userLogOut } from '../../../actions/userAction';
import { useDispatch } from 'react-redux/es/exports';

export default function ViewAlbum() {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [album, setAlbum] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [page, setPage] = useState(1)
    const handleChangePage = (e, num) => {
        setPage(num)
    }

    const renderCount = () => {
        let index = album.images.length
        if (index % 8 == 0) {
            return Number(index / 8)
        } else {
            return Number(Math.floor(index / 8) + 1)
        }
    }

    const updateImage = (imageUpdate) => {
        const imgs = album.images.map(image => {
            if (image._id === imageUpdate._id) {
                return imageUpdate
            } else {
                return image
            }
        })
        setAlbum((state) => {
            return {
                ...state,
                images: imgs
            }
        })
    }

    const deleteImage = (idImage) => {
        const imgs = album.images.filter(image => image._id !== idImage)
        setAlbum((state) => {
            return {
                ...state,
                images: imgs
            }
        })
    }

    useEffect(() => {
        get(API.URL_GET_IMAGES_ALBUM + `?id=${params.id}`)
            .then(res => {
                if (res.data.status === 401) {
                    dispatch(userLogOut())
                }
                if (res.data.status === 1) {
                    CheckToken()
                    setAlbum(res.data.album)
                    setIsLoaded(true)
                }
            })
            .catch(err => {
                alert(err.message)
            })
    }, [])

    return (
        <div className='my-album'>
            <Search></Search>
            <div className='my-album-is-me'>
                <Typography sx={{ fontSize: 20, fontWeight: '600', display: 'flex', alignItems: 'center' }} variant="h3" color="text.secondary" gutterBottom>
                    <IconButton onClick={() => { navigate("/my-album") }} aria-label="delete">
                        <ArrowBackIcon />
                    </IconButton>
                    <p style={{ transform: "translateY(+1px)", marginLeft: '10px ' }}>
                        {album.name}
                    </p>
                </Typography>
            </div>
            <Grid container spacing={4}>
                {
                    isLoaded ? (
                        album.images && album.images.length !== 0 ? album.images.map((image, index) => {
                            if (index < page * 8 && index >= (page - 1) * 8) {
                                return (
                                    <CardImage updateImage={updateImage} deleteImage={deleteImage} image={image} users={album.users} key={index}></CardImage>
                                )
                            }
                        }) : (<Grid item xs={12}>
                            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Album rỗng</h2>
                        </Grid>
                        )
                    ) : (
                        <Grid item xs={12}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress style={{ height: '100px ', width: '100px ' }} color="success" />
                            </div>
                        </Grid>
                    )
                }
            </Grid>
            {
                isLoaded && album.images && album.images.length !== 0 ? (
                    <Stack justifyContent={'center'} alignItems={"center"} marginTop="40px" spacing={2}>
                        <Pagination onChange={handleChangePage} count={renderCount()} variant="outlined" size='large' color="secondary" />
                    </Stack>
                ) : ("")
            }
        </div >
    )
}
