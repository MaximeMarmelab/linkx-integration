import { parseSaveFile } from "./gamestate-parser";

describe("gamestate-parser", () => {
  it("should start with blue as default", () => {
    const parsedResult = parseSaveFile("16");
    expect(parsedResult[0]?.color).toBe("blue");
  });

  it("should throw errors on misformed inputs", () => {
    expect(() => {
      parseSaveFile("1U");
    }).toThrow("last character");
    expect(() => {
      parseSaveFile("66");
    }).toThrow();
    expect(() => {
      parseSaveFile("aeijihzdhiz");
    }).toThrow();
    expect(() => {
      parseSaveFile("3");
    }).toThrow("too short");
  });

  const input = "W 4Lr32 4Lsr27 -- 17";
  const parsedResult = parseSaveFile(input);
  console.log(JSON.stringify(parsedResult));

  it("should find 4 moves", () => {
    expect(parsedResult.length).toBe(4);
  });

  it("should start with white", () => {
    expect(parsedResult[0]?.color).toBe("white");
  });

  it("should get data from the first move", () => {
    expect(parsedResult[0]?.column).toBe(2);
    expect(parsedResult[0]?.piece).toBe("4L");
    expect(parsedResult[0]?.rotation).toBe(3);
    expect(parsedResult[0]?.mirrored).toBe(false);
  });

  it("should recognize a skipped move", () => {
    expect(parsedResult[2]?.skipped).toBe(true);
  });

  it("should get data from the last move", () => {
    const lastIndex = parsedResult.length - 1;
    expect(parsedResult[lastIndex]?.color).toBe("blue");
    expect(parsedResult[lastIndex]?.piece).toBe("1");
    expect(parsedResult[lastIndex]?.column).toBe(7);
    expect(parsedResult[lastIndex]?.rotation).toBe(0);
    expect(parsedResult[lastIndex]?.mirrored).toBe(false);
  });
});
