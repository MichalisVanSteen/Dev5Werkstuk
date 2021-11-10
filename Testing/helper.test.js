const {
    string
} = require("yargs");
const checkStringLength = require("./../index")

test("Helper function to check a string length", () => {
    expect(checkStringLength("fkgndskngf")).toBeFalsy();
    expect(checkStringLength("hello")).toMatch("hello");
    expect(checkStringLength(typeof "hello")).toMatch("string");
})