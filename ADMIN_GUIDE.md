# Admin Dashboard - User Guide

## Overview
The admin dashboard provides a complete content management system (CMS) for managing all aspects of the Pride Rock property development website.

## Access
- **URL**: `/admin`
- **Login Required**: Yes (will need to implement authentication middleware)

## Dashboard Sections

### 1. Dashboard Home (`/admin`)
The main overview page displaying:
- **Statistics Cards**: Quick view of content counts
  - Carousel Slides count
  - Total Projects
  - Team Members
  - Page Views
- **Quick Actions**: Fast access to common tasks
- **Recent Activity**: Log of recent content changes

### 2. Hero Carousel (`/admin/hero`)
Manage the homepage banner carousel:
- **Features**:
  - Add new slides with image, title, location, status, and description
  - Edit existing slides
  - Delete slides
  - Visual preview of each slide
- **Status Options**: TRADING, DEVELOPMENT, COMPLETED, COMING SOON

### 3. Categories (`/admin/categories`)
Manage property category tiles:
- **5 Categories**: Office, Retail, Industrial, Residential, Motor & Other
- **Edit Fields**:
  - Category title
  - Background image
  - Link destination
- **Visual Preview**: See how categories appear on homepage

### 4. About Section (`/admin/about`)
Manage company information:
- **Main Content**:
  - Section title
  - Subtitle
  - Description paragraph
  - Featured image with preview
- **Features List**:
  - Add/remove feature bullet points
  - Reorder features
- **Statistics**:
  - Update 4 stat cards (Years Experience, Developments, Cities, Value)
  - Edit value, label, and suffix for each

### 5. Projects (`/admin/projects`)
Complete project portfolio management:
- **CRUD Operations**: Create, Read, Update, Delete
- **Project Fields**:
  - Title
  - Type (Commercial, Retail, Industrial, Residential, Mixed-Use)
  - Location
  - Status (Completed, Under Construction, Coming Soon, Planning)
  - Featured image
- **Statistics Dashboard**: Count by project type
- **Grid View**: Visual card layout

### 6. Services (`/admin/services`)
Manage company services:
- **Service Details**:
  - Title
  - Description
  - Icon name (from Lucide React library)
  - Background image
- **Operations**: Add, edit, delete services
- **Card Layout**: Visual representation with images

### 7. Team Members (`/admin/team`)
Manage team profiles:
- **Member Information**:
  - Full name
  - Role/Position
  - Profile photo
- **Grid Display**: Professional card layout
- **Operations**: Add, edit, remove team members

## Key Features

### Navigation
- **Collapsible Sidebar**: 
  - Click arrow to collapse/expand
  - Icons remain visible when collapsed
  - Active page highlighted in amber
- **Top Bar**:
  - View Site link (opens main site in new tab)
  - User profile indicator
  - Logout button

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Changes reflect immediately in UI
- **Form Validation**: Required fields prevent empty submissions
- **Confirmation Dialogs**: Prevent accidental deletions
- **Visual Feedback**: Hover states, loading indicators
- **Consistent Styling**: Amber/slate color scheme throughout

### UI Components
- **Forms**: Text inputs, textareas, select dropdowns
- **Buttons**: Primary (amber), secondary (slate), danger (red)
- **Cards**: Clean, shadowed containers with hover effects
- **Icons**: Lucide React icon library integration
- **Grid Layouts**: Responsive columns that adapt to screen size

## Color Scheme
- **Primary**: Amber 600/700 for CTAs and active states
- **Background**: Slate 50 for main content area
- **Sidebar**: Slate 900 (dark)
- **Text**: Slate 900 (dark), 600/700 (medium), 400 (light)
- **Borders**: Slate 200/300
- **Success**: Green 500
- **Warning**: Amber 500
- **Danger**: Red 600

## Technical Notes
- Built with Next.js 14+ and React Server Components
- Uses Tailwind CSS for styling
- State management with React useState hooks
- Currently uses mock data (utilities/mockData.ts)
- Ready for MongoDB integration

## Next Implementation Steps
1. Add authentication middleware to protect routes
2. Connect forms to API endpoints
3. Save changes to MongoDB database
4. Add image upload functionality
5. Implement user roles and permissions
6. Add activity logging
7. Create data export features

## File Structure
```
app/
├── admin/
│   ├── layout.tsx          # Sidebar & top bar layout
│   ├── page.tsx            # Dashboard overview
│   ├── hero/
│   │   └── page.tsx        # Hero carousel management
│   ├── categories/
│   │   └── page.tsx        # Categories management
│   ├── about/
│   │   └── page.tsx        # About section management
│   ├── projects/
│   │   └── page.tsx        # Projects management
│   ├── services/
│   │   └── page.tsx        # Services management
│   └── team/
│       └── page.tsx        # Team management
```

## Usage Tips
1. **Start with Dashboard**: Get overview before making changes
2. **Save Frequently**: Use save buttons after edits
3. **Preview Images**: Paste URLs and check preview before saving
4. **Consistent Sizing**: Use similar image dimensions for best results
5. **Mobile Check**: Test changes on mobile devices
6. **Backup Data**: Export/backup before major changes (once implemented)
