const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const { minify } = require("terser");

const projectRoot = path.resolve(__dirname, "..");
const targetDirs = fs
  .readdirSync(projectRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name.startsWith("build"))
  .map((entry) => path.join(projectRoot, entry.name));

const bundleNames = {
  css: "app.bundle.css",
  cssMap: "app.bundle.css.map",
  mainJs: "app.bundle.js",
  mainJsMap: "app.bundle.js.map",
  vendorJs: "vendor.bundle.js",
  vendorJsMap: "vendor.bundle.js.map",
};

const indent = (level) => "  ".repeat(level);

const beautifyCss = (source) => {
  const root = postcss.parse(source);

  const formatContainer = (container, depth) => {
    if (!container.nodes) {
      return;
    }

    container.nodes.forEach((node, index) => {
      node.raws.before = `\n${indent(depth)}`;

      if (node.type === "decl") {
        node.raws.between = ": ";
        node.raws.important = " !important";
      }

      if (node.type === "rule") {
        node.raws.between = " ";
      }

      if (node.type === "atrule") {
        node.raws.between = node.nodes ? " " : "";
        node.raws.afterName = " ";
      }

      if (node.nodes) {
        node.raws.after = `\n${indent(depth)}`;
        formatContainer(node, depth + 1);
      }

      if (index === container.nodes.length - 1) {
        node.raws.after = node.nodes ? `\n${indent(depth)}` : "";
      }
    });
  };

  formatContainer(root, 0);
  root.raws.after = "\n";

  return root.toResult({ map: false }).css;
};

const beautifyJs = async (source) => {
  const result = await minify(source, {
    compress: false,
    mangle: false,
    format: {
      beautify: true,
      comments: false,
      semicolons: true,
    },
  });

  return result.code.endsWith("\n") ? result.code : `${result.code}\n`;
};

const safeRename = (fromPath, toPath) => {
  if (!fs.existsSync(fromPath) || fromPath === toPath) {
    return;
  }

  if (fs.existsSync(toPath)) {
    fs.unlinkSync(toPath);
  }

  fs.renameSync(fromPath, toPath);
};

const updateTextReferences = (filePath, replacements) => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  replacements.forEach(([fromText, toText]) => {
    content = content.split(fromText).join(toText);
  });

  fs.writeFileSync(filePath, content);
};

const formatJsonFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(content);

  fs.writeFileSync(filePath, `${JSON.stringify(parsed, null, 2)}\n`);
};

const formatHtmlFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const tokens = source.replace(/></g, ">\n<").split("\n");
  const voidTags = new Set([
    "!doctype",
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ]);

  let depth = 0;
  const lines = tokens.map((token) => {
    const trimmed = token.trim();
    const tagMatch = trimmed.match(/^<\/?([a-zA-Z0-9!-]+)/);
    const tagName = tagMatch ? tagMatch[1].toLowerCase() : "";
    const isClosingTag = /^<\//.test(trimmed);
    const isOpeningTag =
      /^<[^/!][^>]*>$/.test(trimmed) &&
      !trimmed.endsWith("/>") &&
      !voidTags.has(tagName) &&
      !trimmed.includes("</");

    if (isClosingTag) {
      depth = Math.max(0, depth - 1);
    }

    const line = `${indent(depth)}${trimmed}`;

    if (isOpeningTag) {
      depth += 1;
    }

    return line;
  });

  fs.writeFileSync(filePath, `${lines.join("\n")}\n`);
};

