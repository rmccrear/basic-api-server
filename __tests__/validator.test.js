const validator = require("../src/middleware/validator");

const next = jest.fn();

describe("Test middleware", () => {
  describe("Test validator", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });
    test("accepts post with correct params", () => {
      const goodParams = {
        id: 1,
        name: "Good Farm",
      };
      const req = { body: goodParams };
      const res = {};
      validator(req, res, next);
      expect(next.mock.lastCall.length).toBe(0); // called without args
    });
    test("rejects posts with incorrect params", () => {
      const badParams = {
        badParam: true,
      };

      const req = { body: badParams };
      const res = {};
      validator(req, res, next);
      expect(next.mock.lastCall[0]).toEqual(expect.stringMatching(/Invalid/));
    });
  });
});
