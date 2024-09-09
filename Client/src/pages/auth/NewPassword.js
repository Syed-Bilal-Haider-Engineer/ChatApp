import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import NewPasswordForm from '../../Sections/auth/NewPasswordForm'

const NewPassword = () => {
  return (
    <Stack spacing={2} sx={{ mb: 2, position: 'relative' }}>
      <Typography variant="h4" paragraph>
       Reset password
      </Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant='body2'>
          Please enter your new password
        </Typography>
      </Stack>
      {/* Reset Password */}
      <NewPasswordForm/>
      {/* Return to login */}
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

export default NewPassword
