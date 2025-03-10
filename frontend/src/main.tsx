import App from "./App.tsx";
import Home from "./components/Home.tsx";
import Login from "./components/auth/Login.tsx";
import Register from "./components/auth/Register.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import ListBooks from "./components/ListBooks.tsx";
import CreateBook from "./components/CreateBook.tsx";
import Logout from "./components/auth/Logout.tsx";
import ProtectedArea from "./components/auth/ProtectedArea.tsx";
import AuthProvider from "./context/AuthContext.tsx";

export const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  credentials: "include",
  uri: "http://localhost:4005",
});

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/logout", element: <Logout /> },
      { path: "/books/list", element: <ListBooks /> },
      {
        path: "/books/create",
        element: (
          <ProtectedArea>
            <CreateBook />
          </ProtectedArea>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ApolloProvider>
);
