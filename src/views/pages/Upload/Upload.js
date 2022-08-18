import React, { useState, useRef, useEffect } from 'react'
import API from "../../../api/config"
import { useSelector } from 'react-redux';
import { TextField, Grid, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./Upload.scss"
import FormData from 'form-data';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { post } from "../../../api/axios"
import CircularProgress from '@mui/material/CircularProgress';
import Resizer from "react-image-file-resizer";
import { updateAlbum } from '../../../actions/userAction';
import { toast } from 'react-toastify';

export default function Upload(props) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const refBtn = useRef()
    const navigate = useNavigate()
    const [album, setAlbum] = React.useState('');
    const [nameImage, setNameImage] = React.useState('');
    const handleChange = (event) => {
        setAlbum(event.target.value);
    };

    //////////////////
    const [files, setFiles] = useState();
    const [arrFiles, setArrFiles] = useState([])
    const [previewUrl, setPreviewUrl] = useState([])
    const [statusLoad, setStatusLoad] = useState(null)

    useEffect(() => {
        const init = async (i) => {
            if (i === arrFiles.length) return
            await Resizer.imageFileResizer(
                arrFiles[i],
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    setPreviewUrl(oldState => [
                        ...oldState,
                        uri,
                    ])
                    init(i + 1)
                },
                "base64",
                200,
                200
            );
        }

        init(0)
    }, [arrFiles])

    const filePickerRef = useRef()
    const pickedHandler = (e) => {
        if ([...e.target.files].length <= 20) {
            setPreviewUrl([])
            setArrFiles([...e.target.files])
            setFiles(e.target.files)
        } else {
            toast.error("Bạn được nhập tối đa 20 file ảnh")
        }
    }

    const submitForm = async (e) => {
        e.preventDefault()
        if (!loading && !statusLoad) {
            setStatusLoad(new Array(arrFiles.length).fill(0))
            const data = new FormData()
            for (var x = 0; x < files.length; x++) {
                data.append('file', files[x])
            }
            data.append("email", user.dataUser.email)
            data.append("nameImage", nameImage)
            data.append("albumId", album)
            setSuccess(false);
            setLoading(true);
            axios({
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
                method: "POST",
                data: data,
                url: "/api/v1/image/upload", // route name
                baseURL: "http://localhost:5001", //local url
                onUploadProgress: (progress) => {
                    const { total, loaded } = progress;
                    const totalSizeInMB = total / 1000000;
                    const loadedSizeInMB = loaded / 1000000;
                    const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
                    setProgress(uploadPercentage.toFixed())
                    if (total == loaded) {
                        toast.success("Request gửi lên server thành công")
                        setSuccess(true);
                        setLoading(false);
                    }
                },
                encType: "multipart/form-data",
            }).then(res => {
                callCheckUpLoad(res.data.key)
            }).catch(err => {
                alert(err)
            })
        }
    }

    const callCheckUpLoad = (key) => {
        let timer = setInterval(async () => {
            await post(API.URL_CHECK_UPLOAD_IMAGE, { key, email: user.dataUser.email }).then(res => {
                setStatusLoad(res.data.checkUpload)
                if (res.data.checkUpload[res.data.checkUpload.length - 1] !== 0) {
                    toast.success("Upload thành công")
                    dispatch(updateAlbum(res.data.user.albums))
                    setTimeout(() => {
                        navigate("/my-album")
                    }, 2000)
                    clearInterval(timer)
                }
            })
        }, 1000)
    }

    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const handleButtonClick = () => {
        refBtn.current.click()
    };

    return (
        <div className='upload'>
            <div className='modal'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <p style={{ textAlign: 'center' }} className='title'>IMAGE UPLOAD</p>
                        <iframe name="dummyframe" id="dummyframe" style={{ display: 'none' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={submitForm} method="post" action={`${API.URL_UPLOAD_USER}`} target="dummyframe" encType="multipart/form-data">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <div onClick={() => { filePickerRef.current.click() }} className='image-review'>
                                        {previewUrl.length !== 0 && (
                                            <Grid container spacing={2}>
                                                {previewUrl.map((url, index) => (
                                                    <Grid key={index} style={{ position: "relative" }} item xs={6}>
                                                        <img src={url} style={{ height: '200px' }} alt='preview-image'>
                                                        </img>
                                                        {
                                                            statusLoad ? statusLoad[index] === 0 ? (
                                                                <div className='upload-background'>
                                                                    <CircularProgress style={{ height: '60px ', width: '60px ' }} color="success" />
                                                                </div>
                                                            ) : (
                                                                statusLoad[index] === true ? (
                                                                    <div style={{ color: 'greenyellow' }} className='upload-background'>
                                                                        <CheckBoxIcon style={{ fontSize: '40px' }}> </CheckBoxIcon>
                                                                    </div>
                                                                ) : (
                                                                    <div style={{ color: 'red' }} className='upload-background'>
                                                                        <CancelIcon style={{ fontSize: '40px' }}></CancelIcon>
                                                                    </div>
                                                                )
                                                            ) : ""
                                                        }
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        )}
                                        {previewUrl.length === 0 && <CloudUploadIcon className='icon' />}
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextField required onChange={(e) => { setNameImage(e.target.value) }} className="upload-input" name='nameImage' id="outlined-basic" label="Name Image" variant="outlined" size='small' />
                                        <FormControl className="upload-input" fullWidth>
                                            <InputLabel id="demo-simple-select-label">Album</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={album}
                                                required
                                                name='albumId'
                                                label="Album"
                                                onChange={handleChange}
                                                size='small'
                                            >
                                                {
                                                    user.dataUser.albums.length !== 0 && user.dataUser.albums.map((album, index) => (
                                                        <MenuItem key={index} value={album._id}>{album.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        <input required className="upload-input-file" multiple type="file" name="image" accept='.jpg,.png,.jpeg' onChange={pickedHandler} ref={filePickerRef} /><br /><br />
                                        <Button style={{ display: 'none' }} type="submit" ref={refBtn} variant="contained">Upload</Button>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <CircularProgress variant="determinate" value={progress} />
                                        </div>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Box sx={{ m: 1, position: 'relative' }}>
                                                <Fab
                                                    aria-label="save"
                                                    color="primary"
                                                    sx={buttonSx}
                                                    type="submit"
                                                    onClick={handleButtonClick}
                                                >
                                                    {success ? <CheckIcon /> : <SaveIcon />}
                                                </Fab>
                                                {loading && (
                                                    <CircularProgress
                                                        size={68}
                                                        sx={{
                                                            color: green[500],
                                                            position: 'absolute',
                                                            top: -6,
                                                            left: -6,
                                                            zIndex: 1,
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                            <Box sx={{ m: 1, position: 'relative' }}>
                                                <Button
                                                    variant="contained"
                                                    sx={buttonSx}
                                                    disabled={loading}
                                                    onClick={handleButtonClick}
                                                >
                                                    Upload
                                                </Button>
                                                {loading && (
                                                    <CircularProgress
                                                        size={24}
                                                        sx={{
                                                            color: green[500],
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            marginTop: '-12px',
                                                            marginLeft: '-12px',
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </Box>

                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
