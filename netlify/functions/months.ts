import type { Handler } from "@netlify/functions";

const availableMonths = ["2025-12", "2025-11"];

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(availableMonths),
  };
};
