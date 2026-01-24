import React from 'react';

function TermsAndConditions() {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      maxWidth: '800px',
      margin: 'auto',
      backgroundColor: '#f9f9f9',
      color: '#333',
      lineHeight: '1.8',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      color: '#0078d7',
      fontSize: '2.5rem',
      marginBottom: '20px',
      borderBottom: '3px solid #0078d7',
      paddingBottom: '10px',
    },
    sectionHeader: {
      color: '#0078d7',
      fontSize: '1.8rem',
      marginBottom: '15px',
      borderLeft: '4px solid #0078d7',
      paddingLeft: '10px',
    },
    paragraph: {
      marginBottom: '15px',
      fontSize: '1rem',
      textAlign: 'justify',
    },
    list: {
      marginBottom: '20px',
      paddingLeft: '20px',
    },
    listItem: {
      marginBottom: '10px',
    },
    link: {
      color: '#0078d7',
      textDecoration: 'none',
    },
    linkHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Terms and Conditions</h1>
      <p style={styles.paragraph}>
        By accessing and using VTU Notes, you agree to comply with our Terms and Conditions. These terms
        govern your use of the website, including your rights, obligations, and limitations. Please read
        them carefully before using our services.
      </p>

      <h2 style={styles.sectionHeader}>Acceptance of Terms</h2>
      <p style={styles.paragraph}>
        By accessing or using the VTU Notes website, you agree to be bound by these Terms and Conditions and
        our Privacy Policy. If you do not agree to these terms, do not use our website or services.
      </p>

      <h2 style={styles.sectionHeader}>Changes to Terms</h2>
      <p style={styles.paragraph}>
        We reserve the right to modify or update these Terms and Conditions at any time without prior notice.
        Any changes will be posted on this page, and by continuing to use the website after such changes,
        you agree to the updated terms.
      </p>

      <h2 style={styles.sectionHeader}>Account Registration</h2>
      <p style={styles.paragraph}>
        To use certain features of VTU Notes, you may need to create an account. You agree to
        provide accurate and complete information when registering, and you are responsible for maintaining the
        confidentiality of your account and password.
      </p>

      <h2 style={styles.sectionHeader}>Use of Content</h2>
      <p style={styles.paragraph}>
        All content on VTU Notes, including text, images, videos, and other materials, is protected by copyright
        and intellectual property laws. You may use the content for personal, non-commercial purposes only unless
        otherwise specified. You may not copy, modify, distribute, or use any content from the website without
        prior written permission from the owner.
      </p>

      <h2 style={styles.sectionHeader}>User Responsibilities</h2>
      <p style={styles.paragraph}>
        You agree to use the website in accordance with all applicable laws and regulations. You may not use the
        website to:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Engage in any unlawful activities.</li>
        <li style={styles.listItem}>Upload or transmit harmful content (e.g., viruses, malware).</li>
        <li style={styles.listItem}>Harass, defame, or infringe the rights of others.</li>
        <li style={styles.listItem}>Violate the security of the website or its servers.</li>
      </ul>

      <h2 style={styles.sectionHeader}>Limitation of Liability</h2>
      <p style={styles.paragraph}>
        VTU Notes makes no representations or warranties regarding the accuracy, reliability, or completeness of the
        content on the website. You use the website at your own risk, and VTU Notes will not be liable for any
        damages arising from your use of the website.
      </p>

      <h2 style={styles.sectionHeader}>Termination</h2>
      <p style={styles.paragraph}>
        We may suspend or terminate your access to the website at any time, without notice, if you violate these
        Terms and Conditions. Upon termination, you must immediately stop using the website.
      </p>

      <h2 style={styles.sectionHeader}>Governing Law</h2>
      <p style={styles.paragraph}>
        These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any
        disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in [Your City].
      </p>

      <h2 style={styles.sectionHeader}>Contact Us</h2>
      <p style={styles.paragraph}>
        If you have any questions or concerns regarding these Terms and Conditions, please contact us at{' '}
        <a href="mailto:vtunotesforall@gmail.com" style={styles.link}>
          vtunotesforall@gmail.com
        </a>.
      </p>
    </div>
  );
}

export default TermsAndConditions;
