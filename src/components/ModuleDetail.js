// src/components/ModuleDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ModuleDetail.css";

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
                "https://drive.google.com/file/d/1hGritueU19e2Z9OgeoNdMOibkASLwdFf/preview",
            },

            {
              title: "Mathematics Question Bank",
              content: "Question bank for Mathematics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/1fusrSR_HOrnXbXLMBdYBu4O3stPfyy6k/preview",
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
                "https://drive.google.com/file/d/10w9Suwfl3oW4kxFDIgue8P1ZZdlI3iGp/preview",
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
                "https://drive.google.com/file/d/13sN51ZvU2PBI9RYLY_vfn5fUstDWcQ-m/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/15XkQJ83RMFG6MD3pw6ZRvfTdVDOOEzob/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1LxDQ8HKOPvetWp2CmKf_R4frx1SyQGlx/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1gnWawuVabmlHYc0DdEMX93_2Lssb1NhS/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1DL4XD5RWl7NsBWJ7thMj0vwuDhu-yJkU/preview",
            },
            {
              title: "Question Bank",
              content: "Past question paper for Mathematics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/14IeCzUkiaUgI-DvWZUGr5oBtAWAFlt9k/preview",
            },
            {
              title: "Question paper",
              content: "Question bank for Mathematics for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/14IeCzUkiaUgI-DvWZUGr5oBtAWAFlt9k/preview",
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
                "https://drive.google.com/file/d/14MVOZXeMOI0NO_COf9zX42UiyvDvVfns/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Combinational Logic.",
              previewUrl:
                "https://drive.google.com/file/d/10VZSus-9cbN35EZ9j_2HphL2YLtUmsbA/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1sEP39OYa9BM1XbCiN4VUAT10HsKiN_e0/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1sEP39OYa9BM1XbCiN4VUAT10HsKiN_e0/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1wc77RS_veOrMprO98a45SqdzjM_ngDoe/preview",
            },
          {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1vJFpqCUTNg8VuxLFN11lcyLPBuCSXipi/preview",
          },
          {
            title: "Question Bank",
            content: "Question bank forDigital Design  and Computer Organization for CSE  Still have to upload.",
            previewUrl:
              "https://drive.google.com/file/d/1vJFpqCUTNg8VuxLFN11lcyLPBuCSXipi/preview",
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
                "https://drive.google.com/file/d/1lAhjHchgQJE0sLARKTNPxdVxnOMhD9JO/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1r-_9m7X-Hn-45qhP_dlIqtzcl2Yzz0jn/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1bNiuYu3Z-laL6t7WkEYl_s8ZdizYTRUz/preview",
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
                "https://drive.google.com/file/d/1L2SDrVqm0MkCk1XZBRIZKXVRKwBorVNY/preview",
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
              "hhttps://drive.google.com/file/d/18Dt3JUC-Djj5SG9arATgGaGcT1JXr_oa/preview",
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
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1cuM9F_XwLVV3o1c0dXYKnZu-7zCsEHGB/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1yeKcW_SNoiOUALp4XuJHVbaZqcVirkHb/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1yeKcW_SNoiOUALp4XuJHVbaZqcVirkHb/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1yeKcW_SNoiOUALp4XuJHVbaZqcVirkHb/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1yeKcW_SNoiOUALp4XuJHVbaZqcVirkHb/preview",
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
              "https://drive.google.com/file/d/1yeKcW_SNoiOUALp4XuJHVbaZqcVirkHb/preview",
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
                "https://drive.google.com/file/d/1FbYithuTIV8H-L6cgQ9nwjUHbG3vHadA/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1v84WgpJlEUOWAuPUpJiNzgOUxthDguUS/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1v84WgpJlEUOWAuPUpJiNzgOUxthDguUS/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1gtrNRCUgFvwAqBvNbIfIRKCQ6qq-1_1E/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1p2xz8qzsrJtjU63OjKx0mSloXMvck5BR/preview",
            },
            {
              title: "Preeviou year Question Paper",
              content: "Model Question Paper Solutions for DSA for CSE.",
              previewUrl:
                "https://drive.google.com/file/d/15AxKh0_v5kcOybfxEQniFcHBRz7ywQUH/preview",
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
                "https://drive.google.com/file/d/11s_lcZZ5LEdY8lJlSw3O2DFWo_TN-m_K/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/18NotldcsIf-QG5IwQJtuD9TmiQ4bKMBg/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1mFnxufZiTrQosTJpc41xwPzdaUZ3CAiH/preview",
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
            title: "Question Paper",
            content: "Past question paper for Mathematics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1Mr42aq5n4_5y9pkJEgcXflABzDjk3z2w/preview",
          },
           {
            title: "Question Bank",
            content: "Question bank for Mathematics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1Mr42aq5n4_5y9pkJEgcXflABzDjk3z2w/preview",
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
                "https://drive.google.com/file/d/16xT6WDk4u4NAv-HVfypbOycDJJd7R2Hy/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Combinational Logic.",
              previewUrl:
                "https://drive.google.com/file/d/16XMOp-q39dF6ElI_NLAUtO4FTltNg7ZO/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/157KX10Na3uewiHr_Ba4wWksvtbkqVigw/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1ojIeIgMtWsW2_s426lmJGTihtBGzmqQ8/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1wAmIrGVLQoLZS7kCt4-QGbeCaiiy4zv3/preview",
            },
          {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1BmqvVe8WhNCRsXdVT3K-4x8sJbKWDq0l/preview",
          },
         {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1BmqvVe8WhNCRsXdVT3K-4x8sJbKWDq0l/preview",
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
                "https://drive.google.com/file/d/1LHvd_EvBBHIDBeJHUuk2zOADiGJWG7KG/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1_LHyge4IrhE8_cJpmfp4uSfXufX3KhRN/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1pS6Oz36N_YNnT-nhx7nOxSJR16Uq4dGE/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1G7aFYf6XYeW6OVuiXT-F0zHonBlLDIPd/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/15DiaJRMZicsfNgU3xnSFd_jy3RxtYcKY/preview",
            },
           {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1TVjLSNB43q8CvOiCFpuibpkzr-Rarm3q/preview",
          },
          {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1TVjLSNB43q8CvOiCFpuibpkzr-Rarm3q/preview",
          },
        ],
        },
        {
          title: "DISCRETE MATHEMATICAL STRUCTURES  ",
          modules: [
            {
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1eVtsAn0I0BYdiFqQvl5x_xVZRLvg220x/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1eVtsAn0I0BYdiFqQvl5x_xVZRLvg220x/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1eVtsAn0I0BYdiFqQvl5x_xVZRLvg220x/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1eVtsAn0I0BYdiFqQvl5x_xVZRLvg220x/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1eVtsAn0I0BYdiFqQvl5x_xVZRLvg220x/preview",
            },
           {
            title: "Question Paper",
            content: "Past question paper for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1eVtsAn0I0BYdiFqQvl5x_xVZRLvg220x/preview",
          },
          {
            title: "Question Bank",
            content: "Question bank for Applied Physics for CSE.",
            previewUrl:
              "https://drive.google.com/file/d/1eVtsAn0I0BYdiFqQvl5x_xVZRLvg220x/preview",
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
                "https://drive.google.com/file/d/1Sssc99LmtoGGYh6KyMx2jHcV-pHt02WS/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1Sssc99LmtoGGYh6KyMx2jHcV-pHt02WS/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1Sssc99LmtoGGYh6KyMx2jHcV-pHt02WS/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1Sssc99LmtoGGYh6KyMx2jHcV-pHt02WS/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1Sssc99LmtoGGYh6KyMx2jHcV-pHt02WS/preview",
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
                "https://drive.google.com/file/d/1HCGmhDqXmfSLrT72NR32VYhdgLNgIIdn/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1cjQ46bwsglqs7-XlilmdDww6fQ1uGNmA/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1Rier0xlbrHVs4VDSxc4y8G5scjiQimgj/preview",
            },
            {
              title: "module 4:Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1NbM3Y_LuP1_By1mVuJKP2suJwTv9u9Hs/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1K9kxwd6L9X_gxV4yx6URWa4zVvGSGGcc/preview",
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
              title: "Module 1: Notes",
              content: "Introduction to Digital Design",
              previewUrl:
                "https://drive.google.com/file/d/18FnWKJ0NS14EUwRCMYl8K1_AFsKhwstr/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Combinational Logic.",
              previewUrl:
                "https://drive.google.com/file/d/14JlQH4k7AiCDwH7axhhXxFYuBbW5R-4g/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/19fOs37ejVV3yeSEKXf9KjiK_6VGGtUwO/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1LNHcKcHh0ZA6bxUq_ITry2qWXkDJOGtT/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1Hcrgm_TAcEPkjaS1YRI912LqtfVzbCLx/preview",
            },
            {
              title: "All Module : Notes",
              content: "Comprehensive notes for Module 1 to 5.",
              previewUrl:
                "https://drive.google.com/file/d/1ABvQ3t0q7JHXMM2zPZaD-uQdFPot0LC6/preview",
            },
          {
            title: "Question Paper",
            content: "",
            previewUrl:
              "https://drive.google.com/file/d/1MQ0_LjfVOgeB0UFW6LTSnVjy_4Uw-Z0N/preview",
          },
           {
            title: "Question Bank",
            content: ".",
            previewUrl:
              "https://drive.google.com/file/d/1yKthkEnLBTowr23KHqtNKtl857Z2t9QM/preview",
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
              title: "Module 1: Notes",
              content: "Comprehensive notes for Module 1.",
              previewUrl:
                "https://drive.google.com/file/d/1T3BxITCQdvoaPUJsHpGtcZbV8fyu5lIR/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1fnWh9P58qr3amvebi2wNZSxtT_KoXxZL/preview",
            },
            {
              title: " modules 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1pTN2LsJYPZ4jsaQ_qfJ8iO5UMGye-e5F/preview",
            },
            {
              title: "Modules 4 : Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1iu33vbGwmyslj3hdJHF8pC_PGvdtyTFG/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1dlYcBDm5iIYJg7PFKlK-sX4l3vGjo3kX/preview",
            },
            {
              title: "Handwritten notes 1 to 5: Module",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1ssBpZXxVelf0sV0gGm3wzujSFYvvf7sq/preview",
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
              title: "question bank 1",
              content: "Comprehensive notes for Module.",
              previewUrl:
                "https://drive.google.com/file/d/1JE1NoEGeUE_ZSKirhzSNr3cAAbZEcwfS/preview",
            },
            {
              title: "question bank 2",
              content: "Comprehensive notes for Module.",
              previewUrl:
                "https://drive.google.com/file/d/18vEUZZ4U-KGd1CABi9DSAp1QznVMycBv/preview",
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
                "https://drive.google.com/file/d/1Re5z65uF2iznqvHHoKSwyq-Etja9KGUW/preview",
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
                "https://drive.google.com/file/d/1PPcmOa2DYzHt5-Cm2t6S56qzOIZ7OaXG/preview",
            },
            {
              title: "Module 2: Notes",
              content: "Comprehensive notes for Module 2.",
              previewUrl:
                "https://drive.google.com/file/d/1-FQBdQQeNXRqRcnK15jy8ZzQl3kRKZpk/preview",
            },
            {
              title: "Module 3: Notes",
              content: "Comprehensive notes for Module 3.",
              previewUrl:
                "https://drive.google.com/file/d/1LFyM_pExML39pm0dJCDLsyIQQf--CEGc/preview",
            },
            {
              title: "Module 4: Notes",
              content: "Comprehensive notes for Module 4.",
              previewUrl:
                "https://drive.google.com/file/d/1pcLXAeZ8HF7Abx2MrExiuFSAHfy0eJe-/preview",
            },
            {
              title: "Module 5: Notes",
              content: "Comprehensive notes for Module 5.",
              previewUrl:
                "https://drive.google.com/file/d/1gtfeQ1H54bjm8vBGzO0E0Y-cAew_Co4f/preview",
            },
            {
              title: "Model Question Papers",
              content: "Comprehensive question paper for all Module.",
              previewUrl:
                "https://drive.google.com/file/d/1EMI_Zq4P5lEVJ3PRtTGfYjL36mDwvYse/preview",
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
                    className="view-button"
                    onClick={() => handleModuleClick(module.previewUrl)}
                  >
                    View PDF
                  </button>
                </div>
              </div>
            ))}
            {/* Question Paper and other details */}
          </>
        ) : (
          <p>No modules available for this subject.</p>
        )}
      </div>
       
    </div>
    
  );
};

export default ModuleDetail;
