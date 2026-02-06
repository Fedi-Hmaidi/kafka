# 🚀 Kafka Microservices Project

Welcome to the **Kafka Microservices Project**! This repository hosts a robust architecture demonstrating microservices communication using Apache Kafka and BPMN for process orchestration.

## 📂 Project Structure

The project is organized into several key components, each serving a specific purpose in the architecture:

- **📊 [analytic-service](./analytic-service)**  
  Handles data analytics and processing tasks. It consumes events to generate insights.

- **💳 [payment-service](./payment-service)**  
  Manages payment processing transactions. It ensures secure and reliable payment flows.

- **🌐 [frontend](./frontend)**  
  The user interface application. Provides a visual interaction layer for the services.

- **🔄 [bpmn-demo](./bpmn-demo)**  
  A demonstration of Business Process Model and Notation (BPMN) integration. Shows how business processes are orchestrated.

- **⚙️ [kafka](./kafka)**  
  Contains Kafka configuration files, scripts, and administrative tools for managing the message broker.

## 🛠️ Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/) (for running Kafka)
- [Git](https://git-scm.com/)

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:Fedi-Hmaidi/kafka.git
    cd kafka
    ```

2.  **Start Kafka:**
    Navigate to the `kafka` directory and start the services using Docker Compose.
    ```bash
    cd kafka
    docker-compose up -d
    ```

3.  **Run Services:**
    Navigate to each service directory (`analytic-service`, `payment-service`) and install dependencies:
    ```bash
    npm install
    npm start
    ```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

*Generated for the Kafka Project.*
