# Nahaz - Personal Portfolio

A modern, responsive portfolio website showcasing my journey as a Full-Stack Developer. Built with React, TypeScript, and Tailwind CSS.

🌐 **Live Demo**: [https://nahaz.vercel.app/](https://nahaz.vercel.app/)

![Portfolio Screenshot](https://i.ibb.co.com/B2zzDXDJ/Screenshot-2025-09-01-at-7-20-17-PM.png)

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Sections**: Dynamic hero section with rotating roles
- **Project Showcase**: Filterable portfolio with category-based navigation
- **Skills Visualization**: Interactive skill bars with categorized expertise
- **Contact Form**: Functional contact form with validation
- **Dark Theme**: Modern dark color scheme with accent colors
- **Smooth Navigation**: Scroll-based navigation with active section highlighting

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **React Router** - Client-side routing
- **Lucide React** - Modern icon library
- **Radix UI** - Accessible UI primitives

### Build Tools

- **Vite** - Fast build tool and development server
- **PostCSS** - CSS processing
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking

### Deployment

- **Vercel** - Hosting and deployment

## 📱 Sections

### Hero Section

- Dynamic role rotation (Full Stack Developer, UI/UX Designer, React Specialist, Problem Solver)
- Animated background elements
- Social media links
- Call-to-action buttons

### About Section

- Personal introduction and background
- Skills overview with progress bars
- Educational timeline
- Contact information

### Skills Section

- Categorized technical skills:

  - Frontend Development
  - Backend Development
  - Database Management
  - Tools & DevOps
  - Design

### Projects Section

- Featured project portfolio
- Category filtering (Web Apps, Social Impact, Business, etc.)
- Live demo and GitHub links
- Technology stack display

### Contact Section

- Contact form with validation
- Service selection dropdown
- Contact information cards
- Response status feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash

   git clone https://github.com/your-username/portfolio.git

   cd portfolio

   ```

```


2. **Install dependencies**

   ```bash

   npm install

```

3. **Start development server**

   ```bash

   npm run dev

   ```

```


4. **Open browser**

   Navigate to `http://localhost:5173`


### Build for Production


```bash

npm run build

```

### Preview Production Build

```bash

npm run preview

```

## 📂 Project Structure

```

src/

├── app/

│   ├── data/

│   │   └── site.ts          # Site configuration and data

│   ├── pages/

│   │   └── Home.tsx         # Main home page

│   └── router/

│       └── index.tsx        # Router configuration

├── components/

│   ├── layout/

│   │   ├── Navbar.tsx       # Navigation component

│   │   └── Footer.tsx       # Footer component

│   ├── section/

│   │   ├── Hero.tsx         # Hero section

│   │   ├── About.tsx        # About section

│   │   ├── Skills.tsx       # Skills section

│   │   ├── Project.tsx      # Projects section

│   │   └── Contact.tsx      # Contact section

│   └── ui/                  # Reusable UI components

├── lib/

│   └── utils.ts             # Utility functions

├── App.tsx                  # Main App component

├── main.tsx                 # Entry point

└── index.css                # Global styles

```

## 🎨 Customization

### Personal Information

Update the site configuration in `src/app/data/site.ts`:

```typescript

exportconst site ={

  brand:'Your Brand',

  name:'Your Name',

  title:'Your Title',

  email:'your.email@example.com',

// ... other personal information

}

```

### Adding Projects

Add new projects to the `projects` array in the site configuration:

```typescript

{

  id:1,

  title:'Project Title',

  description:'Project description...',

  technologies:['React','Node.js','MongoDB'],

  image:'project-image-url',

  demoLink:'demo-url',

  githubLink:'github-url',

  status:'Completed',

  date:'2024',

  category:'Web Apps',

  featured:true

}

```

### Styling

The project uses a custom color scheme defined in `src/index.css`. Modify the CSS variables to change the theme:

```css

:root{

--background:oklch(0.14500);

--foreground:oklch(0.98500);

--primary:oklch(0.650.25300);

/* ... other color variables */

}

```

## 📊 Skills Categories

- **Frontend**: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js, RESTful APIs, JWT Authentication
- **Database**: MongoDB, PostgreSQL, Firebase, Mongoose
- **Tools**: Git, GitHub, VS Code, Docker, Vercel, Netlify
- **Design**: Figma, UI/UX Design, Responsive Design, Prototyping

## 🌟 Featured Projects

1. **FastBox** - Parcel Delivery System
2. **EcoUnity** - Food Distribution Platform
3. **Readora** - Library Management System
4. **Bistro Boss** - Restaurant Platform
5. **Real Estate Platform**
6. **EcoBazar** - E-Commerce Store

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

The project follows:

- TypeScript strict mode
- ESLint configuration
- Consistent component structure
- Accessibility best practices

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Connect

- **Portfolio**: [https://nahaz.vercel.app/](https://nahaz.vercel.app/)
- **GitHub**: [https://github.com/Nifazur](https://github.com/Nifazur)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourname)
- **Email**: nifazurrahman2872@gmail.com

---

⭐ If you like this project, please give it a star on GitHub!
