// const options = {
//   customCss: `
//   html {
//   font-size: 62.5%;
//   }

//   .swagger-ui section.models,
//   .swagger-ui .info {
//     margin: 0;
//   }

//   .swagger-ui *,
//   .swagger-ui .info .title,
//   .swagger-ui .info p,
//   .swagger-ui .opblock .opblock-summary-description {
//     color: #fff;
//   }
//   .swagger-ui .topbar {
//     display: none;
//   }
//   .swagger-ui .scheme-container,
//   .swagger-ui.swagger-container,
//   .swagger-ui * {
//     background-color: #333;
//   }
//   .swagger-ui{
//     padding: 2.8rem 0;
//   }
//   `,
// };
const options = {
  customCss: `
  .swagger-ui .topbar {
    display: none;
  }
  `,
};

module.exports = options;
