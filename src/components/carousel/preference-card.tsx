import { Box, Typography } from '@mui/material'
//import CardCarouselPreference from '../cards/card-carousel-preference'
import { RefObject } from 'react'

export default function PreferenceCard({
  question,
  setData,
  selectedOption,
  carouselRef,
}: {
  question: {
    question: string
    options: { option: string; image: string }[]
  }
  setData: any
  selectedOption: string
  carouselRef: RefObject<any>
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        my: { xs: '30px', md: '50px' },
      }}
    >
      <Typography component={'h6'} sx={{ fontSize: { xs: '15px', md: '20px' }, color: '#312F25' }}>
        {question.question}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          my: '10px',
        }}
      >
        {question.options.map((option, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mx: '10px',
            }}
          >
            <Box>{i}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
