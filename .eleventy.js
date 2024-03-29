const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginTOC = require("eleventy-plugin-toc");
const readingTime = require('eleventy-plugin-reading-time');

module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    }).use(markdownItAnchor)
  )

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginTOC, {
    ul: true,
    tags: ["h2", "h3", "h4"],
    wrapper: "div"
  });
  eleventyConfig.addPlugin(readingTime);
  
  eleventyConfig.addCollection("tagList", collection => {
    const tagsSet = new Set();
    collection.getAll().forEach(item => {
      if (!item.data.tags) return;
      item.data.tags
      .filter(tag => !["post", "all", "blogs", "projects"].includes(tag))
      .forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  
  // var MarkdownIt = require("markdown-it");
  // var md = new MarkdownIt();
  
  // md.use(require("markdown-it-anchor").default);
  // md.use(require("markdown-it-table-of-contents"), {
    //   "includeLevel": [2,3,4]
    // });
    
    // eleventyConfig.setLibrary("md", md);
    
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addWatchTarget("./src/css/");

  eleventyConfig.addPassthroughCopy("./src/blogs/");
  eleventyConfig.addWatchTarget("./src/blogs/");

  eleventyConfig.addPassthroughCopy("./src/projects/");
  eleventyConfig.addWatchTarget("./src/projects/");

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      data: "_data",
      input: "src",
      output: "public",
    },
  };
};