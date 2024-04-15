import { Box, Button, TextField, Typography } from '@mui/material'

export default function PreferenceInputCard({ question, data, setData, handleSubmit }: any) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        my: { xs: '30px', md: '50px' },
        gap: '20px',
      }}
    >
      <Typography component={'h6'} sx={{ fontSize: { xs: '15px', md: '20px' }, color: '#312F25' }}>
        {question}
      </Typography>
      <TextField label="Tu respuesta" variant="outlined" value={data} onChange={e => setData(e.target.value)} />
      <Button
        type="submit"
        sx={{
          backgroundColor: 'black',
          color: 'white',
          '&:hover': {
            backgroundColor: 'black',
            cursor: 'pointer',
          },
          borderRadius: '10px',
          mt: '40px',
        }}
        onClick={handleSubmit}
      >
        Añadir
      </Button>
    </Box>
  )
}
