# Zerodha MCP Server

A Model Context Protocol (MCP) server that provides trading tools for Zerodha API integration. This server allows you to place buy/sell orders, get user profiles, and perform basic calculations through Claude Desktop.

## Features

- 🚀 **Buy/Sell Stock Orders** - Place market orders for stocks
- 👤 **User Profile Management** - Get Zerodha account details
- 🧮 **Basic Math Operations** - Addition and factorial calculations
- 🔐 **Secure Credential Management** - Environment variables for API keys
- 🤖 **Claude Desktop Integration** - Seamless AI-powered trading

## Prerequisites

- Node.js (v16 or higher)
- Zerodha Trading Account
- Claude Desktop Application
- Git

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/zerodha-mcp-server.git
cd zerodha-mcp-server
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Generate Zerodha API Credentials

#### 3.1 Create Developer Account
1. Go to [Zerodha Developer Console](https://developers.kite.trade/)
2. Sign in with your Zerodha customer ID
3. Create a new application

#### 3.2 Get API Key and Secret
1. In your application dashboard, note down:
   - **API Key** (e.g., `xxxxxxxxxxxxxxx`)
   - **API Secret** (e.g., `xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

#### 3.3 Generate Request Token
1. Use the login URL: `https://kite.zerodha.com/connect/login?api_key=YOUR_API_KEY&v=3`
2. Login with your Zerodha credentials
3. After successful login, you'll be redirected to a URL containing the `request_token`
4. Copy the request token from the URL

#### 3.4 Generate Access Token
1. Run the token generator:
   ```bash
   npx ts-node src/access.ts
   ```
2. Update the `requestToken` variable in `src/access.ts` with your fresh token
3. Run again to get your access token
4. Copy the access token from the console output

### Step 4: Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Create .env file
echo ZERODHA_API_KEY=your_api_key_here > .env
echo ZERODHA_API_SECRET=your_api_secret_here >> .env
echo ZERODHA_REQUEST_TOKEN=your_request_token_here >> .env
echo ZERODHA_ACCESS_TOKEN=your_access_token_here >> .env
```

**Example .env file (with placeholder values):**
```env
ZERODHA_API_KEY=your_actual_api_key_here
ZERODHA_API_SECRET=your_actual_api_secret_here
ZERODHA_REQUEST_TOKEN=your_actual_request_token_here
ZERODHA_ACCESS_TOKEN=your_actual_access_token_here
```

### Step 5: Build the Project

```bash
npm run build
```

### Step 6: Test the Server

```bash
# Test environment variables
npx ts-node src/test-env.ts

# Test profile retrieval
npx ts-node -e "import { getProfile } from './src/trade'; getProfile().then(console.log).catch(console.error)"
```

### Step 7: Configure Claude Desktop

#### 7.1 Download Claude Desktop
1. Go to [Claude Desktop](https://claude.ai/download)
2. Download and install the application

#### 7.2 Configure MCP Server
1. Open Claude Desktop
2. Go to **Settings** → **Developer Settings**
3. Click **Edit Config**
4. Add the following configuration:

```json
{
    "mcpServers": {
        "trade": {
            "command": "C:\\Program Files\\nodejs\\node.exe",
            "args": [
                "D:\\Projects\\Zerodha - MCP\\dist\\index.js"
            ]
        }
    }
}
```

**Important:** Update the path to match your project location:
- Replace `D:\\Projects\\Zerodha - MCP\\` with your actual project path
- Use double backslashes `\\` for Windows paths

#### 7.3 Restart Claude Desktop
1. Close Claude Desktop completely
2. Reopen the application
3. The MCP server should connect automatically

### Step 8: Verify Tools Availability

1. Open Claude Desktop
2. Start a new conversation
3. Check if the following tools are available:
   - `buy-stock` - Place buy orders
   - `sell-stock` - Place sell orders
   - `get-profile` - Get user profile
   - `add-numbers` - Basic addition
   - `factorial-number` - Calculate factorial

## Available Tools

### Trading Tools

#### Buy Stock
- **Tool Name:** `buy-stock`
- **Parameters:**
  - `stock` (string): Trading symbol (e.g., "RELIANCE")
  - `qty` (number): Quantity to buy
- **Example:** Buy 10 shares of Reliance

#### Sell Stock
- **Tool Name:** `sell-stock`
- **Parameters:**
  - `stock` (string): Trading symbol (e.g., "RELIANCE")
  - `qty` (number): Quantity to sell
- **Example:** Sell 5 shares of Reliance

#### Get Profile
- **Tool Name:** `get-profile`
- **Description:** Retrieve Zerodha account details
- **Returns:** User profile information

### Utility Tools

#### Add Numbers
- **Tool Name:** `add-numbers`
- **Parameters:**
  - `a` (number): First number
  - `b` (number): Second number
- **Example:** Add 5 + 3

#### Factorial
- **Tool Name:** `factorial-number`
- **Parameters:**
  - `a` (number): Number to calculate factorial
- **Example:** Calculate factorial of 5

## Project Structure

```
zerodha-mcp-server/
├── src/
│   ├── index.ts          # MCP server main file
│   ├── trade.ts          # Trading functions
│   ├── access.ts         # Token generation
│   └── test-env.ts       # Environment testing
├── dist/                 # Compiled JavaScript
├── .env                  # Environment variables (not in repo)
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Scripts

```bash
# Build TypeScript to JavaScript
npm run build

# Start the compiled server
npm start

# Development with auto-reload
npm run dev

# Test environment variables
npx ts-node src/test-env.ts

# Generate access token
npx ts-node src/access.ts
```

## Environment Variables

| Variable | Description | Example Format |
|----------|-------------|----------------|
| `ZERODHA_API_KEY` | Your Zerodha API key | `xxxxxxxxxxxxxxx` |
| `ZERODHA_API_SECRET` | Your Zerodha API secret | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `ZERODHA_REQUEST_TOKEN` | Fresh request token | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `ZERODHA_ACCESS_TOKEN` | Generated access token | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

## Troubleshooting

### Environment Variables Not Loading
- Ensure `.env` file is in the project root
- Check for BOM characters in the file
- Verify file encoding is UTF-8

### MCP Server Not Connecting
- Check if the path in Claude Desktop config is correct
- Ensure the server is built (`npm run build`)
- Restart Claude Desktop after configuration changes

### API Token Errors
- Tokens expire after 24 hours
- Generate fresh request token and access token
- Update `.env` file with new tokens

### Build Errors
- Ensure Node.js version is 16 or higher
- Run `npm install` to install dependencies
- Check TypeScript configuration

## Security Notes

- ⚠️ **Never share your actual API credentials**
- ⚠️ **Never commit `.env` file to version control**
- ⚠️ **Use placeholder values in documentation**
- 🔄 **Rotate access tokens regularly**
- 🔐 **Keep API credentials secure**
- 📝 **Use environment variables for all sensitive data**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For issues and questions:
- Check the troubleshooting section
- Review Zerodha API documentation
- Open an issue on GitHub

---

**Happy Trading! 🚀📈**