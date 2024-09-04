import { Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AuthSocial from '../../Sections/auth/AuthSocial'
import LoginForm from '../../Sections/auth/LoginForm'

const Login = () => {
    return (
        <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
            <Typography>
                Login to Tawk
            </Typography>
            <Stack direction="row" spacing={0.5}>
                <Typography variant='body2'>
                    New User?
                </Typography>
                <Link to="/auth/register" component={RouterLink} variant='subtitle2'>
                    Create an Account
                </Link>
            </Stack>
            {/* Login User form */}
              <LoginForm/>
            {/* Auth Social login */}
            <AuthSocial/>
        </Stack>
    )
}

export default Login
