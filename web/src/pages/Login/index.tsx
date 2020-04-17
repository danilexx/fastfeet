import * as React from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { SubmitHandler, FormHandles } from "@unform/core";
import showError from "-/utils/showError";
import { Container, FormContainer, Logo } from "./styles";
import Input from "-/components/Input";
import { LoadingButton } from "-/components/Button";
import { loginValidationSchema } from "-/utils/validationSchemas";
import validate from "-/utils/validate";
import { createSession } from "-/services";
import { useStoreActions } from "-/lib/EasyPeasy";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC<RouteComponentProps> = () => {
  const formRef = React.useRef<FormHandles>(null);
  const login = useStoreActions(state => state.user.login);
  const [isLoading, setLoading] = React.useState(false);
  const handleSubmit: SubmitHandler<FormData> = async data => {
    const isValid: boolean = await validate(
      loginValidationSchema,
      data,
      formRef
    );
    if (isValid) {
      setLoading(true);
      try {
        const response = await createSession(data);
        login({ token: response.data.token });
        setLoading(false);
        navigate("dashboard/encomendas");
      } catch (err) {
        setLoading(false);
        showError(err);
      }
      setLoading(false);
    }
  };
  return (
    <Container>
      <FormContainer ref={formRef} onSubmit={handleSubmit}>
        <Logo />
        <Input
          label="SEU E-MAIL"
          placeholder="exemplo@email.com"
          name="email"
        />
        <Input
          label="SUA SENHA"
          placeholder="••••••••••"
          name="password"
          type="password"
        />
        <LoadingButton loading={isLoading} type="submit">
          Entrar no Sistema
        </LoadingButton>
      </FormContainer>
    </Container>
  );
};

export default Login;
