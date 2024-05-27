import { Box, Typography, Select, MenuItem, FormControl, FormHelperText } from "@mui/material";
import ButtonPrimary from "@/components/buttons/button-primary";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik'
import { createNewRouteScheme } from '@/schemas/index'
import { useContext } from "react";

import { RouteContext } from '@/context/Route/RouteContext'


export default function RegisterNewRoute() {
  const theme = useTheme();

  const { createNewRoute } = useContext(RouteContext)


  const formik = useFormik({
    initialValues: {
      startingPoint: '',
      vehicle: '',
      branches: []
    },
    validationSchema: createNewRouteScheme,
    onSubmit: async (values, { resetForm }) => {
			const response = await createNewRoute(values);
      console.log(response, 'Response desde el componente')
			resetForm();
			
		},
  })


  const StyledForm = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    mb: 3,
  }
  const StyledSelect = {
    padding: '8px 16px',
    borderRadius: '10px',
    width: '100%',
    background: '#FFF',
    boxShadow: '0px 25px 30px 0px rgba(0, 98, 188, 0.15)',
    height: '39px',
    '.MuiOutlinedInput-notchedOutline': { border: 0 },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      display: 'none',
    },

  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  function getStyles(branch, branches, theme) {
    return {
      fontWeight:
        branches.indexOf(branch) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightBold,
    };
  }

  const branchesMock = [
    'Branch 1',
    'Branch 2',
    'Branch 3',
    'Branch 4',
  ]

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="subtitle1" color="text.fourth">
        Register New Route
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "center" },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Typography>Starting point</Typography>
          <FormControl sx={StyledForm} variant='standard'>
            <Select
              value={formik.values.startingPoint}
              onChange={(event) => formik.setFieldValue('startingPoint', event.target.value)}
              onBlur={formik.handleBlur('startingPoint')}
              sx={StyledSelect}
              name='StartingPoint'
              id='StartingPoint'
              disableUnderline
              inputProps={{
                MenuProps: {
                  sx: {
                    '&& .Mui-selected': {
                      backgroundColor: 'white'
                    },
                    '&& .MuiList-root': {
                      backgroundColor: 'white'
                    }
                  }
                }
              }
              }
            >
              <MenuItem value={'Point A'}>Point A</MenuItem>
              <MenuItem value={'Point B'}>Point B</MenuItem>
              <MenuItem value={'Point C'}>Point C</MenuItem>
            </Select>
            {formik.touched.startingPoint && (
              <FormHelperText
                error
                id='starting-point-error'
                sx={{
                  textAlign: 'center',
                }}
              >
                {formik.errors.startingPoint}
              </FormHelperText>
            )}
          </FormControl>

          <Typography>Vehicle</Typography>
          <FormControl
            sx={StyledForm} variant='standard'>
            <Select
              value={formik.values.vehicle}
              onChange={(event) => formik.setFieldValue('vehicle', event.target.value)}
              onBlur={formik.handleBlur('vehicle')}
              sx={StyledSelect}
              name='Vehicle'
              id='Vehicle'
              disableUnderline
              inputProps={{
                MenuProps: {
                  sx: {
                    '&& .Mui-selected': {
                      backgroundColor: 'white'
                    },
                    '&& .MuiList-root': {
                      backgroundColor: 'white'
                    }
                  }
                }
              }
              }
            >
              <MenuItem value={'Vehicle A'}>Vehicle A</MenuItem>
              <MenuItem value={'Vehicle B'}>Vehicle B</MenuItem>
              <MenuItem value={'Vehicle C'}>Vehicle C</MenuItem>
            </Select>
            {formik.touched.vehicle && (
              <FormHelperText
                error
                id='vehicle-error'
                sx={{
                  textAlign: 'center',
                }}
              >
                {formik.errors.vehicle}
              </FormHelperText>
            )}
          </FormControl>

          <Typography>Select branches</Typography>
          <FormControl sx={StyledForm}>
            <Select
              value={formik.values.branches}
              onBlur={formik.handleBlur('branches')}
              sx={StyledSelect}
              multiple
              name='SelectBranches'
              id='SelectBranches'
              onChange={(event) => formik.setFieldValue('branches', event.target.value)}
              disableUnderline
              inputProps={{
                MenuProps: {
                  sx: {
                    '&& .Mui-selected': {
                      backgroundColor: 'white'
                    },
                    '&& .MuiList-root': {
                      backgroundColor: 'white'
                    },
                    '&.Mui-focused .MuiOutlinedInput-root': {
                      borderColor: 'red',
                    },
                  }
                }
              }
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                  },
                },
              }}
            >
              {branchesMock.map((branch) => (
                <MenuItem
                  key={branch}
                  style={getStyles(branch, formik.values.branches, theme)}
                  value={`${branch}`}
                >
                  {branch}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.branches && (
                <FormHelperText
                  error
                  id='branches-error'
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  {formik.errors.branches}
                </FormHelperText>
              )}
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ButtonPrimary
              width="80%"
              type='onSubmit'
              disabled={!formik.isValid || formik.isSubmitting}
            >
              To register
            </ButtonPrimary>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
