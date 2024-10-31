// src/components/ModuleDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ModuleDetail.css';

const ModuleDetail = () => {
    const { branch, semester, subjectName } = useParams();
    const navigate = useNavigate();

    const moduleDetails = {
        'first-year': {
            1: [
                {
                    title: 'Mathematics For CSE',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Mathematics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Mathematics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Applied Physics For CSE',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Principle of Programming Using C',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Communicative English',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Indian Constitution',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Scientific Foundation Of Health',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Introduction to Civil Engineering',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                // Add more subjects...
            ],
        
            2: [
                {
                    title: 'Mathematics For CSE',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Mathematics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Mathematics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Applied Chemistry For CSE',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Computer Aided Engineering Drawing',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Professional Writing Skills in English',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Samskrutika Kannada',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Innovation and Design Thinking',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Introduction to Programming Language',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                },
                {
                    title: 'Introduction to Electrical Engineering',
                    modules: [
                        { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                        { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                        { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                        { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    ],
                    questionPaper: {
                        title: 'Question Paper',
                        content: 'Past question paper for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                    },
                    questionBank: {
                        title: 'Question Bank',
                        content: 'Question bank for Applied Physics for CSE.',
                        downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                    },
                }
            
            ]
        },
        
        
            // Define Semester 2 subjects similarly...
       'cse': { 
         3: [
             {
                title: 'Mathematics For CSE',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Mathematics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Mathematics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'Digital Design  and Computer Organization',
                modules: [
                    { title: 'Module 1: Notes', content: 'Introduction to Digital Design', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Combinational Logic.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'OPERATING SYSTEMS ',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'DATA STRUCTURES AND APPLICATIONS ',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'Object Oriented Programming with JAVA',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'OBJECT ORIENTED PROGRAMMING with C++',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'DATA STRUCTURES LABORATORY',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'Social Connect & Responsibility',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
        
        ],
        4: [
            {
                title: 'Analysis & Design of Algorithms',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Mathematics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Mathematics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'MICROCONTROLLERS',
                modules: [
                    { title: 'Module 1: Notes', content: 'Introduction to Digital Design', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Combinational Logic.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'DATABASE MANAGEMENT SYSTEM ',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'DISCRETE MATHEMATICAL STRUCTURES  ',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'GRAPH THEORY',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'Analysis & Design of Algorithms Lab',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'ARTIFICIAL INTELLIGENCE',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'OPTIMIZATION TECHNIQUE',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            }
        
        ],
        5: [
            {
                title: 'Software Engineering & Project Managements',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Mathematics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Mathematics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'COMPUTER NETWORKS',
                modules: [
                    { title: 'Module 1: Notes', content: 'Introduction to Digital Design', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Combinational Logic.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'THEORY OF COMPUTATION ',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'ARTIFICIAL INTELLIGENCE  ',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'FULL STACK DEVELOPMENT',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'Analysis & Design of Algorithms Lab',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'ARTIFICIAL INTELLIGENCE',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            },
            {
                title: 'OPTIMIZATION TECHNIQUE',
                modules: [
                    { title: 'Module 1: Notes', content: 'Comprehensive notes for Module 1.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 2: Notes', content: 'Comprehensive notes for Module 2.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                    { title: 'Module 3: Notes', content: 'Comprehensive notes for Module 3.', downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing' },
                    { title: 'Module 4: Notes', content: 'Comprehensive notes for Module 4.', downloadUrl: 'https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing' },
                    { title: 'Module 5: Notes', content: 'Comprehensive notes for Module 5.', downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing' },
                ],
                questionPaper: {
                    title: 'Question Paper',
                    content: 'Past question paper for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing',
                },
                questionBank: {
                    title: 'Question Bank',
                    content: 'Question bank for Applied Physics for CSE.',
                    downloadUrl: 'https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing',
                },
            }
        
        ]
       }
       
        // Define other branches and semesters...
    };

    const subjectData = moduleDetails[branch.toLowerCase()]?.[parseInt(semester)]?.find(subject => subject.title === subjectName);

    const handleModuleClick = (downloadUrl) => {
        navigate(`/pdf/${encodeURIComponent(downloadUrl)}`); // Navigate to PdfViewer with the PDF URL
    };

    return (
        <div className="module-detail" style={{ marginTop: '80px', padding: '20px', textAlign: 'center' }}>
            <h2>{branch.toUpperCase()} - Semester {semester} - {subjectName}</h2>
            <div className="modules-container">
                {subjectData ? (
                    <>
                        {subjectData.modules.map((module, index) => (
                            <div key={index} className="module-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', margin: '10px', background: '#f9f9f9' }}>
                                <h3>{module.title}</h3>
                                <p>{module.content}</p>
                                <button onClick={() => handleModuleClick(module.downloadUrl)} style={{ padding: '10px 15px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                    View and Download PDF
                                </button>
                            </div>
                        ))}
                        <div className="module-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', margin: '10px', background: '#f9f9f9' }}>
                            <h3>{subjectData.questionPaper.title}</h3>
                            <p>{subjectData.questionPaper.content}</p>
                            <button onClick={() => handleModuleClick(subjectData.questionPaper.downloadUrl)} style={{ padding: '10px 15px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                View Question Paper
                            </button>
                        </div>
                        <div className="module-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', margin: '10px', background: '#f9f9f9' }}>
                            <h3>{subjectData.questionBank.title}</h3>
                            <p>{subjectData.questionBank.content}</p>
                            <button onClick={() => handleModuleClick(subjectData.questionBank.downloadUrl)} style={{ padding: '10px 15px', background: '#FF9800', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                View Question Bank
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No modules available for this subject.</p>
                )}
            </div>
        </div>
    );
};

export default ModuleDetail;
