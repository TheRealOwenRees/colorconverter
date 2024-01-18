// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs/promises");

const esmDirectory = "./lib/esm";

const esmPackageJsonContent = {
  main: "colorconvertor.js",
  type: "module",
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function createPackageJson() {
  try {
    await fs.writeFile(
      `${esmDirectory}/package.json`,
      JSON.stringify(esmPackageJsonContent, null, 2),
    );
    console.log("package.json created");
  } catch (error) {
    console.log("an error occurred");
  }
}

createPackageJson().catch((error) => {
  console.error(error);
});
