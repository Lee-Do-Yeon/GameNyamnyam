FROM node:16.15.0 as build-stage
WORKDIR /var/jenkins_home/workspace/deploy/front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "dev"]
