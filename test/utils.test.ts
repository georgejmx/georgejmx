import { formatFascinations, formatStories, generateDescriptors } from "../src/utils";
import { expectedStoriesArray, fascinationsFixture } from "./fixtures";

describe("georgejmx successfully formats data", () => {
    test("Formatting story data", () => {
        const testFormattedStories = formatStories(expectedStoriesArray, false);
        expect(testFormattedStories[0].name).toEqual("test story");
        expect(testFormattedStories[0].datestring?.startsWith("19/07/2023, "));
        expect(testFormattedStories[0].reactions).toEqual([
            { datestring: "01/01/2024", word: "spicy" },
        ]);

        const testFormattedStoriesWithHead = formatStories(expectedStoriesArray, true);
        expect(testFormattedStoriesWithHead[1].name).toEqual("test story 2");
        expect(testFormattedStoriesWithHead[1].headline).toEqual("first test paragraph...");
        expect(testFormattedStoriesWithHead[1].paragraphs).toHaveLength(0);
    });

    test("Formatting fascination data correctly rates fascinations", () => {
        const testFormattedFascinations = formatFascinations(fascinationsFixture());
        expect(testFormattedFascinations[0].name).toEqual("f2");
        expect(testFormattedFascinations[0].theme).toEqual(2);
        expect(testFormattedFascinations[1].name).toEqual("f1");
        expect(testFormattedFascinations[1].theme).toEqual(1);
        expect(testFormattedFascinations[2].name).toEqual("f3");
        expect(testFormattedFascinations[2].theme).toEqual(3);
    });

    test("Generating random descriptors", () => {
        const testDescriptors = generateDescriptors(10);
        expect(testDescriptors).toHaveLength(10);
        expect(typeof testDescriptors[0]).toEqual("string");
    });
});
