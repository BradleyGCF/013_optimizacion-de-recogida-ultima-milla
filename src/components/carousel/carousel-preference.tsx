import { Box, Typography } from '@mui/material'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ButtonPrimary from "@/components/buttons/button-primary";
import React from 'react'

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

const mockData = [
  {
    id: 1,
    name: "Jane Doe",
    img: "https://s3-alpha-sig.figma.com/img/40b9/db4a/618c4501843c35654db60848e74b2804?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ncl8xAqwEKX4y0r3XBY22DjG6ndqC7gvlCiAI4fKw-QVSB3HJlq9R1wOm1sPcymGnnrY2MI~6csl6pL2Bq9OKKX28VVwcIhEIb3ecA~9uybYMItdWTieDxPtSiJMrF0X5ja3Se8mcghAmRsCJWSbMnnRNyUpMEW5V1SUfjANBbtkiWUZXaJ-HUb-3IBCf4PhzY8p7cHIY8gsgO9s2Qcb9lQfcKOgo9XKVI8Pqjk3gy5POnrzRf1eoq4NNV8FBYKPgvxnJjA5cQPABZyWQG~g-IbcUwkjb-qH6v2kTgk-8tpdW3nYh3pBGwGX2Y~ocrwbPCQZvFwiD4IQsu35fAtnrQ__"
  },
  {
    id: 2,
    name: "Jhon Doe",
    img: "https://s3-alpha-sig.figma.com/img/9805/c7e8/1751ff055a9a786c361ea66699865a07?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HMCvdeIStxmG0M9s~SZPNM2lG4OEF8VTzerY4WX6Q88YQk3-XNgZr~tpLm7lGep441CAH1AaR~98gboZek50Zm0cS2HuuJi8tBfb-B4bKaPL67T6muUvKs7n4qIknqlI7rsY0WtsulzmCSqA-8We5~3~5jlhVjJdg-bnC81PYYv98qooOuJAfglEifW7zstyxjqx-pvipWH6toOTQll3eMTPKYsTzNq~o3LdXNPbjHasvigkc2w8oW2MxVz4kgoxvMNE3tJtkY3RF0lE-pWDaU7zu9eT0baMbCtsG~j-RehrMgv4ZJh1f9cYKnc6v-FhpUbQlnmPn0vAMqE0JJD2LA__"
  },
  {
    id: 3,
    name: "Jhon Doe Second",
    img: "https://s3-alpha-sig.figma.com/img/54be/a1bc/549c2db0b4d2acbe60c89c038ca4f4e7?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c68ju-JHXVTsM2BCut35ZZ~5awwGEtWmK7oMz~ljeDOi5n~W7Lq2EwN8Cf2dfF8j2UGh6cLpk1o84EVcdpHJfLBLO7yWwaFryT5sos8U6Zusrus1VoqL~i301PwihJVitHVodxHFlkHXEfKshqji4TFivhTOqUot4R0Enz7gPxthMWQanJ92muNuFH8TeuniuAIOR8Rv9ZFnp9nENs7lDrO58BpM4jmxqUivTQWwEvYUt~cBGYBAGiWpGCxk7PZ9V0ACXeBuDxPgo0yU2Bu3jUkl04bPUZCIDzUaV17qqLudAeP0J0NIWGrAH5DjEu8-m1WEHgGRnxkDxwA3b-K4Sw__"
  },
  {
    id: 4,
    name: "Jane Doe Second",
    img: "https://s3-alpha-sig.figma.com/img/40b9/db4a/618c4501843c35654db60848e74b2804?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ncl8xAqwEKX4y0r3XBY22DjG6ndqC7gvlCiAI4fKw-QVSB3HJlq9R1wOm1sPcymGnnrY2MI~6csl6pL2Bq9OKKX28VVwcIhEIb3ecA~9uybYMItdWTieDxPtSiJMrF0X5ja3Se8mcghAmRsCJWSbMnnRNyUpMEW5V1SUfjANBbtkiWUZXaJ-HUb-3IBCf4PhzY8p7cHIY8gsgO9s2Qcb9lQfcKOgo9XKVI8Pqjk3gy5POnrzRf1eoq4NNV8FBYKPgvxnJjA5cQPABZyWQG~g-IbcUwkjb-qH6v2kTgk-8tpdW3nYh3pBGwGX2Y~ocrwbPCQZvFwiD4IQsu35fAtnrQ__"
  },
  {
    id: 5,
    name: "Jhon Doe Second",
    img: "https://s3-alpha-sig.figma.com/img/9805/c7e8/1751ff055a9a786c361ea66699865a07?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HMCvdeIStxmG0M9s~SZPNM2lG4OEF8VTzerY4WX6Q88YQk3-XNgZr~tpLm7lGep441CAH1AaR~98gboZek50Zm0cS2HuuJi8tBfb-B4bKaPL67T6muUvKs7n4qIknqlI7rsY0WtsulzmCSqA-8We5~3~5jlhVjJdg-bnC81PYYv98qooOuJAfglEifW7zstyxjqx-pvipWH6toOTQll3eMTPKYsTzNq~o3LdXNPbjHasvigkc2w8oW2MxVz4kgoxvMNE3tJtkY3RF0lE-pWDaU7zu9eT0baMbCtsG~j-RehrMgv4ZJh1f9cYKnc6v-FhpUbQlnmPn0vAMqE0JJD2LA__"
  },
]

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1900 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1900, min: 1400 },
    items: 3,
  },
  laptop: {
    breakpoint: { max: 1400, min: 900 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
}

export default function CarouselPreference({ }) {

  const [driver, setDriver] = React.useState<number | null>()

  return (
    <Box
      sx={{
        maxWidth: {
          xs: '320px',
          sm: '500px',
          md: '780px',
          lg: '900px',
        },
        height: "400px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "column",
        m: 'auto',
        backgroundColor: "#fff",
        borderRadius: "10px",
        p: "auto"
      }}
    >
      <Typography
        sx={{
          "&.MuiTypography-root": {
            fontFamily: "Jost",
            fontSize: "25px",
            fontWeight: 600,
            color: "#0062BC"
          }
        }}
      >
        Who will drive today?
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', lg: '80%' },
          mb: "15px",
        }}
      >

        <Carousel
          renderButtonGroupOutside={true}
          arrows={false}
          responsive={responsive}
          showDots={true}
          itemClass="carousel-item-padding-0-px"
        >
          {mockData.map((data, index) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={data.img}
                  sx={{
                    height: "200px",
                    width: "200px",
                    my: 3,
                    mx: { lg: 2, md: 1, sm: 1 },
                    borderRadius: "10px",
                    objectFit: "cover",
                    boxShadow:"0px 4px 4px 0px rgba(127, 132, 233, 0.25)",
                    border: (driver == index ? "9px solid #0062BC" : "none"),
                    cursor: "pointer"
                  }}
                  key={index}
                  onClick={() => setDriver(index)}
                />
              </Box>
            )
          })}
        </Carousel>
      </Box>
      <ButtonPrimary
        width="300px"
        disabled={driver == null}
      >
        Select
      </ButtonPrimary>
    </Box >
  )
}
