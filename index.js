const glob = require("glob");
const replace = require("replace-in-file");

const path = "../new/content/articles/**/*.md";
const strongRegExp = /\*{2}([a-zA-Z0-9]+ ?([a-zA-Z0-9]+))\*{2}/g; //** Hello world **
const emRegExp = /(\*)([a-zA-Z0-9]+ ?([a-zA-Z0-9]+))(\*)/g; // *Hello world*
const tempRegExp = /(\<\_\>)([a-zA-Z0-9]+ ?([a-zA-Z0-9]+))(\<\_\>)/g; // <_>Hello world<_>

glob(path, function(er, files) {
  if (!er) {
    // Replace ** to <_>
    replaceTags(files, strongRegExp, /\*{2}/g, "<_>");
    // Replace * to ''
    replaceTags(files, emRegExp, /\*+/g, "");
    // Replace <_> to **
    replaceTags(files, tempRegExp, /(\<\_\>)+/g, "**");
  } else {
    console.log(er);
  }
});

function replaceTags(files, tag, what, str) {
  const options = {
    files: files,
    from: tag,
    to: match => match.replace(what, str)
  };

  try {
    const changes = replace.sync(options);
    console.log("Modified files:", changes.join(", "));
  } catch (error) {
    console.error("Error occurred:", error);
  }
}
