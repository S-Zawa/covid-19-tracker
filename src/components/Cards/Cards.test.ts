import { formatDate } from "./Cards";

test("formatDate Empty", () => {
  const date = formatDate();
  expect(date).toBe("");
});
test("formatDate Normal", () => {
  const date = formatDate(new Date(2000, 1, 1, 0, 0));
  expect(date).toBe("Tue Feb 01 2000");
});
