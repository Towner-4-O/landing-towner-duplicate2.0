"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Plus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What is Towner?",
    answer:
      "Towner is a Driver App, it is a SaaS platform designed to empower taxi and auto-rickshaw owners with tools to manage their business independently, without relying on traditional ride-hailing aggregators. It provides a comprehensive set of features to ensure fair earnings, transparent pricing, and government compliance.",
  },
  {
    question: "How does Towner work?",
    answer:
      "Towner offers business management tools for taxi and auto owners, including fare tracking, earnings management, invoice generation, and compliance with local regulations. Drivers can connect directly with commuters, either through street-hailing or via the OIOT app, and handle payments independently.",
  },
  {
    question: "How do I sign up for Towner?",
    answer:
      "You can sign up for Towner by visiting our website and subscribing to the platform. Once registered, you'll gain access to a suite of business management tools to run your taxi or auto service efficiently.",
  },
  {
    question: "Are there any fees to use Towner?",
    answer:
      "Towner operates on an affordable subscription-based model. There are no hidden fees or commissions; the platform charges a small monthly subscription fee, allowing you to manage your business independently and keep 100% of your earnings.",
  },
  {
    question: "Can I set my own fares on Towner?",
    answer:
      "Yes, you can set fares based on government-regulated pricing. Towner ensures that you stay compliant with local fare rules while providing you full control over your earnings.",
  },
  {
    question: "How do payments work on Towner?",
    answer:
      "Towner does not handle financial transactions. All payments are made directly between the driver and the commuter, ensuring complete transparency and eliminating platform fees.",
  },
  {
    question: "Can I still book rides through the OIOT app?",
    answer:
      "Yes, the OIOT app integrates with Towner, allowing commuters to book rides either online or by hailing a taxi or auto on the street. The app simply connects drivers and riders, leaving all transactions between the two parties.",
  },
  {
    question: "Does Towner offer support for legal and regulatory compliance?",
    answer:
      "Yes, Towner works closely with local government and law enforcement agencies to ensure that all services are compliant with regulations, including government fare rates and safety standards.",
  },
  {
    question:
      "Can I use Towner if I only drive a private vehicle or non-commercial taxi?",
    answer:
      "Towner is designed for commercial taxi and auto-rickshaw owners who operate in a regulated environment. If you are a private vehicle owner looking to start a taxi service, Towner can help you manage the business once you meet the necessary local regulations.",
  },
  {
    question: "Is Towner available in my city?",
    answer:
      "Towner is expanding across cities, and we are constantly adding new locations. Please check our website or contact us for information on whether Towner is available in your area.",
  },
  {
    question: "How do I get customer support?",
    answer:
      "If you have any questions or need assistance, you can contact our customer support team via email at towner.marketing@gmail.com or reach us by phone at +91-9364102995. We’re here to help you every step of the way.",
  },
  {
    question: "How to reach Towner company customer care?",
    answer:
      "You can contact Towner customer support at [Insert Phone Number] or through the help section in the app.",
  },
  {
    question: "How to utilize the Towner app?",
    answer:
      "The Towner app helps you get bookings, set your own fares, and grow your business without commission charges. Check out our video tutorials on WhatsApp & Telegram.",
  },
  {
    question: "What should I do with the Towner app?",
    answer:
      "Use the app for: Local & Outstation bookings, Generating bills & invoices, Marketing your services, and Setting competitive prices.",
  },
  {
    question: "Why am I not getting trips like other apps?",
    answer:
      "Unlike other platforms, Towner is not a cab aggregator. You must build your customer base, share your profile, and promote yourself to get more rides.",
  },
  {
    question: "Why isn't Towner doing any marketing?",
    answer:
      "Towner provides zero-commission bookings and empowers drivers to market themselves instead of controlling pricing like Ola/Uber.",
  },
  {
    question: "How can I market myself for more bookings?",
    answer:
      "Steps to get more bookings: Share your Towner profile link with passengers, Promote OIOT app to your regular riders, and Offer Doorstep Pickup Services to nearby customers.",
  },
  {
    question: "When will I get more online bookings?",
    answer:
      "As more riders download the OIOT app, your bookings will increase. Encourage your passengers to use OIOT for future rides.",
  },
  {
    question: "How can Towner help solve the 'One City, One Rate' issue?",
    answer:
      "Drivers can collectively decide & maintain a fair price in their city instead of depending on fluctuating rates from other platforms.",
  },
  {
    question: "Why does Towner not use dynamic pricing like Ola/Uber?",
    answer:
      "Towner respects government-regulated fares and allows drivers to set their own fair prices without exploiting riders.",
  },
  {
    question: "Is Towner just a tech facilitator?",
    answer:
      "Yes! Towner is a technology platform that gives you the power to run your business with complete control over pricing, services, and customer interactions.",
  },
  {
    question: "Why are rates based on government standards & bill customization allowed?",
    answer:
      "Towner ensures fair pricing as per government regulations but gives drivers the flexibility to customize their trip invoices.",
  },
  {
    question: "Why are bills generated under the driver's name?",
    answer:
      "You are an independent business owner, and the invoice carries your name so that customers trust and recognize your service.",
  },
  {
    question: "Why does Towner have zero commission & no transaction involvement?",
    answer:
      "Unlike other platforms, Towner doesn't take a commission from your earnings. The transaction happens directly between you and your customer!",
  },
  {
    question: "How can I improve local bookings & doorstep service?",
    answer:
      "Increase your presence by: Promoting your services on WhatsApp, Telegram & Social Media, Providing reliable & professional service to earn repeat customers, and Encouraging riders to pre-book through OIOT.",
  },
  {
    question: "How can I stay motivated to use Towner and grow my business?",
    answer:
      "Remember, this is YOUR business! No one takes a cut from your earnings. You have freedom & control over pricing. More riders = More bookings = More income.",
  },
  {
    question: "Does Towner provide stickers for drivers to promote their business?",
    answer: "Yes! Towner provides Driver Promo Sticker Packs. To get stickers for your vehicle, check updates in our WhatsApp Channel."
  },
  {
    question: "What is the Towner support team's contact number & website?",
    answer: "Customer Support: [Contact Number]\nWebsite: [Towner Website Link]"
  },
  {
    question: "Why are there two apps – Towner & OIOT?",
    answer: "Towner App – For Drivers to manage bookings, generate bills, and grow their business.\nOIOT App – For Riders (Passengers) to book rides & directly connect with drivers."
  },
  {
    question: "What is SaaS? What is Subscription?",
    answer: "SaaS (Software as a Service) – Towner provides software-based services to taxi/auto drivers.\nSubscription – Instead of charging commission per ride, Towner offers a yearly subscription plan with unlimited ride bookings & driver benefits."
  },
  {
    question: "What is the difference between Commission & Subscription for drivers?",
    answer: "Commission: Platforms like Ola/Uber take 30-40% commission per ride from drivers.\nSubscription: Towner takes ZERO% commission and only requires an annual subscription fee."
  },
  {
    question: "I have only one vehicle. Can I use the Towner app?",
    answer: "Yes! Towner is perfect for independent drivers with a single vehicle. You can run your own Digital Travel Agency with Towner."
  },
  {
    question: "Who decides the ride fare, and who collects the payment?",
    answer: "Drivers set their own fares as per market rates, and passengers pay directly to drivers after the ride. Towner does not interfere in payments."
  },
  {
    question: "When will Towner become a great success?",
    answer: "Towner will succeed when more drivers & riders use the app daily. Encourage passengers to download OIOT to grow bookings!"
  },
  {
    question: "Why are drivers struggling to adopt this business model?",
    answer: "For years, drivers have been dependent on aggregator platforms. Transitioning to independent business ownership takes time, but Towner gives you full freedom."
  },
  {
    question: "Will Towner help drivers gain freedom from aggregator domination?",
    answer: "YES! Towner provides ZERO% commission bookings and direct ride access, freeing drivers from the control of aggregators."
  },
  {
    question: "Why are union leaders not supporting Towner?",
    answer: "Some union leaders are aligned with aggregators and do not want drivers to become independent. But Towner supports driver empowerment without any middlemen."
  },
  {
    question: "Why hasn't the government announced Towner as the official app?",
    answer: "Government policies take time to change. However, when more drivers and riders start using Towner, the government will have to recognize it."
  },
  {
    question: "How can drivers build a 'Driver Government' (Self-Regulated Driver Community) with Towner?",
    answer: "If drivers unite through Towner, they can influence policy-making, establish fair rates, and create a self-regulated driver network for long-term benefits."
  },
  {
    question: "If we have Towner, why are we still demanding changes from aggregators?",
    answer: "If we are independent, aggregators' policies will not matter! Instead of asking them to change, we must grow our own driver-focused platform."
  },
  {
    question: "Can we survive without aggregators?",
    answer: "YES! If drivers build their own customer base, promote OIOT to passengers, and ensure good service, they don't need aggregators to get rides."
  },
  {
    question: "Does Towner truly provide freedom, control, and lifetime security for drivers?",
    answer: "YES! Towner is the ONLY platform with ZERO% commission, full fare control, and direct ride bookings. Drivers keep 100% of their earnings!"
  },
  {
    question: "What are the threats from aggregators to independent auto and taxi drivers in the coming days?",
    answer: "Aggregators are moving towards complete domination, meaning: Higher commissions (up to 50%) for drivers, Dynamic pricing that benefits only the company, not drivers, Unfair bans & penalties for drivers, No long-term security for drivers, Dependence on their platform, killing driver freedom."
  },
  {
    question: "Why should drivers adopt Towner?",
    answer: "Because Towner gives power back to the drivers! ZERO% Commission, Drivers decide fares, not companies, Direct cash payment from riders, Lifetime independence & business growth."
  },
  {
    question: "If all drivers secure their business with Towner, what will happen in the future?",
    answer: "A revolution will happen! Aggregators will lose control over fares & drivers. Drivers will earn 100% of their money. The government will recognize Towner as an official platform. No one can exploit drivers anymore!"
  },
  {
    question: "Is it true that aggregators have stolen all our local customers and are now dominating the market?",
    answer: "YES! Aggregators started with discounts, then captured local customers, and now force drivers to work under their rules with high commissions."
  },
  {
    question: "Should drivers now take back all their customers from aggregators and build a local business model?",
    answer: "YES! It's time to take control! Stop depending on aggregators. Encourage riders to book via OIOT. Promote Towner and build direct relationships with customers."
  },
  {
    question: "How will Towner and OIOT help us get back our local customers?",
    answer: "Towner gives control back to drivers, while OIOT gives choice to riders. Passengers can directly book local autos/taxis via OIOT. Towner allows drivers to provide services without paying commissions. Drivers can build their customer base with direct bookings."
  },
  {
    question: "Why do RTO officials always say, 'Drivers should use their own app instead of working for aggregators'?",
    answer: "Because RTO officials know aggregators are exploiting drivers. They want drivers to take charge of their business and work independently."
  },
  {
    question: "How is Towner bringing power back to drivers and proving our strength to RTO officials?",
    answer: "Towner is creating a driver-led movement! If all drivers unite under Towner, aggregators will lose power. RTO & Government will have to support independent drivers. Towner helps drivers earn fairly and stand strong as a community."
  },
  {
    question: "Why are drivers struggling to unite and achieve success with Towner?",
    answer: "Because many drivers still fear change and lack confidence in their own power. If all drivers unite, NO aggregator can control them! Change starts with YOU!"
  },
  {
    question: "Why do some drivers still not trust Towner?",
    answer: "Because they are used to the aggregator model and fear losing customers. Towner is not another aggregator! It's a DRIVER'S BUSINESS PLATFORM! Drivers need to experience the benefits and see real success."
  },
  {
    question: "Why should drivers trust Towner App and its Founder?",
    answer: "Towner was built for drivers, by people who understand their struggles. Towner does not take a single rupee in commission. It gives drivers freedom over pricing, customers & their business. The founder's vision is to see every driver become a business owner!"
  },
  {
    question: "Why don't drivers believe they can change their own lives as a community?",
    answer: "Fear & lack of unity. Drivers think change is not possible, but if they work together, they can control the industry! United drivers can defeat any aggregator."
  },
  {
    question: "Who is stopping drivers from upgrading their lives with Towner?",
    answer: "Fear, misinformation & aggregator pressure! Aggregators spread fear that drivers can't survive without them. Some union leaders discourage drivers from being independent. Many drivers are afraid to take the first step!"
  },
  {
    question: "What is the strategy of aggregators to stop Towner?",
    answer: "They use the following tricks: Spreading fake news that Towner will not work. Offering temporary discounts to keep drivers dependent. Scaring drivers that customers won't use a new platform. Trying to create division among drivers. Don't fall into their trap! If all drivers shift to Towner, aggregators will lose power!"
  },
  {
    question: "Why are aggregators supporting fleet companies more and increasing their own fleet? How does this negatively impact independent taxi & auto owners?",
    answer: "Aggregators are now creating their own taxi/auto fleet instead of depending on independent drivers. They prioritize fleet-owned vehicles, reducing rides for independent drivers. Higher competition for independent drivers, making it harder to get bookings. More fleet vehicles = Lower fares & earnings for independent drivers."
  },
  {
    question: "Why do fleet companies offer high salaries, even higher than their actual earnings?",
    answer: "Fleet companies receive heavy financial support from aggregators & investors. They offer fake high salaries in the beginning to attract more drivers. Once independent drivers switch to fleets, salaries are reduced & control is taken. Their goal is to eliminate independent drivers and create full dependency on fleet owners."
  },
  {
    question: "Are electric vehicles (EVs) creating more trouble for petrol, diesel & CNG vehicle owners? How does fuel type variation impact rider pricing?",
    answer: "Yes, the sudden shift to electric vehicles (EVs) is creating instability. EVs are heavily subsidized, giving fleet companies an unfair advantage. Petrol & diesel auto/taxi fares remain unstable due to fuel price fluctuations. EV fares are lower now but will increase once the market is dominated by fleet EVs."
  },
  {
    question: "Can old vehicle owners join Towner & fight against aggregators to secure their business?",
    answer: "YES! Towner is open to all independent drivers, regardless of vehicle age. Your experience & customer service matter more than vehicle age. Towner supports local drivers to retain their passengers. If all old vehicle owners unite, aggregators & fleet companies cannot dominate!"
  },
  {
    question: "Independent drivers must fight against aggregators, fleet owners, government regulations, misleading rich investors, bike taxis, metro expansion, free bus services, fuel price hikes, and family responsibilities. How can a driver survive all this?",
    answer: "The only way to win is UNITY! Join Towner & promote OIOT for rider bookings. Educate passengers on how independent drivers provide better service. Demand fair policies & pricing regulations from the government. Build your own customer base & stop depending on aggregators."
  },
  {
    question: "How can independent drivers ensure a peaceful life, stable earnings & provide a safe & quality service for riders with Towner's support?",
    answer: "Towner helps drivers take control of their business & earnings. Set your own prices & work on your own terms. Build loyal rider connections for repeat bookings. Provide safe, professional service & attract more customers. No stress of high commissions, unfair bans, or penalties. Lifetime freedom & financial stability as a self-employed driver!"
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqData : faqData.slice(0, 5);

  return (
    <section className="py-5 md:py-24 relative overflow-hidden" id="Faq">
      {/* Background Design Elements */}
      <div className="absolute inset-0" />
      <div className="absolute inset-0 opacity-20 bg-[length:30px_30px] bg-grid-pattern" />

      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
        <HelpCircle className="w-96 h-96 text-[#8dc720] rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Frequently Asked <span className="text-[#8dc720]">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2 text-lg">
            Find answers to common questions about Towner and how it can help
            your business
          </p>
          <svg width="100" height="20" viewBox="0 0 100 20" className="mx-auto">
            <path
              d="M0 10 Q50 0 100 10"
              stroke="#a8ff01"
              strokeWidth="3.5"
              fill="none"
            />
          </svg>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {visibleFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-100 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-[#8dc720] transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 p-6 pt-0" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}

          {/* Load More Button */}
          {!showAll && faqData.length > 5 && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full mt-8 py-4 px-6 flex items-center justify-center gap-2 text-[#8dc720] hover:text-green-600 font-medium bg-green-50 rounded-2xl transition-all duration-300 hover:bg-green-100 group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Load More Questions
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Faq;
