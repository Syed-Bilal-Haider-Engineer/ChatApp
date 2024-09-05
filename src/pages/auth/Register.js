import { Typography ,Stack , Link} from '@mui/material'
import { Link as RouterLink } from'react-router-dom'
import RegisterForm from '../../Sections/auth/RegisterForm'
import AuthSocial from '../../Sections/auth/AuthSocial'

const Register = () => {
    return (
        <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
            <Typography variant="h4">
                Get Started with Twak
            </Typography>
            <Stack direction="row" spacing={0.5}>
                <Typography variant='body2'>
                    Already have an account?
                </Typography>
                <Link to="/auth/login" component={RouterLink} variant='subtitle2'>
                    Login
                </Link>
            </Stack>
            {/* Register Form */}
            <RegisterForm/>
            <Typography component="div" sx={{
                color: 'text.secondary',
                mt: 3,
                typography: "caption",
                textAlign: 'center',
            }}>
                {" By Signing Up , I agree to "}
                <Link underline="always" color="text.primary">
                     Terms of service
                </Link>
                {" and "} 
                <Link underline="always" color="text.primary">
                     Privacy Policy
                </Link>
                { "*" }
            </Typography>
            <AuthSocial/>
        </Stack>
    )
}

export default Register
