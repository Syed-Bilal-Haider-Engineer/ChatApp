import { FormProvider as Form } from "react-hook-form";

const FormProvider = ({ methods, onSubmit, children }) => {
    <Form {...methods}>
        <form onSubmit={onSubmit}>
            {children}
        </form>
    </Form>
}

export default FormProvider;