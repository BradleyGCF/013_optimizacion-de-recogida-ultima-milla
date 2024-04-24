import { Avatar, Badge, Box, Button, CardMedia, InputAdornment, Typography, styled, Stack } from "@mui/material";
import { InputBase, IconButton } from "@mui/material";

import { io } from 'socket.io-client'

import AvatarImage from '@/assets/Img/png/avatar.png'
import LineSvg from '@/assets/Img/svg/line.svg'

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import { useBoundStore } from '@/stores/index';
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";

const socket = io(/* Direccion del back */) // 1 conectar el socket al back

const ChatSection = () => {

    const { setMessage, message, setMessages, messages } = useBoundStore(
        (state: any) => state,
        shallow
    )

    const handleSubmit = (e: any) => {
        e.preventDefault()
        // setMessages([...messages, message]) // muestro mi propio mensaje en mi cliente
        // socket.emit('nombre del evento', message) // se envia el mensaje al backend 
    }

    useEffect(() => {
        // socket.on('nombre de evento', receiveMessage) //recibimos el mensaje de otro cliente
        //}) 

        // return () => { socket.off('nombre del evento a apagar, receiveMessage) }
    }, [])

    const receiveMessage = (message: any) => {
        setMessages((state: any) => [...state, message] )
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#87FD69',
            color: '#87FD69',
            boxShadow: `0 0 0 2px #87FD69`,
            width: '15px',
            height: '15px',
            borderRadius: '100%'
        },
    }));

    const InputBaseStyled = {
        display: 'flex',
        p: '8px',
        borderRadius: '5px',
        backgroundColor: 'rgba(0, 98, 188, 0.05)',
        height: '32px',
        width: '100%',
        'input': {
            '&::placeholder': {
                color: '#00294F',
                fontFamily: 'Jost',
                fontSize: '12px',
                fontWeight: 400
            }
        }

    }


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: '32px',
                borderRadius: '10px',
                backgroundColor: '#FFF',
                boxShadow: '0px 100px 80px 0px rgba(0, 98, 188, 0.09)',
                gap: '32px'
            }}
        >

            <Box
                sx={{
                    display: 'flex',
                    gap: 1
                }}
            >
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="John Doe" src={AvatarImage} sx={{ height: '62px', width: '62px' }} />
                </StyledBadge>

                <Box>
                    <Typography
                        sx={{
                            color: '#00294F',
                            fontFamily: 'Jost',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            fontWeight: 600
                        }}
                    >
                        Driver
                    </Typography>
                    <Typography
                        sx={{
                            color: '#00294F',
                            fontFamily: 'Jost',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: 400
                        }}
                    >
                        Active
                    </Typography>
                </Box>
            </Box>

            <CardMedia
                component='img'
                src={LineSvg}
            />

            <Box
                sx={{
                    backgroundColor: 'grey'
                }}
            >
                Chat
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '15px',
                    width: '100%',
                    alignItems: 'center'
                }}
            >
                <Avatar
                    alt='John Doe'
                    src={AvatarImage}
                    sx={{
                        height: '62px',
                        width: '62px',
                        display: { 'xs': 'none', md: 'inline-block' }
                    }}
                />
                <form onSubmit={handleSubmit} style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                    <InputBase
                        sx={InputBaseStyled}
                        placeholder='Send a message...'
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <IconButton
                        type='submit'
                    >
                        <SendOutlinedIcon
                            sx={{
                                color: '#0062BC',
                                rotate: '-45deg'
                            }}
                        />
                    </IconButton>
                </form>
            </Box>

        </Box>
    )
}

export default ChatSection