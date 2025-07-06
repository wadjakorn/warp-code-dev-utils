# Deployment Guide

## Portainer Stack Deployment

This application can be deployed as a Docker stack in Portainer.

### Prerequisites

- Portainer running on your Docker host
- Access to this GitHub repository from Portainer

### Deployment Steps

1. **Access Portainer**
   - Open your Portainer web interface
   - Navigate to "Stacks"

2. **Create New Stack**
   - Click "Add stack"
   - Choose "Repository" as the build method
   - Enter the GitHub repository URL
   - Set the compose file path to `docker-compose.yml`

3. **Environment Variables (Optional)**
   - `APP_PORT`: Port to expose the application (default: 80)

4. **Deploy**
   - Click "Deploy the stack"
   - Wait for the build and deployment to complete

### Accessing the Application

The application will be available at:
- `http://your-docker-host:PORT` (where PORT is your configured APP_PORT or 80)

### Stack Configuration

The stack includes:
- **dev-utilities**: React application served via nginx
- **Production build**: Optimized static files
- **Auto-restart**: Container restarts unless manually stopped

### Troubleshooting

- Check container logs in Portainer if deployment fails
- Ensure port is not in use by another service
- Verify repository access and build process