# Radmin Proxy Server

This project sets up a simple HTTP proxy server using Node.js, which bridges a RADMIN VPN connection to a local network. This allows devices on the local network, such as phones, to access a web server running on the RADMIN VPN.

## Functionality

The proxy server listens for incoming HTTP requests on a specified port and forwards them to a target server running on the RADMIN VPN. If there is an error in the proxying process, the server responds with a "Bad Gateway" error.

## How to Run the Code

### Prerequisites

- Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

- RADMIN VPN connected and running.

### Steps

1.  **Clone the Repository**

Clone the repo using:

```sh

git clone https://github.com/sukirtharajan18/radmin-proxy.git

```

2.  **Install Dependencies**

Navigate to the project directory and install the required dependencies:

```sh

cd radmin-proxy
npm install

```

3.  **Configure the Target URL**

In the `server.js` file, replace the placeholder `http://radmin-ip:8096` with the actual IP address and port of your web server on the RADMIN VPN.

4.  **Start the Proxy Server**

Start the proxy server using the npm start script:

```sh

npm start

```

You should see the following message indicating that the proxy server is running:

```sh

Proxy server is running on port 8080

```

5.  **Access the Web Server from Your Phone**

- Ensure your phone is connected to the same local network (Wi-Fi) as your computer.

- Open a web browser on your phone.

- Enter the local IP address of your computer and the port number of the proxy server. For example: `http://192.168.1.xxx:8080`.

By following these steps, you can bridge the RADMIN VPN connection to your local network, allowing devices on the local network to access the web server running on the RADMIN VPN.
