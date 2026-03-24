// import BacktoHome from '@/app/_components/layout/BacktoHome'
// import React from 'react'

// const PrivacyPolicy = () => {
//   const sections = [
//     {
//       title: "Information Collected and Use of Information",
//       points: [
//         "Profile Data: Towner collects name, email address, phone number and profile picture from users of the App for the purpose of driver registration and verification on the Platform.",
//         "Location Data: Towner collects real-time location data of users of the App to enable drivers to receive ride requests near their location and for Towner to provide the ride-hailing matching and booking service.",
//         "Usage Data: Towner automatically collects data related to usage of the App such as app usage details, crash reports, performance and functionality data.",
//         "Ride Data: Towner collects pickup location, drop-off location, ride duration and fare amount related to each ride.",
//         "Device Data: Towner collects device-identifying data such as device ID, operating system, browser type from users.",
//         "Communication Data: Towner collects messages and communication exchanged between users and its customer support team.",
//       ]
//     },
//     {
//       title: "Information Retention",
//       points: [
//         "Profile Data: Retained as long as account is active, deleted within 6 months of account deletion.",
//         "Location Data: Retained for 30 days, then anonymized.",
//         "Usage Data: Aggregate data retained indefinitely for analysis.",
//         "Ride Data: Retained for 5 years for tax compliance.",
//         "Device Data: Retained for 6 months for security.",
//         "Communication Data: Retained for 2 years or as mandated by law.",
//       ]
//     },
//     {
//       title: "Your Rights",
//       points: [
//         "Right to access information",
//         "Right to rectification",
//         "Right to be forgotten",
//         "Right to restrict processing",
//         "Right to data portability",
//         "Right to object",
//       ]
//     },
//     {
//       title: "Data Security",
//       points: [
//         "Implementation of technical and organizational security measures",
//         "Role-based access controls and multi-factor authentication",
//         "Device-level protection using fingerprint/PIN authentication",
//         "Regular security audits and assessments",
//         "Data breach notification procedures",
//       ]
//     },
//     {
//       title: "Grievance Redressal",
//       points: [
//         "Contact grievance officer at concerns@towner.taxi",
//         "Complaints acknowledged within 3 days",
//         "Resolution provided within 30 days",
//         "Escalation available to senior grievance officer",
//         "Records maintained of all complaints and resolutions",
//       ]
//     },
//   ]

//   return (
// <>
// <BacktoHome/>
// <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
//         <div className="px-6 py-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">TOWNER TECHNOLOGY</h1>
//             <h2 className="text-xl font-semibold text-[#8dc720] mt-2">PRIVACY POLICY</h2>
//           </div>

//           {/* Introduction */}
//           <div className="prose prose-lg max-w-none">
//             <p className="text-gray-600 mb-6">
//               This Privacy Policy is issued by Towner Solutions Private Limited. This Privacy Policy governs the manner in which Towner collects, uses, maintains and discloses personal information collected from users in connection with the use of the Towner mobile application.
//             </p>

//             {/* Company Details */}
//             <section className="mb-8">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h3>
//               <p className="text-gray-600">
//                 Towner Solutions Private Limited, a company incorporated under the Companies Act, 2013 having its registered office at BMTC Complex, 31 Main, 100 Feet Road, Madivala, Bangalore South, Bangalore, Karnataka - 560068, India.
//               </p>
//             </section>

//             {/* Mapped Sections */}
//             {sections.map((section, index) => (
//               <section key={index} className="mb-8">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">{section.title}</h3>
//                 <div className="space-y-3 text-gray-600">
//                   {section.points.map((point, i) => (
//                     <p key={i} className="flex items-start">
//                       <span className="mr-2">•</span>
//                       <span>{point}</span>
//                     </p>
//                   ))}
//                 </div>
//               </section>
//             ))}

//             {/* Footer Note */}
//             <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//               <p className="text-sm text-gray-500 text-center">
//                 For any privacy-related queries or concerns, please contact our grievance officer at concerns@towner.taxi
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
// </>
  

//   )
// }

// export default PrivacyPolicy



