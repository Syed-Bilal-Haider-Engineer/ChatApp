import { InputBase, styled } from "@mui/material";

 const StyledInputBased = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    paddingLeft: theme.spacing(1),
    width: '100%'
  }));

  export default StyledInputBased