# 🌱 EcoGuardian - Smart Plant Monitoring System

**EcoGuardian** is an innovative IoT-based plant monitoring and management system that combines cutting-edge sensor technology with intelligent analytics to optimize plant care and agricultural productivity.

## 🚀 Project Overview

EcoGuardian is a comprehensive web application built with Vue 3, TypeScript, and Vite that provides real-time monitoring and intelligent management of plant environments. The system integrates IoT sensors, data analytics, and user-friendly interfaces to deliver actionable insights for plant care optimization.

### Key Features

- **🔍 Real-time Monitoring**: Continuous tracking of plant health metrics including soil moisture, temperature, light levels, and environmental conditions
- **📊 Advanced Analytics**: Comprehensive dashboard with interactive charts and data visualization using Chart.js
- **🚨 Smart Alerts**: Intelligent notification system for plant care reminders and critical status alerts
- **💼 Multi-tier Subscriptions**: Flexible plans for domestic users, specialists, and enterprise clients
- **🔧 Device Management**: Complete IoT sensor lifecycle management and configuration
- **📱 Responsive Design**: Modern UI built with PrimeVue and Tailwind CSS for optimal user experience
- **🌐 CRM Integration**: External plant care consulting services and expert recommendations
- **💳 Payment Integration**: Secure payment processing with Stripe for subscription management
- **📋 Order Planning**: Streamlined installation scheduling and service management

## 🏗️ Architecture

The application follows a **Domain-Driven Design (DDD)** architecture with clear separation of concerns:

### Core Modules

- **📈 Analytics**: Data visualization and reporting capabilities
- **👤 IAM (Identity & Access Management)**: User authentication and authorization
- **📦 Inventory**: Device and sensor management
- **👁️ Monitoring**: Real-time plant health monitoring
- **💰 Payment**: Subscription and payment processing
- **📅 Planning**: Installation scheduling and service planning
- **👤 Profile**: User profile management and preferences
- **🏪 CRM**: Customer relationship management and consulting services
- **📊 Resources**: Shared resources and utilities

### Technical Stack

- **Frontend**: Vue 3 with Composition API and `<script setup>`
- **Language**: TypeScript for type safety and better developer experience
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: PrimeVue with PrimeIcons for rich UI components
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Pinia for reactive state management
- **Routing**: Vue Router for SPA navigation
- **HTTP Client**: Axios for API communication
- **Form Validation**: Vee-Validate with Yup schemas
- **Charts**: Chart.js for data visualization
- **Payment**: Stripe integration for secure payments
- **Mock API**: JSON Server for development and testing

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eco-guardian-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Start the mock API server** (in a separate terminal)
   ```bash
   npm run json-server
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run json-server` - Start mock API server on port 3000

## 📱 User Roles & Features

### 🏠 Domestic Users
- Basic plant monitoring dashboard
- Personal plant care tracking
- Basic alert notifications
- Mobile-responsive interface

### 🔬 Specialists
- Advanced analytics and reporting
- Multiple client management
- Professional consulting tools
- Enhanced monitoring capabilities

### 🏢 Enterprise
- Multi-location monitoring
- Advanced data analytics
- Custom reporting and insights
- Priority support and consulting

## 🔧 IoT Integration

### Sensor Types
- **Soil Moisture Sensors**: Monitor water levels and irrigation needs
- **Temperature Sensors**: Track environmental temperature conditions
- **Light Sensors**: Measure light exposure and optimization
- **pH Sensors**: Soil acidity and nutrient monitoring
- **Humidity Sensors**: Environmental humidity tracking

### Data Collection
- Real-time sensor data aggregation
- Historical data analysis and trends
- Predictive analytics for plant care
- Automated threshold monitoring and alerts

## 📊 Dashboard Features

### Analytics Dashboard
- Interactive charts and graphs
- Real-time sensor data visualization
- Historical trend analysis
- Performance metrics and KPIs

### Monitoring Interface
- Live plant status indicators
- Environmental condition tracking
- Alert management system
- Device connectivity status

## 🔐 Security & Authentication

- Secure user authentication system
- Role-based access control (RBAC)
- Protected routes and API endpoints
- Session management and security

## 🎨 UI/UX Design

The application features a modern, intuitive interface with:
- Clean, professional design aesthetic
- Responsive layout for all devices
- Consistent color scheme and branding
- Accessibility-focused components
- Interactive data visualizations

## 📈 Future Enhancements

- **AI-Powered Recommendations**: Machine learning for plant care optimization
- **Mobile App**: Native mobile applications for iOS and Android
- **Advanced IoT Integration**: Support for additional sensor types and protocols
- **Social Features**: Community sharing and expert consultation
- **Advanced Analytics**: Predictive modeling and trend analysis

## 🤝 Contributing

We welcome contributions to the EcoGuardian project! Please follow our contribution guidelines and coding standards.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔧 Technical Reference

This project uses Vue 3 with TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
