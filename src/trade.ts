import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";

// Load environment variables with explicit path
dotenv.config({ path: require('path').resolve(__dirname, '../.env') });

const apiKey = process.env.ZERODHA_API_KEY!;
const apiSecret = process.env.ZERODHA_API_SECRET!;
const requestToken = process.env.ZERODHA_REQUEST_TOKEN!;
const accessToken = process.env.ZERODHA_ACCESS_TOKEN!;



const kc = new KiteConnect({ api_key: apiKey });

export async function getProfile() {
  try {
    kc.setAccessToken(accessToken);
    const profile = await kc.getProfile();
    return profile;
  } catch (err) {
    console.error("Error getting profile:", JSON.stringify(err, null, 2));
    const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
    throw new Error(`Failed to get profile: ${errorMessage}`);
  }
}


export async function placeOrder(tradingSymbol: string, quantity: number, type: "BUY" | "SELL") {
  try {
    kc.setAccessToken(accessToken);
    const order = await kc.placeOrder("amo", {
        exchange: "NSE",
        tradingsymbol: tradingSymbol,
        transaction_type: type,
        quantity: quantity,
        product: "CNC",
        order_type: "MARKET",
        tag: "test",
    })
    console.log("Order placed successfully:", order);
    return order;
} catch (err) {
        console.error("Error placing order:", JSON.stringify(err, null, 2));
        const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
        throw new Error(`Failed to place order: ${errorMessage}`);
      }
}
