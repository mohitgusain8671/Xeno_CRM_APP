# Campaign Craft CRM

A comprehensive CRM system designed for campaign management and customer engagement. Campaign Craft provides powerful tools for managing campaigns and analyzing performance metrics.

## 🔗 Repository
- **GitHub Repository**: [https://github.com/mohitgusain8671/Xeno_CRM_APP](https://github.com/mohitgusain8671/Xeno_CRM_APP)
- **Frontend & Backend**: Full-stack application with separate frontend and backend components

## 🌐 Archtitecture Diagram
- Link: [Archtitecture Diagram](https://app.eraser.io/workspace/JpETywDOm72rYytaAOMg)

## POSTMAN LINK 
- I have provided documentation below for Ingestion APIS
- [Postman Collection](https://www.postman.com/agrominds/workspace/xeno-assignment/collection/33335146-6886795c-4167-4918-a360-60ec27dd8a56?action=share&creator=33335146)

## 🚀 Tech Stack

### Frontend
- **React.js** - Component-based UI library for building interactive user interfaces
- **Zustand** - State management library for managing application state
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Axios** - HTTP client for API communication
- **React Router Dom** - Client-side routing library for navigating between application routes
- **Lucide React** - Icon library for adding visual elements to the application

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Minimal web framework for building RESTful APIs
- **MongoDB** - NoSQL database for flexible data storage and scalability
- **Mongoose** - ODM for MongoDB providing schema validation and query building
- **JWT (JSON Web Tokens)** - Secure authentication and authorization
- **passport and passport-google-oauth20** - Authentication middleware for Google OAuth 2.0
- **redis** - Using Redis for providing pub-sub arcchtitecture
- **axios** - HTTP client for API communication
- **cors** - CORS middleware for enabling cross-origin resource sharing

### 🤖 AI Tools Integration

- #### OpenRouter API
    - Campaign Craft leverages **OpenRouter API** to provide intelligent campaign insights and recommendations powered by advanced language models.
    - It is Free to use without providing any billing details.


- #### Features
    - **Campaign Summary Generation**: Automatically generate comprehensive summaries of campaign performance
    - **Smart Recommendations**: AI-powered suggestions for campaign optimization.

### Why This Tech Stack?
- **Scalability**: MongoDB and Node.js handle high traffic and data volume efficiently
- **Development Speed**: React and Express.js enable rapid prototyping and development
- **Security**: JWT and Google Oauth2.0 ensure secure user authentication and data protection
- **Maintainability**: Modern JavaScript stack with strong community support

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Redis (local or cloud instance)
- Git

### Clone Repository
```bash
git clone https://github.com/mohitgusain8671/Xeno_CRM_APP.git
cd Xeno_CRM_APP
```

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env
```

4. **Configure environment variables** (see Backend Environment Configuration below)

5. **Start the backend server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:3000` (or in speciified Port)

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env
```

4. **Configure environment variables** (see Frontend Environment Configuration below)

5. **Start the frontend development server**
```bash
npm run dev
```

The frontend application will run on `http://localhost:5173` by default

## ⚙️ Environment Configuration

### Backend Environment Variables (.env)
```env
# Server Configuration
PORT=3000
NODE_ENV='development'

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/campaign_craft
# OR for MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campaign_craft

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Google OAuth Client Credentials (Setup Google Oauth first)
CLIENT_ID = 'Your Client Id'
CLIENT_SECRET = 'Your Client Secret'
REDIRECT_URI = '{backendUrl}/auth/google/callback'

# Urls (remove slash at the end)
HOST = 'Backend URL'
ORIGIN = 'Frontend URL'


# Redis (for caching - optional)
REDIS_URL=redis://localhost:6379

# Open Router API Key
API_KEY = "ADD Your Api Key"
```

### Frontend Environment Variables (.env.local)
```env
    # Urls (remove slash at the end)
    VITE_SERVER_URL = "backendurl"
```

## 🔌 Ingestion API Documentation

### Base URL: `http://localhost:3000`

### 1. Customer Data Ingestion
- **URL**: `/api/v1/customer`
- **Method**: `POST`
- **Function**: Add Customer Data
- **Parameters**: No params
- **Request Body**:
```json
{
    "name": "John Doe 1",
    "email": "johndoe1618@gmail.com",
    "phone": "9667894066"
}
```
- **Response Body**: ` Status Code 202 `
```json
{
    "status": "Processing",
    "message": "Customer data accepted"
}
```

### 2. Get Customer Data
- **URL**: `/api/v1/customer`
- **Method**: `GET`
- **Function**: Get All Customer Data
- **Parameters**: No params
- **Request Body**: No body
- **Response Body**: `Status Code 200`
```json
{
    "success": true,
    "message": "Customers fetched successfully",
    "users": [
        {
            "_id": "683c653d4d2e79b77fe05b16",
            "name": "Mohit Gusain",
            "email": "mohitgusain8671@gmail.com",
            "phone": "9667897066",
            "lastOrder": "2025-05-19T13:18:27.851Z",
            "visitCount": 0,
            "totalSpend": 177288,
            "totalOrders": 7,
            "avgOrderValue": 25326.86,
            "lastVisit": "2025-06-01T14:35:41.490Z",
            "createdAt": "2025-06-01T14:35:41.493Z",
            "updatedAt": "2025-06-02T13:18:27.888Z"
        },
        {
            "_id": "683c667a2b1cab20f026f365",
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "phone": "9667895066",
            "lastOrder": "2025-06-01T13:18:27.925Z",
            "visitCount": 0,
            "totalSpend": 249000,
            "totalOrders": 7,
            "avgOrderValue": 35571.43,
            "lastVisit": "2025-06-01T14:40:58.872Z",
            "createdAt": "2025-06-01T14:40:58.877Z",
            "updatedAt": "2025-06-02T13:18:28.131Z"
        },
    ]
}
```

### 3. Get Customer Data by ID
- **URL**: `/api/v1/customer/:id`
- **Method**: `GET`
- **Function**: Get a Customer By its Id
- **Parameters**: `id` (string)
- **Request Body**: No body
- **Response Body**: `Status Code 200`
```json
{
    "success": true,
    "message": "Customer fetched successfully",
    "user": {
        "_id": "683c653d4d2e79b77fe05b16",
        "name": "Mohit Gusain",
        "email": "mohitgusain8671@gmail.com",
        "phone": "9667897066",
        "lastOrder": "2025-05-19T13:18:27.851Z",
        "visitCount": 0,
        "totalSpend": 177288,
        "totalOrders": 7,
        "avgOrderValue": 25326.86,
        "lastVisit": "2025-06-01T14:35:41.490Z",
        "createdAt": "2025-06-01T14:35:41.493Z",
        "updatedAt": "2025-06-02T13:18:27.888Z"
    }
}
```

### 4. Update Visit Status of Customer
- **URL**: `/api/v1/customer/:id/visit`
- **Method**: `PUT`
- **Function**: Update the lastVisit and visit Count of a Customer (visit count updated only if lastVisit and curr date not same)
- **Parameters**: `id` (string)
- **Request Body**: No body
- **Response Body**: `Status Code 200`
```json
{
    "success": true,
    "message": "Customer visit status updated successfully",
    "user": {
        "_id": "683da3263ecc8d6ebff7bc03",
        "name": "Customer 2",
        "email": "customer2@example.com",
        "phone": "9999900002",
        "lastVisit": "2025-06-03T05:53:14.609Z",
        "lastOrder": "2025-05-29T13:18:28.460Z",
        "visitCount": 56,
        "totalSpend": 145500,
        "totalOrders": 5,
        "avgOrderValue": 29100,
        "createdAt": "2025-06-02T13:12:06.400Z",
        "updatedAt": "2025-06-03T05:53:14.614Z"
    }
}
```

### 5. Order Data Ingestion
- **URL**: `/api/v1/orders`
- **Method**: `POST`
- **Function**: Add Order 
- **Parameters**: No Param
- **Request Body**:
```json
{
    "customer": "683da3263ecc8d6ebff7bc03",
    "totalAmount": 30000,
    "status": "PENDING",
    "items": [
        {
            "productId": "pid04",
            "name": "Nothing 2a",
            "quantity": 1,
            "price": 30000
        }
    ]
}
```
- **Response Body**: `Status Code 202`
```json
{
    "status": "Processing",
    "message": "Order data accepted"
}
```

### 6. Get All Order Data
- **URL**: `/api/v1/orders`
- **Method**: `GET`
- **Function**: Get all orders
- **Parameters**: No params
- **Request Body**: No body
- **Response Body**:
```json
{
    "success": true,
    "message": "Orders fetched successfully",
    "orders": [
        {
            "_id": "683c65504d2e79b77fe05b1a",
            "customerId": {
                "_id": "683c653d4d2e79b77fe05b16",
                "name": "Mohit Gusain",
                "email": "mohitgusain8671@gmail.com",
                "phone": "9667897066"
            },
            "orderDate": "2025-06-01T14:36:00.453Z",
            "totalAmount": 33500,
            "items": [
                {
                    "productId": "pid04",
                    "name": "Nothing 2a",
                    "quantity": 1,
                    "price": 30000,
                    "_id": "683c65504d2e79b77fe05b1b"
                },
                {
                    "productId": "pid02",
                    "name": "Trimmer",
                    "quantity": 2,
                    "price": 3500,
                    "_id": "683c65504d2e79b77fe05b1c"
                }
            ],
            "status": "COMPLETED",
            "createdAt": "2025-06-01T14:36:00.461Z",
            "updatedAt": "2025-06-01T14:50:38.856Z"
        },
        {
            "_id": "683c66ab2b1cab20f026f36a",
            "customerId": {
                "_id": "683c667a2b1cab20f026f365",
                "name": "John Doe",
                "email": "johndoe@gmail.com",
                "phone": "9667895066"
            },
            "orderDate": "2025-06-01T14:41:47.349Z",
            "totalAmount": 30000,
            "items": [
                {
                    "productId": "pid04",
                    "name": "Nothing 2a",
                    "quantity": 1,
                    "price": 30000,
                    "_id": "683c66ab2b1cab20f026f36b"
                }
            ],
            "status": "PENDING",
            "createdAt": "2025-06-01T14:41:47.364Z",
            "updatedAt": "2025-06-01T14:41:47.364Z"
        },
    ]
}
```

### 7. Get All Orders by Customer ID
- **URL**: `/api/v1/orders/customer/:customerId`
- **Method**: `GET`
- **Function**: retrieve all order of a specific customer by ID
- **Parameters**: `customerId` (string)
- **Request Body**: 
- **Response Body**:
```json
{
    "success": true,
    "message": "Orders fetched successfully",
    "orders": [
        {
            "_id": "683c65504d2e79b77fe05b1a",
            "customerId": {
                "_id": "683c653d4d2e79b77fe05b16",
                "name": "Mohit Gusain",
                "email": "mohitgusain8671@gmail.com",
                "phone": "9667897066"
            },
            "orderDate": "2025-06-01T14:36:00.453Z",
            "totalAmount": 33500,
            "items": [
                {
                    "productId": "pid04",
                    "name": "Nothing 2a",
                    "quantity": 1,
                    "price": 30000,
                    "_id": "683c65504d2e79b77fe05b1b"
                },
                {
                    "productId": "pid02",
                    "name": "Trimmer",
                    "quantity": 2,
                    "price": 3500,
                    "_id": "683c65504d2e79b77fe05b1c"
                }
            ],
            "status": "COMPLETED",
            "createdAt": "2025-06-01T14:36:00.461Z",
            "updatedAt": "2025-06-01T14:50:38.856Z"
        },
        ...
    ]
}
```

### 8. Get a Specific Order by Order ID
- **URL**: `/api/v1/orders/:id`
- **Method**: `GET`
- **Function**: retrieve a specific order by ID
- **Parameters**: `id` (string)
- **Request Body**: 
- **Response Body**:
```json
{
    "success": true,
    "message": "Order fetched successfully",
    "order": {
        "_id": "683c65504d2e79b77fe05b1a",
        "customerId": {
            "_id": "683c653d4d2e79b77fe05b16",
            "name": "Mohit Gusain",
            "email": "mohitgusain8671@gmail.com",
            "phone": "9667897066"
        },
        "orderDate": "2025-06-01T14:36:00.453Z",
        "totalAmount": 33500,
        "items": [
            {
                "productId": "pid04",
                "name": "Nothing 2a",
                "quantity": 1,
                "price": 30000,
                "_id": "683c65504d2e79b77fe05b1b"
            },
            {
                "productId": "pid02",
                "name": "Trimmer",
                "quantity": 2,
                "price": 3500,
                "_id": "683c65504d2e79b77fe05b1c"
            }
        ],
        "status": "COMPLETED",
        "createdAt": "2025-06-01T14:36:00.461Z",
        "updatedAt": "2025-06-01T14:50:38.856Z"
    }
}
```

#### 9. Update Status of an Order
- **URL**: `/api/v1/orders/:id/status`
- **Method**: `PUT`
- **Function**: update the status of an order
- **Parameters**: `id` (string)
- **Request Body**:
```json
{
    "status": "PENDING" // or "COMPLETED" or "CANCELLED"
}
```
- **Response Body**:
```json
{
    "success": true,
    "message": "Order status updated successfully",
    "order": {
        "_id": "683da4a3204883d07045b909",
        "customerId": "683c653d4d2e79b77fe05b16",
        "orderDate": "2025-05-19T13:18:27.851Z",
        "totalAmount": 9072,
        "items": [
            {
                "productId": "p2",
                "name": "Product B",
                "quantity": 3,
                "price": 3024,
                "_id": "683da4a3204883d07045b90a"
            }
        ],
        "status": "PENDING",
        "createdAt": "2025-06-02T13:18:27.852Z",
        "updatedAt": "2025-06-03T06:04:41.218Z"
    }
}
```
### Other Apis 

- There are other APIs available for creating campaigns, getting all campaigns, getting campaigns of particular user, deleting a campaign, Initiate a Campaign, Generate AI Summary

- All These API's are secured and only accessible by logged in users

- And there are also dummy vendor api to sent dummy messages of campaign. and then storing status of messages in Log Table in database using a reciept endpoint (These Two Apis are accesible in backend only)


## ✨ Features
- **Campaign Creation**: Create new campaigns with custom settings and targeting options.
- **Define Targeting Audience**: Define audience targeting based on different parameters like their total Spend, inactivity , order Value etc.
- **Initiate Campaign**: Initiate a campaign with the defined settings and targeting audience.
- **Generate AI Summary for your own campaigns**: Generate AI summary for your own campaigns to get insights on performance and make data-driven decisions.


## 📱 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Intuitive Interface**: Clean, modern UI designed for productivity
- **Google Sign In**: Seamless authentication with Google accounts
- **Add New Campaign**: Quick campaign creation.
- **AI Generated Summary For Campaign**: AI generated summary for campaign.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---