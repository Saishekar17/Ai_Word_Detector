
# Base image with Node.js installed
FROM node:18 AS base

# Set working directory
WORKDIR /app

# Copy lock files and install dependencies
COPY package*.json ./
RUN npm ci

# Build the application
RUN npm run build

# Production image setup
FROM base AS runner
WORKDIR /app

# Create user and group for running the app
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Copy built assets and set permissions
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public

# Switch to the 'nextjs' user
USER nextjs

# Expose port and set environment variables
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME 0.0.0.0

# Run the server
CMD ["node", "server.js"]
