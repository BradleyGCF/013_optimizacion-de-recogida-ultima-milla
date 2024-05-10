import { Avatar, Badge, Box, Button, CardMedia, InputAdornment, Typography, styled, Stack } from "@mui/material";
import { InputBase, IconButton } from "@mui/material";
import Parse from "parse";

import AvatarImage from '@/assets/Img/png/avatar.png'
import LineSvg from '@/assets/Img/svg/line.svg'

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import { useBoundStore } from '@/stores/index';
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";


const ChatSection = () => {

    interface MessageType {
        content: string;
        clientId: string;
    }

    const [messages, setMessages] = useState<MessageType[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [clientId, setClientId] = useState('ddadwdwecwe');

    Parse.initialize("013");
    Parse.serverURL = "http://localhost:2337/server";
    let LiveQueryClient = Parse.LiveQueryClient;
    let client = new LiveQueryClient({
        applicationId: "013",
        serverURL: "ws://localhost:2337",
        masterKey: "Yzhl06W5O7Vhf8iwlYBQCxs6hY8Fs2PQewNGjsl0",
    });

    client.open("open", () => {
        console.log("connect");
    });

    client.on("error", (error: any) => {
        console.log(error);
    });

    const Chatroom = Parse.Object.extend("chatroom");

    console.log('por entrar al useeffect')

    useEffect(() => {

        console.log('entrada al useffect')
        console.log('numero de sms en el state:', messages)
        console.log('por subscribirse')

        
        const query = new Parse.Query(Chatroom);
        const subscription = client.subscribe(query);

        subscription.on("create", (message: any) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { content: message.get("content"), clientId: message.get("clientId") },
            ]);
        });
        console.log('subscrito!')

        //Notificacion 
        // subscription.on("update", () => {  
        //   Notification.requestPermission().then(perm => { 
        //     if (perm === "granted") { 
        //       new Notification("Notificacion update 11111") 
        //     } 
        //   })  
        // }); 

        return () => {
            subscription.unsubscribe();
        };
    }, []);



    const sendMessage = (content: any) => {
        const message = new Chatroom();
        message.set("content", content);
        message.set("clientId", clientId);
        message.save().catch((error: any) => {
            console.log("Error al enviar mensaje: ", error);
        });
    };

    const handleInputChange = (event: any) => {
        setNewMessage(event.target.value);
    };

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        sendMessage(newMessage);
        setNewMessage("");
    };


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
                    m: 3
                }}
            >
                {messages.map((message, index) => (
                    <Box key={index} sx={{ display: 'flex', m: 1, p: 2, backgroundColor: 'grey' }}>
                        <Typography>{message.clientId}</Typography>: <Typography>{message.content}</Typography>
                    </Box>
                ))}
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
                <form onSubmit={handleFormSubmit} style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <InputBase
                        sx={InputBaseStyled}
                        placeholder='Send a message...'
                        onChange={(e) => handleInputChange(e)}
                        value={newMessage}
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