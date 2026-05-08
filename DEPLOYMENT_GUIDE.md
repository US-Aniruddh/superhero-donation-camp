# Deployment & Database Setup Guide

This project has been refactored to support **Vercel Free Tier** hosting with **MongoDB Atlas** for persistent data storage.

---

## 1. MongoDB Atlas Setup (Free Tier)

1.  **Create Account**: Sign up at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas/register).
2.  **Create Cluster**: Select the "FREE" Shared Tier.
3.  **Database Access**:
    *   Create a Database User.
    *   **Keep the password safe** (you will need it for the connection string).
4.  **Network Access**:
    *   Add IP Address `0.0.0.0/0` (Allow access from anywhere) to allow Vercel serverless functions to connect.
5.  **Get Connection String**:
    *   Click "Connect" -> "Drivers" -> "Node.js".
    *   Copy the URI (looks like `mongodb+srv://<user>:<password>@cluster.mongodb.net/?...`).

---

## 2. Environment Variables

Create or update your `.env` file (locally) and add these to Vercel's Environment Variables settings:

```env
# MongoDB Connection String (Replace <password> with your actual DB user password)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/superhero_db?retryWrites=true&w=majority

# Your UPI ID for payments
VITE_UPI_ID=yourname@okaxis
```

---

## 3. Vercel Deployment

1.  **Install Vercel CLI** (Optional): `npm i -g vercel`
2.  **Deploy**:
    *   Run `vercel` in the project root.
    *   Follow the prompts to link your project.
3.  **Add Env Vars**:
    *   Go to your project dashboard on [vercel.com](https://vercel.com).
    *   Settings -> Environment Variables.
    *   Add `MONGODB_URI` and `VITE_UPI_ID`.
4.  **Redeploy**: If you added env vars after the first deployment, trigger a new deployment to apply them.

---

## 4. Project Structure (Updated)

*   `/api`: Vercel serverless functions (Node.js).
*   `/lib/mongodb.js`: Shared database connection and Mongoose models.
*   `/src`: Frontend React code (Vite).
*   `vercel.json`: Routing configuration.

---

## 5. Troubleshooting

*   **"Connection Timeout"**: Ensure your MongoDB Atlas IP Whitelist includes `0.0.0.0/0`.
*   **"Internal Server Error"**: Check Vercel logs (`vercel logs`) to see the exact error from the serverless function.
*   **"Module Not Found"**: Ensure all dependencies are in `package.json` (I've added `mongoose` and `axios`).
*   **Data Not Updating**: Check if the `MONGODB_URI` is correct and the database user has write permissions.

---

## 6. Local Development

To run the project locally with the new architecture:

1.  Run `npm install`.
2.  Ensure `.env` has a valid `MONGODB_URI`.
3.  Run `npm run dev`.
    *   *Note: Vite handles the `/api` routes locally during development if configured, but for best experience, use `vercel dev` if you have the CLI installed.*
