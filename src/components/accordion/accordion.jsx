import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "10px",
  border: "none",
  boxShadow:
    " 0px 2.76726px 2.21381px 0px rgba(0, 98, 188, 0.02), 0px 6.6501px 5.32008px 0px rgba(0, 98, 188, 0.03), 0px 12.52155px 10.01724px 0px rgba(0, 98, 188, 0.04), 0px 22.33631px 17.86905px 0px rgba(0, 98, 188, 0.04), 0px 41.77761px 33.42209px 0px rgba(0, 98, 188, 0.05), 0px 100px 80px 0px rgba(0, 98, 188, 0.07)",
  "&:not(:last-child)": {
    border: "none",
  },
  "&:before": {
    display: "none",
    border: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowDropDownIcon sx={{ color: "background.paper" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  marginLeft: "50px",
  backgroundColor: "#fff",
  border: "none",
}));

export default function AccordionGlobal(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedTwo, setExpandedTwo] = React.useState(false);
  let title = props.title;
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChangeTwo = (panel) => (event, newExpanded) => {
    setExpandedTwo(newExpanded ? panel : false);
  };
  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography variant="body1" color="text.fourth">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Accordion
          expanded={expandedTwo === "panel2"}
          onChange={handleChangeTwo("panel2")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography variant="body1" color="text.fourth">
              Vehicle
            </Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
