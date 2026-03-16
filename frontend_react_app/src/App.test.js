import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders Home, About, and Contact sections", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: /a simple website that feels polished/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /contact/i })).toBeInTheDocument();
});

test("navigation buttons are present and usable", async () => {
  const user = userEvent.setup();
  render(<App />);

  const aboutBtn = screen.getByRole("button", { name: /about/i });
  const contactBtn = screen.getByRole("button", { name: /contact/i });

  expect(aboutBtn).toBeInTheDocument();
  expect(contactBtn).toBeInTheDocument();

  await user.click(aboutBtn);
  expect(aboutBtn).toHaveAttribute("aria-current", "page");

  await user.click(contactBtn);
  expect(contactBtn).toHaveAttribute("aria-current", "page");
});

test("contact form validates required fields and shows success on valid submit", async () => {
  const user = userEvent.setup();
  render(<App />);

  const submit = screen.getByRole("button", { name: /send message/i });

  // Initially invalid -> disabled
  expect(submit).toBeDisabled();

  await user.type(screen.getByLabelText(/name/i), "Jane Doe");
  await user.type(screen.getByLabelText(/email/i), "not-an-email");
  await user.type(screen.getByLabelText(/message/i), "Hello!");

  // Still invalid email -> disabled
  expect(submit).toBeDisabled();

  // Fix email
  await user.clear(screen.getByLabelText(/email/i));
  await user.type(screen.getByLabelText(/email/i), "jane@example.com");

  expect(submit).toBeEnabled();

  await user.click(submit);

  expect(screen.getByRole("status")).toHaveTextContent(/thanks! your message was received/i);

  // Form resets after successful submit
  expect(screen.getByLabelText(/name/i)).toHaveValue("");
  expect(screen.getByLabelText(/email/i)).toHaveValue("");
  expect(screen.getByLabelText(/message/i)).toHaveValue("");
});
