import Link from "next/link";

const lastUpdated = "Feb 2025";

export default function Page() {
  return (
    <article className="prose mt-8 pb-16 dark:prose-invert">
      <div className="space-y-4">
        <h1 className="title text-5xl">Privacy Policy</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      <div className="space-y-4">
        <h2 className="title text-3xl">Welcome</h2>
        <p>
          Thank you for visiting my website. This <strong>Privacy Policy</strong> outlines how I handle your personal information while you explore my portfolio, which primarily serves to showcase my work and skills.
        </p>
        
        <h2 className="title">Information Collection</h2>
        <p>
          As this is a static portfolio site, I do not actively collect personal information from visitors, except as described below. However, I use Google Analytics to track general user interactions, such as page views, clicks, and other engagement metrics. This helps me understand how visitors are interacting with the site and improve the user experience.
        </p>

        <h3>Chatbot Conversations</h3>
        <p>
          If you send a message through the chatbot, it might be stored for caching and training purposes. Please avoid sharing any confidential or sensitive information in the chat.
        </p>

        <h3>Google Analytics</h3>
        <p>
          To help improve my website and better understand how it is used, I utilize Google Analytics. This service collects anonymous data about your interactions with the site, such as pages visited and how you navigate through the content. This information is used solely for analytical purposes to optimize and improve the site.
        </p>
        
        <h3>Cookies</h3>
        <p>
          Google Analytics uses cookies to track your interactions with the website. Cookies are small text files stored on your device. You can opt-out of cookies by adjusting your browser settings, though this may affect your experience on the website.
        </p>

        <h3>Contact Information</h3>
        <p>
          If you choose to contact me via <Link className="no-underline" href="mailto:vaibhav@kaily.in">email</Link> or through the <Link className="no-underline" href="/contact">contact form</Link>, the information you provide is at your discretion. I will only use this information to respond to your inquiries or engage in communication.
        </p>
        
        <h2 className="title">Usage of Collected Information</h2>
        <p>Your information may be used for the following purposes:</p>
        <ul>
          <li>To ensure the website operates smoothly</li>
          <li>To enhance the website based on your feedback</li>
          <li>To respond to your questions or comments</li>
          <li>To analyze website traffic and improve user experience using Google Analytics</li>
          <li>To improve chatbot interactions and functionality</li>
        </ul>
        
        <h2 className="title">Information Sharing</h2>
        <p>
          I do not sell, trade, or rent your personal information. If you inadvertently share sensitive information, please reach out to me, and I will assist you in removing it.
        </p>
        
        <h2 className="title">Security</h2>
        <p>
          I take reasonable measures to protect any information you share; however, please be aware that no online system is completely secure. While I strive to safeguard your data, I cannot guarantee complete security.
        </p>
        
        <h2 className="title">Policy Updates</h2>
        <p>
          This policy is effective as of <strong>{lastUpdated}</strong>. Any changes will be reflected here to keep you informed. I encourage you to review this policy periodically for any updates.
        </p>
        
        <h2 className="title">Questions or Concerns</h2>
        <p>
          If you have any questions or concerns regarding this policy, or if you would like to discuss anything further, please feel free to contact me at{" "}
          <Link href="mailto:vaibhav@kaily.in">vaibhav@kaily.in</Link> or use the <Link href="/contact">contact form</Link>. I welcome your inquiries.
        </p>
      </div>
    </article>
  );
}
