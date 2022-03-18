module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css/");

    return {
        htmlTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "public",
        },
    };
};