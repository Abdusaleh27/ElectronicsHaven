import { render } from "@testing-library/react";
import PageNavBar from "../PageNavBar";

describe("PageNavBar testing", () => {
  test("renders the component", () => {
    render(<PageNavBar pages={0}/>);
  });
});
