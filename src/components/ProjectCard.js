import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const ProjectCard = ({ proj, projId, isAdmin, toggleStep, userKey, auth }) => {
    const completedCount = Object.values(proj.steps || {}).filter(Boolean).length;
    const progressPercent = (completedCount / 3) * 100;

    return (
        <motion.div
            className="project-card-modern"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            layout
        >
            <div className="card-header">
                <span className="badge-type">{proj.projectType || "Uncategorized"}</span>
                <span className="card-date">
                    {new Date(proj.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </span>
            </div>

            <h3 className="card-title">
                {proj.message ?
                    (proj.message.length > 40 ? `${proj.message.substring(0, 40)}...` : proj.message)
                    : "Untitled Project"}
            </h3>
            <p className="card-user">
                <span className="user-info">👤 {proj.name || "Anonymous"}</span>
                <span className="separator">•</span>
                <span className="phone-info">📞 {proj.mobile || "Not provided"}</span>
            </p>

            <div className="stepper-wrapper">
                <div className="stepper-track">
                    <div
                        className="stepper-fill"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
                <div className="stepper-nodes">
                    {["step1", "step2", "step3"].map((step, idx) => (
                        <div
                            key={step}
                            className={`node ${proj.steps?.[step] ? "completed" : ""} ${isAdmin ? "clickable" : ""}`}
                            onClick={() => isAdmin && toggleStep(userKey || auth.currentUser?.uid, projId, step)}
                            title={isAdmin ? "Click to toggle status" : `Step ${idx + 1}`}
                        >
                            {proj.steps?.[step] ? <FaCheckCircle /> : idx + 1}
                            <span className="node-label">
                                {idx === 0 ? "Received" : idx === 1 ? "In Review" : "Approved"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
