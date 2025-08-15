import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { placeOrder, getProfile } from "./trade";

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// Add an addition tool
server.registerTool("add-numbers",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// Add an addition tool
server.registerTool("factorial-number",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number() }
  },
  async ({ a }) => {
    let ans = 1;
    for (let i = 1; i <= a; i++) {
      ans *= i;
    }
    return {
      content: [{ type: "text", text: String(ans) }]
    }
  }
);

server.registerTool("buy-stock",
  {
    title: "Buy a stock",
    description: "Buy a stock",
    inputSchema: { stock: z.string(), qty: z.number() }
  },
  async ({ stock, qty }) => {
    try {
      await placeOrder(stock, qty, "BUY");
      return {
        content: [{ type: "text", text: "Order placed for buying " + stock + " quantity: " + qty }]
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: "Error placing buy order: " + (error instanceof Error ? error.message : String(error)) }]
      }
    }
  }
);

server.registerTool("sell-stock",
  {
    title: "Sell a stock",
    description: "Sell a stock",
    inputSchema: { stock: z.string(), qty: z.number() }
  },
  async ({ stock, qty }) => {
    try {
      await placeOrder(stock, qty, "SELL");
      return {
        content: [{ type: "text", text: "Order placed for selling " + stock + " quantity: " + qty }]
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: "Error placing sell order: " + (error instanceof Error ? error.message : String(error)) }]
      }
    }
  }
);

server.registerTool("get-profile",
  {
    title: "Get profile",
    description: "Get user profile from Zerodha",
    inputSchema: {}
  },
  async () => {
    try {
      const profile = await getProfile();
      return {
        content: [{ type: "text", text: JSON.stringify(profile, null, 2) }]
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: "Error getting profile: " + (error instanceof Error ? error.message : String(error)) }]
      }
    }
  }
);

const transport = new StdioServerTransport();
(async () => {
  try {
    await server.connect(transport);
    console.error("Server started");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();