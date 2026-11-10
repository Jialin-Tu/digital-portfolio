# Digital Portfolio - Jialin Tu

This is my personal portfolio for CS5709. It presents my education, skills,
projects and internship experience. I built it with React, TypeScript and
Vite, and I use Redux Toolkit to manage the post feed.

## Phase 1 and Phase 2

### Phase 1: The First Version

The first version included the main portfolio pages, navigation, galleries,
search, GitHub integration and a prototype post feed. It gave me a working
site to build on. The feedback from my lecturer pointed out that I needed
to explain how I gathered requirements, why I made my design choices and
how I evaluated the result.

### Phase 2: What I Changed

| Area | Changes so far | What still needs checking |
| --- | --- | --- |
| Requirements and design | I separated the two phases and used two visitor scenarios to guide the changes. | Complete and record the walkthroughs. |
| Code structure | I added comments to explain key parts of the code and moved post storage into a separate module. | Finish the code inspection. |
| Project content | I moved the project descriptions and technology lists into a JSON file. Visitors can search and filter the projects. | Repeat the checks on the live site. |
| API and contact | The GitHub page uses the GitHub API. The contact form now sends messages through FormSubmit, and I received a test message from the local site. | Check API error handling and repeat the contact test after deployment. |
| Navigation and loading | Pages can be bookmarked using links such as `#projects`. Secondary pages are loaded when opened, and the expanded menu can scroll on smaller screens. | Check navigation and media on the live site. |
| Animation | I added a short GSAP animation to the home page and checked that it is skipped when reduced motion is enabled. | Repeat the check on the live site. |
| TypeScript | I added a separate type check and fixed the errors it found. | Include the check in the GitHub Actions workflow. |
| Interactive features | I replaced the simulated chat with a portfolio FAQ and made the post feed a local demo that works without a server. | Check both features after deployment. |
| Deployment and report | I have a starting workflow and have recorded local checks in `docs/evaluation.md`. | Verify the deployment, add the live link and finish the technical report. |

## Who the Portfolio Is For

I used two example visitors to think through what people might need from
the site. These personas are based on assumptions I made during design.

### Alex: A Recruiter

Alex is looking for a graduate software developer and has only a few
minutes to look through the portfolio. Alex reads my introduction, opens
Projects and filters by a technology such as Vue.js. After reading a
project description, Alex looks for my contribution and a way to contact me.

This scenario led me to keep the Projects link visible on the home page,
add a technology filter and make the contact form work. I also want project
descriptions to explain my own contribution and include a repository or
demo link when one is available.

### Morgan: A Module Lecturer

Morgan wants to see what changed after Phase 1. Morgan tries the main
features on the website, then checks the repository and reads this README
alongside my report.

This scenario helped me decide what to document. The README separates
the two phases, explains where the main code lives and describes the
limits of features such as the local post feed. I will add the verified
deployment link so the website and repository are easy to find.

## Response to Phase 1 Feedback

The feedback below came from my lecturer. I will record peer feedback
separately when it is available.

| Feedback | How I responded |
| --- | --- |
| Phase 1 and Phase 2 requirements were not separated in the README. | I added separate sections for the first version and the Phase 2 changes. |
| Requirements discovery could include personas and scenarios. | I described two likely visitors and what they would try to do on the site. |
| The design needed a clearer connection to user needs. | I used the recruiter scenario to guide project filtering and contact improvements. The lecturer scenario guided the README and evaluation notes. |
| The code structure needed clearer comments. | I added JSDoc to parts of the code where it helps explain the layout, navigation, animation or storage. I also separated post storage from the page component. |
| Evaluation needed a specific method. | I started recording functional checks. I will also use code inspection and task walkthroughs to review the implementation. |

## Main Features

- **Projects:** Search by title, description or technology, and filter by
  technology. The content comes from `src/data/projects.json`.
- **Search:** Find portfolio pages by title, description or keyword.
- **GitHub:** View my profile and recently updated repositories using the
  public GitHub API.
- **Contact:** Send an enquiry through FormSubmit or use the direct email
  link. I confirmed that test messages from both the local site and the published site arrived in my inbox.
- **Portfolio FAQ:** Choose a question or type a keyword to see a preset
  answer about my background and work. The conversation stays on the page
  and clears when the page is reopened or refreshed.
- **Post Feed:** Create and delete local posts, attach a small image, add
  comments and toggle likes. Changes remain in the same browser after a
  refresh.
- **Home and navigation:** The home page uses GSAP for a short entrance
  animation. The animation respects the reduced-motion setting. The site
  also includes a theme switch and a scrollable menu on smaller screens.
- **Other pages:** Education, experience, academic interests, galleries,
  blog and local analytics.

## Project Structure

```text
.
├── .github/workflows/       GitHub Actions deployment workflow
├── docs/                    Evaluation notes
├── src/
│   ├── App.tsx               Layout, navigation and theme
│   ├── main.tsx              React entry point and Redux provider
│   ├── components/          Pages and shared UI
│   ├── data/projects.json    Project descriptions and technologies
│   ├── lib/                 Navigation, analytics and post storage
│   ├── store/               Redux store and slices
│   ├── assets/              Images and other assets
│   └── styles/              Shared styles
├── server/                  Express prototype from Phase 1
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

`main.tsx` starts the React app and connects it to the Redux store.
`App.tsx` reads the page from the URL hash, manages the theme and loads
secondary pages when they are opened. Shared buttons, cards and inputs
are in `src/components/ui/`.

The post feed keeps the displayed posts in Redux. The storage module,
`src/lib/postStorage.ts`, reads and writes them in `localStorage`.
The page updates Redux after the save succeeds. If saving fails, it
shows an error and keeps the current data. The Express prototype in
`server/` is part of the Phase 1 work. The current site runs without it.

## Run the Project Locally

Open a terminal in the project folder and run:

```bash
npm ci
npm run dev
```

Open the local address printed by Vite. To run the TypeScript check and
create a production build, use:

```bash
npm run check
```

Vite writes the production files to `build/`.

## Deployment

- [Live portfolio](https://jialin-tu.github.io/digital-portfolio/)
- [GitHub repository](https://github.com/Jialin-Tu/digital-portfolio)

The GitHub Actions workflow runs the TypeScript check and builds the
site when changes are pushed to `main`. If both checks pass, it
publishes the `build/` folder to GitHub Pages. I verified the first
successful deployment by running the workflow manually.

## Evaluation

I keep my local test notes in [docs/evaluation.md](docs/evaluation.md).
The checks so far include project search and filtering, type checking,
the production build, contact delivery, reduced motion and local post
storage. During testing I also found that the bottom of the expanded
navigation menu could be cut off. I made the menu scroll and checked
that I could reach the Experience link.

For the walkthrough, I will follow Alex's and Morgan's tasks and note
where an action is hard to find or the result is unclear. I will also
inspect the code structure and repeat the main functional checks on
the deployed site.

## Known Limitations

- Post Feed data belongs to the current browser and site address.
  Other visitors cannot see it, and clearing site data removes it.
- The FAQ matches English keywords, so some questions may need to be
  rephrased or selected from the suggested list.
- Changes to `projects.json` need a new build and deployment.
- Contact delivery depends on FormSubmit. I have tested delivery from
  the local site and still need to repeat it from the live site.
- The personas are design assumptions. The walkthrough will be my own
  review of the tasks.

## Author

Jialin Tu  
Master's Student in Software Engineering  
University of Limerick, Ireland

- [GitHub](https://github.com/Jialin-Tu)
- [LinkedIn](https://www.linkedin.com/in/jialin-tu-9a1218400/)