import BacktoHome from '@/app/_components/layout/BacktoHome'
import React from 'react'

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Company Information",
      points: [
        "Towner Solutions Private Limited Registered Office: BMTC Complex, 31 Main, 100 Feet Road, Madivala, Bangalore South, Bangalore, Karnataka - 560068, India."
      ]
    },
    {
      title: "2. Information We Collect and How We Use It",
      points: [
        "We collect various types of information to provide and improve our services.",
        "(a) Personal Data",
        "• Profile Data: Name, email address, phone number, and profile picture for driver registration, verification, and account management.",
        "• Communication Data: Messages exchanged between users and our support team for customer assistance and dispute resolution.",
        "(b) Location Data",
        "• We collect real-time location data to enable drivers to receive ride requests and for ride-hailing services.",
        "• Users can manage location permissions through their device settings.",
        "(c) Usage & Device Data",
        "• Usage Data: App interactions, crash reports, and performance metrics to improve user experience.",
        "• Ride Data: Pickup and drop-off locations, ride duration, fare amount, and timestamps for service fulfillment.",
        "• Device Data: Device ID, operating system, browser type, and network information for security and fraud prevention."
      ]
    },
    {
      title: "3. How We Store & Retain Data",
      points: [
        "We retain user data only as long as necessary for operational, legal, and compliance purposes.",
        "• Profile Data: Retained as long as the account is active, deleted within 6 months of account closure.",
        "• Location Data: Stored for 30 days, then anonymized.",
        "• Usage Data: Aggregated and stored indefinitely for analytics.",
        "• Ride Data: Retained for 5 years for tax and regulatory compliance.",
        "• Device Data: Stored for 6 months for fraud detection.",
        "• Communication Data: Retained for 2 years or as required by law."
      ]
    },
    {
      title: "4. User Rights & Control Over Data",
      points: [
        "Users have the following rights regarding their data:",
        "• Right to Access – Request a copy of your personal data.",
        "• Right to Rectification – Update or correct your data.",
        "• Right to Erasure (Right to be Forgotten) – Request deletion of your data.",
        "• Right to Restrict Processing – Limit how your data is used.",
        "• Right to Data Portability – Request transfer of your data.",
        "• Right to Object – Opt-out of data processing.",
        "To exercise these rights, email us at privacy@towner.taxi."
      ]
    },
    {
      title: "5. Data Security Measures",
      points: [
        "We implement robust security measures to protect user data:",
        "• Encryption of sensitive data.",
        "• Role-based access controls and multi-factor authentication.",
        "• Device-level security, including fingerprint/PIN authentication.",
        "• Regular security audits and assessments.",
        "• Incident response and data breach notification procedures."
      ]
    },
    {
      title: "6. Sharing of Data",
      points: [
        "We do not sell or share personal data with third parties, except in the following cases:",
        "• Service Providers: Payment processors, cloud storage providers, and analytics services.",
        "• Legal Compliance: When required by law, regulation, or governmental request.",
        "• Business Transfers: In case of a merger, acquisition, or asset sale."
      ]
    },
    {
      title: "7. Third-Party Services & External Links",
      points: [
        "Our App may contain links to third-party services. We are not responsible for the privacy practices of such external sites. Users should review the privacy policies of those services before sharing data."
      ]
    },
    {
      title: "8. Children's Privacy",
      points: [
        "Our services are not intended for children under 18. We do not knowingly collect data from minors. If you believe a child has provided us with personal data, please contact us for removal."
      ]
    },
    {
      title: "9. Grievance Redressal & Contact Information",
      points: [
        "If you have any concerns or complaints regarding your privacy, you may contact our Grievance Officer:",
        "Grievance Officer: Rahul Dantulwar ",
        "Email: privacy@towner.taxi ",
        "Response Time: Complaints acknowledged within 3 days, resolution within 30 days."
      ]
    },
    {
      title: "10. Changes to This Privacy Policy",
      points: [
        "We may update this Privacy Policy from time to time. Any changes will be notified through the App or via email. Continued use of the App after modifications indicates acceptance of the revised policy."
      ]
    }
  ];

  return (
<>
<BacktoHome/>
<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            {/* <h1 className="text-3xl font-bold text-gray-900">TOWNER TECHNOLOGY</h1> */}
            <h2 className="text-xl font-semibold text-[#8dc720] mt-2">PRIVACY POLICY</h2>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
            This Privacy Policy is issued by Towner Solutions Private Limited ("Towner," "we," "us," or "our"). It explains how we collect, use, store, and protect users' personal information when they use the Towner mobile application (the "App"). By using the App, you consent to the data practices described in this Privacy Policy.
            </p>

            {/* Company Details */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h3>
              <p className="text-gray-600">
                Towner Solutions Private Limited, a company incorporated under the Companies Act, 2013 having its registered office at BMTC Complex, 31 Main, 100 Feet Road, Madivala, Bangalore South, Bangalore, Karnataka - 560068, India.
              </p>
            </section>

            {/* Mapped Sections */}
            {sections.map((section, index) => (
              <section key={index} className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{section.title}</h3>
                <div className="space-y-3 text-gray-600">
                  {section.points.map((point, i) => (
                    <p key={i} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{point}</span>
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {/* Footer Note */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 text-center">
              For further information or concerns, please reach out to us at privacy@towner.taxi.
              </p>
              <div className="mt-4 text-sm text-gray-400 text-center">
                <p>Effective Date: 1st April 2025</p>
                <p>Last Updated: 1st April 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</>
  

  )
}

export default PrivacyPolicy