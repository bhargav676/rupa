import React, { useState, useEffect, useRef } from 'react';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaSun, FaMoon, FaArrowUp, FaBars, FaTimes, FaCode, FaUser, FaComment,
  FaMapMarkerAlt, FaCalendarAlt, FaTwitter, FaStar
} from 'react-icons/fa';
import { SiHtml5, SiCss3, SiJavascript, SiCplusplus, SiC, SiWordpress, SiArduino, SiPython } from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import panda from './assets/images/profile.jpeg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Custom CSS with enhanced features
const customStyles = `
  :root {
    --primary-bg: #121212;
    --secondary-bg: #1A3C34;
    --accent-teal: #00C4B4;
    --accent-green: #66BB6A;
    --accent-amber: #FFCA28;
    --text-primary: #FFFFFF;
    --text-secondary: #D3D3D3;
  }

  .diplo-background {
    background: var(--primary-bg);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .bg-left-circles {
    background: var(--primary-bg);
    position: relative;
    overflow: hidden;
  }

  .bg-left-circles::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 5% 20%, var(--secondary-bg) 50px, transparent 55px),
      radial-gradient(circle at 10% 50%, var(--secondary-bg) 70px, transparent 75px),
      radial-gradient(circle at 3% 80%, var(--secondary-bg) 40px, transparent 45px);
    opacity: 0.6;
    pointer-events: none;
  }

  .contact-section {
    background: linear-gradient(135deg, rgba(26, 60, 52, 0.3), rgba(18, 18, 18, 0.8));
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
    border: 1px solid var(--accent-teal);
  }

  .contact-card {
    background: var(--primary-bg);
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
  }

  .contact-card:hover {
    transform: translateY(-5px);
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    transition: color 0.3s ease;
  }

  .contact-item:hover {
    color: var(--accent-teal);
  }

  .contact-form {
    background: var(--primary-bg);
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  .form-group {
    position: relative;
    margin-bottom: 2rem;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--text-secondary);
    border-radius: 8px;
    color: var(--text-primary);
    transition: border-color 0.3s ease;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-color: var(--accent-teal);
    outline: none;
  }

  .form-group .icon {
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    color: var(--text-secondary);
  }

  .form-group.error input,
  .form-group.error textarea {
    border-color: var(--accent-amber);
  }

  .error-message {
    color: var(--accent-amber);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    position: absolute;
    bottom: -1.5rem;
    left: 0;
  }

  .send-button {
    position: relative;
    width: 100%;
    background: var(--accent-teal);
    color: var(--text-primary);
    font-weight: 600;
    padding: 0.75rem;
    border-radius: 8px;
    transition: background 0.3s ease;
  }

  .send-button:hover {
    background: var(--accent-amber);
  }

  .send-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .send-button .loading {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    border: 2px solid var(--text-primary);
    border-top: 2px solid transparent;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: translateY(-50%) rotate(0deg); }
    100% { transform: translateY(-50%) rotate(360deg); }
  }

  /* Enhanced Projects Section Styling */
  .projects-section {
    background: linear-gradient(135deg, rgba(26, 60, 52, 0.2), rgba(18, 18, 18, 0.9));
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  }

  .project-card {
    background: var(--primary-bg);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
  }

  .project-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  }

  .project-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .project-card:hover .project-image {
    transform: scale(1.05);
  }

  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 196, 180, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .project-card:hover .project-overlay {
    opacity: 1;
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .project-description {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .project-tech span {
    background: var(--accent-teal);
    color: var(--text-primary);
    font-size: 0.875rem;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
  }

  .project-buttons {
    display: flex;
    gap: 1rem;
  }

  .project-link, .project-details {
    font-weight: 500;
    transition: color 0.3s ease, background 0.3s ease;
  }

  .project-link:hover, .project-details:hover {
    color: var(--accent-amber);
  }

  .project-details {
    display: inline-block;
    background: var(--accent-teal);
    color: var(--text-primary);
    padding: 0.5rem 1rem;
    border-radius: 8px;
  }

  .project-details:hover {
    background: var(--accent-amber);
  }

  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .filter-button {
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .filter-button.active {
    background: var(--accent-teal);
    color: var(--text-primary);
  }

  .filter-button:hover {
    background: var(--accent-amber);
    color: var(--text-primary);
  }

  /* Testimonials Section */
  .testimonials-section {
    background: linear-gradient(135deg, rgba(26, 60, 52, 0.2), rgba(18, 18, 18, 0.9));
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  }

  .testimonial-card {
    background: var(--primary-bg);
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
  }

  .testimonial-card:hover {
    transform: translateY(-5px);
  }

  .testimonial-text {
    font-style: italic;
    color: var(--text-secondary);
  }

  .testimonial-author {
    font-weight: 600;
    color: var(--accent-teal);
    margin-top: 1rem;
  }

  /* Share Buttons */
  .share-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
  }

  .share-button {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    color: var(--text-primary);
    font-weight: 500;
    transition: background 0.3s ease;
  }

  .share-button.twitter { background: #1DA1F2; }
  .share-button.linkedin { background: #0A66C2; }
  .share-button.facebook { background: #1877F2; }

  .share-button:hover { opacity: 0.8; }

  /* Project Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: var(--primary-bg);
    border-radius: 15px;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    position: relative;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.5rem;
    cursor: pointer;
  }

  .modal-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  /* Mouse Trail */
  .mouse-trail {
    position: fixed;
    width: 10px;
    height: 10px;
    background: var(--accent-teal);
    border-radius: 50%;
    pointer-events: none;
    z-index: 999;
    opacity: 0.5;
    transition: transform 0.1s ease;
  }

  .text-primary { color: var(--text-primary); }
  .text-secondary { color: var(--text-secondary); }
  .accent-teal { color: var(--accent-teal); }
  .accent-green { color: var(--accent-green); }
  .accent-amber { color: var(--accent-amber); }
  .bg-accent-teal { background-color: var(--accent-teal); }
  .bg-accent-green { background-color: var(--accent-green); }
  .bg-accent-amber { background-color: var(--accent-amber); }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-teal), var(--accent-green));
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    margin: 0 auto;
  }

  .hover-scale:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

// Inject custom styles
const styleSheet = document.createElement("style");
styleSheet.innerText = customStyles;
document.head.appendChild(styleSheet);

const Portfolio = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const nameRef = useRef(null);
  const titleRef = useRef(null);

  // Theme Persistence
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme === 'light' ? 'light' : 'dark';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Scroll Progress and Back to Top
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll for Anchor Links
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener('click', handleScroll));

    return () => {
      links.forEach((link) => link.removeEventListener('click', handleScroll));
    };
  }, []);

  // Typed.js for Name and Title
  useEffect(() => {
    const nameTyped = new Typed(nameRef.current, {
      strings: ["Hi, I'm Rupavathi"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: false,
    });

    const titleTyped = new Typed(titleRef.current, {
      strings: ['Full-Stack Developer', 'AI Innovator', 'Tech Enthusiast'],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      nameTyped.destroy();
      titleTyped.destroy();
    };
  }, []);

  // Mouse Trail Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Form Validation and Submission
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setFormErrors({});
        setIsSubmitting(false);
      }, 1500);
    } else {
      setFormErrors(errors);
    }
  };

  // Skills Data
  const skills = [
    { name: 'HTML', icon: <SiHtml5 className="accent-amber" />, progress: 90 },
    { name: 'CSS', icon: <SiCss3 className="accent-teal" />, progress: 85 },
    { name: 'JavaScript', icon: <SiJavascript className="accent-green" />, progress: 80 },
    { name: 'Java', icon: <DiJava className="accent-amber" />, progress: 75 },
    { name: 'C++', icon: <SiCplusplus className="accent-teal" />, progress: 70 },
    { name: 'C', icon: <SiC className="accent-green" />, progress: 65 },
    { name: 'WordPress', icon: <SiWordpress className="accent-amber" />, progress: 80 },
    { name: 'Arduino', icon: <SiArduino className="accent-teal" />, progress: 85 },
    { name: 'Python', icon: <SiPython className="accent-green" />, progress: 90 },
  ];

  // Projects Data
  const projects = [
    {
      title: 'Lung Cancer Detection Using Optimized Encoder',
      description: 'A machine learning model for lung cancer detection using advanced encoder techniques.',
      tech: ['Python', 'AI', 'Machine Learning'],
      link: '#',
      image: 'https://statnano.com/resource/news/files/images/21/2/thumbnail_6357c8a32788f4aae3e41dea9bed6a42.jpg',
      details: 'This project leverages deep learning to detect lung cancer from medical imaging with high accuracy, using optimized encoder architectures.'
    },
    {
      title: 'Cyber Security Password Strength Checker',
      description: 'A tool to assess and enhance password strength with real-time feedback.',
      tech: ['Python', 'Cyber Security'],
      link: '#',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
      details: 'Built with Python, this tool evaluates password strength and provides suggestions to improve security.'
    },
    {
      title: 'Smart Home Automation System',
      description: 'IoT-based home automation system using Arduino for seamless control.',
      tech: ['Arduino', 'IoT', 'C'],
      link: '#',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
      details: 'An IoT solution that integrates Arduino with mobile apps for controlling home appliances.'
    },
    {
      title: 'Weather Forecasting App',
      description: 'Real-time weather updates with a sleek UI, built using APIs.',
      tech: ['JavaScript', 'HTML', 'CSS', 'APIs'],
      link: '#',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
      details: 'A responsive web app that fetches and displays real-time weather data using public APIs.'
    },
  ];

  const [filter, setFilter] = useState('All');
  const uniqueTech = ['All', ...new Set(projects.flatMap((p) => p.tech))];
  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.tech.includes(filter));

  useEffect(() => {
    console.log('Filtered Projects:', filteredProjects);
  }, [filter]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className={`diplo-background font-sans ${theme === 'light' ? 'text-primary' : 'text-primary'} transition-colors duration-300`}>
      {/* Mouse Trail */}
      <div
        className="mouse-trail"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      ></div>

      {/* Scroll Progress Circle */}
      <div className="fixed top-4 right-4 w-12 h-12 rounded-full border-4 border-accent-teal flex items-center justify-center z-50">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="stroke-current text-secondary"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="4"
          />
          <path
            className="stroke-current accent-teal"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="4"
            strokeDasharray={`${scrollProgress}, 100`}
          />
        </svg>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-accent-teal text-primary p-3 rounded-full shadow-lg z-50 hover:bg-accent-amber hover-scale"
        >
          <FaArrowUp size={20} />
        </button>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-primary-bg bg-opacity-90 backdrop-blur-lg shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-accent-teal">Rupavathi</h1>
          <div className="hidden md:flex items-center space-x-6">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Testimonials', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-secondary hover:text-accent-teal transition-colors"
              >
                {item}
              </a>
            ))}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-accent-green hover-scale">
              {theme === 'light' ? <FaMoon size={20} className="text-secondary" /> : <FaSun size={20} className="text-accent-amber" />}
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={24} className="text-secondary" /> : <FaBars size={24} className="text-secondary" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-primary-bg p-4">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Testimonials', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-secondary hover:text-accent-teal"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button onClick={toggleTheme} className="mt-2 p-2 rounded-full hover:bg-accent-green">
              {theme === 'light' ? <FaMoon size={20} className="text-secondary" /> : <FaSun size={20} className="text-accent-amber" />}
            </button>
          </div>
        )}
      </nav>

      {/* Intro Section */}
      <motion.section
        id="home"
        className="min-h-screen flex items-center pt-16 bg-left-circles"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <motion.div
            className="lg:w-1/3 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="icon-container animate-float">
              <FaCode size={60} className="text-primary" />
            </div>
          </motion.div>
          <div className="lg:w-2/3 text-center lg:text-left">
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-4 text-accent-teal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span ref={nameRef}></span>
            </motion.h1>
            <p className="text-xl md:text-2xl mb-8 text-secondary">
              <span ref={titleRef}></span>
            </p>
            <motion.a
              href="#projects"
              className="inline-block bg-accent-teal text-primary font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-accent-amber hover-scale"
              whileHover={{ scale: 1.1 }}
            >
              Explore My Work
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-accent-teal">About Me</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={panda}
                alt="Rupavathi"
                className="rounded-2xl shadow-xl border-4 border-accent-teal mx-auto"
                loading="lazy"
              />
            </motion.div>
            <div className="md:w-1/2">
              <p className="text-lg leading-relaxed bg-primary-bg p-6 rounded-xl shadow-md text-secondary">
                I'm Rupavathi, a dedicated full-stack developer with a passion for AI and innovative solutions. My expertise spans web development, IoT, and machine learning, with projects ranging from smart home systems to advanced AI models. I thrive on transforming complex challenges into elegant, user-focused solutions.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-accent-teal">My Expertise</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-primary-bg p-4 rounded-xl shadow-lg text-center hover-scale"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl mb-2">{skill.icon}</div>
                <p className="font-semibold mb-2 text-secondary">{skill.name}</p>
                <div className="w-full bg-secondary rounded-full h-2">
                  <motion.div
                    className="bg-accent-teal h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2, ease: 'easeOut' }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-accent-teal">Featured Projects</h2>
          <div className="filter-buttons justify-center">
            {uniqueTech.map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`filter-button ${filter === tech ? 'active' : 'bg-secondary text-primary'}`}
              >
                {tech}
              </button>
            ))}
          </div>
          <div className="projects-section">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="project-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="relative">
                      <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
                      <div className="project-overlay">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="project-details"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="project-content">
                      <h3 className="project-title text-accent-teal">{project.title}</h3>
                      <p className="project-description text-secondary">{project.description}</p>
                      <div className="project-tech">
                        {project.tech.map((tech, i) => (
                          <span key={i}>{tech}</span>
                        ))}
                      </div>
                      <div className="project-buttons">
                        <a href={project.link} className="project-link text-accent-amber">
                          View Project →
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-secondary">No projects match this filter.</p>
            )}
          </div>
        </div>
      </motion.section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-overlay">
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              &times;
            </button>
            <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" loading="lazy" />
            <h3 className="text-2xl font-bold text-accent-teal mb-2">{selectedProject.title}</h3>
            <p className="text-secondary mb-4">{selectedProject.details}</p>
            <div className="project-tech mb-4">
              {selectedProject.tech.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>
            <a href={selectedProject.link} className="project-link text-accent-amber">
              Visit Project →
            </a>
          </motion.div>
        </div>
      )}

      {/* Experience Section */}
      <motion.section
        id="experience"
        className="py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-accent-teal">Experience & Education</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-accent-teal h-full"></div>
            {[
              { year: '2025 - Present', title: 'Firmware', desc: 'Currently working on the startup company Antar IoT.' },
              { year: '2023', title: 'Full-Stack Developer', desc: 'Developed web and AI solutions for various clients.' },
              { year: '2021 - 2025', title: 'B.Tech in Computer Science', desc: 'Graduated with a focus on AI and IoT.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`mb-8 flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} w-full`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-primary-bg p-4 rounded-xl shadow-lg hover-scale">
                    <h3 className="text-lg font-semibold text-accent-teal">{item.title}</h3>
                    <p className="text-secondary">{item.desc}</p>
                    <span className="text-sm text-accent-amber">{item.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-accent-teal">What People Say</h2>
          <div className="testimonials-section">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  text: "Rupavathi's work on our AI project was exceptional. Her attention to detail and innovative approach delivered outstanding results.",
                  author: "John Doe, CTO at TechCorp",
                },
                {
                  text: "Working with Rupavathi was a pleasure. Her full-stack expertise and timely delivery made our project a success.",
                  author: "Jane Smith, Project Manager",
                },
                {
                  text: "The IoT solutions Rupavathi developed for our smart home system were cutting-edge and user-friendly.",
                  author: "Alex Brown, IoT Consultant",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <p className="testimonial-author">{testimonial.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-accent-teal">Get in Touch</h2>
          <div className="contact-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="contact-card"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-4">
                  <div className="contact-item">
                    <FaEnvelope className="accent-teal" size={24} />
                    <a href="mailto:rupavathi@gmail.com" className="text-secondary hover:text-accent-teal">
                      rupavathi@gmail.com
                    </a>
                  </div>
                  <div className="contact-item">
                    <FaPhone className="accent-teal" size={24} />
                    <a href="tel:+919392451641" className="text-secondary hover:text-accent-teal">
                      +91 9392451641
                    </a>
                  </div>
                  <div className="contact-item">
                    <FaMapMarkerAlt className="accent-teal" size={24} />
                    <span className="text-secondary">Vizag, India</span>
                  </div>
                  <div className="contact-item">
                    <FaCalendarAlt className="accent-teal" size={24} />
                    <span className="text-secondary">Available for freelance projects</span>
                  </div>
                  <div className="flex space-x-4">
                    <a href="https://github.com" className="text-secondary hover:text-accent-teal hover-scale">
                      <FaGithub size={30} />
                    </a>
                    <a href="https://linkedin.com" className="text-secondary hover:text-accent-teal hover-scale">
                      <FaLinkedin size={30} />
                    </a>
                    <a href="https://twitter.com" className="text-secondary hover:text-accent-teal hover-scale">
                      <FaTwitter size={30} />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="contact-form"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <form onSubmit={handleFormSubmit}>
                  <div className={`form-group ${formErrors.name ? 'error' : ''}`}>
                    <FaUser className="icon" size={18} />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {formErrors.name && <p className="error-message">{formErrors.name}</p>}
                  </div>
                  <div className={`form-group ${formErrors.email ? 'error' : ''}`}>
                    <FaEnvelope className="icon" size={18} />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                  </div>
                  <div className={`form-group ${formErrors.message ? 'error' : ''}`}>
                    <FaComment className="icon" size={18} />
                    <textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows="5"
                    ></textarea>
                    {formErrors.message && <p className="error-message">{formErrors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="send-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        Sending...
                        <span className="loading"></span>
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-primary-bg py-6 text-center">
        <p className="text-secondary">
          © 2025 Rupavathi. Built with passion and creativity.
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;