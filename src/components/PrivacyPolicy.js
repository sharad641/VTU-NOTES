import React from 'react';

function PrivacyPolicy() {
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
      <h1 style={styles.header}>Privacy Policy</h1>
      <p style={styles.paragraph}>
        At VTU Notes, we are committed to protecting your privacy. This privacy policy outlines
        how we collect, use, and protect your personal information. By using our website, you
        agree to the terms of this policy.
      </p>

      <h2 style={styles.sectionHeader}>Information We Collect</h2>
      <p style={styles.paragraph}>
        We may collect the following types of information when you use our website:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <strong>Personal Information:</strong> When you register or contact us, we may collect your name, email address, phone number, and other relevant details.
        </li>
        <li style={styles.listItem}>
          <strong>Usage Data:</strong> We may collect information on how you use our website, including the pages you visit, the time you spend on the site, and your IP address.
        </li>
      </ul>

      <h2 style={styles.sectionHeader}>How We Use Your Information</h2>
      <p style={styles.paragraph}>
        The information we collect is used for the following purposes:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>To improve and personalize your user experience on our website.</li>
        <li style={styles.listItem}>To send you important updates, notifications, and promotional content (if you have opted in to receive them).</li>
        <li style={styles.listItem}>To respond to your inquiries and provide customer support.</li>
      </ul>

      <h2 style={styles.sectionHeader}>How We Protect Your Information</h2>
      <p style={styles.paragraph}>
        We take appropriate security measures to protect your personal information from unauthorized
        access, alteration, or disclosure. We use encryption and other security technologies to
        ensure your data is safe.
      </p>

      <h2 style={styles.sectionHeader}>Sharing Your Information</h2>
      <p style={styles.paragraph}>
        We do not share your personal information with third parties unless required by law or if we
        have your consent. We may share anonymized usage data with partners to improve our services.
      </p>

      <h2 style={styles.sectionHeader}>Cookies</h2>
      <p style={styles.paragraph}>
        Our website uses cookies to enhance your experience. Cookies are small data files stored on your
        device that allow us to remember your preferences and improve site functionality. You can choose to
        disable cookies through your browser settings, but this may affect your ability to use certain features
        of the website.
      </p>

      <h2 style={styles.sectionHeader}>Your Rights</h2>
      <p style={styles.paragraph}>
        You have the right to access, correct, or delete your personal information. You may also opt out of
        receiving promotional emails from us at any time.
      </p>

      <h2 style={styles.sectionHeader}>Changes to This Policy</h2>
      <p style={styles.paragraph}>
        We reserve the right to update or modify this privacy policy at any time. We will notify you of any
        significant changes by posting the updated policy on our website.
      </p>

      <h2 style={styles.sectionHeader}>Contact Us</h2>
      <p style={styles.paragraph}>
        If you have any questions or concerns about our privacy policy, please contact us at{' '}
        <a href="mailto:vtunotesforall@gmail.com" style={styles.link}>
          vtunotesforall@gmail.com
        </a>.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
