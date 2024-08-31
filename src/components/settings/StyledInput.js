import { styled, TextField } from "@mui/material";

export const StyledInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
      paddingTop: '12px!important',
      paddingBottom: '12px!important',
    },
  }));
  