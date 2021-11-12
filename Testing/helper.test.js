const {
    string
} = require("yargs");
const helpers = require("./../index")

test("Helper function to check a string length", () => {
    expect(helpers.checkStringLength()).toBeFalsy();
    expect(helpers.checkStringLength(120)).toBeFalsy();
    expect(helpers.checkStringLength("fkgndskngf")).toBeFalsy();
    expect(helpers.checkStringLength("hello")).toMatch("hello");
    expect(helpers.checkStringLength("Hello")).not.toMatch("hello");
    expect(helpers.checkStringLength(typeof "hello")).toMatch("string");
})