import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Button } from "@mui/material";
import FormProvider from "../../components/hook-form";
import { useDispatch, useSelector } from "react-redux";
import { VerifyEmail } from "../../redux/slices/auth";
import RHFCodes from "../../hooks/RHFCodes";

export default function VerifyForm() {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);

  const codeSchema = Yup.string().required("Code is required");
  const VerifyCodeSchema = Yup.object().shape({
    code1: codeSchema,
    code2: codeSchema,
    code3: codeSchema,
    code4: codeSchema,
    code5: codeSchema,
    code6: codeSchema,
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const concatenateOtp = (data) => {
    return Object.values(data).join('');
  };

  const onSubmit = async (data) => {
    try {
      dispatch(VerifyEmail({ email, otp: concatenateOtp(data) }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFCodes
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            bgcolor: "text.primary",
            color: "common.white",
            "&:hover": {
              bgcolor: "text.primary",
            },
          }}
        >
          Verify
        </Button>
      </Stack>
    </FormProvider>
  );
}
