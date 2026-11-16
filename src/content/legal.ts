/**
 * Policy pages, carried over word for word from the old acestar.my (same URLs and titles).
 * Only the "Acetar" misspellings were corrected.
 */
export type LegalListItem = string | { text: string; sub: string[] };
export type LegalSection = {
  heading?: string;
  body: string[];
  list?: LegalListItem[];
  link?: { label: string; href: string };
};
export type LegalPage = {
  /** URL path segment on the old site. */
  slug: string;
  key: "privacy" | "terms" | "refunds" | "delivery";
  title: string;
  /** Exact <title> from the old site. */
  metaTitle: string;
  /** Short footer label. */
  label: string;
  sections: LegalSection[];
};

export const legalPages: LegalPage[] = [
  {
    slug: "acestar-privacy-policies",
    key: "privacy",
    title: "Acestar Privacy Policies",
    metaTitle: "Acestar Privacy Policies - Acestar",
    label: "Privacy",
    sections: [
      {
        heading: "ACESTAR respects your privacy.",
        body: [
          "Any personal information you provide to us including and similar to your name, address, telephone number and e-mail address will not be released, sold, or rented to any entities or individuals outside of ACESTAR.",
        ],
      },
      {
        heading: "External Sites",
        body: [
          "ACESTAR is not responsible for the content of external internet sites. You are advised to read the privacy policy of external sites before disclosing any personal information.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "A “cookie” is a small data text file that is placed in your browser and allows ACESTAR to recognize you each time you visit this site (customisation etc). Cookies themselves do not contain any personal information, and ACESTAR does not use cookies to collect personal information. Cookies may also be used by 3rd party content providers such as newsfeeds.",
        ],
      },
      {
        heading: "Remember The Risks Whenever You Use The Internet",
        body: [
          "While we do our best to protect your personal information, we cannot guarantee the security of any information that you transmit to ACESTAR and you are solely responsible for maintaining the secrecy of any passwords or other account information. In addition other Internet sites or services that may be accessible through ACESTAR have separate data and privacy practices independent of us, and therefore we disclaim any responsibility or liability for their policies or actions.",
        ],
      },
      {
        heading: "1. PRIVACY STATEMENT",
        body: [
          "ACESTAR uses personal information to better understand your needs and interest and provide you with better service. Once you choose to provide us with personal information, you can be assured that it will only be used to support your customer relationship with ACESTAR. We take seriously the trust you place in us. ACESTAR will not sell, rent or lease your personally identifiable information to others. This privacy statement covers personally identifiable information, anonymous data collection and aggregate reporting. Personally identifiable information is any information that is associated with your name or personal identity. Anonymous (non-personal) information is data about usage and service operation, reported in aggregate, which is not associated to a specific personal identity. Aggregate information is data collected and summarized for a broad category of customers or ACESTAR products and services.",
        ],
      },
      {
        heading: "2. WHAT WE COLLECT",
        body: [
          "On ACESTAR web sites, you can order products or services, make information requests, subscribe to marketing or support materials, or register yourself. The types of personal information you provide to us on these pages may include name, address, phone, email address, user IDs and passwords, billing information, transaction, credit card information and contact preferences. To personalize our web sites, services or communications and improve our products and services, we may also ask you to provide us with information regarding your personal or professional interests, demographics, and experiences with our products or services. Providing this additional information is optional.",
        ],
      },
      {
        heading: "3. HOW WE USE IT",
        body: [
          "ACESTAR uses your information to help us understand your needs and interests and provide you with better services. Specifically, we use your information to help you complete a transaction or order, to communicate with you, to provide service and support, to update you on services and benefits, to personalize promotional offers and to personalize our web sites. Occasionally we may also use your information to contact you for market research regarding ACESTAR products or services.",
        ],
      },
      {
        heading: "4. WHO WE SHARE IT WITH",
        body: [
          "ACESTAR will not sell, rent, or lease your personally identifiable information to others. ACESTAR will not share your personal information with a business partner or any unrelated third party company unless you give your permission. Your permission will be requested when you submit your information.",
        ],
      },
      {
        heading: "5. CHOICE",
        body: [
          "You can subscribe to receive some products and service-specific information and ACESTAR wide marketing communications include new product information, special offers or possibly an invitation to participate in market research. We give you a choice regarding ACESTAR wide communications by postal mail, email and telephone.",
          "Links provided on www.acestar.my to third party web sites are provided as a convenience and ACESTAR does not control those sites or their privacy practices, which may differ from ours. ACESTAR does not endorse or make any representations about them. We encourage you to review the privacy policy of any company before submitting your personal information. The personal data you choose to give to unrelated third parties is covered by their privacy policies, not the ACESTAR Privacy Policy. Some third-party companies may choose to share their personal data with ACESTAR; that sharing is governed by that third-party company’s privacy policy.",
        ],
      },
      {
        heading: "6. ONWARD TRANSFER",
        body: [
          "Personal data given to ACESTAR may be transferred across state and country borders for the purposes of data consolidation, storage and simplified customer information management. The practices which govern this data movement are described in our commitments in the Choice and Security sections of this privacy statement.",
        ],
      },
      {
        heading: "7. ACCESS & ACCURACY",
        body: [
          "ACESTAR strives to keep your personally identifiable information accurate. We have put in place managerial data standards review processes and technological tools to maintain customer data accuracy. We will provide you with access to view and change your information, including making every effort to provide you with online access. To protect your privacy and security, we will also take reasonable steps to verify your identity, such as a password and user ID, before granting access to your data.",
        ],
      },
      {
        heading: "8. SECURITY",
        body: [
          "ACESTAR is committed to ensuring the safety and security of your information. To prevent unauthorized access or disclosure, maintain data accuracy and ensure the appropriate use of the information, ACESTAR has in place appropriate physical, managerial procedures to safeguard the information we collect.",
          "Acestar Sdn Bhd reserves the right to change, modify or amend the terms and conditions herein at its own discretion and without prior notice.",
        ],
      },
    ],
  },
  {
    slug: "terms-of-use",
    key: "terms",
    title: "Terms of Use",
    metaTitle: "Terms of Use - Acestar",
    label: "Terms",
    sections: [
      {
        body: [
          "The following terms and conditions (“Terms and Conditions”) apply to your access and use of this Website and the services provided herein by ACESTAR. By accessing any page of this Website and/or using the services, you agree to be bound by these Terms and Conditions without limitation or qualification. Please read these Terms and Conditions carefully.",
          "If you do not accept these Terms and Conditions, please discontinue your access to this Website and/or use of the services immediately.",
        ],
      },
      {
        heading: "1. General",
        body: [
          "All products and services of ACESTAR are subject to the applicable terms and conditions governing the products and/or services. Please check the applicable terms and conditions of sale associated with the products and/or services you may purchase.",
          "These Terms and Conditions are meant to regulate your access to this Website and they are to be read together with the applicable terms and conditions governing any transaction(s), product(s) and/or service(s) provided on this Website. In the event of conflict between these Terms and Conditions and the terms and conditions governing the relevant transaction(s), product(s) and/or service(s) provided herein, the latter would prevail.",
          "The information and content provided in the pages of the Website may be changed from time to time with ACESTAR’s absolute discretion. Your continued access or use of the Website and/or the services provided herein subsequent to any such change will be deemed as your acceptance to those changes.",
        ],
      },
      {
        heading: "2. Disclaimer of Warranties and Limitation Liability",
        body: [
          "The materials and information in this Website, including but not limited to services, products, information, data, text, graphics, audio, video, links or other items, are provided on an “as is” and “as available” basis. References to materials and information contained in the Website include such material and information provided by third parties.",
          "ACESTAR does not make any express or implied warranties, representations or endorsements including but not limited to any warranties of title, non-infringement, merchantability, usefulness, operation, completeness, accuracy, satisfactory quality, reliability, fitness for a particular purpose in respect of the Website, the material, information and/or functions therein and expressly disclaims liability for errors and omissions in such materials, information and/or functions. Without derogation of the above and/or the terms and conditions of the applicable agreements governing all the products and services, reasonable measures will be taken by ACESTAR to ensure the accuracy and validity of all information relating to transactions and products and services in the Website.",
          "Further ACESTAR does not warrant or represent that access to the whole or part(s) of this Website, the materials, information and/or functions contained therein will be provided uninterrupted or free from errors or that any identified defect will be corrected, or that there will be no delays, failures, errors or loss of transmitted information, that no viruses or other contaminating or destructive properties will be transmitted or that no damage will occur to your computer system.",
          "ACESTAR will not be liable for any damages of any kind arising from the use of this Website, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.",
        ],
      },
      {
        heading: "3. Electronic Communications",
        body: [
          "When you visit the Website or send e-mails to ACESTAR, you are communicating with us electronically. You consent to receive communications from us electronically. We will communicate with you by e-mail and/or by posting notices on this Website. You agree that all agreements, notices, disclosures and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.",
        ],
      },
      {
        heading: "4. Copyright",
        body: [
          "All content included on this Website, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, are owned and/or licensed by ACESTAR and/or its content supplier and are protected by copyright, trademarks and other laws. The compilation of all content on this Website is the exclusive property of ACESTAR and is protected by copyright laws. All software used on this Website is protected by copyright and other laws.",
        ],
      },
      {
        heading: "5. Trademarks",
        body: [
          "All trademarks, service marks, and logos displayed on this Website are owned and/or licensed by ACESTAR.",
          "Unless the prior written consent of ACESTAR of any of the trademarks, service marks or logos appearing on the Website has been obtained, no license or right is granted to any party accessing this Website to use, download, reproduce, copy or modify such trademarks, service marks or logos. Similarly, unless the prior written consent of ACESTAR has been obtained, no such trademarks, service marks or logos may be used as a link or to mark any link to the Website or any other site owned and/or controlled by ACESTAR.",
        ],
      },
      {
        heading: "6. License and Website Access",
        body: [
          "ACESTAR grants you a limited license to access and make personal use of this Website and not to download (other than page caching) or modify it, or any portion of it, except with express written consent of ACESTAR. This license does not include any resale or commercial use of this Website or its contents; any collection and use of any product listings, descriptions, or prices; any derivative use of this Website or its contents; any downloading or copying of account information for the benefit of another merchant; or any use of data mining, robots, or similar data gathering and extraction tools. This Website or any portion of this Website may not be reproduced, duplicated, copied, sold, resold, visited, or otherwise exploited for any commercial purpose without express written consent of ACESTAR. You may not frame or utilize framing techniques to enclose any trademark, logo, or other proprietary information (including images, text, page layout, or form) of ACESTAR without express written consent. You may not use any metatags or any other “hidden text” utilizing ACESTAR’s name or trademarks without the express written consent of ACESTAR. Any unauthorized use terminates the permission or license granted by ACESTAR.",
        ],
      },
      {
        heading: "7. Exclusion of Liability",
        body: [
          "ACESTAR herein shall in no event be liable for any loss or damage howsoever arising whether in contract, tort, negligence, strict liability or any other basis, including without limitation, direct or indirect, special, incidental, consequential or punitive damages, or loss profits or savings arising in connection with your access or use or the inability to access or use this Website (or any third party link to or from the Website), reliance on the information contained on the Website, any technical, hardware or software failure of any kind, the interruption, error, omission, delay in operation, computer viruses, or otherwise.",
          "This exclusion clause shall take effect to the fullest extent permitted by law.",
        ],
      },
      {
        heading: "8. Indemnity",
        body: [
          "You hereby irrevocably agree to indemnify and keep indemnified SNS NETWORK from all liabilities, claims, losses and expenses, including any legal fees that may be incurred by ACESTAR in connection with or arising from (1) your use or misuse of this Website and the services provided herein, or (2) your breach of these Terms and Conditions howsoever occasioned, or (3) any intellectual property right or proprietary right infringement claim made by a third party against ACESTAR in connection with your use of this Website.",
        ],
      },
      {
        heading: "9. Your Account",
        body: [
          "If you use this Website, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. ACESTAR reserves the right to refuse service, terminate accounts, remove or edit content, or cancel orders in its sole discretion.",
          "You are solely responsible for maintaining the confidentiality of your login name and password to any other person. You are responsible for the use of your account, whether or not authorized by you.",
          "You shall immediately notify ACESTAR if it comes to your knowledge that your password has been compromised or there has been unauthorized use of your account.",
          "ACESTAR shall not be liable for any damage or loss of any kind suffered by you as a result of unauthorized use of your login name and password.",
          "You shall provide and maintain true, accurate, current and complete information about yourself when registering for your account.",
        ],
      },
      {
        heading: "10. Delivery Policy",
        body: [],
        link: {
          label: "Read our Delivery Policy",
          href: "/delivery-policy/",
        },
      },
      {
        heading: "11. Product and Service Descriptions",
        body: ["ACESTAR attempts to provide the product and service descriptions as accurately as possible to you."],
      },
      {
        heading: "12. Return and Refund Policy",
        body: [],
        link: {
          label: "Read our Return and Refund Policy",
          href: "/return-and-refund-policy/",
        },
      },
      {
        heading: "13. Collection and Use of Personal Information",
        body: [
          "In addition to disclosure of identification and contact particulars as contemplated herein, ACESTAR will collect, store, compile and utilize information about you and your use of the Website including without limitation, information that you provide to ACESTAR.",
        ],
      },
      {
        heading: "14. Currency",
        body: [
          "All transactions on the Website are to be conducted and payable in Ringgit Malaysia (RM), unless otherwise indicated.",
        ],
      },
      {
        heading: "15. Items Put Up for Sale",
        body: [
          "All offers by you to purchase any products and/or services on this Website are subject to acceptance by ACESTAR.",
        ],
      },
      {
        heading: "16. Law and Jurisdiction",
        body: [
          "These terms and conditions are governed by and are to be construed in accordance with the laws of Malaysia. By accessing this Website and/or using the services provided herein by ACESTAR, you hereby consent to the exclusive jurisdiction of the courts of Malaysia in all disputes arising out of or relating to the use of this Website.",
          "ACESTAR makes no representation that the materials, information, functions and/or services provided on this Website are appropriate or available for use in jurisdictions other than in Malaysia.",
        ],
      },
      {
        heading: "17. Termination",
        body: [
          "ACESTAR reserves the right to terminate and/or suspend your access to this Website and/or your use of this Website at any time, for any reason. In particular, and without limitation, the ACESTAR may terminate and/or suspend your access should you violate any of these Terms and Conditions, or violate the rights of ACESTAR, of any other user(s), or of any third party (ies).",
        ],
      },
      {
        heading: "18. Waiver",
        body: [
          "The failure of ACESTAR to exercise or enforce any right or provision of these Terms and Conditions shall not constitute a waiver of such right or provision.",
        ],
      },
      {
        heading: "19. Modification and Severability",
        body: [
          "ACESTAR reserves the right to make changes to the Website, policies, and these Terms and Conditions at any time. If any of these conditions shall be deemed invalid, void, or for any reason unenforceable, that condition shall be deemed severed and shall not affect the validity and enforceability of any remaining condition.",
        ],
      },
      {
        heading: "20. Privacy",
        body: [
          "Please review our Privacy Policy, which also governs your visit to ACESTAR, to understand our privacy practices.",
        ],
      },
      {
        heading: "21. Contact Details",
        body: ["For any other information email at isr@acestar.my"],
      },
    ],
  },
  {
    slug: "return-and-refund-policy",
    key: "refunds",
    title: "Return and Refund Policy",
    metaTitle: "Return and Refund policy - Acestar",
    label: "Refunds",
    sections: [
      {
        body: [],
        list: [
          "This Return and Refund policy shall only be applicable should there be any discrepancy of Products delivered or Dead-on-Arrival (DOA) warranted products. Customer wishes for return and refund, please notify us through written communication at isr@acestar.my within seven (7) days upon receiving the Products.",
          "All DOA warranted products will be replaced upon new replacement products being processed and received by the Product’s Brand Principal.",
          "If the Customer opts for replacement or exchange of Products for discrepancy of Products delivered, the affected Products MUST be unused and in its original condition, quantity and packaging. No replacement or exchange of Products will be entertained if the above-said Products are opened, consumed or used. All replacements or exchange of Products shall be effected subject to stocks availability by the Products Brand Principal.",
          {
            text: "Return/Exchange of Products or refund can be arranged under the following reasons:",
            sub: [
              "If any Product has been delivered in a damaged or defective condition; or",
              "If the wrong Product which is different from the Order is delivered",
            ],
          },
          "Provided Always that the Customer shall return or caused to be returned to Acestar the aforesaid Products unused and in its original condition, quantity and packaging as it is first delivered to the Customer together with the proof of Order, payment and delivery of the Products.",
          "If a Customer is charged more than the value of a Product as displayed on the site when the Customer makes its Order, Acestar shall refund to the Customer the difference.",
          "The return of a Product by a Customer does not automatically warrant for a refund. Acestar will inspect the returned Products upon receipt of the same. If the conditions in the Return and Refund Policy have been fulfilled, refund will be made to the Customer and we will reimburse the Customer.",
          "All refunds will be made via the same mode of payment within 2 months and depending on the appointed bank refund policy in which your receipt of the refund will depend on the period of time your financial institution takes to finalise the refund. Acestar shall not be liable with respect to any loss, damage, cost or expense that you or any person may incur as a result of any delay in your financial institution processing the said refund.",
          "Collection arrangement from the Customer can be made for the affected Product(s).",
        ],
      },
    ],
  },
  {
    slug: "delivery-policy",
    key: "delivery",
    title: "Delivery Policy",
    metaTitle: "Delivery Policy - Acestar",
    label: "Delivery",
    sections: [
      {
        body: [],
        list: [
          "All products delivery arrangement will take place upon payment clearance thru iPay88 platform.",
          "Acestar shall use reasonable endeavors to deliver Products of acceptable quality to the delivery address specified and provided by the Customer based on arranged and agreed date and duration.",
          "All delivery services are extended to Malaysia only.",
          "Acestar shall not be liable for any delay in its delivery services, if the delay has been due to causes beyond the control of Acestar.",
          "No delivery services shall be available on Sunday & public holidays.",
          "The Customer is to notify Acestar immediately of a change to his delivery address and contact number for all non-software products delivery. All software products purchased will be delivered through mode of online or relevant system activation.",
          "Acestar reserves the right to withhold delivery of the Products to the Customer if it has any doubts whatsoever as to the Customer’s credit worthiness or insufficient identification.",
        ],
      },
    ],
  },
];

export const legalRoutes = legalPages.map((p) => `/${p.slug}/`);

export function getLegalPage(key: LegalPage["key"]) {
  const page = legalPages.find((p) => p.key === key);
  if (!page) throw new Error(`Unknown legal page: ${key}`);
  return page;
}
