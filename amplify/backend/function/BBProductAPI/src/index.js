/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const axios = require("axios");
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  try {
    let response = {};
    const BBApi = process.env.BB_API_KEY;
    let query = event.queryStringParameters.searchQuery;
    let { endQuery, trending } = event.queryStringParameters;
    if (trending === "false") {
      response = await axios.get(
        `https://api.bestbuy.com/v1/products${query}?apiKey=${BBApi}&format=json${endQuery}`
      );
      const { products, totalPages } = response.data;
      return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({
          products,
          totalPages,
          tredning: event.queryStringParameters.trending,
        }),
        //body: JSON.stringify(query),
      };
    } else {
      response = await axios.get(
        `https://api.bestbuy.com/beta/products/${query}?apiKey=${BBApi}`
      );
      return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({ results: response.data.results }),
        //body: JSON.stringify(query),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(error),
    };
  }
};
