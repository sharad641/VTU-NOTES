import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiMagnifyingGlass,
  HiAcademicCap,
  HiCalendar,
  HiFire,
  HiStar,
  HiDocumentText,
  HiArrowDownTray,
  HiEye,
  HiChevronRight,
  HiXMark,
  HiBookmark,
  HiOutlineBookmark,
  HiAdjustmentsHorizontal,
  HiInbox,
  HiShare,
  HiClipboard,
  HiCheck
} from 'react-icons/hi2';
import { FaFilePdf, FaBolt, FaLayerGroup } from 'react-icons/fa6';
import AdSenseAd from './AdSenseAd';
import CommentSection from './CommentSection';
import './ModelPapersModern.css'; // CHANGED: Modern Dark Theme

const papers = [
  {
    "id": 1,
    "title": "Mathematics For CSE",
    "code": "BMATS101",
    "category": "programming",
    "semester": "1",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1lykWhoLSLbdD66PywFOvqKadpjZnPO41/preview",
    "solutionLink": "https://drive.google.com/file/d/1yI2Fs_AqYSwB55JyYhz8lSvghi1jmKUy/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1dytNuksweWVZ4o0uedFM8wrI0fnxYmBc/preview",
    "popularity": "very-high"
  },
  {
    "id": 2,
    "title": "Applied Physics For CSE",
    "code": "BPHYS102/202",
    "category": "programming",
    "semester": "1",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1EPo4fKtVC-pRv-31K1ngNobA9hJn4kDo/preview",
    "solutionLink": "https://drive.google.com/file/d/1Eq3hyKXbgBeVgPw_rgG5xFsU3pIl9VCA/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1Cj3-3mlvepcXP5lVMqbjlydqMzOYCRgN/preview",
    "popularity": "medium"
  },
  {
    "id": 3,
    "title": "Principle of Programming Using C",
    "code": "BPOP103/203",
    "category": "programming",
    "semester": "1",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1Lyy-k8PAf6fpSkYI3hWjmEwiGHAJyGbj/preview",
    "solutionLink": "https://drive.google.com/file/d/1Gx8ywx2qLVmGyxMlZQSV8sq7s9vcHlRG/preview",
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 4,
    "title": "Indian Constitution",
    "code": "BICOK107",
    "category": "programming",
    "semester": "1",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/17WIR2HLEBRT0QQM4kw1WevirttZs7GeS/preview",
    "solutionLink": null,
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 5,
    "title": "Scientific Foundation Of Health",
    "code": "BSFHK158",
    "category": "basic_science",
    "semester": "1",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
    "solutionLink": "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 6,
    "title": "Introduction to Civil Engineering",
    "code": "BESCK104A",
    "category": "programming",
    "semester": "1",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1QJ4wQU-KobTDanBtL11C0W2cjq-BHShQ/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1hgoSu8mT6Z6IkMJfHUSFmGuV9OR-m1Vi/preview",
    "popularity": "medium"
  },
  {
    "id": 7,
    "title": "Mathematics For CSE",
    "code": "BMATS201",
    "category": "programming",
    "semester": "2",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1cWG4jvZRZ2iBJA09t0WRW78dqw2vdm9x/preview",
    "solutionLink": "https://drive.google.com/file/d/1BXyhq4ZiTLbhpIwJHGkRYe60rbJQqQne/preview",
    "oldPaperLink": null,
    "popularity": "very-high"
  },
  {
    "id": 8,
    "title": "Applied Chemistry For CSE",
    "code": "BCHES102/202",
    "category": "programming",
    "semester": "2",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1lnD5TTvI5X_8sng4E0qzT5pGCr74z6LL/preview",
    "solutionLink": "https://drive.google.com/file/d/15WLqIDiaKljyJWdl0XsWBWfB-lTJiiS1/preview",
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 9,
    "title": "Introduction to Python Programming",
    "code": "BPLCK105/205B",
    "category": "programming",
    "semester": "2",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1aylHWxDTEvZ9W3oZDX2vUy3luveUwKlX/preview",
    "solutionLink": null,
    "oldPaperLink": null,
    "popularity": "very-high"
  },
  {
    "id": 10,
    "title": "Computer Aided Engineering Drawing",
    "code": "BCEDK203",
    "category": "basic_science",
    "semester": "2",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1Fc3yVkZZ2aBnQ5fiuGPxHKZ79tDIAgRK/preview",
    "solutionLink": null,
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 11,
    "title": "Samskrutika Kannada",
    "code": "BKSKK207",
    "category": "basic_science",
    "semester": "2",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
    "popularity": "medium"
  },
  {
    "id": 12,
    "title": "Innovation and Design Thinking",
    "code": "BIDTK258",
    "category": "basic_science",
    "semester": "2",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1Cb5HxUCDqcRz9VxyLF6di55NKhlmuYYF/preview",
    "solutionLink": null,
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 13,
    "title": "Introduction to Electrical Engineering",
    "code": "BESCK104/204B",
    "category": "basic_science",
    "semester": "2",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1H0aicsDIdGfwoT3UcZ5XXGyswiwL9PXc/preview",
    "solutionLink": null,
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 14,
    "title": "Mathematics For CSE",
    "code": "BMATS301",
    "category": "basic_science",
    "semester": "3",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1tN6tJ98BmS1r_Z6LagP4S8JS-mqLPTnf/preview",
    "solutionLink": "https://drive.google.com/file/d/1hgCehi2mfVkYhNfveEEZqCgLLoW4RIFF/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1ZlfCQX1dAHU6UERsaOlEiA4PeSKWWNk5/preview",
    "popularity": "very-high"
  },
  {
    "id": 15,
    "title": "Digital Design and Computer Organization",
    "code": "BCS302",
    "category": "core",
    "semester": "3",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1NiPGff-dHUVkhmlroj51BvWtax-2odpG/view?usp=d/preview",
    "solutionLink": "https://drive.google.com/file/d/1xROR5IqItpPVinhNgAJ0RBexaho7LEcE/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1xROR5IqItpPVinhNgAJ0RBexaho7LEcE/preview",
    "popularity": "medium"
  },
  {
    "id": 16,
    "title": "OPERATING SYSTEMS",
    "code": "BCS303",
    "category": "core",
    "semester": "3",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/15HBsmBHnOXNhRycK_8pQ0pfTpUIjplMt/preview",
    "solutionLink": "https://drive.google.com/file/d/1LZTpPvlsoJKFuyVyIseHuRxbVqdIqw9Y/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1enDKUJLGxdjgsEMOuEeNiQFaoQP9m7gN/preview",
    "popularity": "very-high"
  },
  {
    "id": 17,
    "title": "DATA STRUCTURES AND APPLICATIONS",
    "code": "BCS304",
    "category": "core",
    "semester": "3",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1GLq4quNzdSomnGh6Y2ilFvjQuXM9JO6z/preview",
    "solutionLink": "https://drive.google.com/file/d/1NT_kKeN4Z0UiW-OhHwgq-8vxWoW2RRAS/preview",
    "oldPaperLink": "https://drive.google.com/file/d/16hGQQlfOdePqioOpN0oBN8ZbQBAzlA2X/preview",
    "popularity": "very-high"
  },
  {
    "id": 18,
    "title": "Object Oriented Programming with JAVA",
    "code": "BCS306A'",
    "category": "core",
    "semester": "3",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1q05hkIDeTilr4zqIaEwGFD_daN7hpIw5/preview",
    "solutionLink": "https://drive.google.com/file/d/1iVE_rPUCBYQKJU9OKhZ8D_zmI33D8a7T/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1wj3e8ibE2BGqbmyS-CgKRk6_0SDAegF1/preview",
    "popularity": "very-high"
  },
  {
    "id": 19,
    "title": "OBJECT ORIENTED PROGRAMMING with C++",
    "code": "BCS306B",
    "category": "core",
    "semester": "3",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1mNOnt2Tvkegvx-zAvGelFCC4bmwOfIV3/preview",
    "solutionLink": null,
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 20,
    "title": "DATA STRUCTURES LABORATORY",
    "code": "",
    "category": "core",
    "semester": "3",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
    "popularity": "very-high"
  },
  {
    "id": 21,
    "title": "Social Connect & Responsibility",
    "code": "21SCR38",
    "category": "core",
    "semester": "3",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
    "popularity": "medium"
  },
  {
    "id": 22,
    "title": "Analysis & Design of Algorithms",
    "code": "BCS402",
    "category": "core",
    "semester": "4",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1U-laCBUAydCFwnqFW5nmPgGHVWv3lPt1/preview",
    "solutionLink": "https://drive.google.com/file/d/1U-laCBUAydCFwnqFW5nmPgGHVWv3lPt1/preview",
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 23,
    "title": "MICROCONTROLLERS",
    "code": "BCS402",
    "category": "core",
    "semester": "4",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1bFd7GbQA6GycngDouhlvhnjNAoPW6t6q/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1aVBwZ8K9iHTS_uTiROIZjYcNovQUbv3b/preview",
    "popularity": "medium"
  },
  {
    "id": 24,
    "title": "DATABASE MANAGEMENT SYSTEM",
    "code": "BCS403",
    "category": "core",
    "semester": "4",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1ZIuMbL4yJbnBgp8NrU-PqwO35udCZlA1/preview",
    "solutionLink": null,
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 25,
    "title": "DISCRETE MATHEMATICAL STRUCTURES",
    "code": "BCS405A",
    "category": "core",
    "semester": "4",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1rFJKUntE4UNWRL1IMg2QjWzkVoeEFeuG/preview",
    "solutionLink": "https://drive.google.com/file/d/1wiliZvzo0-Zc2E_UMZDhXuNa2mKgKjw5/preview",
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 26,
    "title": "GRAPH THEORY",
    "code": "BCS405B",
    "category": "core",
    "semester": "4",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1Jdgxk2UiVeXb-TJJywapMucYhW_HLqj3/preview",
    "solutionLink": "https://drive.google.com/file/d/15m3xXKv-Os6JlQI6QvlTnBet7lI2ynCx/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1Sb3hCekSG3Z9fdEq0H_qRqxTzz7w8XIE/preview",
    "popularity": "medium"
  },
  {
    "id": 27,
    "title": "Analysis & Design of Algorithms Lab",
    "code": "BCSL404",
    "category": "core",
    "semester": "4",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
    "popularity": "medium"
  },
  {
    "id": 28,
    "title": "ARTIFICIAL INTELLIGENCE",
    "code": "BAD402",
    "category": "core",
    "semester": "4",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
    "solutionLink": null,
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 29,
    "title": "BIOLOGY FOR ENGINEERS",
    "code": "BCS405C",
    "category": "basic_science",
    "semester": "4",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1h_udrhNRqd0UiwdM8bVeH_PTXyWsVcKB/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1aD7ZjnBroS5GvDCcULUJ-F9mrkRgU826/preview",
    "popularity": "medium"
  },
  {
    "id": 30,
    "title": "Software Engineering & Project Management",
    "code": "BCS501",
    "category": "core",
    "semester": "5",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1TUx_F_ldZje158xHr-7juovCHZanzDQU/preview",
    "solutionLink": "https://drive.google.com/file/d/1aHbJ6mj2m71hYtjnTt-ODAZXLnavDPF4/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1cgqyDznfxuOM3QmEgtWn0-YBiNv3B-il/preview",
    "popularity": "medium"
  },
  {
    "id": 31,
    "title": "COMPUTER NETWORKS",
    "code": "BCS502",
    "category": "core",
    "semester": "5",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1hN5bPv6Ida2mef6CXeJoE4YXCoZ4UfHr/preview",
    "solutionLink": "https://drive.google.com/file/d/10ENVRIXIu0mJDN-9HfkDIyciEWItiXb6/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1MQ0_LjfVOgeB0UFW6LTSnVjy_4Uw-Z0N/preview",
    "popularity": "very-high"
  },
  {
    "id": 32,
    "title": "ARTIFICIAL INTELLIGENCE",
    "code": "BCS525B",
    "category": "core",
    "semester": "5",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
    "solutionLink": "https://drive.google.com/file/d/1Tk6xZC9hMrbLHgiFaHie5uiMDQ3s5YJ3/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
    "popularity": "medium"
  },
  {
    "id": 33,
    "title": "FULL STACK DEVELOPMENT",
    "code": "21CS55",
    "category": "core",
    "semester": "5",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
    "popularity": "medium"
  },
  {
    "id": 34,
    "title": "RESEARCH AND METHO AND IPR",
    "code": "BRMK557",
    "category": "core",
    "semester": "5",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1-30gK3LYRL6J1zgepkqzaOmc4OvD0AnG/preview",
    "solutionLink": "https://drive.google.com/file/d/1BBkuv6CHqrWqP7szFL1uzA3gsXzdntCu/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1-30gK3LYRL6J1zgepkqzaOmc4OvD0AnG/preview",
    "popularity": "medium"
  },
  {
    "id": 35,
    "title": "Environmental Studies",
    "code": "21EV57",
    "category": "elective",
    "semester": "5",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1tW1jd9r3Kof_8Y4SbI592C_BTkrcwL3W/preview",
    "solutionLink": "https://drive.google.com/file/d/1R-hi6-za7sokZhVqQsyKv9m56ge6wDCL/preview",
    "oldPaperLink": "https://drive.google.com/file/d/14fYP5dgZp4EURk-Mr1WeFlWVCeZTeiRt/preview",
    "popularity": "medium"
  },
  {
    "id": 36,
    "title": "Unix System Programming",
    "code": "BCS515C",
    "category": "core",
    "semester": "5",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1Blttayw5q6cGL7OLd1ufoV5hGv5PZLPH/preview",
    "solutionLink": "https://drive.google.com/file/d/1TuS1E1iSPJ7G5vyfcreNjq4_m6O6ZFuQ/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1uLiZKT2rA7GMgqMaYzH7IAGu5KcgOSgv/preview",
    "popularity": "medium"
  },
  {
    "id": 37,
    "title": "THEORY OF COMPUTATION",
    "code": "BCS503",
    "category": "core",
    "semester": "5",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1UqP3Q51_T-0aGTk8QQeBjWSF2y4oeEto/preview",
    "solutionLink": "https://drive.google.com/file/d/1OfbbBXT1eYl-mAruZYJZzNiRotujQe5E/preview",
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 38,
    "title": "Microcontrollers & Embedded Systems",
    "code": "BCO601",
    "category": "core",
    "semester": "6",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1BUbRTKVfkXgLlLsmZ5AqD7ANrvRQzC3D/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1BmqvVe8WhNCRsXdVT3K-4x8sJbKWDq0l/preview",
    "popularity": "medium"
  },
  {
    "id": 39,
    "title": "CLOUD COMPUTING",
    "code": "BCS601,BIS613D",
    "category": "core",
    "semester": "6",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1lNZUZNCCaJM33y_kzv3sbJSird2AmCRM/preview",
    "solutionLink": "https://drive.google.com/file/d/1p6_qanjmcbp1z7X9XYrKZxy1dwfSLO4R/preview",
    "oldPaperLink": "https://drive.google.com/file/d/11aOchNzYu0p5nvYKYtoa3iZKG2x-SK6B/preview",
    "popularity": "medium"
  },
  {
    "id": 40,
    "title": "WATER CONSERVATION AND RAIN WATER HARVESTING",
    "code": "BCV654A",
    "category": "core",
    "semester": "6",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1bOrd1-U9omf_IH3ZS5gWPceSfP01O4a8/preview",
    "solutionLink": "https://drive.google.com/file/d/1bOrd1-U9omf_IH3ZS5gWPceSfP01O4a8/preview",
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 41,
    "title": "Natural Language Processing",
    "code": "BAI601",
    "category": "core",
    "semester": "6",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
    "popularity": "medium"
  },
  {
    "id": 42,
    "title": "ARTIFICIAL INTELLIGENCE",
    "code": "21CS69",
    "category": "core",
    "semester": "6",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
    "solutionLink": null,
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 43,
    "title": "BIOLOLY FOR ENGINEERS",
    "code": "21BE70",
    "category": "elective",
    "semester": "6",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1h_udrhNRqd0UiwdM8bVeH_PTXyWsVcKB/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1aD7ZjnBroS5GvDCcULUJ-F9mrkRgU826/preview",
    "popularity": "medium"
  },
  {
    "id": 44,
    "title": "Integrated Waste Management for Smart City",
    "code": "21IW64",
    "category": "core",
    "semester": "6",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1S6IqRQY87HsRhsqKC3CWsljih5zQoWt-/preview",
    "solutionLink": "https://drive.google.com/file/d/1RXzRXZKEf3q60oNmuWiCC4bqr8KYhFPa/preview",
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 45,
    "title": "BIG DATA ANALYTICS",
    "code": "BCS714D",
    "category": "core",
    "semester": "7",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1YyscUweUvfoV0BP0RQvrUREgv7mOpmAS/preview",
    "solutionLink": "https://drive.google.com/file/d/1m9VH6NBghr7IWFk2v798RrMbLXeZQahf/preview",
    "oldPaperLink": null,
    "popularity": "medium"
  },
  {
    "id": 46,
    "title": "Cryptography & Network Security",
    "code": "BCO601",
    "category": "core",
    "semester": "7",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1BzdLI_W8Cw9CrnyoJip_OLKoEQu-fLpg/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1OKuuW3HnLFZD6PcGhMvW1FImjnI-8fxo/preview",
    "popularity": "medium"
  },
  {
    "id": 47,
    "title": "CONSERVATION OF NATURAL RESOURCES",
    "code": "BCV755B",
    "category": "core",
    "semester": "7",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/1D5X9yRrnZ5T_r-jA0m1TQWOHAA2JyPi/preview",
    "solutionLink": "https://drive.google.com/file/d/1c1RSOovace8BaeF_1LbM_2DTeL4fyKFO/preview",
    "oldPaperLink": "https://drive.google.com/file/d/1-dNfufKKZWO3I4EARVDYSURFB6KMGexz/preview",
    "popularity": "medium"
  },
  {
    "id": 48,
    "title": "Parallel Computing",
    "code": "BCS702",
    "category": "core",
    "semester": "7",
    "year": "2024",
    "modelPaperLink": "https://drive.google.com/file/d/170ExErQsAgDRdAlwd2vRcYSu43RaIgb_/preview",
    "solutionLink": null,
    "oldPaperLink": "https://drive.google.com/file/d/1gigxbfaP9OQJhGRlpmNvRu9H1UgDBcBc/preview",
    "popularity": "medium"
  }
];

