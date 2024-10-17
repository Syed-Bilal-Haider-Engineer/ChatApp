import { Stack, Typography } from "@mui/material";
import VerifyForm from "../../Sections/auth/VerifyForm";
export default function VerifyPage() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Please Verify OTP</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">
            Sent to email (syedbilal.haider049@gmail.com)
          </Typography>
        </Stack>
      </Stack>
      {/* Form */}
      <VerifyForm/>
    </>
  );
}
