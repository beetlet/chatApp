const isDevelopment = process.env.NODE_ENV === "development";
const apiBaseUrl = isDevelopment ? "http://localhost:8080" : "https://go-serverless-kappa.vercel.app";

export { isDevelopment, apiBaseUrl };