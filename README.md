# 🏥 Healthcare Booking Web Application

A modern, full-stack healthcare appointment booking system built with React.js and Node.js/Express. Features a responsive design with dark mode support and real-time appointment management.

## 🌐 Live Application

**🎯 Frontend:** [https://healthcare-booking-web.vercel.app](https://healthcare-booking-web.vercel.app)  
**🔧 Backend API:** [https://healthcare-booking-web.onrender.com](https://healthcare-booking-web.onrender.com)

### **Try the Live App:**
- ✅ **Browse doctors** and their specializations
- ✅ **Search and filter** by availability
- ✅ **Book appointments** with real-time validation
- ✅ **Manage appointments** with full CRUD operations
- ✅ **Dark mode** toggle for better UX

## ✨ Features

### 🎯 Core Functionality
- **Doctor Discovery**: Browse and search doctors by name or specialization
- **Doctor Profiles**: Detailed doctor information with availability and time slots
- **Appointment Booking**: Easy booking system with form validation
- **Appointment Management**: View, track, and delete appointments
- **Real-time Data**: Persistent data storage with backend API

### 🎨 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode**: Toggle between light and dark themes
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Loading States**: Smooth loading indicators and error handling
- **Search & Filter**: Find doctors by availability and specialization

### 🔧 Technical Features
- **Full-Stack Architecture**: React frontend + Node.js/Express backend
- **RESTful API**: Complete CRUD operations for doctors and appointments
- **Data Persistence**: File-based storage with JSON files
- **Error Handling**: Comprehensive error states and user feedback
- **Form Validation**: Client-side validation with real-time feedback

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **React Router** - Client-side routing for single-page application
- **Tailwind CSS** - Utility-first CSS framework for styling
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request body parsing middleware

### Development Tools
- **Create React App** - React development environment
- **Nodemon** - Automatic server restart during development
- **npm** - Package manager

## 📁 Project Structure

```
healtcare_booking_web/
├── src/                          # Frontend React application
│   ├── components/               # Reusable UI components
│   │   ├── DoctorCard.js        # Individual doctor display
│   │   ├── DoctorList.js        # Doctor grid layout
│   │   ├── Navbar.js            # Navigation component
│   │   └── SearchBar.js         # Search functionality
│   ├── pages/                   # Application pages
│   │   ├── LandingPage.js       # Home page with doctor list
│   │   ├── DoctorProfilePage.js # Detailed doctor view
│   │   ├── BookAppointmentPage.js # Appointment booking form
│   │   ├── AppointmentsPage.js  # Appointment management
│   │   └── NotFoundPage.js      # 404 error page
│   ├── App.js                   # Main application component
│   └── index.js                 # Application entry point
├── backend/                     # Backend Node.js/Express server
│   ├── routes/                  # API route handlers
│   │   ├── doctors.js          # Doctor-related endpoints
│   │   └── appointments.js     # Appointment-related endpoints
│   ├── data/                   # Data storage
│   │   ├── doctors.json        # Doctor information
│   │   └── appointments.json   # Appointment records
│   └── server.js               # Express server setup
├── public/                     # Static files
│   └── doctors.json            # Frontend doctor data (legacy)
└── README.md                   # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishnu-sairam/healthcare-booking-web.git
   cd healthcare-booking-web
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Running the Application

#### Option 1: Full-Stack (Recommended)
1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on: http://localhost:5000

2. **Start the frontend (in a new terminal)**
   ```bash
   npm start
   ```
   Frontend will run on: http://localhost:3000

#### Option 2: Frontend Only
```bash
npm start
```
Uses static JSON data for demonstration purposes.

## 📡 API Endpoints

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get specific doctor

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Health Check
- `GET /api/health` - Server health status

## 🎯 Usage Guide

### For Patients
1. **Browse Doctors**: Visit the home page to see all available doctors
2. **Search & Filter**: Use the search bar and filters to find specific doctors
3. **View Profile**: Click on a doctor card to see detailed information
4. **Book Appointment**: Select a time slot and fill out the booking form
5. **Manage Appointments**: Visit the appointments page to view or cancel bookings

### For Developers
- **Add Doctors**: Modify `backend/data/doctors.json`
- **Customize UI**: Edit components in `src/components/`
- **Add Features**: Extend the API in `backend/routes/`
- **Styling**: Modify Tailwind classes or add custom CSS

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
```

### Adding New Doctors
Edit `backend/data/doctors.json`:
```json
{
  "id": 7,
  "name": "Dr. New Doctor",
  "specialization": "Specialist",
  "profileImage": "https://randomuser.me/api/portraits/men/45.jpg",
  "availability": "Available Today",
  "details": "Expert in specialized field. 8+ years experience.",
  "slots": [
    "2024-08-10T10:00",
    "2024-08-10T11:00"
  ]
}
```

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Build the application: `npm run build`
2. Deploy the `build` folder to your preferred platform

### Backend Deployment (Railway/Render)
1. Set environment variables
2. Deploy the `backend` folder
3. Update frontend API URLs to point to deployed backend

### Database Migration
For production, consider migrating from JSON files to:
- **MongoDB** - Document database
- **PostgreSQL** - Relational database
- **SQLite** - Lightweight database

## 🐛 Troubleshooting

### Common Issues

**Backend not starting**
- Check if port 5000 is available
- Verify all dependencies are installed
- Check console for error messages

**Frontend can't connect to backend**
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API endpoints are correct

**Data not persisting**
- Check file permissions for `backend/data/`
- Verify JSON files are writable
- Check server logs for file system errors

## 🚧 Challenges Faced and Solutions

### 1. **Tailwind CSS Configuration Issues**
**Challenge**: Initial setup of Tailwind CSS v4 with Create React App caused compatibility issues and PostCSS configuration errors.

**Solution**: 
- Downgraded to Tailwind CSS v3.4.3 for better compatibility
- Updated `postcss.config.js` to use `tailwindcss: {}` instead of `@tailwindcss/postcss`
- Performed clean reinstall of dependencies with `Remove-Item -Recurse -Force node_modules, package-lock.json`

### 2. **PowerShell Command Syntax**
**Challenge**: PowerShell doesn't support `&&` operator for command chaining, causing multiple command execution failures.

**Solution**: 
- Split compound commands into separate terminal calls
- Used individual commands like `cd backend` then `npm install` separately
- Adapted to PowerShell syntax for directory creation and file operations

### 3. **File Serving Path Issues**
**Challenge**: Create React App development server couldn't serve JSON files from `src/data/` directory, causing 404 errors.

**Solution**: 
- Moved `doctors.json` from `src/data/` to `public/` directory
- Updated fetch paths from `/src/data/doctors.json` to `/doctors.json`
- Leveraged Create React App's static file serving from `public/` folder

### 4. **Express.js Version Compatibility**
**Challenge**: Latest Express.js v5.x had compatibility issues with path-to-regexp dependency, causing server startup failures.

**Solution**: 
- Downgraded to Express.js v4.18.2 for stability
- Updated all backend dependencies to compatible versions
- Removed problematic static file serving that was causing path-to-regexp errors

### 5. **Dark Mode Visibility Issues**
**Challenge**: Text elements were not clearly visible in dark mode, especially doctor names and specializations.

**Solution**: 
- Added explicit dark mode classes: `dark:text-white`, `dark:text-gray-200`, `dark:text-gray-300`
- Updated form inputs with proper dark mode styling
- Enhanced contrast for better readability in both light and dark themes

### 6. **API Integration Complexity**
**Challenge**: Transitioning from static JSON files to real backend API required significant frontend refactoring.

**Solution**: 
- Implemented proper error handling with loading states
- Added try-catch blocks for all API calls
- Created user-friendly error messages and retry mechanisms
- Updated all components to handle async data fetching

### 7. **Data Persistence Strategy**
**Challenge**: Choosing between localStorage (frontend-only) vs backend storage for appointments.

**Solution**: 
- Implemented both approaches for flexibility
- Created backend API endpoints for persistent storage
- Maintained localStorage as fallback for frontend-only mode
- Added proper data validation and error handling

### 8. **Component Architecture Decisions**
**Challenge**: Balancing between monolithic components vs over-engineering with too many small components.

**Solution**: 
- Created reusable components for common UI elements (DoctorCard, SearchBar)
- Kept page-level components for specific functionality
- Maintained clear separation of concerns
- Used props for data flow and state management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📝 Future Enhancements

### Planned Features
- [ ] User authentication and authorization
- [ ] Email notifications for appointments
- [ ] Doctor dashboard for managing schedules
- [ ] Payment integration
- [ ] Video consultation support
- [ ] Mobile app development
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Admin panel for hospital management

### Technical Improvements
- [ ] Add TypeScript for better type safety
- [ ] Implement unit and integration tests
- [ ] Add API documentation with Swagger
- [ ] Implement rate limiting and security measures
- [ ] Add logging and monitoring
- [ ] Optimize for performance and SEO

## 👨‍💻 Author

**Vishnu Sai Ram**
- GitHub: [https://github.com/vishnu-sairam](https://github.com/vishnu-sairam)
- LinkedIn: [https://www.linkedin.com/in/vishnu-sairam-400189260](https://www.linkedin.com/in/vishnu-sairam-400189260)

## 🙏 Acknowledgments

- [React.js](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Create React App](https://create-react-app.dev/) - React development environment

---

**⭐ Star this repository if you found it helpful!** 