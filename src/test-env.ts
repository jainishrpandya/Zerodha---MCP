import dotenv from "dotenv";
import path from "path";

// Load environment variables with explicit path
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

console.log("=== Environment Variables Test ===");
console.log("Current working directory:", process.cwd());
console.log("Looking for .env file at:", path.resolve(process.cwd(), '.env'));

console.log("\nChecking if environment variables are loaded:");

const envVars = {
  'ZERODHA_API_KEY': process.env.ZERODHA_API_KEY,
  'ZERODHA_API_SECRET': process.env.ZERODHA_API_SECRET,
  'ZERODHA_REQUEST_TOKEN': process.env.ZERODHA_REQUEST_TOKEN,
  'ZERODHA_ACCESS_TOKEN': process.env.ZERODHA_ACCESS_TOKEN
};

let allLoaded = true;

for (const [key, value] of Object.entries(envVars)) {
  if (value) {
    console.log(`✅ ${key}: ${value.substring(0, 10)}...`);
  } else {
    console.log(`❌ ${key}: NOT FOUND`);
    allLoaded = false;
  }
}

if (allLoaded) {
  console.log("\n🎉 All environment variables are loaded successfully!");
} else {
  console.log("\n⚠️  Some environment variables are missing!");
}

console.log("\n=== End Test ===");
