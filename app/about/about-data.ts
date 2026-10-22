// Single source of truth for the About page — every line comes from the
// client's own About text (their Site123 site), condensed but with all
// facts kept exact: 100+ partner universities, ~500 students a year, the
// 2012 recruitment partnership, the "visa doctors" nickname, philosophy
// "Power of Partnership". Nothing here is invented.

export const ABOUT = {
  eyebrow: "NEPLINK TRAVEL HUB · SANTA MARIA, ACCRA",
  title: ["The company", "file."],
  intro:
    "Neplink Travel Hub is a legally registered company in the Accra metropolis of Ghana. We are an educational consultancy and travel agency — recruiting for first-class Ukrainian, Russian, Chinese, Canadian, American, Australian and Malaysian universities.",
  story: [
    "As part of our international network we have over 100 universities for you to apply to. Each year we help place circa 500 students from Nigeria, Ghana, Sierra Leone and Liberia into universities across our partner network.",
    "In line with our vision we have built a multi-cultural workforce, drawing on the expertise of our executive directors and management team in student recruitment, visa consultancy, tour-abroad programs, flight ticketing and reservation. Over the years, our strict emphasis on quality — coupled with our educational philosophy of “Power of Partnership” — has earned us the trust of our clients.",
  ],
  pullQuote: "Power of Partnership",
  pullNote: "our educational philosophy — the basis of every file we open",
  why: [
    {
      n: "01",
      title: "Leading providers",
      body: "We are the leading providers of international education consultancy and visa services. Neplink brings the door step of top-notch universities across Europe, North America and Australia — flexible in the school application process so the best universities fit each client’s satisfaction.",
      ct: "Hello Neplink — about the school application process: ",
    },
    {
      n: "02",
      title: "Practical solutions",
      body: "Our experience in international education allows us to render not just university admission processing but practical solutions — through pre-university education counselling and guidance that achieve the desired results for prospective students.",
      ct: "Hello Neplink — I need pre-university counselling: ",
    },
    {
      n: "03",
      title: "We keep talking",
      body: "We strongly believe our prospective students always come first. A key source of our clients’ satisfaction lies in our commitment to ongoing communication — for the highest possible level of service, we create a formal communication plan in accordance with your requirements.",
      ct: "Hello Neplink — set up my communication plan: ",
    },
  ] as const,
  history: [
    {
      year: "2010",
      stamp: "WHEELS ON",
      event:
        "Fully operational as Neplink Study Consults — the education and travel practice begins.",
    },
    {
      year: "2012",
      stamp: "NETWORK OPEN",
      event:
        "Partnered with recruitment agencies to recruit teachers and corporate workers to South Africa, China and Dubai — and since then we have helped Ghanaians and citizens across the West African sub-region secure visas to travel.",
    },
    {
      year: "2016",
      stamp: "VERIFIED",
      event: "Listed and verified on Ghanayello — a decade of the public record on our side.",
    },
    {
      year: "2017",
      stamp: "INCORPORATED",
      event:
        "Registered as Neplink Travel Hub (reg BN216252019, VAT P0013716573).",
    },
    {
      year: "NOW",
      stamp: "CRUISING",
      event:
        "100+ partner universities, circa 500 students placed each year, visa files across Europe, the Americas and Asia — and the clients call us the visa doctors.",
    },
  ] as const,
  quoteOrigin: "“no wonder you are called the travel doctors”",
  quoteName: "ELIJAH OWUSU · USA B2 CLIENT",
};

// numbers band — all client-supplied, verbatim quantities
export const FACTS = [
  { k: "100+", v: "UNIVERSITIES IN NETWORK" },
  { k: "~500", v: "STUDENTS PLACED A YEAR" },
  { k: "4", v: "HOME COUNTRIES · NG GH SL LR" },
  { k: "2012", v: "VISAS EVER SINCE" },
] as const;
