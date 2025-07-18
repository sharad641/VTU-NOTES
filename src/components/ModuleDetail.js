// src/components/ModuleDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdSenseAd from './AdSenseAd'; 
import "./ModuleDetail.css";
import { AiOutlineEye } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";


const ModuleDetail = () => {
  const { branch, semester, subjectName } = useParams();
  const navigate = useNavigate();

  const moduleDetails = {
    "first-year": {
      1: [
        {
          title: "Mathematics For CSE",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1s__ib0S7BVMtYVWCU6G3wiwJqXlyDpXk/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1KHVZG-p6tFYMfcRhgj8GJ2y6v7xBqI2C/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1-IwKiWyX413t3ttm_nLlX1DHeMTIBZsG/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1OnesfEvKWdqHx2HfXV046dx-QN7eZXSc/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1Mxfj8jZl1T9NlM8Mu-5MHiFEsninrxFV/preview",
            },
            {
              title: "Mathematics Question Paper",
              content: "Past question paper for Mathematics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1lykWhoLSLbdD66PywFOvqKadpjZnPO41/preview",
            },
            {
              title: "Question Paper Solutions 1",
              content: "Past question paper solutions for Mathematics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1yI2Fs_AqYSwB55JyYhz8lSvghi1jmKUy/preview",
            },
            {
              title: "Question Paper Solutions 2",
              content: "Past question paper solutions for Mathematics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1MuMVnSVrLteIfq0KzNT506KtaQZeZxLh/preview",
            },
            {
              title: "Question Paper Solutions 3",
              content: "Past question paper solutions for Mathematics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1NTy9LapYCGOeUA8y5TruF72X_H7VQ9Eo/preview",
            },

            {
              title: "Mathematics Question Bank",
              content: "Question bank for Mathematics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1dytNuksweWVZ4o0uedFM8wrI0fnxYmBc/preview",
            },
          ],
        },
        {
          title: "Applied Physics For CSE",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1fxNcviU2MkJtSpdN3KhF_QuyIBHl4gvo/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/174lgTaTm2_2yxxlAjUO-JWAfJt1wHlx8/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1IpCD0rOzck5qE6iVd25Ul5ZksMi_Ulxa/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1fbateF4uIDpn3Wprfm0egzENJMNw8WPE/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1QLF1kJz8HpWxQXzUX2pdkrKk6iqgyOe-/preview",
            },

            {
              title: "Applied Physics Question Paper 1",
              content: "Past question paper for Applied Physics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1EPo4fKtVC-pRv-31K1ngNobA9hJn4kDo/preview",
            },
            {
              title: "Applied Physics Question Paper 2",
              content: "Past question paper for Applied Physics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1Cj3-3mlvepcXP5lVMqbjlydqMzOYCRgN/preview",
            },
            {
              title: "Applied Physics Question Paper Solutions",
              content: "Question bank for Applied Physics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1Eq3hyKXbgBeVgPw_rgG5xFsU3pIl9VCA/preview",
            },
          ],
        },

        {
          title: "Principle of Programming Using C",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1DOdW_T-H2f4Y_seK2hTuXrleK5bLZX86/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/10aNa2X7NHtHUx6eOOfzQpyJSrtGvIJYl/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1AHMX2rp_EFTtZDIysXgKZrxJ8-_b9Hma/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1J70Q4Ra0zfaqJrcTiyuU3RbdNKa-a9hD/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/16qt-Tq3FDCdnt7mTQy3uUPbKoAoHwKVI/preview",
            },

            {
              title: "Question Paper With Solutions 1",
              content:
                "Past question paper for Principle of Programming Using C for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1Gx8ywx2qLVmGyxMlZQSV8sq7s9vcHlRG/preview",
            },
            {
              title: "Question Paper With Solutions 2",
              content:
                "Question bank for Principle of Programming Using C for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1Lyy-k8PAf6fpSkYI3hWjmEwiGHAJyGbj/preview",
            },
          ],
        },
        {
          title: "Communicative English",
          modules: [
            {
              title: " All Modules : Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1ex__XzQIgffF0i2FxJLWBVKrE_86iD0O/preview",
            },
            {
              title: "Question Paper: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1J1SrDpWDM0hYceSUuNOygjMzpKIE7om9/preview",
            },
          ],
        },
        {
          title: "Indian Constitution",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1l45DXBLpO0rjkJx39pyOsTIZ6K6Aqayn/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/18XeWQyqLhr-LbA-tb2s0PZyCL1W5OSSC/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/13s0LdIbsaAQ6By-l4Ox7Qm0KRxin6VI7/review",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/10GVFaHnbmXd2GAd1W6INNbo7XhtxjKuT/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1P5AKy9coI0kGbne6HDGv5JaZkNZfjQkt/review",
            },
            {
              title: "Question Bank",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/17WIR2HLEBRT0QQM4kw1WevirttZs7GeS/preview",
            },
          ],
        },
        {
          title: "Scientific Foundation Of Health",
          modules: [
            {
              title: "Module 1 To 5: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/11L8jsTLfh8-JsISUo4GDU9Neq4DA7gQK/preview",
            },
            {
              title: "Question Paper Solutions: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing",
            },
          ],
        },
        {
          title: "Introduction to Civil Engineering",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1MoFtUIMqSt2eghdz8F28GXH1HCEFDjot/review",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1JxEkRaUwuK8V3T2aOQpHocwa0kdvpg3l/review",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/11tN1-pn4VnhwhOTfqs5Dpr89OHtfFp1R/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1jBfzEuW11oISuvKWVxr082DDhYO0Kw9B/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1QJ4wQU-KobTDanBtL11C0W2cjq-BHShQ/preview",
            },
            {
              title: "Question Paper",
              content: "Past question paper for Applied Physics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1QJ4wQU-KobTDanBtL11C0W2cjq-BHShQ/preview",
            },
            {
              title: "Question Bank",
              content: "Question bank for Applied Physics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1hgoSu8mT6Z6IkMJfHUSFmGuV9OR-m1Vi/preview",
            }
          ]
        }
        // Add more subjects...
      ],
      2:[
        {
          title: "Mathematics For CSE",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1V1oKb8kALhD5mNAYZkb7Z5zkicbSxRYP/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1w-BYdgRW7EGkqXnogAj-sm5XTCRNG5Yr/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1uxmv3kbTRT33Z7Klm6cg-B4XwrNFZmUQ/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1_31eml29PMNaq9E8y-2tv4xK0YikP6Qg/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1S3G0chd80RccZ3b9bvrfx5j_s8l_IVzx/preview",
            },
            {
              title: "Question Solutions ",
              content: "Past question paper for Mathematics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1BXyhq4ZiTLbhpIwJHGkRYe60rbJQqQne/preview",
            },
            {
              title: "Question paper Solution",
              content: "Question bank for Mathematics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1vHxAXnHlBBglr-K3ZUAGqzwP5SC0qNki/preview",
            },
            {
              title: "Old QP'S",
              content: "Question bank for Mathematics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1cWG4jvZRZ2iBJA09t0WRW78dqw2vdm9x/preview",
            },
          ],
        },
        {
          title: "Applied Chemistry For CSE",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1UqN74vxRKMK7nduE-o8hqPBGQjXlBKD2/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1hBuNu8Kr-pfcP_12BD7F5IKIIoO4oMnw/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1rWU-U4keAIU5eNUs9Ivmjiaa3zNRH_tP/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1lXhQo1TwgXsuKw8JQW7yWLODRECaLJwU/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1VBRZDrTut8xPBlVvYb6zUm8yMXnJwr7i/preview",
            },
            {
              title: "Question Paper Solution 1",
              content: "Past question paper for Chemistry for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/15WLqIDiaKljyJWdl0XsWBWfB-lTJiiS1/preview",
            },
            {
              title: "Question Paper Solution",
              content: "Question bank for Chemistry for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1lnD5TTvI5X_8sng4E0qzT5pGCr74z6LL/preview",
            },
          ],
        },
        {
          title: "Introduction to Python Programming",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/176FQ4JP8TBnVp13Up3kU3e2NnwqZepwM/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1oxEARMoSL3mNe__8pb9pg_kZO4rc0Hwo/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1dOyBTLBoYHYpWl9mOL0QOId3cW1UFLLk/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1kVzP3a-n7vcltowW8HpJez68622gXCQM/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1BS2HK9KGuc191E8NM6JZoG6oxJBtev-3/preview",
            },
            {
              title: "Question Paper",
              content: "Past question paper for Applied Physics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1aylHWxDTEvZ9W3oZDX2vUy3luveUwKlX/preview",
            },
            {
              title: "Question Bank",
              content: "Question bank for Applied Physics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1aylHWxDTEvZ9W3oZDX2vUy3luveUwKlX/preview",
            },
          ],
        },
        {
          title: "Computer Aided Engineering Drawing",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1Fc3yVkZZ2aBnQ5fiuGPxHKZ79tDIAgRK/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1Fc3yVkZZ2aBnQ5fiuGPxHKZ79tDIAgRK/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1Fc3yVkZZ2aBnQ5fiuGPxHKZ79tDIAgRK/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1Fc3yVkZZ2aBnQ5fiuGPxHKZ79tDIAgRK/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1Fc3yVkZZ2aBnQ5fiuGPxHKZ79tDIAgRK/preview",
            },

            {
              title: "Question Paper",
              content: "Past question paper for CAED for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1Fc3yVkZZ2aBnQ5fiuGPxHKZ79tDIAgRK/preview",
            },
            {
              title: "Question Bank",
              content: "Question bank for CAED for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1Fc3yVkZZ2aBnQ5fiuGPxHKZ79tDIAgRK/preview",
            },
          ],
        },
        {
          title: "Professional Writing Skills in English",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1RsTzr_2in3Ht-iAVJj2nhR_6iAU6aTY4/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1RsTzr_2in3Ht-iAVJj2nhR_6iAU6aTY4/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1RsTzr_2in3Ht-iAVJj2nhR_6iAU6aTY4/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1RsTzr_2in3Ht-iAVJj2nhR_6iAU6aTY4/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1RsTzr_2in3Ht-iAVJj2nhR_6iAU6aTY4/preview",
            },
          ],
        },
        {
          title: "Samskrutika Kannada",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/18Te010SE2eAZNBvhmCDHnKjH4kyqCvPr/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/18Te010SE2eAZNBvhmCDHnKjH4kyqCvPr/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/18Te010SE2eAZNBvhmCDHnKjH4kyqCvPr/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/18Te010SE2eAZNBvhmCDHnKjH4kyqCvPr/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/18Te010SE2eAZNBvhmCDHnKjH4kyqCvPr/preview",
            },
          ],
          questionPaper: {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
          },
          questionBank: {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
          },
        },
        {
          title: "Innovation and Design Thinking",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1gH6HN4aKKjH-PIhUOPBQBZJYI3m0bdRG/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/10_XpzvURU7n9fTqu0PpEIEBnEEvS7xCZ/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1RtljOIxNyCEN8zr0g5eLA7VCI0ocfDUT/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1kiWFMMzf5c4JdZ1-Y5wpJeEjyD3kze3w/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1kiWFMMzf5c4JdZ1-Y5wpJeEjyD3kze3w/preview",
            },

            {
              title: "Question Paper",
              content:
                "Past question paper for Innovation and Design Thinking for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1Cb5HxUCDqcRz9VxyLF6di55NKhlmuYYF/preview",
            },
            {
              title: "Question Bank",
              content:
                "Question bank for Innovation and Design Thinking for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1Cb5HxUCDqcRz9VxyLF6di55NKhlmuYYF/preview",
            },
          ],
        },
        
        {
          title: "Introduction to Electrical Engineering",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1xPPIkAHaOdAQp3axlMRqs-NenKxszI4_/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1_dhN72FrHIF_SKWjnmHMPTotq3pjKxLZ/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1kKijLrPMLH2VAUULszKSt7tHPNLILlMu/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1H0aicsDIdGfwoT3UcZ5XXGyswiwL9PXc/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1H0aicsDIdGfwoT3UcZ5XXGyswiwL9PXc/preview",
            },
            {
              title: "Question Paper",
              content:
                "Past question paper for Introduction to Electrical Engineering for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1H0aicsDIdGfwoT3UcZ5XXGyswiwL9PXc/preview",
            },
            {
              title: "Question Bank",
              content:
                "Question bank forIntroduction to Electrical Engineering for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1H0aicsDIdGfwoT3UcZ5XXGyswiwL9PXc/preview",
            }
          ]
        }
      ]
    },
    

    // Define Semester 2 subjects similarly...
    cse: {
      3: [
        {
          title: "Mathematics For CSE",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1vWg4QvQkAmrHH3-M_5hILwBAgz9bgz3j/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/12PODz_6mcpuDaWrSxLMJwc3dLxwKqMxz/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1S1lPqH5dQVCEUtH0Pb4Gl62U57Evgen5/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1kixPTna-JBRcoxTm4XMNmenwoDPaomb6/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/13o1DMI6HAJO3B8U53ZiKJZU_junUeqzG/preview",
            },
          {
            title: "Hand Book",
            content: "Hand Book for Mathematics M3 for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1sw60XigOotMxYz7Z-kg4OOhCP_rTHosA/preview",
          },
         {
            title: "Model Question Paper Solutions 1",
            content: "Model Question Paper Solutions for Mathematics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1CfrHqCUNxH8g9OrAch_ICUXjId-IIe8D/preview",
          },
          {
            title: "Model Question Paper Solutions 2",
            content: "Model Question Paper Solutions for Mathematics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1nPXbLEwRwi_Kqe6ZErRvWNcUEHWyeK2c/preview",
          },
          {
            title: "Preeviou year Question Paper",
            content: "Previou Year Question Paper for Mathematics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1l2xmqza7K91IFOHeC1tAeOV0OC9Su8OG/preview",
          },
          {
            title: " Question Bank",
            content: " Question Bank for Mathematics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1ZlfCQX1dAHU6UERsaOlEiA4PeSKWWNk5/preview",
          },
        ],
        },
        {
          title: "Digital Design  and Computer Organization",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Introduction to Digital Design",
              previewUrl:
                "https://drive.google.com/file/d/17Xcfk02ShPbiC68v30mR64JyLN8Zlxo6/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Combinational Logic.",
              previewUrl:
                "https://drive.google.com/file/d/1ImRmWzwac1ZO39qNLDdSD8DvjPKBwpcp/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1IBDOIlh_HHs7KF5GS6BzCuEyYH50gS0U/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1Tg3_F919P-Ll4l_QP85dnoSfuTxDtsKk/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1ekZbe8Uef5enZtEffWbkgM6Qe7OAlFoo/preview",
            },
            {
              title: "Module 1:  HandWritten Notes",
              content: "Introduction to Digital Design",
              previewUrl:
                "https://drive.google.com/file/d/1KidcgQJCGdzha15kHA-YSvwxqjDu1v8a/preview",
            },
            {
              title: "Module 2:  HandWritten Notes",
              content: "Introduction to Digital Design",
              previewUrl:
                "https://drive.google.com/file/d/1wYZXAgA_1lWUmI7VWoEGi2bKeLB3c1Ga/preview",
            },
          {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1vJFpqCUTNg8VuxLFN11lcyLPBuCSXipi/preview",
          },
          {
            title: "Question Bank With Answers",
            content: "Question bank for Digital Design  and Computer Organization  uploaded.",
            previewUrl:
              "https://drive.google.com/file/d/1xROR5IqItpPVinhNgAJ0RBexaho7LEcE/preview",
          },
          {
            title: "Sample Question Paper Solved 1",
            content: "Past question paper for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/116jSyk-tRM75t2gEd4oW5dsqtPUp1Q22/preview",
          },
          {
            title: "Sample Question Paper Solved 2",
            content: "Past question paper for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1xROR5IqItpPVinhNgAJ0RBexaho7LEcE/preview",
          },
          {
            title: "Module wise Question Bank",
            content: "Past question paper for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1Iv1twGqOay_6AgutRMQ0ith-5rbcniR_/preview",
          },
        ],
        },
        {
          title: "OPERATING SYSTEMS",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1rIRXuo8dlDKCeMF3M5dfHOBk4pH1u7-a/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1JV1vRbkjEqoHAAzTWwpxJY1Kn2TNlNPd/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1lyXnXMBt6kv3kKNMiE3Dmzizsu-KAw20/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1rDoTPJ7b6p0UuaftTjgGqqclFROvbBFn/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1Kg26VTSML1ycedhsZe4h3Quq4sgI2cD9/preview",
            },
            {
              title: "Preeviou year Question Paper",
              content: "Model Question Paper Solutions for OS for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/149fqnua5_z08ALLCsDx__ktUvbtlCUwQ/preview",
            },
          {
            title: "Passing Question And Answer",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1LZTpPvlsoJKFuyVyIseHuRxbVqdIqw9Y/preview",
          },
          {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1xHotByXmwMNVzhxUqba7lgoL1U0gK56z/preview",
          },
        ],
        },
        {
          title: "DATA STRUCTURES AND APPLICATIONS",
          modules: [
           
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1sdCVxgc0VTlSZmdhTnz9vOMA9lvZHslu/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1HQxcfYqsHJyII7rd_2vuYZBI0srTO95s/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1yOHt9GHZR2vzglQ3JxhRCY_j9mh6M7rK/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1E53vCWzN6WWbUZ37VHRESlznDMPvSfC5/preview",
            },
            {
              title: "Preeviou year Question Paper",
              content: "Model Question Paper Solutions for DSA for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1Tn3bBl_kn75GRm9woVV3rSQtpBDTUMAb/preview",
            },
           {
            title: "Question Paper With Solutions",
            content: "Past question paper  for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1NT_kKeN4Z0UiW-OhHwgq-8vxWoW2RRAS/preview",
          },
         {
            title: "Question Bank",
            content: "Question bank  for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1X63ohxZNGaCN2PvjuMiJYPC8Vvh-Bggz/preview",
          },
        ],
        },
        {
          title: "Object Oriented Programming with JAVA",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1_FYFYH-jMk0iTJdbD3KzvyCzPaZARhgY/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1XZY3CWnQ1Nw-5JOVlX4yzXFwEonN8i7V/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1jItwo8T0w5FjGZsnk7k427TE4eZ_Idur/preview",
            },
            {
              title: "Module 4 and 5: Notes",
              content: "Comprehensive notes for Module 4 and 5 .",
              previewUrl:
                "https://drive.google.com/file/d/162G10sOkk5L8dd2o4REW0jBcWsi2XY1M/preview",
            },
            {
              title: "Module 1 and 2: Notes Question Bank",
              content: "Comprehensive QB for Module 1 and 2 .",
              previewUrl:
                "https://drive.google.com/file/d/1q05hkIDeTilr4zqIaEwGFD_daN7hpIw5/preview",
            },
            {
              title: "Module 3: Notes Question Bank",
              content: "Comprehensive QB for Module 3 .",
              previewUrl:
                "https://drive.google.com/file/d/1wj3e8ibE2BGqbmyS-CgKRk6_0SDAegF1/preview",
            },
            {
              title: "Module 4,5: Notes Question Bank",
              content: "Comprehensive QB for Module 4 and 5 .",
              previewUrl:
                "https://drive.google.com/file/d/18ybC3I6mC6EuuioRCmV5Vj2yz77bmPL9/preview",
            },
            
            {
              title: "Preeviou year Question Paper",
              content: "Model Question Paper for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/15AxKh0_v5kcOybfxEQniFcHBRz7ywQUH/preview",
            },
            {
              title: "Model  Question Paper Solutions ",
              content: "Model Question Paper for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1YU-gvPgPlxke6W6FRDmepicjnBJVExAW/preview",
            },
            {
              title: "All modules notes ",
              content: "All modules notes ",
              previewUrl:
                "https://drive.google.com/file/d/1Sv7zn3oq8E1cqv_l4JNH-F_FrxQvpgD6/preview",
            },
            
          ],
          questionPaper: {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1pert6LRVKbuT2XJ-vfaMSs9D_IvxixUv/preview",
          },
          questionBank: {
            title: "Lab Manual",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/159A_S3C9ipXLJCoZDt1CjRrY49svfuPU/preview",
          },
        },
        {
          title: "OBJECT ORIENTED PROGRAMMING with C++",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1_RfN83ev0JKW1Qd60UJnaNj2Z-mO2DWM/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1Wd7PYicstD6Im-d1sdsOavyDvhlZw38w/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1Wd7PYicstD6Im-d1sdsOavyDvhlZw38w/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1j0OIKwBlkWTw07wKWB8quBHIIgv98AoP/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1mNOnt2Tvkegvx-zAvGelFCC4bmwOfIV3/preview",
            },
          {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1mNOnt2Tvkegvx-zAvGelFCC4bmwOfIV3/preview",
          },
           {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1mNOnt2Tvkegvx-zAvGelFCC4bmwOfIV3/preview",
          },
        ],
        },
        {
          title: "DATA STRUCTURES LABORATORY",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/view?usp=sharing",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing",
            },
          ],
          questionPaper: {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing",
          },
          questionBank: {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing",
          },
        },
        {
          title: "Social Connect & Responsibility",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
            },
          {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
          },
           {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
          },
        ],
        },
      ],
      4: [
        {
          title: "Analysis & Design of Algorithms",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/135I6KMJ1MIq-vSNONF3c8kR2mLElEJ_5/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1J_yd0l-cfRByzqRTW60gcDs8Ku1ik15l/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/16or942srHaywuhLBQeegJuHPHyQA6wJ9/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1Vj0yQcZxBF5-bnXxiDzeexWDCHZDSJrY/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1Vj0yQcZxBF5-bnXxiDzeexWDCHZDSJrY/preview",
            },
           {
            title: "Question Papers with solutions",
            content: "Past question paper for Mathematics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1U-laCBUAydCFwnqFW5nmPgGHVWv3lPt1/preview",
          },
          
        ],
        },
        {
          title: "MICROCONTROLLERS",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Introduction to Digital Design",
              previewUrl:
                "https://drive.google.com/file/d/1EMoMc0Y-JfSwheP5Z7RD5N97dFtds4m4/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Combinational Logic.",
              previewUrl:
                "https://drive.google.com/file/d/1Xl1kyr0BRimocDCGDYS3e2N6qghVunw6/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/163Jtzh-qZBT4Y_ybP0Oru6v96VDL7mgu/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1UVpPakkPiRr5aGFOdZK4g6C9Pv1Tux6I/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1gBPIaF-2ArT1_t0sbkvzWXh8RNbhz6WL/preview",
            },
          {
            title: "PYQ",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1bFd7GbQA6GycngDouhlvhnjNAoPW6t6q/preview",
          },
          {
            title: "PYQ",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1aVBwZ8K9iHTS_uTiROIZjYcNovQUbv3b/preview",
          },

        
        ],
        },
        {
          title: "DATABASE MANAGEMENT SYSTEM",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1n1__pgOLZE_r1eMy3Cq_ds4L6mVs874j/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1qNasFNTZzzJVu0KmGyopb-6Dhuh4Xj6m/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1H3O_uleWOhfIF8D4lzxNJCyDrIBn0TYf/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1nXR1qjmQpMgkR-CuM2pPEU_OPdLYVn8-/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1vfHVSP0s9yIwy3981iRsCoThaQUZXij7/preview",
            },
           {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1ZIuMbL4yJbnBgp8NrU-PqwO35udCZlA1/preview",
          },
         
        ],
        },
        {
          title: "DISCRETE MATHEMATICAL STRUCTURES",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1qMa9r_JFzeczxadAG0jMmIPVBnFZcJ4M/preview",
            },
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1onVWqZzob1p3pJ--A2t4TwHeoRQZ_Qjy/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1V8WLIHttGjc3_IMgLx6p-6S39SSFpTaO/preview",
            },
            {
              title: "Module 3-1: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/15GXogCcBWNjCFPAGDzx63TfNn1DHbLmR/preview",
            },
            {
              title: "Module 3-2: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/15rZluF7iK1_50nR_8yx1wqO73J_KCYUG/preview",
            },
            
           {
            title: "Question Paper",
            content: "Past question paper for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1rFJKUntE4UNWRL1IMg2QjWzkVoeEFeuG/preview",
          },
          {
            title: "Model Question Paper Solution",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1wiliZvzo0-Zc2E_UMZDhXuNa2mKgKjw5/preview",
          },
          {
            title: "Question Paper June/July 2024 Solution",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/10bsSqzZMxz-Ve1DldYWZ1Sv7wAhKNUYT/preview",
          },
        ],
        },
        {
          title: "GRAPH THEORY",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1qxvOHrVApg0wi2AwLTpp_0dAaVSojYHk/preview",
            },
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1dN7Oilwe875Kk3hRdpd3TQqs6_hznS-5/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1L5NmNHOPyutMGby6IqqqbTl8h34kpGsS/preview",
            },
             {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/18EF-lYMgoR-AqTZ9SQXFy7-p3JQLkZgK/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/121Fs3LqOK7hPbIFTB75BBzmvdpoP0Vhi/preview",
            },
             
            {
              title: "Module 4 Anad 5: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1aU5nIgPWUYdA1ou4c9_pYbBoGUQFD-Wd/preview",
            },
             {
              title: "Module 4 & 5: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1GpBgOazBXvVWIppxvOf29zPVtm9wTOpM/preview",
            },
            {
              title: "Question Papers",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1Jdgxk2UiVeXb-TJJywapMucYhW_HLqj3/preview",
            },
            {
              title: "All In One Question Papers",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1Sb3hCekSG3Z9fdEq0H_qRqxTzz7w8XIE/preview",
            },
             {
              title: "MQP-01 SOL",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/15m3xXKv-Os6JlQI6QvlTnBet7lI2ynCx/preview",
            },
            {
              title: "MQP-2 SOL",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1JYXanZ2aJXagTh-aAv3G0G2GuhV5KuqN/preview",
            },
           
          ],
          questionPaper: {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1Sssc99LmtoGGYh6KyMx2jHcV-pHt02WS/preview",
          },
          questionBank: {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1Sssc99LmtoGGYh6KyMx2jHcV-pHt02WS/preview",
          },
        },
        {
          title: "Analysis & Design of Algorithms Lab",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1Sssc99LmtoGGYh6KyMx2jHcV-pHt02WS/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1muk8PYpH-w2OHQrpSF7cPDTwnL_4e7qs/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
            },
          ],
          questionPaper: {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
          },
          questionBank: {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
          },
        },
        {
          title: "ARTIFICIAL INTELLIGENCE",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
          ],
          questionPaper: {
            title: "Question Paper",
            content: ".",
            previewUrl:
              "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
          },
          questionBank: {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
          },
        },
        {
          title: "BIOLOLY FOR ENGINEERS",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1T8wYGZdPx8V0QeGDMb3cAOifdLFZXoZk/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1Tkra5ZzuWkKlfd99gBlp97EhjYzIAUXj/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/19VqgzZgvaE5Wt_aDcuR7pQH2StnzAqRF/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1mR8sVnrpFZlFhQd61EsdBQ5u6N5IKWPd/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/12NRJCozzG3BmFdob8kcHd8Oe2yYx0xQ8/preview",
            },
          {
            title: "Question Paper",
            content: "Past question paper for Biology for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1h_udrhNRqd0UiwdM8bVeH_PTXyWsVcKB/preview",
          },
          {
            title: "Question Paper 2",
            content: ".",
            previewUrl:
              "https://drive.google.com/file/d/1aD7ZjnBroS5GvDCcULUJ-F9mrkRgU826/preview",
          },
        ],
        },
      ],
      5: [
        {
          title: "Software Engineering & Project Management",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/14htN4dswag4Pm9tuqWnQOCPvUB8-BQMo/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1-RibizuedU-k5TgYSk9panOpyoSogNvC/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1bAm05nOtffFzZ6rEhRp1VCjQTqrb86Fz/preview",
            },
            {
              title: "module 4:Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1cpPl4-NTAs09C9gplu6s53m-FblYikpk/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1uFRlNWRLIu07OrMl_IhYRTmyFaJNxx0E/preview",
            },
            {
              title: " All Module : Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1W5YQTnHRW9lpHG3j-BLABkV72kZwd_fO/preview",
            },
         {
            title: "Question Paper",
            content: "Past question paper for Mathematics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1ucDCMJBz3s2vR7CPgS4FJgbK7-MueO5I/preview",
          },
          {
            title: "Question Paper",
            content: "question paper answer for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/10v2_2Z7BviRPPxZrjOKUW-1snHuIk-Ne/preview",
          },
          {
            title: "Handwritten Question Bank With Answers",
            content: "Question bank for for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1TUx_F_ldZje158xHr-7juovCHZanzDQU/preview",
          },
          {
            title: "Question Bank",
            content: "Question bank for for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1cgqyDznfxuOM3QmEgtWn0-YBiNv3B-il/preview",
          },
          {
            title: "Question Bank with Answer",
            content: "Question bank for for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1Pl8eVmmpfH1ytwraru6A3VMC6vFvelA8/preview",
          },
          {
            title: "Text Book",
            content: "Text Book for for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/184MXwac2OaFvdkX0UIsL8QMcVlCeasce/preview",
          },
        ],
        },
        {
          title: "COMPUTER NETWORKS",
          modules: [
            {
              title: "COMPUTER NETWORKS :SYLLABUS",
              content: "",
              previewUrl:
                "https://drive.google.com/file/d/1M2MG5Of1KaXjPRADzErO8nMNVG2ZpWxB/preview",
            },
            {
              title: "Module 1: Notes",
              content: "Introduction to Digital Design",
              previewUrl:
                "https://drive.google.com/file/d/1kPbN-KeYwX2CS1m_CdbMP13T6z3EppTJ/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Combinational Logic.",
              previewUrl:
                "https://drive.google.com/file/d/1zxmlNshpanuaVQr5ouDYaFaSM-fBhkrV/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/10bxnMK1Wy4M2cIOh4-o9zjOGTtBMCaXx/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1_DNrrK51JVbFq0cEzBBQY91k_P4hVe80/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1CTXPFi-biY3Kk60jlac2ep4LQo41hpsZ/preview",
            },
            {
              title: "BCS502 MQP SOLUTION 1",
              content: "model question paper solutions 1.",
              previewUrl:
                "https://drive.google.com/file/d/10ENVRIXIu0mJDN-9HfkDIyciEWItiXb6/preview",
            },
            {
              title: "BCS502 MQP SOLUTION 2",
              content: "model question paper solutions 2",
              previewUrl:
                "https://drive.google.com/file/d/1iCTpYPH9_tWGcbeadabuaTno9ZDJnM5D/preview",
            },
            {
              title: "All Module : Notes",
              content: "Comprehensive notes for Module 1 to 5.",
              previewUrl:
                "https://drive.google.com/file/d/1ABvQ3t0q7JHXMM2zPZaD-uQdFPot0LC6/preview",
            },
            {
              title: "CN previous year question paper",
              content: "CN previous year question paper for 2021 scheme for just reference ",
              previewUrl:
                "https://drive.google.com/file/d/1hN5bPv6Ida2mef6CXeJoE4YXCoZ4UfHr/preview",
            },
            {
              title: "CN previous year question paper with solutions",
              content: "CN previous year question paper for 2021 scheme for just reference ",
              previewUrl:
                "https://drive.google.com/file/d/1yy8X_H3x5hV20nCDUqbMaZ8TLrPOmlZo/preview",
            },
          {
            title: "Question Paper",
            content: "",
            previewUrl:
              "https://drive.google.com/file/d/1MQ0_LjfVOgeB0UFW6LTSnVjy_4Uw-Z0N/preview",
          },
          {
            title: "Question Bank With Answer",
            content: ".",
            previewUrl:
              "https://drive.google.com/file/d/13oBzGeclCmHM6ckKBtWdbsw0OfO-NauQ/preview",
          },
          {
            title: "TeXt Book",
            content: "",
            previewUrl:
              "https://drive.google.com/file/d/1uyAPk03up5k7ZD2IMix7jTq7I-Q6XssR/preview",
          },
        ],
        },
        {
          title: "THEORY OF COMPUTATION",
          modules: [
           
            {
              title: "Handwritten notes 1 to 5: Module",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1y5THYjPLyslh5Iee8aM32Ia2alIu2UxE/preview",
            },
           
            {
              title: "BCS503 MQP SOLUTION SAMPLE 1 ",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1OfbbBXT1eYl-mAruZYJZzNiRotujQe5E/preview",
            },
            {
              title: "BCS503 MQP 1 SOLUTION  SAMPLE 1 ",
              content: "",
              previewUrl:
                "https://drive.google.com/file/d/1FrvIgJ-jQjWZ0ECR0zSP0e1JizJaAWXE/preview",
            },
            {
              title: "BCS503 MQP 2 SOLUTION  SAMPLE 1 ",
              content: "",
              previewUrl:
                "https://drive.google.com/file/d/1uo_V8O6catQ2rKKqEmHYPL4TMcvr8Yf9/preview",
            },
            {
              title: "Handwritten notes 1: Module",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1G85ydZwjQIMWA9hRoEpUsxkM-2XxJo2S/preview",
            },
            {
              title: "Handwritten notes 2: Module",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/17Cr8IrutEVGkYRkrFQQ5Se_GOeKEVVvZ/preview",
            },
            {
              title: "Handwritten notes 3: Module",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1cOIvOdI_tUPnrosDre1bIvzs59SR_y0R/preview",
            },
            
            {
              title: "Handwritten notes 4:Module",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1Tm2YYtKwxOmV-u7y-06zQjnU5RV_Ucdz/preview",
            },
            {
              title: "Handwritten notes 1 to 5:Module",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1lUbrSa_Uh1TyDMykO6Fd6KHz5cH8VCSe/preview",
            },
           
            {
              title: "Text Book",
              content: "Comprehensive notes for Module.",
              previewUrl:
                "https://drive.google.com/file/d/1EspkLcP6HUvDXcNgMJxLn1RFpK2uELQJ/preview",
            },
          ],
          questionPaper: {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1UqP3Q51_T-0aGTk8QQeBjWSF2y4oeEto/preview",
          },
          questionBank: {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1UqP3Q51_T-0aGTk8QQeBjWSF2y4oeEto/preview",
          },
        },
        {
          title: "ARTIFICIAL INTELLIGENCE",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:"https://drive.google.com/file/d/1XlX_oX18KlqeYWdXRjYFezWHrzY4gMvO/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "ttps://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "ttps://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "ttps://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "ttps://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
          ],
          questionPaper: {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing",
          },
          questionBank: {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing",
          },
        },
        {
          title: "FULL STACK DEVELOPMENT",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "",
            },
          ],
          questionPaper: {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            downloadUrl:
              "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing",
          },
          questionBank: {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            downloadUrl:
              "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing",
          },
        },
        {
          title: "RESEARCH AND METHO AND IPR",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1uDkrg0L6mvJRCMKPkbYF1jJSvW83cXVv/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1rjrWMSe0ucOPX1t63LaX34zwduijeJNp/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/12m4OeJVinpx1SZLzIsNJsrOl66iu0krQ/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/178WfEwDsqxJWZHjgh6Hlu3yaJOPoXZN8/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1a5RBMQxT3nsDqUna90vHTBTJSfYzAm2J/preview",
            },
            {
              title: "Model Question Papers 1,2,3",
              content: "Comprehensive question paper for all Module.",
              previewUrl:
                "https://drive.google.com/file/d/1OmwKGOZ1V_uK3o_8XUiZJyR48erF_Mg6/preview",
            },
            {
              title: "Model Question Papers 1,2,3 Answers",
              content: "Comprehensive question paper for all Module.",
              previewUrl:
                "https://drive.google.com/file/d/1BBkuv6CHqrWqP7szFL1uzA3gsXzdntCu/preview",
            },
            {
              title: "Vtu reffered textbook",
              content: "Comprehensive question paper for all Module.",
              previewUrl:
                "https://drive.google.com/file/d/12O0-tvBgZSwbtYPTUpvAfscoUDC4Xeqy/preview",
            },
            {
              title: "Model Question Paper 1 Answer",
              content: "Comprehensive question paper for all Module.",
              previewUrl:
                "https://drive.google.com/file/d/1WUMy8vTu9HrlV6vd1mUAop4HvdPHop6A/preview",
            },
            {
              title: "Syllabus Copy",
              content: "Comprehensive for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1Yz5HhA-uMsA_C2CQOgD06Xyh5_C2tsHX/preview",
            },
          ],
          questionPaper: {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            downloadUrl:
              "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing",
          },
          questionBank: {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            downloadUrl:
              "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing",
          },
        },
        {
          title: "Environmental Studies",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1 With important MCQ and Answers",
              previewUrl:
                "https://drive.google.com/file/d/1yfCrkfXgeO8yUx9wRmX6wz1509qW_GlY/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2 With important MCQ and Answers",
              previewUrl:
                "https://drive.google.com/file/d/1w9AwlVfM3PsVxngPSS7NETWU6whW1NWd/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3 With important MCQ and Answers",
              previewUrl:
                "https://drive.google.com/file/d/1RoIoRI6EnsV-zYuH8CypsDgQ3fYpRiZb/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4 With important MCQ and Answers",
              previewUrl:
                "https://drive.google.com/file/d/1RtXR6_GctxPPbdFib0xW2hODsU5-m69k/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5 With important MCQ and Answers",
              previewUrl:
                "https://drive.google.com/file/d/1UFLg7HbwbTEUUycO1Lf5XYTNisMF8Mjk/preview",
            },
            {
              title: " All Module: Notes Simplified",
              content: "Comprehensive notes for All Modules",
              previewUrl:
                "https://drive.google.com/file/d/1TZndebMHZrzJ3ZNFxo5sGDnjO1_hy0-i/preview",
            },
            {
              title: " All Module: Notes",
              content: "Comprehensive notes for All Modules",
              previewUrl:
                "https://drive.google.com/file/d/1oknJRqu_blQ28SQD-vhJAgw_yo1Mp2aF/preview",
            },
            {
              title: "Question Bank",
              content: "Comprehensive  for All Modules",
              previewUrl:
                "https://drive.google.com/file/d/1tW1jd9r3Kof_8Y4SbI592C_BTkrcwL3W/preview",
            },
            {
              title: "Question Bank 2",
              content: "Comprehensive  for All Modules",
              previewUrl:
                "https://drive.google.com/file/d/14fYP5dgZp4EURk-Mr1WeFlWVCeZTeiRt/preview",
            },
            {
              title: "Question Paper With Answers",
              content: "Comprehensive  for All Modules",
              previewUrl:
                "https://drive.google.com/file/d/1R-hi6-za7sokZhVqQsyKv9m56ge6wDCL/preview",
            },

          ],
          questionPaper: {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            downloadUrl:
              "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing",
          },
          questionBank: {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            downloadUrl:
              "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing",
          },
        },
        {
          title: "Unix System Programming",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/11HU4yDA5PHElqHshiD-J2P14TMnne_gw/preview",
            },
            
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1ogZ4DWUGVo-XFW4NAuE7j_XF-XKdZP2d/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1bIP47YM8xyXOW7odP_IzeKgspt9pq8iD/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1FKnAr1Rw7Xa8trJQt1AiOXb7TZRuqma7/preview",
            },
            
          ],
          questionPaper: {
            title: "Question Paper",
            content: "",
            downloadUrl:
              "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/view?usp=sharing",
          },
          questionBank: {
            title: "Question Bank",
            content: "",
            downloadUrl:
              "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/view?usp=sharing",
          },
        },
        
        
        
      ],
      6: [
        {
          title: "MACHINE LEARNING",
          modules: [
            {
              title: "Module 1:Printed Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1vIOfJoUkztNLjem_LKYMHTjcIMBQfp5R/preview",
            },
            {
              title: "Module 1:Handwritten Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1as_KO1nBNv8e2pfSFtZpV6PACpiFg6Sr/preview",
            },
            {
              title: "Module 2:Printed Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1Pv2FopOV8qSK4ezduuHf9uu75_--ZZMp/preview",
            },
            {
              title: "Module 2:Handwritten Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1stxqnFNrIXWTHDWRCVu5aUUGrUEgaLvj/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1-DxemhvmqNYt88f4o8DkflhS9aGcVV2A/preview",
            },
             {
              title: "Module 3:Handwritten Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1_CpczQqssz0J5Vq_MIjKnXIj50t-8_T5/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/18YvPZyMk_jcQfjG3qLdcXztpNHr0NNOb/preview",
            },
            {
              title: "Module 4:Handwritten  Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1lpYM4IR4uFmOXZJBVBm4IijUULF98b8J/preview",
            },
             {
              title: "All Module :Handwritten  Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1s1vnHxEibTMwJzV1HP-ZhomeTYhe_5zS/preview",
            },
            {
              title: "All Module :Handwritten  Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1E9jMlLo3bnFDb22KdFo2bPvHbK56BZz0/preview",
            },
            {
              title: " Problems:",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1bT_kUBDQpE5odP3uUmCMvszwsH4Cq7WN/preview",
            },
            {
              title: "LAB MANNUL 1-2",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1ZQ8AEyGwraBDbbCNtvY62xM74ViLrFPA/preview",
            },
           {
            title: "LAB MANNUL 3-20",
            content: "Past question paper for Mathematics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1ndp2mLOwunQSmH40V9C1vHm2BMS4unPy/preview",
          },
          
        ],
        },
        {
          title: "Microcontrollers & Embedded Systems",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Introduction to Digital Design",
              previewUrl:
                "https://drive.google.com/file/d/12zswzZT0O9GPnRwyv57JIRgUFqXy3DWz/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Combinational Logic.",
              previewUrl:
                "https://drive.google.com/file/d/1rYAlndSz3uDaCMYrGj7gI4vF3QDMGdhT/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1T7kIj3ZNSX3wu8KaLL9oOENtBIdkv7Sy/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1qqoG9YtqwPYxNgojLWIqcX2CA_dJHcuz/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1I3OZbeKUcTssEvuUgJ3gBHc5vwSSlDeU/preview",
            },
          {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1BmqvVe8WhNCRsXdVT3K-4x8sJbKWDq0l/preview",
          },
          {
            title: " Model Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1BUbRTKVfkXgLlLsmZ5AqD7ANrvRQzC3D/preview",
          },
        
        ],
        },
        {
          title:"CLOUD COMPUTING",
          modules: [
            {
              title: "Module 1: TextBook",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1ZApTMHVXsrJA6aF7O9b1rtCU0bgCh-F6/preview",
            },
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1NPmQwk24g1U-yrdO2lOw9E4mya6lpoPE/preview",
            },
             {
              title: "Module 1: Important Question And Answer",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1p6_qanjmcbp1z7X9XYrKZxy1dwfSLO4R/preview",
            },
            
            
            {
              title: "Module 2: TextBook",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1EXuR0payVH-8ccg2mruLupBy5ZwruLkT/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1-ZYHoSxwv6GLvurc_6blVPb-xZ0o25_f/preview",
            },
            {
              title: "Module 2: Important Question And Answer",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1VtTmTwtnJgrTo5SO6ktKCVjsKtFiSzTs/preview",
            },
            {
              title: "Module 3: TextBook",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1XaV8jqXNY1gLhNGz5Ooeb9fH1RiwsyFF/preview",
            },

            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1jVks2-brbrctcM1KhPH33nMuicleRn_n/preview",
            },
            {
              title: "Module 3: Important Question And Answer",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1f46eleEZ5BzTIpFbFNuvbd_NO7JOZYzf/preview",
            },
            {
              title: "Module 4: TextBook",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1_0ekslPWpChk5Mm6xpONsT9rQnuURaBE/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1FPIHsv04ljMbw7isfuoEsJnVTK56ZKty/preview",
            },
             {
              title: "Module 4: Important Question And Answer",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1L3YdFrlAUaCA-Syp8LaPMAZQWIA5Wb7R/preview",
            },
            {
              title: "Module 5:TextBook",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1HEz_iq2KqhKVqI5v3NuEQn_W8vUhvzsV/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1FPIHsv04ljMbw7isfuoEsJnVTK56ZKty/preview",
            },
             {
              title: "Module 5: Important Question And Answer",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1ODEnH_HoXvKM2YkbdOClGOunKKp3FVuQ/preview",
            },
             {
              title: "Question papers",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/11aOchNzYu0p5nvYKYtoa3iZKG2x-SK6B/preview",
            },
            {
              title: "Model Question paper",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1lNZUZNCCaJM33y_kzv3sbJSird2AmCRM/preview",
            },
           {
            title: "Module-01",
            content: "",
            previewUrl:
              "https://drive.google.com/file/d/1L7Gr2245GJAX8N8ea1PHRDhThtYlxciu/preview",
          },
         
        ],
        },
        {
          title: "Integrated Waste Management for Smart City",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1dBQCqNBkdiD4OCUQ6DBc1nBI-Y-KxlcN/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/11QzUQBK3S2efVbnewtgO7WQFAk2O_COy/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1YK0ldDnPKk-BeoGc2-FLTiQvp4VPV_Jh/preview",
            },
            {
              title: "Module 3: Handwritten Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1iv8ii49L4Y5gu4KYnC3iNOzq5Yr9cQV_/preview",
            },
            {
              title: "Module 4: Handwritten Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1P3uNan2NQgPmgzJHn2RynnAG6cdXL7Ze/preview",
            },
             {
              title: "Module 4:  Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1ggsq9j83sq2fNWG5mkC63_WNLsyAb7E_/preview",
            },
            {
              title: "Module 5: Handwrittten Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1vsFXG-Fy-YiEbiftYygWhxE_pCzKOSWs/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1iEVf2H-03N6XmXLr_8Arzw7veRWJxYzA/preview",
            },
             {
              title: "All Modules: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/152YwgokdAv6Dvc59kHz-vtMp2IL9L9A6/preview",
            },
            {
              title: "MQP-BCV654C",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1S6IqRQY87HsRhsqKC3CWsljih5zQoWt-/preview",
            },
            {
              title: "MQPS-BCV654C",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1RXzRXZKEf3q60oNmuWiCC4bqr8KYhFPa/preview",
            },
            
          
         
        ],
        },
        {
          title: "WATER CONSERVATION AND RAIN WATER HARVESTING",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1OFNgSgI4Px2intbbHgOQ69MqyYormpC5/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1o75o8ehfrU3_CdRDtJaGWexPTzRm9kyx/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1S4q9i8syf1XDzkrEw5eLMxAcMoFNKXT7/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1lBGkgrmOzt9R44h2TEL6k35PjSysKRqI/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/12SKXDIzZGq7YlLIXKMf4SewXVrabG5oL/preview",
            },
            {
              title: "MQPS:",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1bOrd1-U9omf_IH3ZS5gWPceSfP01O4a8/preview",
            },
            
          
         
        ],
        },
        {
          title: "Cryptography & Network Security",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1RmrMh00z0WNpkbwZlUDKWIBN1y88_mHv/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1OmN17Z7hhKrgAS8FTzSNcDcK8Xm2xkIg/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/15ZbDolvXRC1BLQ6amOkoxEgEXub-XWAu/preview",
            },
            
        ],
        },
        {
          title: "Blockchain Technology",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1n8aHhTbYBXxa7GeHlSzXmHyS2GxnblHO/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1x2F2hB0y3nLkGXt1jircZsSqsoa4Y4n9/preview",
            },
             {
              title: "Module 1 to 3: Handwritten Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1aVBwZ8K9iHTS_uTiROIZjYcNovQUbv3b/preview",
            },
            
            
          ],
          
          
        },
        {
          title: "Natural Language Processing",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/13jOlNUysp9ENDhTwPf0Fj8VxXeobudjS/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1IOzlC-IKH7EP1JVRl8UWfi84v4V9aj_D/preview",
            },
           
           
             
          ],
          questionPaper: {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1WF1xwH9qupTMAh1LQ1jjG6_eW7gLSoU0/preview",
          },
          questionBank: {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1Cac42RDBC9UtXGKfUi5Me14FG-aLc-6W/preview",
          },
        },
        {
          title: "ARTIFICIAL INTELLIGENCE",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
            },
          ],
          questionPaper: {
            title: "Question Paper",
            content: ".",
            previewUrl:
              "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
          },
          questionBank: {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1o73EvSDKnuy5qcoLitiaCSAYZ4PeMNSu/preview",
          },
        },
        {
          title: "BIOLOLY FOR ENGINEERS",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1T8wYGZdPx8V0QeGDMb3cAOifdLFZXoZk/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1Tkra5ZzuWkKlfd99gBlp97EhjYzIAUXj/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/19VqgzZgvaE5Wt_aDcuR7pQH2StnzAqRF/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1mR8sVnrpFZlFhQd61EsdBQ5u6N5IKWPd/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/12NRJCozzG3BmFdob8kcHd8Oe2yYx0xQ8/preview",
            },
          {
            title: "Question Paper",
            content: "Past question paper for Biology for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1h_udrhNRqd0UiwdM8bVeH_PTXyWsVcKB/preview",
          },
          {
            title: "Question Paper 2",
            content: ".",
            previewUrl:
              "https://drive.google.com/file/d/1aD7ZjnBroS5GvDCcULUJ-F9mrkRgU826/preview",
          },
        ],
        },
      ],
      
    },
    "ece": {
      6: [
        {
          title: "VLSI",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1hbreSJuVRO62XEO-HZvuLdDWXL7C8i4Q/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1CDQDtx3xzfvfeGBq75IDAjqMitbFvWQz/preview",
            },
            {
              title: "Module 3(part1): Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1zQ-tUhqFmrwlydKIN72mpq5z1-jxQ1-z/preview",
            },
             {
              title: "Module 3(part2): Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1cNiK0Uu56pAYvx62srYsn-vWB64K1AIe/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1YsY3cLZorccvmywxPEnw6IshG8NpWyM5/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1KEJNiIdzOjELyPXsGdzngpZ_ut2I2286/preview",
            },
             {
              title: "Module Question Paper : Solutions-1",
              content: "",
              previewUrl:
                "https://drive.google.com/file/d/15hyLf78USIbuJ2xn_m94US4A18rOLhUt/preview",
            },
            {
              title: "Module Question Paper : Solutions-2",
              content: ".",
              previewUrl:
                "https://drive.google.com/file/d/1zNOLz8e_mJ2h9S6axNANyMdgX222TMxc/preview",
            },
        ],
        },
      ],
      
    },
    

    // Define other branches and semesters...
  };

  const subjectData = moduleDetails[branch.toLowerCase()]?.[
    parseInt(semester)
  ]?.find((subject) => subject.title === subjectName);

  const handleModuleClick = (url) => {
    navigate(`/pdf/${encodeURIComponent(url)}`);
  };

  return (
   <div
      className="module-detail"
      style={{ marginTop: "80px", padding: "20px", textAlign: "center" }}
    >
      <h2>
        {branch.toUpperCase()} - Semester {semester} - {subjectName}
      </h2>
      <div className="modules-container">
        {subjectData ? (
          <>
            {subjectData.modules.map((module, index) => (
              <div key={index} className="module-card">
                <h3>{module.title}</h3>
                <p>{module.content}</p>

                <div className="download-buttons">
                  <button
                    className="preview-button"
                    onClick={() => handleModuleClick(module.previewUrl)}
                  >
                    <AiOutlineEye style={{ marginRight: "8px" }} /> Preview
                  </button>

                  <a
                    href={module.previewUrl}
                    download
                    className="download-button"
                  >
                    <FaDownload style={{ marginRight: "8px" }} /> Download
                  </a>
                </div>
                
              </div>
            ))}
            <div className="ad-container">
              <AdSenseAd
                adClient="ca-pub-9499544849301534"
                adSlot="7579321744"
                adFormat="auto"
                fullWidthResponsive={true}
              />
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