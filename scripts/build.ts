import fs from "fs-extra";
import path from "path";
import { render } from "less";
import postcss from "postcss";
import CleanCss from "clean-css";
const cleanCss = new CleanCss();

const styleDir = path.join(process.cwd(), "src");

const transfromLess = async (code: string, filePath: string) => {
  try {
    const { css } = await render(code, {
      filename: filePath,
      paths: [path.join(process.cwd(), "node_modules")],
    });
    return css;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const tranasfromCss = async (code: string) => {
  try {
    const { css } = await postcss([require("autoprefixer")]).process(code, {
      from: undefined,
    });
    return cleanCss.minify(css).styles;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const generatorCssFile = (code: string, path: string) => {
  path = path.replace(".less", ".css");
  return fs.outputFileSync(path, code);
};

(async () => {
  const styles = fs
    .readdirSync(styleDir, "utf-8")
    .map((_) => path.join(styleDir, _));

  for (const style of styles) {
    const baseName = path.basename(style);
    if (baseName !== "common.less") break;
    const code = await fs.readFile(style, "utf-8");
    const source = await transfromLess(code, style);
    const css = await tranasfromCss(source);
    generatorCssFile(css, style);
  }
})();
