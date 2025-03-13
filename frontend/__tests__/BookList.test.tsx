import React from "react";
import ListBooks from "../src/components/ListBooks";
import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { afterAll, describe, expect, it, vi } from "vitest";
import { Book } from "../src/types/graphql";
import { LIST_BOOKS } from "../src/requetes/queries/books.queries";

const mocks: MockedResponse<{ books: Book[] }>[] = [
  {
    request: {
      query: LIST_BOOKS,
    },
    result: {
      data: {
        books: [
          { id: "1", title: "Mon titre 1" },
          { id: "2", title: "Mon titre 2" },
        ],
      },
    },
  },
];

afterAll(() => {
  vi.resetAllMocks();
});

describe("Liste des livres", () => {
  it("récupération de liste et affichage des éléments", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ListBooks />
      </MockedProvider>
    );

    await waitFor(() => {
        expect(screen.getByText("Mon titre 1")).toBeInTheDocument();
      });

  });
});
