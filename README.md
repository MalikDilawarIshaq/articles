News Aggregator - React.js with Tailwind CSS

This project is a News Aggregator application built using React.js and Tailwind CSS. The application is containerized using Docker for easy deployment and consistency across different environments.

Prerequisites
Before running the project, ensure that you have the following installed:

Node.js: Download and install from Node.js.
Docker: Download and install from Docker.

Installation

Clone the Repository: https://github.com/MalikDilawarIshaq/articles
git clone https://github.com/yourusername/news-aggregator.git
cd news-aggregator

Install Dependencies:
npm install

Running the Project within a Docker Container
Step 1: Build the Docker Image
  Navigate to the root directory of the project (where the Dockerfile is located) and build the Docker image:
  docker build -t news-aggregator .

Step 2: Run the Docker Container
  After building the image, run the Docker container with the following command:
  docker run -d -p 80:80 --name my-react-app news-aggregator

This command runs the Docker container in detached mode and maps port 80 of the container to port 80 on your local machine.

Step 3: Access the Application
  Once the container is running, access the application in your web browser:  http://localhost:80

ENV
REACT_APP_NEWS_API_KEY=63468a688e514b9b810a07ddeba400fa
REACT_APP_GUARDIAN_API_KEY=67a603c7-4704-4ac2-a100-994118ac5878
REACT_APP_NEWS_DATA_IO=pub_5074041d4d40d60741c12fc5b88f4356b3a29

  