const categories = [
  { id: 'all', label: 'All Papers', icon: <HiInbox />, color: '#8B5CF6' },
  { id: 'core', label: 'Core Subjects', icon: <HiAcademicCap />, color: '#3B82F6' },
  { id: 'elective', label: 'Electives', icon: <HiStar />, color: '#10B981' },
  { id: 'basic_science', label: 'Basic Sciences', icon: <FaLayerGroup />, color: '#F59E0B' },
  { id: 'programming', label: 'Programming', icon: <HiDocumentText />, color: '#EC4899' }
];

const semesters = [
  { id: 'all', label: 'All Sems', icon: '📅' },
  { id: '1', label: 'Sem 1', icon: '1️⃣' },
  { id: '2', label: 'Sem 2', icon: '2️⃣' },
  { id: '3', label: 'Sem 3', icon: '3️⃣' },
  { id: '4', label: 'Sem 4', icon: '4️⃣' },
  { id: '5', label: 'Sem 5', icon: '5️⃣' },
  { id: '6', label: 'Sem 6', icon: '6️⃣' },
  { id: '7', label: 'Sem 7', icon: '7️⃣' },
  { id: '8', label: 'Sem 8', icon: '8️⃣' },
];

const ModelPapers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedSemester, setSelectedSemester] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('alphabetical');
  const [filteredPapers, setFilteredPapers] = React.useState(papers);
  const [isDarkMode, setIsDarkMode] = React.useState(() => localStorage.getItem("theme") === "dark");
  const [bookmarkedPapers, setBookmarkedPapers] = React.useState(() => JSON.parse(localStorage.getItem('paperBookmarks') || '[]'));
  const [showBookmarks, setShowBookmarks] = React.useState(false);
  const [selectedPaper, setSelectedPaper] = React.useState(null);

  React.useEffect(() => {
    let result = [...papers];
    if (searchTerm) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory);
    if (selectedSemester !== 'all') result = result.filter(p => p.semester === selectedSemester);

    result.sort((a, b) => {
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      if (sortBy === 'newest') return parseInt(b.year) - parseInt(a.year);
      if (sortBy === 'semester') return parseInt(a.semester) - parseInt(b.semester);
      if (sortBy === 'popularity') {
        const order = { 'very-high': 4, 'high': 3, 'medium': 2, 'low': 1 };
        return (order[b.popularity] || 0) - (order[a.popularity] || 0);
      }
      return 0;
    });
    setFilteredPapers(result);
  }, [searchTerm, selectedCategory, selectedSemester, sortBy]);

  React.useEffect(() => {
    localStorage.setItem('paperBookmarks', JSON.stringify(bookmarkedPapers));
  }, [bookmarkedPapers]);

  const handleOpenHub = (paper, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("Opening Hub for:", paper.title);
    setSelectedPaper(paper);
  };

  const handleCloseHub = (e) => {
    if (e) e.stopPropagation();
    setSelectedPaper(null);
  };

  const toggleBookmark = (id) => {
    setBookmarkedPapers(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleCopyLink = (paper) => {
    const link = window.location.origin + '/pdf/' + encodeURIComponent(paper.modelPaperLink || paper.solutionLink);
    navigator.clipboard.writeText(link);
    // You might want to show a toast here in a real app
    alert("Link copied to clipboard!"); 
  };

  const getDownloadLink = (url) => {
    if (!url) return null;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? `https://drive.google.com/uc?export=download&id=${match[1]}` : url;
  };

  return (
    <div className={`papers-portal-root ${isDarkMode ? 'dark' : 'light'}`}>
      {/* --- Floating Background Elements --- */}
      <div className="papers-background-shapes">
        <div className="shape s1"></div>
        <div className="shape s2"></div>
        <div className="geo-shape hexagon geo-1"></div>
        <div className="geo-shape triangle geo-2"></div>
        <div className="geo-shape hexagon geo-3"></div>
        <div className="geo-shape triangle geo-4"></div>
      </div>

      <div className="papers-hero-layer">
        <div className="portal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="papers-hero-card"
          >
            <div className="hero-mesh-bg"></div>
            <div className="hero-brand">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="brand-glow"
              ></motion.div>
              <motion.h1 layout>
                Model Papers <span className="version-tag">3.0</span>
              </motion.h1>
              <p className="hero-p">Experience the future of VTU resource accessibility.</p>
            </div>

            <div className="hero-stats-island">
              <div className="hero-stat">
                <span className="stat-value">{papers.length}</span>
                <span className="stat-tag">Cataloged</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="stat-value">{bookmarkedPapers.length}</span>
                <span className="stat-tag">Saved</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="papers-main-content portal-container">
        
        {/* --- LIVE TRAFFIC HUB (Moved to Top) --- */}
        {!showBookmarks && (
          <div className="trending-hub-top" style={{marginBottom: '50px'}}>
             <div className="trending-barrier">
                <div className="barrier-line"></div>
                <span style={{color: '#F59E0B', fontWeight: '900', letterSpacing: '2px'}}>LIVE TRAFFIC</span>
                <div className="barrier-line"></div>
             </div>
             <div className="trending-scroller" style={{display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '10px'}}>
                {papers.filter(p => p.popularity === 'very-high').slice(0, 10).map(p => (
                  <motion.div
                    whileHover={{ scale: 1.05, borderColor: '#F59E0B' }}
                    key={p.id}
                    className="trending-mini-card"
                    style={{minWidth: '280px', border: '1px solid rgba(255,255,255,0.1)'}}
                    onClick={() => setSelectedPaper(p)}
                  >
                    <div className="mini-icon" style={{background: 'rgba(245, 158, 11, 0.2)'}}><FaBolt color="#F59E0B"/></div>
                    <div className="mini-info">
                      <h4 style={{color: 'white', fontSize: '0.9rem'}}>{p.title}</h4>
                      <span style={{color: '#94A3B8', fontSize: '0.75rem'}}>{p.code}</span>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        )}

        {/* -- Futuristic Island Control Bar -- */}
        <div className="papers-island-controls glass-noise">
          <div className="search-pill">
            <HiMagnifyingGlass className="search-icon-act" />
            <input
              type="text"
              placeholder="System Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <HiXMark className="clear-icon" onClick={() => setSearchTerm('')} />}
          </div>

          <div className="filter-pill-group">
            <div className="sort-pill">
              <HiAdjustmentsHorizontal />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="alphabetical">Name</option>
                <option value="newest">Recent</option>
                <option value="semester">Sem</option>
                <option value="popularity">Hot</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`bookmark-toggle-pill ${showBookmarks ? 'active' : ''}`}
              onClick={() => setShowBookmarks(!showBookmarks)}
            >
              <HiStar />
            </motion.button>
          </div>
        </div>

        {/* -- Category Scroller -- */}
        <div className="category-scroller">
          <div className="scroller-inner">
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                whileHover={{ y: -2 }}
                className={`cat-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <div className="cat-icon-frame">{cat.icon}</div>
                <span>{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* -- Semester Grid -- */}
        <div className="sem-pill-grid">
          {semesters.map(sem => (
            <motion.button
              key={sem.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`sem-pill ${selectedSemester === sem.id ? 'active' : ''}`}
              onClick={() => setSelectedSemester(sem.id)}
            >
              {sem.label}
            </motion.button>
          ))}
        </div>

        {/* -- Papers Grid with 3D Tilt Effect Look -- */}
        <motion.div layout className="papers-high-grid">
          <AnimatePresence mode='popLayout'>
            {(showBookmarks ? papers.filter(p => bookmarkedPapers.includes(p.id)) : filteredPapers).map((paper, idx) => (
              <React.Fragment key={paper.id}>
              <motion.div
                layout
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                whileHover={{ y: -8, perspective: 1000 }}
                className={`paper-high-card ${paper.popularity === 'very-high' ? 'is-hot-glow' : ''} ${paper.year === '2024' ? 'is-new-glow' : ''}`}
              >
                <div className="card-glass-noise"></div>
                <div className="paper-card-top">
                  <div className={`paper-type-tag ${paper.category}`}>{paper.category.replace('_', ' ')}</div>
                  <motion.button
                    whileTap={{ scale: 1.5 }}
                    onClick={() => toggleBookmark(paper.id)}
                    className={`paper-save-btn ${bookmarkedPapers.includes(paper.id) ? 'saved' : ''}`}
                  >
                    {bookmarkedPapers.includes(paper.id) ? <HiBookmark /> : <HiOutlineBookmark />}
                  </motion.button>
                </div>

                <div className="paper-card-body">
                  <div className="paper-id-vibe">{paper.code}</div>
                  <h3>{paper.title}</h3>
                  <div className="paper-meta-row">
                    <span className="meta-item"><HiAcademicCap /> Sem {paper.semester}</span>
                    <span className="meta-item"><HiCalendar /> {paper.year}</span>
                    {paper.popularity === 'very-high' && <span className="meta-hot"><div className="hot-pulse"></div> HOT</span>}
                    {paper.year === '2024' && <span className="meta-new"><HiFire /> NEW</span>}
                  </div>
                </div>

                <div className="paper-card-footer">
                  <button className="paper-prime-btn view" onClick={(e) => handleOpenHub(paper, e)}>
                    <HiEye /> <span>Open Hub</span>
                  </button>
                  <a href={getDownloadLink(paper.modelPaperLink || paper.oldPaperLink)} download className="paper-prime-btn download" onClick={(e) => e.stopPropagation()}>
                    <HiArrowDownTray />
                  </a>
                </div>
              </motion.div>
               {/* Inject In-Feed Ad after every 6th item */}
               {(idx + 1) % 6 === 0 && (
                  <motion.div 
                    layout 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="paper-high-card ad-card-container"
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                     <AdSenseAd 
                        adClient="ca-pub-9499544849301534" 
                        adSlot="4047001347" 
                        adFormat="auto"
                        fullWidthResponsive={true}
                        style={{ display: 'block', minWidth: '250px' }}
                     />
                  </motion.div>
               )}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPapers.length === 0 && (
          <div className="papers-empty-state">
            <HiInbox className="empty-icon" />
            <h3 className="empty-h">System Empty</h3>
            <p className="empty-p">No resources detected for this query.</p>
            <button className="reset-btn-vibe" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedSemester('all'); }}>Re-initialize</button>
          </div>
        )}
      </div>



      <div className="portal-footer-ad portal-container">
        <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="7579321744" adFormat="auto" fullWidthResponsive={true} />
        <CommentSection />
      </div>

      {/* --- High-Fidelity Glass Drawer --- */}
      <AnimatePresence>
        {selectedPaper && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseHub}
              className="paper-drawer-overlay"
            />
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="paper-glass-drawer"
            >
              <div className="drawer-header">
                <button className="close-drawer" onClick={handleCloseHub}><HiXMark /></button>
                <div className="drawer-badges">
                  <span className="badge-sem">Semester {selectedPaper.semester}</span>
                  <span className="badge-year">{selectedPaper.year}</span>
                </div>
              </div>

              <div className="drawer-content">
                <div className="content-brand">
                  <div className="brand-icon"><FaFilePdf /></div>
                  <span className="brand-code">{selectedPaper.code}</span>
                </div>
                <h2>{selectedPaper.title}</h2>
                <p>Access the official VTU model papers and verified solutions for this subject.</p>

                <div className="resource-stack">
                  <button className="action-box primary-paper" onClick={() => navigate(`/pdf/${encodeURIComponent(selectedPaper.modelPaperLink)}`)}>
                    <div className="box-info">
                      <h4>Model Paper</h4>
                      <span>Preview Official Paper</span>
                    </div>
                    <HiEye className="box-icon" />
                  </button>
                  
                  {selectedPaper.oldPaperLink && (
                    <button className="action-box secondary-paper" onClick={() => navigate(`/pdf/${encodeURIComponent(selectedPaper.oldPaperLink)}`)}>
                      <div className="box-info">
                        <h4>Old Exam Paper</h4>
                        <span>Previous Session</span>
                      </div>
                      <HiCalendar className="box-icon" />
                    </button>
                  )}

                  {selectedPaper.solutionLink && (
                    <button className="action-box secondary-paper" onClick={() => navigate(`/pdf/${encodeURIComponent(selectedPaper.solutionLink)}`)}>
                      <div className="box-info">
                        <h4>Solutions</h4>
                        <span>Verified Answers</span>
                      </div>
                      <HiStar className="box-icon" />
                    </button>
                  )}
                </div>

                <div className="drawer-actions">
                  <a href={getDownloadLink(selectedPaper.modelPaperLink)} download className="secure-dl-btn">
                    <HiArrowDownTray /> <span>Secure Download</span>
                  </a>
                  <button className="share-action-btn" onClick={() => handleCopyLink(selectedPaper)}>
                    <HiShare /> <span>Share Resource</span>
                  </button>
                </div>
              </div>

              <div className="drawer-footer">
                <p>Files are served via secure cloud infrastructure.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModelPapers;