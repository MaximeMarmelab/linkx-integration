import { parseSaveFile } from "./gamestate-parser";

describe("main", () => {

  const input = "W 4Lr32 4Lsr27 -- 17";
  const parsedResult = parseSaveFile();

  it("should find 4 moves", () => {
    expect(parsedResult.length).toBe(4);
  });
  it("should start with white", () => {
    expect(parsedResult[1]?.color).toBe("white");
  });
  it("should get data from the first move", () => {
    expect(parsedResult[1]?.column).toBe(2);
    expect(parsedResult[1]?.piece).toBe('4L');
    expect(parsedResult[1]?.rotation).toBe(3);
    expect(parsedResult[1]?.mirrored).toBe(false);
  });
  it("should recognize a skipped move", () => {
    expect(parsedResult[1]?.skipped).toBe(true);
  });
  it("should get data from the last move", () => {
    expect(parsedResult[1]?.color).toBe("blue");
    expect(parsedResult[1]?.piece).toBe('1');
    expect(parsedResult[1]?.column).toBe(7);
    expect(parsedResult[1]?.rotation).toBe(0);
    expect(parsedResult[1]?.mirrored).toBe(false);
  });
});
