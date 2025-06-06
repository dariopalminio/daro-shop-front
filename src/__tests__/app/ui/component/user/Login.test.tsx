import * as ReactDOM from "react-dom";
import Login from "../../../../../app/ui/component/user/auth/login";

//TODO: Mock useTranslation() 


jest.mock("../../../../../domain/hook/user/login.hook", () => {
  return function useLogin() {
    return {
      isLoggedOk: false,
      isLoginLoading: false,
      hasLoginError: false,
      msg: "",
      login: () => {},
    };
  };
});

describe("Renders Login component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<Login />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  test("Renders correctly Login initial document", () => {
    const forms = container.querySelectorAll("form");
    const inputs = container.querySelectorAll("input");
    const buttons = container.querySelectorAll("button");
    expect(forms).toHaveLength(1);
    expect(inputs).toHaveLength(2);
    expect(buttons).toHaveLength(1);
    expect(buttons[0].type).toBe("submit");
  });
  
});
