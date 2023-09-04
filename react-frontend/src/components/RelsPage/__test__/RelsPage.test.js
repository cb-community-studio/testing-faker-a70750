import React from "react";
import { render, screen } from "@testing-library/react";

import RelsPage from "../RelsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders rels page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RelsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("rels-datatable")).toBeInTheDocument();
    expect(screen.getByRole("rels-add-button")).toBeInTheDocument();
});