const normalizeDirectory = async (buildDir) => {
  const cssDir = path.join(buildDir, "static", "css");
  const jsDir = path.join(buildDir, "static", "js");

  if (!fs.existsSync(cssDir) || !fs.existsSync(jsDir)) {
    return;
  }

  const cssFiles = fs
    .readdirSync(cssDir)
    .filter((fileName) => fileName.endsWith(".css") && !fileName.endsWith(".map"));
  const cssMapFiles = fs
    .readdirSync(cssDir)
    .filter((fileName) => fileName.endsWith(".css.map"));
  const jsFiles = fs
    .readdirSync(jsDir)
    .filter(
      (fileName) =>
        fileName.endsWith(".js") &&
        !fileName.endsWith(".map") &&
        !fileName.endsWith(".LICENSE.txt")
    );
  const jsMapFiles = fs
    .readdirSync(jsDir)
    .filter((fileName) => fileName.endsWith(".js.map"));
  const licenseFiles = fs
    .readdirSync(jsDir)
    .filter((fileName) => fileName.endsWith(".LICENSE.txt"));

  const mainCss =
    cssFiles.find((fileName) => fileName.startsWith("main.")) || bundleNames.css;
  const mainCssMap =
    cssMapFiles.find((fileName) => fileName.startsWith("main.")) ||
    bundleNames.cssMap;
  const mainJs =
    jsFiles.find((fileName) => fileName.startsWith("main.")) || bundleNames.mainJs;
  const mainJsMap =
    jsMapFiles.find((fileName) => fileName.startsWith("main.")) ||
    bundleNames.mainJsMap;
  const vendorJs = jsFiles.find(
    (fileName) =>
      fileName !== mainJs &&
      (fileName.includes(".chunk.") || fileName === bundleNames.vendorJs)
  );
  const vendorJsMap = jsMapFiles.find(
    (fileName) =>
      fileName !== mainJsMap &&
      (fileName.includes(".chunk.") || fileName === bundleNames.vendorJsMap)
  );

  const replacements = [];

  if (mainCss) {
    const source = fs.readFileSync(path.join(cssDir, mainCss), "utf8");
    fs.writeFileSync(path.join(cssDir, mainCss), beautifyCss(source));
    replacements.push([mainCss, bundleNames.css]);
  }

  if (mainJs) {
    const source = fs.readFileSync(path.join(jsDir, mainJs), "utf8");
    const formatted = await beautifyJs(source);
    fs.writeFileSync(path.join(jsDir, mainJs), formatted);
    replacements.push([mainJs, bundleNames.mainJs]);
  }

  if (vendorJs) {
    const source = fs.readFileSync(path.join(jsDir, vendorJs), "utf8");
    const formatted = await beautifyJs(source);
    fs.writeFileSync(path.join(jsDir, vendorJs), formatted);
    replacements.push([vendorJs, bundleNames.vendorJs]);
  }

  if (mainCssMap) {
    replacements.push([mainCssMap, bundleNames.cssMap]);
  }

  if (mainJsMap) {
    replacements.push([mainJsMap, bundleNames.mainJsMap]);
  }

  if (vendorJsMap) {
    replacements.push([vendorJsMap, bundleNames.vendorJsMap]);
  }

  updateTextReferences(path.join(buildDir, "index.html"), replacements);
  updateTextReferences(path.join(buildDir, "asset-manifest.json"), replacements);
  formatHtmlFile(path.join(buildDir, "index.html"));
  formatJsonFile(path.join(buildDir, "asset-manifest.json"));
  formatJsonFile(path.join(buildDir, "manifest.json"));

  safeRename(path.join(cssDir, mainCss || ""), path.join(cssDir, bundleNames.css));
  safeRename(path.join(cssDir, mainCssMap || ""), path.join(cssDir, bundleNames.cssMap));
  safeRename(path.join(jsDir, mainJs || ""), path.join(jsDir, bundleNames.mainJs));
  safeRename(
    path.join(jsDir, mainJsMap || ""),
    path.join(jsDir, bundleNames.mainJsMap)
  );
  safeRename(path.join(jsDir, vendorJs || ""), path.join(jsDir, bundleNames.vendorJs));
  safeRename(
    path.join(jsDir, vendorJsMap || ""),
    path.join(jsDir, bundleNames.vendorJsMap)
  );

  licenseFiles.forEach((fileName) => {
    fs.unlinkSync(path.join(jsDir, fileName));
  });
};

const run = async () => {
  for (const buildDir of targetDirs) {
    await normalizeDirectory(buildDir);
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
