//frontend/__tests__/Topbar.test.tsx

import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // Ajoutez cette ligne
import Topbar from "../src/components/layout-elements/Topbar";
import { MemoryRouter } from "react-router-dom";
import * as AuthModule from "../src/context/AuthContext";
describe("Topbar", () => {
  it("rendu du titre dans la topbar", () => {
    render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );
    const titre = screen.getByText("Quête JWT");
    expect(titre).toBeInTheDocument();
  });
  it("mock d'un faux utilisateur connecté", () => {
    vi.spyOn(AuthModule, "useAuth").mockReturnValue({
      infos: { email: "test@mondomaine.com" },
      getInfos: vi.fn().mockResolvedValue(undefined),
    });

    render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );
    const titre = screen.getByText(
      "Quête JWT connecté en tant que test@mondomaine.com"
    );
    expect(titre).toBeInTheDocument();
  });

  it("mock d'un faux utilisateur connecté et vérification de l'apparition du bouton", () => {
    vi.spyOn(AuthModule, "useAuth").mockReturnValue({
      infos: { email: "test@mondomaine.com" },
      getInfos: vi.fn().mockResolvedValue(undefined),
    });

    render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );

    const logoutLink = screen.getByTestId("logout-link");
    expect(logoutLink).toBeInTheDocument();
  });
});
