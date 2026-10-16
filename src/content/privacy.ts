import { PRIVACY_PATH } from "@/lib/constants";

export const GOOGLE_PRIVACY_URL = "https://policies.google.com/privacy";

export const PRIVACY = {
  path: PRIVACY_PATH,
  metaTitle: "Privacy",
  metaDescription:
    "What DataSpoke collects on this website: page visits in Google Analytics, messages sent through the contact form, and bookings made on Google Calendar.",
  eyebrow: "Privacy",
  title: "What this website collects",
  lede: "DataSpoke is a small team. This page says what we collect on this site and what we do with it.",
  sections: [
    {
      title: "Page visits",
      paragraphs: [
        "Google Analytics runs on each page. It records the page address, a general location, and the kind of device. Google Analytics uses cookies.",
        "If you arrived from an ad or another link, the address can include campaign parameters such as utm_source. Those parameters are sent to Google Analytics with the page view.",
      ],
    },
    {
      title: "Messages you send",
      paragraphs: [
        "The contact form asks for your name, email, company, the kind of help you want, and a message. We email that to nick@dataspoke.io so we can reply. We do not add you to a mailing list.",
        "The server uses your IP address only to slow repeated submissions. That count is kept in memory on the server and is not stored in a database.",
      ],
    },
    {
      title: "Booking a call",
      paragraphs: [
        "The calendar on the free estimate pages is Google Calendar. What you type there is handled by Google. Google's privacy policy covers that page.",
      ],
    },
    {
      title: "What we don't do",
      paragraphs: ["We don't sell personal information."],
    },
    {
      title: "Questions",
      paragraphs: [
        "Email nick@dataspoke.io. We will answer, and we will delete a message you sent us if you ask.",
      ],
    },
  ],
} as const;
