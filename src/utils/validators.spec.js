import { validateEmptyAndEmail, validateEmptyAndLength3 } from "./validators";

describe("Validator utils", () => {
  it("should give an error with empty payload (password)", () => {
    expect(validateEmptyAndLength3()).toBe("*Este campo é obrigatório");
  });

  it("should give an error with less then 3 character payload", () => {
    expect(validateEmptyAndLength3("aa")).toBe(
      "*Este campo precisa de no mínimo 3 caracteres"
    );
  });

  it("should return true when input pass a correct param (not empty and bigger than 3 character)", () => {
    expect(validateEmptyAndLength3("massonha")).toBe(true);
  });

  it("should give an error with empty payload (email)", () => {
    expect(validateEmptyAndEmail()).toBe("*Este campo é obrigatório");
  });

  it("should give a error if the payload dont't match with the regex", () => {
    expect(validateEmptyAndEmail("bazuca")).toBe(
      "*Este campo precisa ser um e-mail"
    );
  });

  it("should return true if payload match with regex and is not empty", () => {
    expect(validateEmptyAndEmail("joao@gmail.com")).toBe(true);
  });
});
