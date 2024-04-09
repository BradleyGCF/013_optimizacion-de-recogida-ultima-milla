import { Box } from '@mui/material'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import PreferenceCard from './preference-card'
import PreferenceInputCard from './preference-input-card'
import PrincipalImage from '@/assets/Img/principal.jpg'
import PostreImage from '@/assets/Img/postre.jpg'
import EntradaImage from '@/assets/Img/entrada.jpg'
import VegetarianoImage from '@/assets/Img/vegetariano.jpg'
import GlutenImage from '@/assets/Img/gluten.jpg'
import KosherImage from '@/assets/Img/kosher.jpg'
import ItalianoImage from '@/assets/Img/italiano.jpg'
import AsiaticoImage from '@/assets/Img/asiatico.jpg'
import { useRef } from 'react'

const CustomButtonGroup = ({ next, previous }: { next: () => void; previous: () => void }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        top: '45%',
        left: { xs: '-5%', sm: '-1%', lg: '0%' },
        right: { xs: '-5%', sm: '-1%', lg: '0%' },
      }}
    >
      <KeyboardArrowLeftIcon
        sx={{
          color: '#6969',
          fontSize: { xs: 35, sm: 32, md: 30 },
        }}
        onClick={() => previous()}
        style={{ cursor: 'pointer' }}
      />
      <KeyboardArrowRightIcon
        sx={{
          color: '#6969',
          fontSize: { xs: 35, sm: 32, md: 30 },
        }}
        onClick={() => next()}
        style={{ cursor: 'pointer' }}
      />
    </Box>
  )
}

const favoriteMenuOptions = {
  question: '¿Qué tipo de menú prefieres?',
  options: [
    { option: 'Solo plato principal', image: PrincipalImage },
    { option: 'Entrada + Principal', image: EntradaImage },
    { option: 'Entrada + Principal + Postre', image: PostreImage },
  ],
}

const favoriteCuisineOptions = {
  question: '¿Qué tipo de cocina prefieres?',
  options: [
    { option: 'Italiana', image: ItalianoImage },
    { option: 'Asiática', image: AsiaticoImage },
  ],
}

const restrictionOptions = {
  question: '¿Tienes alguna restricción alimentaria?',
  options: [
    { option: 'Vegetariano', image: VegetarianoImage },
    { option: 'Sin gluten', image: GlutenImage },
    { option: 'Kosher', image: KosherImage },
  ],
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1900 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1900, min: 1400 },
    items: 1,
  },
  laptop: {
    breakpoint: { max: 1400, min: 900 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
}

export default function CarouselPreference({
  setFavoriteMenu,
  setFavoriteCuisine,
  setRestriction,
  allergy,
  setAllergy,
  favoriteMenu,
  favoriteCuisine,
  restriction,
  handleSubmit,
}: {
  setFavoriteMenu: any
  setFavoriteCuisine: any
  setRestriction: any
  allergy: string
  setAllergy: any
  favoriteMenu: string
  favoriteCuisine: string
  restriction: string
  handleSubmit: any
}) {
  const ref = useRef<null | Carousel>(null)
  return (
    <Box
      sx={{
        maxWidth: {
          xs: '290px',
          sm: '700px',
          md: '700px',
          lg: '900px',
        },
        display: 'flex',
        justifyContent: 'center',
        m: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', lg: '80%' },
        }}
      >
        <Carousel
          ref={el => {
            ref.current = el
          }}
          renderButtonGroupOutside={true}
          arrows={false}
          responsive={responsive}
          showDots={true}
          customButtonGroup={
            <CustomButtonGroup
              next={function (): void {
                throw new Error('Function not implemented.')
              }}
              previous={function (): void {
                throw new Error('Function not implemented.')
              }}
            />
          }
        >
          <PreferenceCard
            question={favoriteMenuOptions}
            setData={setFavoriteMenu}
            selectedOption={favoriteMenu}
            carouselRef={ref}
          />
          <PreferenceCard
            question={favoriteCuisineOptions}
            setData={setFavoriteCuisine}
            selectedOption={favoriteCuisine}
            carouselRef={ref}
          />
          <PreferenceCard
            question={restrictionOptions}
            setData={setRestriction}
            selectedOption={restriction}
            carouselRef={ref}
          />
          <PreferenceInputCard
            question="¿Tienes alguna alergia?"
            data={allergy}
            setData={setAllergy}
            handleSubmit={handleSubmit}
          />
        </Carousel>
      </Box>
    </Box>
  )
}
