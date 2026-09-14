FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "start"]
