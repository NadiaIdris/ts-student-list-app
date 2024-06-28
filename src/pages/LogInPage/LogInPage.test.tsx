import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { LogInPage } from "./LogInPage";
import { USER_ENDPOINT } from "../../api/apiConstants";
const LOGIN_ENDPOINT = `${USER_ENDPOINT}/login`;

/*
In order to mock axios, jest complains about an error:
"Cannot use import statement outside a module" with Axios".

In order to fix this, the configuration for `package.json` to get axios import working
needs to be updated, by adding:
"jest": {
    "moduleNameMapper": {
      "^axios$": "axios/dist/node/axios.cjs"
    }
},
More info: https://stackoverflow.com/a/74297004/2085356
*/

/*
You can mock `axios` using this tutorial: 
https://zaklaughton.dev/blog/the-only-3-steps-you-need-to-mock-an-api-call-in-jest
*/
jest.mock("axios");

async function getFirstAlbumTitle() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/albums");
  return response.data[0].title;
}

// This is the actual test code.
it("returns the title of the first album", async () => {
  // This is the mock implementation of axios.get
  (axios.get as jest.Mock).mockResolvedValue({
    data: [
      {
        userId: 1,
        id: 1,
        title: "My First Album",
      },
      {
        userId: 1,
        id: 2,
        title: "Album: The Sequel",
      },
    ],
  });
  const title = await getFirstAlbumTitle();
  expect(title).toEqual("My First Album");
});
