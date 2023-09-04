import React from "react";
import { render, screen } from "@testing-library/react";

import CategPage from "../CategPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders categ page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CategPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("categ-datatable")).toBeInTheDocument();
    expect(screen.getByRole("categ-add-button")).toBeInTheDocument();
});
