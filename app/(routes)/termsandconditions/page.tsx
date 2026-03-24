import BacktoHome from '@/app/_components/layout/BacktoHome';
import React from 'react'

const TermsAndConditions = () => {

  const sections = [
  
    {
      title: "Towner Platform / Tool - Facilitation Features for Drivers",
      points: [
        "(a) Driver Account Creation: Register with valid identification and documents as per local regulations.",
        "(b) Digital Trip Management: Accept and create trips digitally with real-time tracking. Estimate fares based on accurate distance travel (KM) and time, following government-approved rates.",
        "(c) Customer Feedback Management: Riders can rate and review drivers, while drivers can access feedback to improve service and maintain high ratings.",
        "(d) Billing & Invoicing: Generate bills under the driver's name or a chosen business name. Include convenience charges and provide instant discounts for riders as needed.",
        "(e) Expense Management: Drivers can update and track their expenditure directly within the platform.",
        "(f) Financial Reports & Business Insights: Detailed trip history, earnings, and expense reports. Overall Profit & Loss (P&L) balance sheet for financial clarity.",
        "(g) Tax & Compliance Support: GST-compliant invoicing and business expense tracking for tax benefits. Integration with accounting software for seamless financial management.",
        "(h) Towner is a technology platform that helps drivers manage their business independently.",
        "(i) Drivers are independent service providers, responsible for their operations, compliance."
      ],
    },
    {
      title: "Auto/Taxi Drivers as Independent Business Owners",
      points: [
        "(a) Towner provides technology for drivers to operate independently as business owners."
      ],
    },
    {
      title: "Benefits of Towner Platform",
      points: [
        "(a) No fixed working hours – drive at your convenience.",
        "(b) Access more customers and earn better.",
        "(c) Easy-to-use app with real-time tracking.",
        "(d) Trusted partner in their professional journey, offering security, business growth, and financial stability through digital."
      ],
    },
    {
      title: "Responsibilities of Drivers",
      points: [
        "(a) Be professional and maintain high service quality to enhance customer experience.",
        "(b) Follow local traffic laws, government regulations, and Towner platform policies always.",
        "(c) Keep vehicles in safe, well-maintained, and clean condition to ensure passenger comfort.",
        "(d) Pay platform fees, subscriptions, and applicable taxes on time to maintain active status.",
        "(e) Utilize the Towner tech platform to build and grow an independent business without any limitations, for a lifetime."
      ],
    },
    {
      title: "Do's & Don'ts",
      points: [
        "(a) Do's: Accept rides promptly. Maintain professionalism with passengers. Follow Towner's policies and safety protocols. Report on technical issues or service concerns.",
        "(b) Don'ts: Do not overcharge or negotiate fares outside the platform. Do not frequently cancel rides without a valid reason. Do not misuse customer details for personal gain. Do not drive under the influence."
      ],
    },
    {
      title: "Eligibility",
      points: [
        "(a) You must be at least 18 years old, and own a commercial passenger transport vehicle.",
        "(b) A valid driving license and necessary transport permits are required.",
        "(c) Your vehicle must meet local transportation and safety regulations.",
        "(d) You must submit accurate and up-to-date documents."
      ],
    },
    {
      title: "Driver Responsibilities",
      points: [
        "(a) Maintain professionalism and high service quality.",
        "(b) Keep your vehicle in good condition and follow traffic rules.",
        "(c) Use the Towner app as per guidelines.",
        "(d) Ensure account security and confidentiality."
      ],
    },
    {
      title: "Earnings & Payments",
      points: [
        "(a) Earnings are based on completed trips.",
        "(b) Drivers receive direct payments from riders.",
        "(c) Platform fees, service charges, and applicable deductions may apply.",
        "(d) Drivers must comply with tax obligations (GST, TDS, etc.)."
      ],
    },
    {
      title: "Incentives & Bonuses",
      points: [
        "(a) Performance-based bonuses may be available.",
        "(b) Incentive programs can change at Towner's discretion."
      ],
    },
    {
      title: "Prohibited Activities",
      points: [
        "(a) Drivers must NOT engage in fraudulent or illegal activities.",
        "(b) Drivers must NOT misuse the platform for unauthorized purposes.",
        "(c) Drivers must NOT discriminate against passengers.",
        "(d) Drivers must NOT drive under the influence of alcohol or drugs."
      ],
    },
    {
      title: "Account Suspension & Termination",
      points: [
        "(a) Towner may suspend or terminate driver accounts for violating these terms.",
        "(b) Towner may suspend or terminate driver accounts for engaging in fraud or illegal activities.",
        "(c) Towner may suspend or terminate driver accounts for receiving consistently poor service ratings."
      ],
    },
    {
      title: "Data Privacy",
      points: [
        "(a) Towner collects and processes personal data as per the Privacy Policy.",
        "(b) Location and trip details may be used for service improvements."
      ],
    },
    {
      title: "Dispute Resolution",
      points: [
        "(a) Technical disputes should be reported to Towner Support.",
        "(b) Business disputes must be resolved with relevant legal authorities."
      ],
    },
    {
      title: "Amendments to Terms",
      points: [
        "(a) Towner may update these terms periodically.",
        "(b) Continued use of the platform means acceptance of new terms."
      ],
    },
    {
      title: "Contact Information",
      points: [
        "(a) Company Name: Towner Solutions Pvt Ltd",
        "(b) Email: info@towner.taxi",
        "(c) Phone: +91 9739758870",
        "(d) Address: Next to JP Nagar Metro Station, Bangalore"
      ],
    },
    {
      title: "Governing Law & Jurisdiction",
      points: [
        "(a) These terms follow Indian laws. Legal matters will be overseen in Bangalore courts."
      ],
    },
    {
      title: "Payment-Related Terms",
      points: [
        "(a) Subscriptions: Drivers must pay a subscription fee based on their chosen plan. Subscription fees are non-refundable.",
        "(b) Platform & Admin Charges: Platform usage fees apply for accessing Towner facilitating third party services. Admin charges apply for profile verification, document updates, etc.",
        "(c) Third-Party Service Charges: Lead Charges: Fees for ride requests. SMS, Email, Notifications: Charges for premium messaging services. Payment Gateway Fees: Applicable for online payments. Google Maps & Server Costs: Additional charges may apply.",
        "(d) Taxes & Compliance: GST & TDS: Drivers must comply with tax regulations. Refunds are not allowed as per Towner's policy."
      ],
    },
    {
      title: "Regulated Rates Without Dynamic Pricing",
      points: [
        "(a) The Towner platform operates on a fixed, regulated fare structure based on vehicle type, ensuring fair and predictable earnings for drivers.",
        "(b) There are no sudden fare fluctuations due to demand surges, protecting both drivers and riders from unfair pricing variations.",
        "(c) Drivers can confidently plan their trips and earnings without worrying about inconsistent or unpredictable pricing models."
      ],
    },
    {
      title: "Compliance & Information Submission",
      points: [
        "(a) Drivers must provide genuine personal, vehicle, and bank details.",
        "(b) Falsifying information may lead to suspension or legal action.",
        "(c) Towner reserves the right to verify documents regularly."
      ],
    },
    {
      title: "Enhancing Service, Earnings, and Incentives",
      points: [
        "(a) Drivers must complete a minimum of three trips daily (online or self-booked) to qualify for incentives and maximize earnings.",
        "(b) A minimum of 20 active days per month is required to be eligible for performance-based incentives and rewards.",
        "(c) Active engagement improves visibility, customer interactions, and trip allocations on the platform."
      ],
    },
    {
      title: "Engagement with the Towner Platform for Empowerment",
      points: [
        "(a) Drivers acknowledge that the Towner platform is a digital ecosystem designed to support their professional and financial stability.",
        "(b) By using Towner, drivers agree to actively participate in platform-driven business opportunities that connect them with riders."
      ],
    },
    {
      title: "MSME Registration and Business Accountability",
      points: [
        "(a) Drivers must register as MSME entrepreneurs to access financial benefits and government schemes.",
        "(b) As independent business owners on Towner, drivers are responsible for maintaining service quality, professionalism, and ethical operations within the platform."
      ],
    },
    {
      title: "Financial Proof for Banking and Loan Benefits",
      points: [
        "(a) Drivers accept that their earnings on Towner will serve as official business income proof for banks and NBFCs.",
        "(b) This financial documentation can be used to apply for loans, improve creditworthiness, and access other financial benefits."
      ],
    },
    {
      title: "Towner Business Club for Professional Growth",
      points: [
        "(a) By using the Towner platform, drivers become part of a professional business network that supports skill development, business opportunities, and career growth.",
        "(b) The platform provides training, workshops, and networking opportunities to help drivers stay competitive.",
        "(c) Drivers agree to contribute to community-driven efforts that demand better earnings, improved working conditions, and enhanced service opportunities."
      ],
    },
    {
      title: "Safety, Transparency, Control, Freedom, and Empowerment with Towner",
      points: [
        "(a) The Towner platform acts as a powerful tool for drivers, ensuring safety, transparency, and control over their business operations.",
        "(b) Drivers enjoy freedom and empowerment by managing their schedules, earnings, and professional growth independently.",
        "(c) Towner provides a structured system that enables fair opportunities, clear earnings tracking, and reliable support for all drivers."
      ],
    },

//old points:

{
  title: "TERMS AND CONDITIONS",
  points: [
    'This Site/Application/Services is/are operated/provided by Towner Solutions Private Limited ("Towner").',
    'These terms and conditions ("User Terms") apply to Your visit to and use of the Towner technology whether through a computer or a mobile phone, as well as to all information, recommendations and/or technology provided to you on or through the Site, and the Application. This document is an electronic record in terms of Information Technology Act, 2000 and rules thereunder as applicable and the provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.',
    'By clicking on the "I ACCEPT" button or by using Towner\'s technology, You are acknowledging and consenting to be bound by these User Terms. PLEASE ENSURE THAT YOU READ AND UNDERSTAND ALL THESE USER TERMS BEFORE YOU USE THE TECHNOLOGY. If You do not wish to accept any of the User Terms, then please do not use the Technology or avail any of the services being provided therein. YOUR AGREEMENT TO THESE USER TERMS SHALL OPERATE AS A BINDING AGREEMENT BETWEEN YOU AND TOWNER IN RESPECT OF THE USE OF TECHNOLOGY. Your access and use of the Technology constitutes your agreement to be bound by these Terms, which establishes a contractual relationship between you and Towner. Towner may immediately terminate these Service with respect to you, or generally cease offering or deny access to the Technology or any portion thereof, at any time for any reason.',
    'Your acceptance of the User Terms shall be deemed to include your acceptance of the privacy policy available at https://www.towner.taxi/#/privacy-policy. By accepting these User Terms, You also allow Towner to send you promotional emails and SMS alerts from time to time.'
  ]
},
{
  title: "Background and Definitions",
  points: [
    "(a) Towner Solutions Private Limited owns and operates an online ride hailing technology known as TOWNER (the \"Platform\"),",
    "(b) The Platform facilitates connections between drivers and passengers seeking transportation services through a mobile application.",
    "(c) The Driver wishes to access the Platform to obtain ride requests from prospective passengers.",
    "(d) As a condition to use of the Platform, the Driver agrees to be bound by the terms and conditions herein.",
    "(e) The purpose of this Agreement is to define the terms governing the Driver's use of the Platform.",
    "(f) This Agreement shall be governed by the laws of Karnataka, India.",
    "(g) In the event of any inconsistency between this Agreement and any other agreement or terms of use relating to the Driver's access to the Platform, this Agreement shall prevail."
  ]
},



    {
      title: "Platform Provider Relationship",
      points: [
        "(a) The TOWNER application and associated software, websites, and services enable connections between drivers and passengers for transportation services.",
        "(b) Towner Solutions Private Limited owns and operates the Platform.",
        "(c) Driver means the individual accessing the Platform under these terms.",
        "(d) Ride Request means a request for transportation services received by a Driver through the Platform.",
        "(e) Transportation Services means transportation of passengers arranged through the Platform in return for a fare.",
        "(f) Passengers means individuals who request or receive transportation services arranged via the Platform.",
        "(g) Lead Generating Platforms means third party platforms integrated with the Platform for distributing Ride Requests to Drivers.",
        "(h) Payment Processor means any third party payment solution integrated with the Platform for processing fares between Drivers and Passengers."
      ],
    },
    {
      title: "Registration And Account",
      points: [
        "(a) In order to use the technology, you must maintain an active personal user account with us.",
        "(b) Account registration requires you to provide personal information, which may include your name, address, mobile phone number, age and other information as prompted.",
        "(c) You shall ensure that the Registration Data provided by You is accurate, complete, current, valid, true and is updated from time to time.",
        "(d) You are responsible for maintaining the confidentiality of Your Registration Data and will be liable for all activities and transactions that occur through Your account.",
        "(e) Your account cannot be transferred, assigned or sold to a third party."
      ],
    },
    {
      title: "Driver Responsibilities Under Terms",
      points: [
        "(a) Compliance with Laws: The Driver shall comply with all applicable laws and regulations of India including those governing motor vehicles, transportation services, and commercial carriage by road.",
        "(b) Licenses and Permits: The Driver shall maintain all licenses, permits, insurances and authorizations required under applicable laws.",
        "(c) Vehicle Fitness: The Driver shall ensure that the vehicle is roadworthy, meets regulatory safety and emissions standards.",
        "(d) Accuracy of Information: The Driver shall provide accurate and up-to-date information to Towner.",
        "(e) Professional Conduct: The Driver shall maintain high standards of professional conduct when interacting with passengers.",
        "(f) Legitimate Use of Platform: The Driver shall use the Platform only for legitimate business purposes."
      ],
    },
    {
      title: "Passenger Interaction",
      points: [
        "(a) The Driver shall be solely responsible for providing the transportation services requested by Passengers.",
        "(b) The Driver shall be solely responsible for communicating with Passengers regarding pickup locations, routes, fare pricing and other details.",
        "(c) The Driver shall be responsible for addressing any issues, concerns, disputes or complaints with Passengers.",
        "(d) The Driver shall comply with all applicable laws and regulations governing private hire transportation services.",
        "(e) The Driver shall not discriminate against any Passenger on the basis of personal characteristics.",
        "(f) The Driver shall interact with all Passengers in a respectful, non-violent and lawful manner."
      ],
    },
    {
      title: "Lead Generating Platforms",
      points: [
        "(a) The Platform currently integrates with the following lead generating platforms: OIOT.",
        "(b) By using leads or requests received via an integrated platform, the Driver agrees to be bound by the terms of that platform.",
        "(c) The Driver shall comply with all policies and guidelines of any integrated platform.",
        "(d) The Platform provider makes no representations or warranties regarding any services provided by third-party integrated platforms.",
        "(e) The Platform provider shall have the right to add or remove integrated platforms based on its commercial arrangements.",
        "(f) The Driver shall be solely responsible for fulfilling the terms of any transportation requests received via an integrated platform.",
        "(g) On receiving leads from third-party integrated platforms, we may charge you a lead fee as applicable."
      ],
    },
    {
      title: "Payment Processing",
      points: [
        "(a) Payment Methods: Drivers and Passengers may pay for and receive payment for Transportation Services through various payment methods integrated with the Platform.",
        "(b) Payment Processing: Towner does not directly process or handle any financial transactions for Transportation Services.",
        "(c) Fare Calculation: The applicable fare for each Transportation Service will be calculated by the Platform based on distance and time travelled.",
        "(d) Payment Collection: Upon completion of a Transportation Service, the applicable fare amount will be automatically charged to the Passenger's registered payment method.",
        "(e) Payment Terms: All payments between Drivers and Passengers must be made through the Platform's integrated payment systems or through cash or UPI.",
        "(f) Refunds/Disputes: Any refunds, disputes or chargebacks will be handled directly between the Driver and Passenger without Towner's involvement."
      ],
    },
    {
      title: "Data Usage",
      points: [
        "(a) Collection of Personal Data: Towner shall collect personal data from Drivers and Passengers during the registration process and facilitation of ride requests.",
        "(b) Storage and Processing: Towner shall store the personal data collected on secure servers located within the territory of India.",
        "(c) Sharing of Personal Data: Towner may share the personal data with its payment processing partners and lead generation platforms.",
        "(d) Security Safeguards: Towner shall implement appropriate technical and organizational security measures to protect personal data.",
        "(e) Data Retention: Towner shall retain personal data for a period of five years from the date of collection or as mandated by law.",
        "(f) Individual Rights: Individuals have rights to access, rectify or erase their personal data held by Towner.",
        "(g) Grievance Redressal: For grievances relating to personal data, contact the Grievance Officer at support@towner.com."
      ],
    },
    {
      title: "Limitation of Liability",
      points: [
        "(a) Disclaimer of Warranties: The Platform is provided on an \"as is\" and \"as available\" basis without warranties of any kind.",
        "(b) Limitation of Liability: Towner shall not be liable for indirect, incidental, special, consequential or punitive damages.",
        "(c) Monetary Cap on Liability: Towner's aggregate liability shall not exceed the total amount of fees paid by the Driver in the twelve months preceding the claim.",
        "(d) Assumption of Risk: The Driver assumes all risks associated with use of the Platform and provision of transportation services.",
        "(e) Exceptions: The limitations shall not apply to liability resulting from Towner's gross negligence or willful misconduct.",
        "(f) Injunctive Relief: Nothing shall limit either party's right to seek injunctive or other equitable relief."
      ],
    },
    {
      title: "Termination of Services",
      points: [
        "(a) Towner may immediately suspend or terminate the Driver's access in the event of any material breach of this Agreement.",
        "(b) If the Driver's account remains inactive for 6 consecutive months, Towner may terminate this Agreement.",
        "(c) Towner may suspend or terminate access if the Driver is in violation of any applicable laws.",
        "(d) Towner may suspend access pending investigation if continued use may create safety, legal or liability risks.",
        "(e) The Agreement shall terminate if the Driver becomes insolvent or bankrupt.",
        "(f) Towner may terminate this Agreement for any reason upon 30 days' prior written notice.",
        "(g) Upon termination, the Driver shall immediately cease using the Platform.",
        "(h) Termination shall not affect any rights or obligations accrued prior to termination."
      ],
    },
    {
      title: "Updates and Amendments",
      points: [
        "(a) Towner shall have the right to amend or update the terms and conditions from time to time.",
        "(b) Such amendments may be necessary to comply with changes in law or address additional features.",
        "(c) The Driver shall be notified of any amendments by notice on the Platform or through email.",
        "(d) Towner shall provide a notice period of at least fifteen days before amendments take effect.",
        "(e) By continuing use after amendments have gone live, the Driver agrees to be bound by the updated terms.",
        "(f) The Driver may terminate the Agreement if they do not accept any amendments.",
        "(g) Amendments shall take effect after the notice period expires.",
        "(h) An updated copy of the terms shall be made available on the Platform."
      ],
    },
    {
      title: "Indemnification",
      points: [
        "(a) Driver Indemnification Obligations: Driver shall indemnify, defend and hold Towner harmless from any claims arising out of Driver's use of the Platform.",
        "(b) Scope of Indemnification: Driver's obligations shall apply to any claims brought by Passengers, third parties, or authorities against Towner.",
        "(c) Notice of Claims: Driver must notify Towner in writing of any claims that may trigger Driver's indemnification obligations.",
        "(d) Defence of Claims: Towner shall have the right to assume control of the defence and settlement of any claim at Driver's cost.",
        "(e) Survival: Driver's indemnification obligations shall survive any termination of this Agreement."
      ],
    },
    {
      title: "Governing Law and Jurisdiction",
      points: [
        "(a) This Agreement shall be governed by and construed in accordance with the laws of India.",
        "(b) The parties agree to submit to the exclusive jurisdiction of the courts of Bangalore, Karnataka, India.",
        "(c) Towner shall have the right to initiate proceedings in any other court of competent jurisdiction.",
        "(d) The Driver waives any objection to the laying of venue of any proceedings brought in any such court."
      ],
    },
    {
      title: "Dispute Resolution",
      points: [
        "(a) All disputes shall be referred to and finally resolved through arbitration.",
        "(b) The arbitration shall be conducted through the Indian Council of Arbitration.",
        "(c) The seat of arbitration shall be Bangalore, Karnataka.",
        "(d) The number of arbitrators shall be one.",
        "(e) The arbitration proceedings shall be governed by the laws of India.",
        "(f) The language of the arbitration proceedings shall be English.",
        "(g) The costs of arbitration shall be borne by the non-prevailing party or as determined by the arbitrator.",
        "(h) Nothing shall prevent either party from seeking urgent injunctive relief before the appropriate court."
      ],
    },
    {
      title: "Miscellaneous",
      points: [
        "(a) Entire Agreement: This Agreement constitutes the entire agreement between Towner and Driver.",
        "(b) Severability: If any provision is invalid, such provision shall be struck and the remaining provisions shall be enforced.",
        "(c) No Waiver: Towner's failure to enforce any right shall not constitute a waiver.",
        "(d) Amendments: Any amendment must be in writing and signed by an authorized representative of Towner.",
        "(e) Assignment: This Agreement may not be assigned by Driver without Towner's consent.",
        "(f) Force Majeure: Towner shall not be liable for any delay or failure resulting from causes outside its control.",
        "(g) Notice: Towner may give notice through the App or by email. You can contact at info@towner.taxi or +91 9364102995."
      ],
    },
  
  ];
  
  
  

  
  return (
    <>
      <BacktoHome />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <div className="px-6 py-8">
            {/* Header */}
            <div className="text-center mb-8">
          
              <h2 className="text-xl font-semibold text-[#8dc720] mt-2">TERMS AND CONDITIONS</h2>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Introduction</h3>
                <p className="text-gray-600 mb-6">
                  Welcome to Towner! By signing up as a driver on our platform, you agree to follow these terms and conditions. Please read them carefully.
                </p>
                <p className="text-gray-600 mb-6">
                  <strong>Towner as a Facilitating Platform:</strong> Towner operates as a technology-based platform as a Tool that enables drivers to manage their business independently. The app does not employ drivers or directly provide transportation services. Drivers remain independent service providers responsible for their operations, including compliance with local regulations, taxes, and service quality.
                </p>
              </section>

             

              {/* Dynamic Sections */}
              {sections.map((section, index) => (
                <section key={index} className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{section.title}</h3>
                  <div className="space-y-3 text-gray-600">
                    {section.points.map((point, i) => (
                      <p key={i} className="flex">
                        <span className="mr-2">{point.slice(0, 3)}</span>
                        <span>{point.slice(3)}</span>
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              {/* Footer Note */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 text-center">
                  For any queries or concerns regarding these terms, please contact us at info@towner.taxi or call +91 9364102995
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsAndConditions