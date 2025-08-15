import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";

// Load environment variables with explicit path
dotenv.config({ path: require('path').resolve(__dirname, '../.env') });

const apiKey = process.env.ZERODHA_API_KEY!;
const apiSecret = process.env.ZERODHA_API_SECRET!;
const requestToken = process.env.ZERODHA_REQUEST_TOKEN!;
const accessToken = process.env.ZERODHA_ACCESS_TOKEN!;

const kc = new KiteConnect({ api_key: apiKey });

console.log(kc.getLoginURL());

async function init() {
    try {
      await generateSession();
      await getProfile();
    } catch (err) {
      console.error(err);
    }
  }
  
  async function generateSession() {
    try {
      const response = await kc.generateSession(requestToken, apiSecret);
      console.log(response.access_token);
      kc.setAccessToken(response.access_token);
      console.log("Session generated:", response);
    } catch (err) {
      console.error("Error generating session:", err);
    }
  }
  
  async function getProfile() {
    try {
      const profile = await kc.getProfile();
      console.log("Profile:", profile);
    } catch (err) {
      console.error("Error getting profile:", err);
    }
  }
  // Initialize the API calls
  init();