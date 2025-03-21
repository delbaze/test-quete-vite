import { useAuth } from "@/context/AuthContext";
import { LOGIN } from "@/requetes/queries/auth.queries";
import { InputLogin, LoginQuery, LoginQueryVariables } from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const { getInfos } = useAuth();

  const [login, { data, error }] = useLazyQuery<
    LoginQuery,
    LoginQueryVariables
  >(LOGIN, {
    fetchPolicy: "no-cache",
    async onCompleted(data) {
      const initialRoute = location.state?.initialRoute;
      await getInfos();
      if (data.login.success && initialRoute) {
        navigate(initialRoute);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as InputLogin;
    if (data.email && data.password) {
      login({
        variables: { infos: { email: data.email, password: data.password } },
      });
    }
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <form onSubmit={handleSubmit}>
        <h1 className="mb-5">Connexion</h1>
        <div>
          <input type="text" name="email" placeholder="Indiquez votre email" />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Indiquez votre mot de passe"
          />
        </div>
        <input type="submit" />
        <div>
          <span className="text-red-500">{error?.message}</span>
          {data?.login.success ? (
            <span className="text-blue-500">{data?.login?.message}</span>
          ) : (
            <span className="text-red-500">{data?.login?.message}</span>
          )}
        </div>
      </form>
    </main>
  );
}

export default Login;
