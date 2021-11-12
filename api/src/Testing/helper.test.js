const {
    string
} = require("yargs");
const helpers = require("../index")

test("Helper function to check a string length", () => {
    expect(helpers.checkStringLength()).toBeFalsy();
    expect(helpers.checkStringLength(120)).toBeFalsy();
    expect(helpers.checkStringLength("fkgndskngf")).toBeFalsy();
    expect(helpers.checkStringLength("hello")).toMatch("hello");
    expect(helpers.checkStringLength("Hello")).not.toMatch("hello");
    expect(typeof helpers.checkStringLength("hello")).toMatch("string");

    test("capitalise tests", () => {
        expect(helpers.capitalise("hello")).toBe("Hello");
        expect(helpers.capitalise("hello world")).toBe("Hello world");
        expect(helpers.capitalise()).toBeFalsy();
        
      })
      test("full body test", () => {
        const body = {naam: "beyblade", categorie: "spinners", producent: "Jumbo", imageURL: "https://image.be", excerpt: "hello world excerpt long one"};
        expect(helpers.bodyCheck({})).toBeFalsy();
        expect(helpers.bodyCheck(body)).toEqual({ ...body, naam: "beyblade", excerpt: "hello world excerpt ..."});
        expect(helpers.bodyCheck({...body, naam: null})).toBeFalsy();
        expect(helpers.bodyCheck({...body, categorie: null})).toBeFalsy();
        expect(helpers.bodyCheck({...body, producent: null})).toBeFalsy();
        expect(helpers.bodyCheck({...body, imageURL: null})).toBeFalsy();
        expect(helpers.bodyCheck({...body, excerpt: null})).toBeFalsy();
      })
})

