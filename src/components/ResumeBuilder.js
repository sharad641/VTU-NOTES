import React, { useState, useRef, useEffect } from 'react';
import { 
    User, GraduationCap, Briefcase, Wrench, Trophy, 
    Download, Eye, ArrowLeft, Plus, Trash2, 
    FileText, GripVertical, PenTool, X, ChevronRight,
    Sparkles, LayoutTemplate, Printer, ExternalLink, RefreshCw, RotateCcw,
    Settings, Palette, Type, Columns, Rows, Save, Upload, ZoomIn, Image as ImageIcon,
    Maximize2, Minimize2, Bold, Italic, Wand2, EyeOff, GripHorizontal, CheckCircle2, AlertCircle
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
    const [activeSectionId, setActiveSectionId] = useState('personal');
    const [showPreview, setShowPreview] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isAddingSection, setIsAddingSection] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [view, setView] = useState('gallery'); // 'gallery' | 'editor'
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [newSectionType, setNewSectionType] = useState('list');
    
    // Visual Settings (Managed via LocalStorage further down)
    
    const colors = ['#2563eb', '#0ea5e9', '#059669', '#d97706', '#dc2626', '#7c3aed', '#db2777', '#1a1a1a'];

    const resumeRef = useRef();

    // --- EXAMPLE DATA ---
    const exampleData = [
        {
            id: 'personal',
            type: 'profile',
            title: 'Personal Details',
            icon: 'User',
            data: {
                name: "Rahul Sharma",
                phone: "+91-9876543210",
                email: "rahul.sharma@example.com",
                linkedin: "linkedin.com/in/rahulsharma",
                github: "github.com/rahulcode",
                location: "Bengaluru, India",
                photo: "" 
            }
        },
        {
            id: 'education',
            type: 'education',
            title: 'Education',
            icon: 'GraduationCap',
            items: [
                {
                    id: 1,
                    school: "Visvesvaraya Technological University",
                    degree: "B.E. in Computer Science & Engineering",
                    year: "2022 -- 2026",
                    score: "CGPA: 8.8/10"
                },
                {
                    id: 2,
                    school: "National Public School, Indiranagar",
                    degree: "Pre-University Course (PCMB)",
                    year: "2020 -- 2022",
                    score: "Percentage: 94%"
                }
            ]
        },
        {
            id: 'projects',
            type: 'projects',
            title: 'Projects',
            icon: 'Briefcase',
            items: [
                {
                    id: 1,
                    name: "Nexus - AI Note Taker",
                    link: "github.com/rahulcode/nexus",
                    tech: "React, Node.js, OpenAI API, Socket.io",
                    desc: [
                        "Built a real-time collaborative note-taking app with AI summarization features.",
                        "Implemented secure JWT authentication and WebSocket integration for live updates.",
                        "Deployed on AWS EC2 with Nginx reverse proxy and SSL configuration."
                    ]
                },
                {
                    id: 2,
                    name: "ShopEasy E-Commerce",
                    link: "shopeasy-demo.vercel.app",
                    tech: "MERN Stack, Redux Toolkit, Stripe",
                    desc: [
                        "Developed a full-featured e-commerce platform with cart, wishlist, and payment gateway.",
                        "Optimized database queries decreasing load time by 40% using MongoDB indexing.",
                        "Designed a responsive UI with Tailwind CSS and Framer Motion."
                    ]
                }
            ]
        },
        {
            id: 'skills',
            type: 'key-value',
            title: 'Technical Skills',
            icon: 'Wrench',
            data: {
                "Languages": "JavaScript (ES6+), Python, Java, C++, TypeScript",
                "Frontend": "React.js, Next.js, Redux, Tailwind CSS, HTML5, CSS3",
                "Backend": "Node.js, Express.js, MongoDB, PostgreSQL, Firebase",
                "Tools": "Git, GitHub, Docker, AWS (S3, EC2), Postman, Figma"
            }
        },
        {
            id: 'achievements',
            type: 'list',
            title: 'Achievements',
            icon: 'Trophy',
            items: [
                "Winner of Smart India Hackathon 2024 (Software Edition).",
                "Rated 5-Star on HackerRank (Problem Solving & Algorithms).",
                "Open Source Contributor to Mozilla Firefox DevTools.",
                "Conducting technical workshops on Web Development for 100+ juniors."
            ]
        },
        {
            id: 'certifications',
            type: 'list',
            title: 'Certifications',
            icon: 'LayoutTemplate',
            items: [
                "AWS Certified Cloud Practitioner (2025)",
                "Meta Front-End Developer Professional Certificate (Coursera)",
                "Google UX Design Professional Certificate"
            ]
        }
    ];

    // Load Initial Data (Local Storage or Default)
    const [sections, setSections] = useState(() => {
        const saved = localStorage.getItem('rb_sections');
        return saved ? JSON.parse(saved) : exampleData;
    });

    const [resumeSettings, setResumeSettings] = useState(() => {
        const saved = localStorage.getItem('rb_settings');
        return saved ? JSON.parse(saved) : {
            theme: 'modern', 
            layout: 'single', 
            color: '#2563eb', 
            font: 'Inter',
            zoom: 1
        };
    });

    // Determine initial view: if no data in localstorage, show gallery. Else editor.
    // Actually, user requested "if anyone come... show different types", so we default to gallery IF it's a first load, 
    // but we can trust the 'saved' check to see if they are returning users.
    // For this demo, let's force Gallery if no saved state found, or if explicitly requested.
    // Simplifying: we'll default view to 'gallery' in useState above, but we can override it here if needed.
    // Let's keep it 'gallery' default for the "Wow" factor.
    
    // Auto-Save Effect
    React.useEffect(() => {
        localStorage.setItem('rb_sections', JSON.stringify(sections));
        localStorage.setItem('rb_settings', JSON.stringify(resumeSettings));
    }, [sections, resumeSettings]);

    // TEMPLATES CONFIG
    const templates = [
        { id: '1', name: 'Modern Standard', theme: 'modern', layout: 'single', color: '#2563eb', desc: 'Clean, ATS-friendly design for tech & corporate.' },
        { id: '2', name: 'Modern Sidebar', theme: 'modern', layout: 'two-column', color: '#0ea5e9', desc: 'Creative split-layout perfect for designers.' },
        { id: '3', name: 'Classic Pro', theme: 'classic', layout: 'single', color: '#1a1a1a', desc: 'Time-honored serif style for academic/legal roles.' },
        { id: '4', name: 'Classic Split', theme: 'classic', layout: 'two-column', color: '#334155', desc: 'Elegant sidebar layout with traditional typography.' }
    ];

    const selectTemplate = (t) => {
        setResumeSettings(prev => ({ ...prev, theme: t.theme, layout: t.layout, color: t.color }));
        setView('editor');
        toast.success(`Selected ${t.name}`);
    };

    // CALCULATE STRENGTH
    const calculateStrength = () => {
        let score = 0;
        let total = 0;
        const checks = [
            { id: 'personal', check: (s) => s.data.name && s.data.email && s.data.phone, weight: 20 },
            { id: 'experience', check: (s) => s.items && s.items.length > 0, weight: 20 },
            { id: 'education', check: (s) => s.items && s.items.length > 0, weight: 15 },
            { id: 'skills', check: (s) => s.items && s.items.length >= 3, weight: 15 },
            { id: 'projects', check: (s) => s.items && s.items.length > 0, weight: 15 },
            { id: 'summary', check: (s) => s.items && s.items[0] && s.items[0].length > 20, weight: 15 } // Approximated for list type
        ];
        
        checks.forEach(c => {
            total += c.weight;
            const sec = sections.find(s => s.id === c.id);
            if (sec && c.check(sec)) score += c.weight;
        });
        
        return Math.min(100, Math.round((score / total) * 100));
    };
    const strength = calculateStrength();


    // --- ACTIONS ---

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(sections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSections(items);
    };

    const toggleVisibility = (id, e) => {
        e.stopPropagation();
        setSections(sections.map(s => s.id === id ? { ...s, isVisible: s.isVisible !== false ? false : true } : s));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateSectionData('personal', 'photo', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ sections, settings: resumeSettings }));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "resume_data.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        toast.success("Resume Data Exported");
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                if (json.sections && json.settings) {
                    setSections(json.sections);
                    setResumeSettings(json.settings);
                    toast.success("Resume Data Loaded");
                } else {
                    toast.error("Invalid File Format");
                }
            } catch (err) {
                toast.error("Failed to parse file");
            }
        };
        reader.readAsText(file);
    };
    
    // Alias for potential stale reference or typo
    const handleSmartImport = handleImport; 

    const handleReset = () => {
        if (window.confirm("Reset to example data? All your changes will be lost.")) {
            // Reload example data logic - checking if we have it or need to define it
            // For now, simple reload if we don't have exampleData in scope (it was defined at top presumably)
             const exampleData = [
                {
                    id: 'personal', type: 'profile', title: 'Personal Details', icon: 'User',
                    data: { name: "Rahul Sharma", phone: "+91-9876543210", email: "rahul.sharma@example.com", linkedin: "linkedin.com/in/rahulsharma", github: "github.com/rahulsharma", location: "Bangalore, India", photo: "" }
                },
                {
                    id: 'education', type: 'education', title: 'Education', icon: 'GraduationCap',
                    items: [{ id: '1', school: "Visvesvaraya Technological University", degree: "B.E. Computer Science", year: "2021 - 2025", score: "CGPA: 8.5" }]
                },
                {
                    id: 'experience', type: 'projects', title: 'Experience', icon: 'Briefcase',
                    items: [{ id: '1', name: "Full Stack Intern", tech: "React, Node.js", link: "", desc: ["Developed scalable web applications.", "Optimized API response times."] }]
                },
                {
                    id: 'skills', type: 'key-value', title: 'Technical Skills', icon: 'Wrench',
                    data: { "Languages": "Java, Python, JavaScript", "Frontend": "React, HTML5, CSS3", "Backend": "Node.js, Express" }
                }
            ];
            setSections(exampleData);
            setActiveSectionId('personal');
            toast.success("Reset to Example Data");
        }
    };

    const handleClear = () => {
        if (window.confirm("Clear all data? This cannot be undone.")) {
            setSections([{
                id: 'personal',
                type: 'profile',
                title: 'Personal Details',
                icon: 'User',
                data: { name: "", phone: "", email: "", linkedin: "", github: "", location: "" }
            }]);
            setActiveSectionId('personal');
            toast.success("All data cleared");
        }
    };







    const handleAddSection = () => {
        if (!newSectionTitle.trim()) {
            toast.error("Please enter a section title");
            return;
        }
        const newId = `custom_${Date.now()}`;
        const newSection = {
            id: newId,
            type: newSectionType,
            title: newSectionTitle,
            icon: 'LayoutTemplate',
            data: newSectionType === 'key-value' ? { "Skill": "Value" } : {},
            items: newSectionType === 'list' ? ["New Item"] : []
        };
        setSections([...sections, newSection]);
        setActiveSectionId(newId);
        setIsAddingSection(false);
        setNewSectionTitle('');
        toast.success("New section added!");
    };

    const handleDeleteSection = (id, e) => {
        e.stopPropagation();
        if (id === 'personal') {
            toast.error("Cannot delete Personal Details");
            return;
        }
        if (window.confirm("Delete this section?")) {
            const newSections = sections.filter(s => s.id !== id);
            setSections(newSections);
            if (activeSectionId === id) setActiveSectionId('personal');
            toast.success("Section deleted");
        }
    };

    const updateSectionData = (id, field, value) => {
        setSections(sections.map(sec => 
            sec.id === id ? { ...sec, data: { ...sec.data, [field]: value } } : sec
        ));
    };

    const updateComplexItem = (sectionId, itemId, field, value) => {
         setSections(sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            return {
                ...sec,
                items: sec.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
            };
        }));
    };

    const updateSimpleList = (sectionId, index, value) => {
        setSections(sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            const newItems = [...sec.items];
            newItems[index] = value;
            return { ...sec, items: newItems };
        }));
    };

    const addComplexItem = (sectionId) => {
        setSections(sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            const newItem = sec.type === 'education' 
                ? { id: Date.now(), school: "New School", degree: "Degree", year: "Year", score: "Score" }
                : { id: Date.now(), name: "New Project", link: "", tech: "Tech", desc: ["Description"] };
            return { ...sec, items: [...sec.items, newItem] };
        }));
        toast.success("Entry added");
    };

    const addSimpleItem = (sectionId) => {
         setSections(sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            return { ...sec, items: [...sec.items, "New Achievement"] };
        }));
    };

    const handleAIImprove = (currentText, onUpdate) => {
        const improvements = [
            "Spearheaded the development of...",
            "Orchestrated a cross-functional team to...",
            "Engineered a scalable solution resulting in...",
            "Optimized performance by 40% through...",
            "Designed and implemented a robust..."
        ];
        const random = improvements[Math.floor(Math.random() * improvements.length)];
        onUpdate(currentText ? `${currentText} ${random}` : random);
        toast.success("AI Suggestion Added!", { icon: '✨' });
    };

    const insertFormat = (tag, currentVal, onUpdate) => {
        const wrap = tag === 'bold' ? '**' : '*';
        onUpdate(`${currentVal || ''}${wrap}text${wrap}`);
    };

    const deleteItem = (sectionId, indexOrId, isSimple = false) => {
        setSections(sections.map(sec => {
             if (sec.id !== sectionId) return sec;
             if (isSimple) {
                 return { ...sec, items: sec.items.filter((_, i) => i !== indexOrId) };
             } else {
                 return { ...sec, items: sec.items.filter(item => item.id !== indexOrId) };
             }
        }));
        toast.success("Item removed");
    };

    const updateKeyValue = (sectionId, key, newVal, isKeyChange = false, oldKey = '') => {
        setSections(sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            const newData = { ...sec.data };
            if (isKeyChange) {
                delete newData[oldKey];
                newData[newVal] = sec.data[oldKey];
            } else {
                newData[key] = newVal;
            }
            return { ...sec, data: newData };
        }));
    };
    
    const addKeyValue = (sectionId) => {
         setSections(sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            return { ...sec, data: { ...sec.data, "New Skill": "Details" } };
        }));
    };
    
    const deleteKeyValue = (sectionId, key) => {
        setSections(sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            const newData = { ...sec.data };
            delete newData[key];
            return { ...sec, data: newData };
        }));
    };


    // PDF Generation (Clone Strategy)
    const generatePDF = async () => {
        setIsGenerating(true);
        const element = resumeRef.current;
        if (!element) {
            setIsGenerating(false);
            return;
        }

        try {
            // 1. Create a Deep Clone
            const clone = element.cloneNode(true);
            
            // 2. Wrap in a container for specific sizing context
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '-10000px';
            container.style.left = '-10000px';
            container.style.zIndex = '-9999';
            container.style.width = '210mm'; // Force A4 width
            container.style.minHeight = '297mm';
            container.appendChild(clone);
            document.body.appendChild(container);

            // 3. Reset Styles on Clone to ensure perfect capture
            // Remove any zoom/transform scaling that might be present
            clone.style.transform = 'none';
            clone.style.width = '100%';
            clone.style.height = '100%';
            clone.style.boxShadow = 'none';
            clone.style.margin = '0';
            clone.className = clone.className.replace('fullscreen', ''); // Ensure no fullscreen quirks

            // Fix letter spacing/kerning issues for PDF
            const allElements = clone.querySelectorAll('*');
            allElements.forEach(el => {
                el.style.letterSpacing = 'normal';
                el.style.fontVariantLigatures = 'no-common-ligatures';
            });

            // 4. Capture with html2canvas
            const canvas = await html2canvas(clone, { 
                scale: 2, // High resolution
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            // 5. Cleanup Clone
            document.body.removeChild(container);

            // 6. Generate PDF
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            // If height exceeds A4 (297mm), logic to add pages or fit could go here. 
            // For now, simpler single page scaling or multi-page chop.
            // Resume usually 1-2 pages.
            
            if (pdfHeight > 297) {
                // Multi-page logic if strictly needed, or just let it scale "fit width" 
                // and if it cuts off, user needs to adjust density. 
                // For simplicity, we just add the image. jsPDF doesn't auto-split images across pages nicely without complex logic.
                // We'll stick to standard addImage for now.
            }

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Resume_VTU_Notes.pdf`);
            toast.custom((t) => (
                <div className="rb-toast-success">
                  <Sparkles size={18} /> Resume Downloaded!
                </div>
            ));
        } catch (error) {
            console.error("PDF Fail", error);
            toast.error("Failed to generate PDF");
        }
        setIsGenerating(false);
    };

    // --- RENDER HELPERS ---
    const getIcon = (iconName) => {
        const icons = { User, GraduationCap, Briefcase, Wrench, Trophy, LayoutTemplate };
        const IconComponent = icons[iconName] || FileText;
        return <IconComponent size={18} />;
    };

    const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];

    // --- VIEW: TEMPLATE GALLERY ---
    if (view === 'gallery') {
        return (
            <div className="rb-gallery-container">
                <div className="rb-gallery-header">
                    <h1>Choose Your Resume Style</h1>
                    <p>Select a professional template to get started. You can customize it later.</p>
                </div>
                <div className="rb-gallery-grid">
                    {templates.map(t => (
                        <div key={t.id} className="rb-template-card" onClick={() => selectTemplate(t)}>
                            <div className={`rb-mini-preview ${t.theme} ${t.layout}`} style={{'--mini-color': t.color}}>
                                <div className="mini-header"></div>
                                <div className="mini-body">
                                    <div className="mini-line w-70"></div>
                                    <div className="mini-line w-90"></div>
                                    <div className="mini-line w-50"></div>
                                </div>
                            </div>
                            <h3>{t.name}</h3>
                            <p>{t.desc}</p>
                            <button className="rb-btn-select">Use Template</button>
                        </div>
                    ))}
                </div>
                {/* Option to continue to editor if data exists? Optional, but good UX */}
                <button className="rb-btn-text" onClick={() => setView('editor')}>Continue to Editor &rarr;</button>
            </div>
        );
    }

    // --- VIEW: EDITOR ---
    return (
        <div className="rb-container">
            <Toaster position="top-center" toastOptions={{
                 style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
            }} />
            
            {/* Header */}
            <header className="rb-navbar">
                <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} className="rb-brand">
                    <div className="rb-logo-circle"><FileText /></div>
                    <span>Resume<span className="rb-accent">Forge</span></span>
                </motion.div>
                <div className="rb-actions">
                    <button className="rb-btn-secondary" onClick={() => setView('gallery')}>
                        <LayoutTemplate size={16} /> Templates
                    </button>
                    <button className="rb-btn-secondary mobile-visible" onClick={() => setShowPreview(true)}>
                        <Eye size={16} /> Preview
                    </button>
                    <button className="rb-btn-download" onClick={generatePDF} disabled={isGenerating}>
                        {isGenerating ? <Sparkles className="spin" size={16}/> : <><Download size={16}/> PDF</>}
                    </button>
                </div>
            </header>

            <div className="rb-workspace">
                
                {/* 1. SIDEBAR */}
                <motion.div 
                    className="rb-sidebar"
                    initial={{x: -50, opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    transition={{delay: 0.1}}
                >
                    <div className="rb-sidebar-header">
                        <h3>SECTIONS</h3>
                        <div className="rb-score-pill" title="Resume Strength">
                            <div className="score-ring" style={{'--p': strength, '--c': strength > 80 ? '#22c55e' : strength > 50 ? '#eab308' : '#ef4444'}}>
                                <svg><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="10"></circle></svg>
                                <span>{strength}%</span>
                            </div>
                        </div>
                    </div>

                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="sections">
                            {(provided) => (
                                <div className="rb-section-list" {...provided.droppableProps} ref={provided.innerRef}>
                                    {sections.map((sec, index) => (
                                        <Draggable key={sec.id} draggableId={sec.id} index={index}>
                                            {(provided, snapshot) => (
                                                <button 
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`rb-section-btn ${activeSectionId === sec.id ? 'active' : ''} ${sec.isVisible === false ? 'hidden-sec' : ''} ${snapshot.isDragging ? 'dragging' : ''}`}
                                                    onClick={() => setActiveSectionId(sec.id)}
                                                >
                                                    <div className="rb-drag-handle" {...provided.dragHandleProps}><GripVertical size={14}/></div>
                                                    {sec.id === 'personal' && <User size={16}/>}
                                                    {sec.id === 'education' && <GraduationCap size={16}/>}
                                                    {sec.id === 'experience' && <Briefcase size={16}/>}
                                                    {sec.id === 'skills' && <Wrench size={16}/>}
                                                    {sec.id === 'projects' && <FileText size={16}/>}
                                                    {sec.id === 'achievements' && <Trophy size={16}/>}
                                                    {sec.id === 'certifications' && <Sparkles size={16}/>}
                                                    <span className="truncate flex-1 text-left">{sec.title}</span>
                                                    
                                                    <div className="rb-sec-actions">
                                                        <span className="rb-vis-toggle" onClick={(e) => toggleVisibility(sec.id, e)}>
                                                            {sec.isVisible === false ? <EyeOff size={12}/> : <Eye size={12}/>}
                                                        </span>
                                                        {['skills', 'projects', 'achievements', 'certifications'].includes(sec.id) && (
                                                            <span className="rb-del-sec" onClick={(e) => handleDeleteSection(sec.id, e)}><X size={12}/></span>
                                                        )}
                                                    </div>
                                                </button>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <div className="rb-add-section-wrapper">
                        <motion.button whileTap={{ scale: 0.95 }} className="rb-btn-add-section" onClick={() => setIsAddingSection(true)}><Plus size={16}/> Add Section</motion.button>
                        <div style={{display:'flex', gap:'5px', marginTop:'10px'}}>
                            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="rb-btn-icon" onClick={() => setShowSettings(true)} title="Resume Settings"><Settings size={14}/></motion.button>
                            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="rb-btn-icon" onClick={handleReset} title="Reset to Example"><RefreshCw size={14}/></motion.button>
                            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="rb-btn-icon" onClick={handleClear} title="Clear All"><RotateCcw size={14}/></motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* 2. FORM EDITOR */}
                <motion.main 
                    key={activeSectionId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="rb-editor"
                >
                    <div className="rb-editor-header">
                        <h2>{getIcon(activeSection.icon)} {activeSection.title}</h2>
                    </div>
                    
                    <div className="rb-editor-content">
                        {/* PERSONAL PROFILE FORM */}
                        {activeSection.type === 'profile' && (
                            <div className="rb-form-grid">
                                {Object.keys(activeSection.data).map(key => (
                                    <div key={key} className="rb-input-group">
                                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                        <input 
                                            className="rb-input"
                                            value={activeSection.data[key]} 
                                            onChange={(e) => updateSectionData(activeSection.id, key, e.target.value)}
                                        />
                                    </div>
                                ))}
                                <div className="rb-input-group">
                                    <label><ImageIcon size={14}/> Profile Photo</label>
                                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="rb-input ghost"/>
                                    {activeSection.data.photo && (
                                        <button className="rb-btn-secondary" style={{marginTop:'5px', fontSize:'0.8rem'}} onClick={() => updateSectionData('personal', 'photo', '')}>Remove Photo</button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* EDUCATION / PROJECTS FORM (Complex List) */}
                        {(activeSection.type === 'education' || activeSection.type === 'projects') && (
                            <AnimatePresence>
                                {activeSection.items.map((item, idx) => (
                                    <motion.div 
                                        key={item.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="rb-card-item"
                                    >
                                        <button className="rb-btn-delete-item" onClick={() => deleteItem(activeSection.id, item.id)}><X size={14}/></button>
                                        {activeSection.type === 'education' ? (
                                            <>
                                                <input className="rb-input ghost bold" value={item.school} onChange={(e) => updateComplexItem(activeSection.id, item.id, 'school', e.target.value)} placeholder="School/College" />
                                                <div className="rb-row">
                                                    <input className="rb-input ghost" value={item.degree} onChange={(e) => updateComplexItem(activeSection.id, item.id, 'degree', e.target.value)} placeholder="Degree" />
                                                    <input className="rb-input ghost" value={item.score} onChange={(e) => updateComplexItem(activeSection.id, item.id, 'score', e.target.value)} placeholder="Score" />
                                                </div>
                                                <input className="rb-input ghost" value={item.year} onChange={(e) => updateComplexItem(activeSection.id, item.id, 'year', e.target.value)} placeholder="Year" />
                                            </>
                                        ) : (
                                            <>
                                                <input className="rb-input ghost bold" value={item.name} onChange={(e) => updateComplexItem(activeSection.id, item.id, 'name', e.target.value)} placeholder="Project Name" />
                                                <div className="rb-input-with-icon">
                                                    <ExternalLink size={14} className="rb-input-icon"/>
                                                    <input className="rb-input ghost" value={item.link} onChange={(e) => updateComplexItem(activeSection.id, item.id, 'link', e.target.value)} placeholder="Project Link (GitHub/Demo)" />
                                                </div>
                                                <input className="rb-input ghost" value={item.tech} onChange={(e) => updateComplexItem(activeSection.id, item.id, 'tech', e.target.value)} placeholder="Tech Stack" />
                                                
                                                <div className="rb-toolbar">
                                                    <button onClick={() => insertFormat('bold', item.desc.join('\n'), val => updateComplexItem(activeSection.id, item.id, 'desc', val.split('\n')))} title="Bold"><Bold size={14}/></button>
                                                    <button onClick={() => insertFormat('italic', item.desc.join('\n'), val => updateComplexItem(activeSection.id, item.id, 'desc', val.split('\n')))} title="Italic"><Italic size={14}/></button>
                                                    <button className="rb-btn-ai" onClick={() => handleAIImprove(item.desc.join('\n'), val => updateComplexItem(activeSection.id, item.id, 'desc', val.split('\n')))} title="AI Improve"><Wand2 size={14}/> Enhance</button>
                                                </div>
                                                <textarea className="rb-textarea ghost" rows={3} value={item.desc.join('\n')} onChange={(e) => updateComplexItem(activeSection.id, item.id, 'desc', e.target.value.split('\n'))} placeholder="Description (Line separated)" />
                                            </>
                                        )}
                                    </motion.div>
                                ))}
                                <motion.button whileTap={{ scale: 0.95 }} className="rb-btn-add-item" onClick={() => addComplexItem(activeSection.id)}><Plus size={16}/> Add Entry</motion.button>
                            </AnimatePresence>
                        )}

                        {/* KEY-VALUE FORM (Skills) */}
                        {activeSection.type === 'key-value' && (
                             <>
                                {Object.entries(activeSection.data).map(([key, val], idx) => (
                                    <div key={idx} className="rb-kv-row">
                                        <input className="rb-input kv-key" value={key} onChange={(e) => updateKeyValue(activeSection.id, key, e.target.value, true, key)} placeholder="Category" />
                                        <div className="rb-sep">:</div>
                                        <input className="rb-input kv-val" value={val} onChange={(e) => updateKeyValue(activeSection.id, key, e.target.value)} placeholder="Details..." />
                                        <button className="rb-btn-icon" onClick={() => deleteKeyValue(activeSection.id, key)}><X size={16}/></button>
                                    </div>
                                ))}
                                <motion.button whileTap={{ scale: 0.95 }} className="rb-btn-add-item" onClick={() => addKeyValue(activeSection.id)}><Plus size={16}/> Add Skill Category</motion.button>
                             </>
                        )}

                        {/* SIMPLE LIST FORM (Achievements) */}
                        {activeSection.type === 'list' && (
                            <>
                                {activeSection.items.map((item, idx) => (
                                    <div key={idx} className="rb-list-row">
                                        <div className="rb-bullet"><ChevronRight size={14}/></div>
                                        <input className="rb-input ghost" value={item} onChange={(e) => updateSimpleList(activeSection.id, idx, e.target.value)} />
                                        <button className="rb-btn-icon" onClick={() => deleteItem(activeSection.id, idx, true)}><X size={16}/></button>
                                    </div>
                                ))}
                                <motion.button whileTap={{ scale: 0.95 }} className="rb-btn-add-item" onClick={() => addSimpleItem(activeSection.id)}><Plus size={16}/> Add Item</motion.button>
                            </>
                        )}
                    </div>
                </motion.main>

                {/* 3. LIVE PREVIEW */}
                <div className={`rb-preview ${showPreview ? 'open' : ''} ${isFullscreen ? 'fullscreen' : ''}`}>
                    <div className="rb-preview-header mobile-visible">
                        <button onClick={() => setShowPreview(false)}><ArrowLeft size={16}/> Edit</button>
                    </div>
                    {/* Desktop Fullscreen Toggle */}
                    <button className="rb-fullscreen-toggle" onClick={() => setIsFullscreen(!isFullscreen)} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
                        {isFullscreen ? <Minimize2 size={20}/> : <Maximize2 size={20}/>}
                    </button>

                    <div className="rb-paper-container">
                        <div 
                            className={`resume-paper ${resumeSettings.theme} ${resumeSettings.layout}`} 
                            ref={resumeRef}
                            style={{
                                '--res-accent': resumeSettings.color,
                                fontFamily: resumeSettings.theme === 'modern' ? "'Inter', sans-serif" : "'Times New Roman', serif",
                                fontSize: `${(resumeSettings.zoom || 1) * 11}pt`
                            }}
                        >
                             {/* SINGLE COLUMN LAYOUT */}
                             {resumeSettings.layout === 'single' && (
                                <>
                                    {sections.filter(s => s.isVisible !== false).map(sec => {
                                        if (sec.type === 'profile') {
                                            return (
                                                <div key={sec.id} className="res-header">
                                                    {sec.data.photo && <img src={sec.data.photo} alt="Profile" className="res-photo-single" />}
                                                    <div className="res-name">{sec.data.name}</div>
                                                    <div className="res-contact">
                                                        <span>{sec.data.location}</span>
                                                        {sec.data.phone && <span> | {sec.data.phone}</span>}
                                                        {sec.data.email && <span> | {sec.data.email}</span>}
                                                    </div>
                                                    <div className="res-links">
                                                        <span>{sec.data.linkedin}</span>
                                                        {sec.data.github && <span> | {sec.data.github}</span>}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return <SectionRenderer key={sec.id} sec={sec} theme={resumeSettings.theme} />;
                                    })}
                                </>
                             )}

                             {/* TWO COLUMN LAYOUT */}
                             {resumeSettings.layout === 'two-column' && (
                                 <div className="res-two-col-grid">
                                     <div className="res-left-col">
                                         {/* Profile & Contact always on top/left in this layout */}
                                         {sections.filter(s => s.type === 'profile' && s.isVisible !== false).map(sec => (
                                              <div key={sec.id} className="res-profile-box">
                                                  {sec.data.photo && <div className="res-photo-container"><img src={sec.data.photo} alt="Profile" className="res-photo-sidebar" /></div>}
                                                  <div className="res-name">{sec.data.name}</div>
                                                  <div className="res-contact-block">
                                                      <div>{sec.data.location}</div>
                                                      <div>{sec.data.phone}</div>
                                                      <div>{sec.data.email}</div>
                                                  </div>
                                                  <div className="res-links-block">
                                                      <div>{sec.data.linkedin}</div>
                                                      <div>{sec.data.github}</div>
                                                  </div>
                                              </div>
                                         ))}
                                         
                                         {/* Sidebar Sections (Skills, Key-Value) */}
                                         {sections.filter(s => (s.type === 'key-value' || s.id === 'achievements') && s.isVisible !== false).map(sec => (
                                             <SectionRenderer key={sec.id} sec={sec} theme={resumeSettings.theme} />
                                         ))}
                                     </div>

                                     <div className="res-right-col">
                                          {/* Main Sections (Experience, Education, Projects, Custom Lists) */}
                                          {sections.filter(s => s.type !== 'profile' && s.type !== 'key-value' && s.id !== 'achievements' && s.isVisible !== false).map(sec => (
                                              <SectionRenderer key={sec.id} sec={sec} theme={resumeSettings.theme} />
                                          ))}
                                     </div>
                                 </div>
                             )}
                        </div>
                    </div>
                </div>
            </div>

            {/* SETTINGS MODAL */}
            <AnimatePresence>
            {showSettings && (
                 <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="rb-modal-overlay" onClick={() => setShowSettings(false)}>
                    <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="rb-modal" onClick={e => e.stopPropagation()}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
                            <h3>Resume Settings</h3>
                            <button onClick={() => setShowSettings(false)} className="rb-btn-icon"><X size={18}/></button>
                        </div>
                        
                            <div className="rb-setting-group">
                                <label><Columns size={16}/> Layout Format</label>
                                <div className="rb-type-selector" style={{gridTemplateColumns:'1fr 1fr', margin:'0.5rem 0 1.5rem'}}>
                                    <button className={resumeSettings.layout === 'single' ? 'selected' : ''} onClick={() => setResumeSettings({...resumeSettings, layout: 'single'})}>
                                        <Rows size={20}/> Single Column
                                    </button>
                                    <button className={resumeSettings.layout === 'two-column' ? 'selected' : ''} onClick={() => setResumeSettings({...resumeSettings, layout: 'two-column'})}>
                                        <Columns size={20}/> Two Column
                                    </button>
                                </div>
                            </div>
                            
                            <div className="rb-setting-group">
                                <label><ZoomIn size={16}/> Content Density: {Math.round(resumeSettings.zoom * 100)}%</label>
                                <input 
                                    type="range" 
                                    min="0.75" 
                                    max="1.15" 
                                    step="0.05" 
                                    value={resumeSettings.zoom || 1} 
                                    onChange={(e) => setResumeSettings({...resumeSettings, zoom: parseFloat(e.target.value)})}
                                    style={{width:'100%', accentColor: 'var(--rb-accent)'}}
                                />
                            </div>

                            <div className="rb-setting-group">
                                <label><Save size={16}/> Data Management</label>
                                <div style={{display:'flex', gap:'10px'}}>
                                    <button className="rb-btn-secondary" onClick={handleExport}><Download size={16}/> Export JSON</button>
                                    <label className="rb-btn-secondary" style={{cursor:'pointer'}}>
                                        <Upload size={16}/> Import JSON
                                        <input type="file" accept=".json" onChange={handleImport} style={{display:'none'}}/>
                                    </label>
                                </div>
                            </div>

                            <div className="rb-setting-group">
                                <label><LayoutTemplate size={16}/> Theme Style</label>
                            <div className="rb-type-selector" style={{gridTemplateColumns:'1fr 1fr', margin:'0.5rem 0 1.5rem'}}>
                                <button className={resumeSettings.theme === 'modern' ? 'selected' : ''} onClick={() => setResumeSettings({...resumeSettings, theme: 'modern'})}>
                                    <span style={{fontFamily:'Inter', fontWeight:'bold', fontSize:'1.2rem'}}>Aa</span> Modern
                                </button>
                                <button className={resumeSettings.theme === 'classic' ? 'selected' : ''} onClick={() => setResumeSettings({...resumeSettings, theme: 'classic'})}>
                                    <span style={{fontFamily:'Times New Roman', fontWeight:'bold', fontSize:'1.2rem'}}>Aa</span> Classic
                                </button>
                            </div>
                        </div>

                        <div className="rb-setting-group">
                            <label><Palette size={16}/> Accent Color</label>
                            <div className="rb-color-grid">
                                {colors.map(c => (
                                    <button 
                                        key={c} 
                                        className={`rb-color-swatch ${resumeSettings.color === c ? 'selected' : ''}`}
                                        style={{backgroundColor: c}}
                                        onClick={() => setResumeSettings({...resumeSettings, color: c})}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* ADD SECTION MODAL */}
            <AnimatePresence>
            {isAddingSection && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="rb-modal-overlay">
                    <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="rb-modal">
                        <h3>Add New Section</h3>
                        <input className="rb-input" placeholder="Section Title (e.g. Certifications)" value={newSectionTitle} onChange={e => setNewSectionTitle(e.target.value)} autoFocus/>
                        <div className="rb-type-selector">
                            <button className={newSectionType === 'list' ? 'selected' : ''} onClick={() => setNewSectionType('list')}><PenTool size={20}/> List</button>
                            <button className={newSectionType === 'projects' ? 'selected' : ''} onClick={() => setNewSectionType('projects')}><Briefcase size={20}/> Projects</button>
                            <button className={newSectionType === 'key-value' ? 'selected' : ''} onClick={() => setNewSectionType('key-value')}><Wrench size={20}/> Skills</button>
                        </div>
                        <div className="rb-modal-actions">
                            <button onClick={() => setIsAddingSection(false)}>Cancel</button>
                            <button className="rb-btn-primary" onClick={handleAddSection}>Create</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};

// --- HELPER FOR RICH TEXT RENDERING ---
const FormatText = ({ text }) => {
    if (!text) return null;
    // Simple parser for **bold** and *italic*
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return (
        <>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                    return <em key={i}>{part.slice(1, -1)}</em>;
                }
                return part;
            })}
        </>
    );
};

const SectionRenderer = ({ sec, theme }) => (
    <div className="res-section">
        <div className="res-section-title">{sec.title}</div>
        
        {sec.type === 'education' && sec.items.map(item => (
            <div key={item.id} className="res-item res-edu-item">
                <div className="res-row"><span className="res-bold res-edu-school"><FormatText text={item.school}/></span><span className="res-date">{item.year}</span></div>
                <div className="res-row"><span className="res-italic res-edu-degree">{item.degree}</span><span className="res-score">{item.score}</span></div>
            </div>
        ))}

        {sec.type === 'projects' && sec.items.map(item => (
            <div key={item.id} className="res-item">
                <div className="res-row">
                    <div style={{display:'flex', alignItems:'baseline', gap:'6px'}}>
                        <span className="res-bold"><FormatText text={item.name}/></span>
                        {item.link && (
                            <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer" className="res-link">
                                <ExternalLink size={10} style={{display:'inline', verticalAlign:'middle'}}/> Link
                            </a>
                        )}
                    </div>
                    <span className="res-italic" style={{fontSize:'0.9em'}}>{item.tech}</span>
                </div>
                <ul className="res-list">
                     {item.desc.map((d,i) => d && <li key={i}><FormatText text={d}/></li>)}
                </ul>
            </div>
        ))}
        
        {sec.type === 'key-value' && (
            <div className="res-item">
                {Object.entries(sec.data).map(([k, v]) => (
                    <div key={k} style={{marginBottom:'4px'}}><span className="res-bold">{k}:</span> <FormatText text={v}/></div>
                ))}
            </div>
        )}

        {sec.type === 'list' && (
            <ul className="res-list">
                {sec.items.map((item, i) => item && <li key={i}><FormatText text={item}/></li>)}
            </ul>
        )}
    </div>
);

export default ResumeBuilder;
