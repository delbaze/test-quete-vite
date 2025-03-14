import React from "react";
import { describe, it, expect, vi } from "vitest";
import Login from "../src/components/auth/Login";
import * as AuthModule from "../src/context/AuthContext";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { LOGIN } from "../src/requetes/queries/auth.queries";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";

// Mock de react-router-dom de façon asynchrone
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ state: {} }),
  };
});

// Mock du contexte d'authentification
vi.spyOn(AuthModule, "useAuth").mockReturnValue({
  infos: { email: "" },
  getInfos: vi.fn().mockResolvedValue(undefined),
});

const mocks = [
  {
    request: {
      query: LOGIN,
      variables: {
        infos: { email: "test@mondomaine.com", password: "motdepasse" },
      },
    },
    result: {
      data: {
        login: {
          success: true,
          message: "Bienvenue!",
        },
      },
    },
  },
];

describe("Composant Login", () => {
  it("Snapshot du composant login", async () => {
    const { container, getByText, getByPlaceholderText,  } = render(
      <MemoryRouter initialEntries={["/auth/login"]}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </MemoryRouter>
    );

    // Remplissage du formulaire avec des données de test
    fireEvent.change(getByPlaceholderText("Indiquez votre email"), {
      target: { value: "test@mondomaine.com" },
    });

    fireEvent.change(getByPlaceholderText("Indiquez votre mot de passe"), {
      target: { value: "motdepasse" },
    });

    // Soumission du formulaire
    fireEvent.submit(getByText("Connexion"));

    // On attend un certain temps pour permettre à onCompleted de s'exécuter
    await waitFor(() => {}, { timeout: 1000 });

    // On vérifie le snapshot après que onCompleted a eu le temps de s'exécuter
    await waitFor(
      () => {
        expect(container).toMatchSnapshot();
      },
      { timeout: 10000 }
    );
  });
}); 