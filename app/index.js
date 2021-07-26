const express = require("express");
const swaggerUi = require("swagger-ui-express");
const OpenApiEnforcer = require("openapi-enforcer-middleware");
const bodyParser = require("body-parser");
const yaml = require("yamljs");
const path = require("path");

// Server port
const port = 3000 || process.env.SERVER_PORT;

// OpenAPI Spec path
const apiSpecPath = path.join(__dirname, "spec", "api.yml");

// Load & parse the OAS Yaml spec
const specYaml = yaml.load(apiSpecPath);

const app = express();

// Parse JSON request bodies
app.use(bodyParser.json());

// Configure OpenApi Enforcer from the yaml Spec
const openApiEnforcer = OpenApiEnforcer(specYaml);
openApiEnforcer
  .controllers(path.join(__dirname, "controllers"))
  .catch(console.error);

// Mount OpenApi Enforcer
app.use(openApiEnforcer.middleware());

// Mount Swagger UI
app.use("/", swaggerUi.serve, swaggerUi.setup(specYaml));

// 4xx errors
app.use((err, req, res, next) => {
  if (err.statusCode >= 400 && err.statusCode <= 499) {
    const code = err.code ? err.code : "CLI_999";
    const label = err.label ? err.label : `Invalid request (${err.message})`;
    res.status(err.statusCode);
    res.send({
      code,
      label,
    });
  } else {
    next(err);
  }
});

// 5xx errors
app.use((err, req, res, next) => {
  res.status(500);
  res.send({
    code: "SER_999",
    label: `Technical error (${err.message})`,
  });
});

// Start listening
app.listen(port, () => {
  console.log(`BNB My Guest is listening at http://localhost:${port}`);
});
