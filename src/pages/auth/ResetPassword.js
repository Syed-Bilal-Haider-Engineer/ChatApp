import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import ResetPasswordForm from '../../Sections/auth/ResetPassowrdForm'

const ResetPassword = () => {
  return (
    <Stack spacing={2} sx={{ mb: 2, position: 'relative' }}>
      <Typography variant="h4" paragraph>
        Forget your password
      </Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant='body2'>
          Please enter the email that associated with your account and we will email you a link to
          reset the password.
        </Typography>
      </Stack>
      {/* Reset Password */}
      <ResetPasswordForm/>
      <Link to="/auth/login" color="inherit" component={RouterLink} variant='subtitle2' sx={{
          mt: 3,
          mx: 'auto',
          display: 'inline-flex',
          alignItems: 'center'
        }}>
          <CaretLeft size={22} mr={1}/>
          Return to login
        </Link>
    </Stack>
  )
}

export default ResetPassword
