# Digital Portfolio - Jialin Tu

This is my personal portfolio for CS5709. It presents my education, skills, projects and internship experience. I built it with React, TypeScript and Vite, and I use Redux Toolkit to manage the post feed.

- [Live portfolio](https://jialin-tu.github.io/digital-portfolio/)
- [GitHub repository](https://github.com/Jialin-Tu/digital-portfolio)

## Phase 1 and Phase 2

### Phase 1: The First Version

The first version included the main portfolio pages, navigation, galleries, search, GitHub integration and a prototype post feed. It gave me a working site to build on. The feedback from my lecturer pointed out that I needed to explain how I gathered requirements, why I made my design choices and how I evaluated the result.

### Phase 2: What I Changed

| Area | Phase 2 changes | Checks and remaining work |
| --- | --- | --- |
| Requirements and design | Separated the two phases and added fictional recruiter and lecturer personas and scenarios. | Completed my own scenario walkthroughs. Independent visitor testing has not been carried out. |
| Code structure | Added comments explaining key responsibilities and separated post storage and backup handling from the page component. | ChatGPT traced the backup restore code using the project files and examples from my tests. This was not a formal peer inspection. |
| Project content | Moved project content into JSON and added combined keyword search and technology filtering. | Checked matching results, empty results and clearing filters locally. Confirmed the Vue.js filter on the published site. |
| API and contact | Connected the contact form to FormSubmit and improved GitHub loading, error and retry handling. | Confirmed email delivery locally and online. Tested blocked GitHub requests and recovery locally. Timeout and rate-limit cases remain untested. |
| Navigation and loading | Added URL hash navigation, lazy loading for secondary pages and a scrollable small-screen menu. | Checked navigation and selected pages in a 390-pixel emulated viewport. Physical phone testing remains outstanding. |
| Animation | Added a GSAP entrance animation that respects reduced motion. | Checked reduced motion locally using Edge developer tools. |
| TypeScript | Added a separate type check and corrected the errors it found. | Type checking and production builds passed. The deployment workflow runs both checks. |
| Interactive features | Replaced the simulated chat with a preset portfolio FAQ and made the post feed a local demonstration. Added backup export, validation, preview and restore. | Tested local post interactions, duplicate handling, restoration and selected invalid backup files. Also checked backup import and restore on the published site. |
| Deployment and documentation | Configured GitHub Actions to check, build and deploy to GitHub Pages. Recorded evaluation results in docs/evaluation.md. | Verified successful deployment and selected live-site behaviours. The report is being prepared. |

## Who the Portfolio Is For

After receiving the Phase 1 feedback, I added two fictional personas to reconsider the portfolio from a visitor's point of view. They are planning tools based on assumptions, not people I interviewed.

### Alex: A Recruiter

Alex is looking for a graduate software developer and has only a few minutes to review the portfolio. Alex reads my introduction, opens Projects and filters by a technology such as Vue.js. After reading a project description, Alex looks for evidence of my work and a way to contact me.

I used this scenario to review the route from Home to Projects and Contact. The Phase 2 changes include project filtering and a working contact form. The project cards describe the work and technologies, although the team project still needs a more specific explanation of my individual contribution.

### Morgan: A Module Lecturer

Morgan wants to see what changed after Phase 1. Morgan tries the main features on the website, then checks the repository and reads this README alongside my report.

This scenario helped me decide what to document. The README separates the two phases, explains where the main code lives and describes the limits of features such as the local post feed. The Deployment section links to the published website and repository.

## Response to Phase 1 Feedback

The feedback below came from my lecturer after the Phase 1 submission. I used it to guide Phase 2. It was not feedback on the finished second phase. No independent peer code review has been carried out.

| Feedback | How I responded |
| --- | --- |
| Phase 1 and Phase 2 requirements were not separated in the README. | I added separate sections for the first version and the Phase 2 changes. |
| Requirements discovery could include personas and scenarios. | I described two likely visitors and the tasks they would try to complete. |
| The design needed a clearer connection to user needs. | I used the recruiter scenario to review project discovery and contact. The lecturer scenario guided the documentation and evaluation records. |
| The code structure needed clearer comments. | I added JSDoc and comments explaining key responsibilities and decisions. I also separated post storage and backup functions from the page component. |
| Evaluation needed a specific method. | I recorded manual functional tests, my own scenario walkthroughs and a code walkthrough performed with ChatGPT. Results and limitations are documented in docs/evaluation.md. |

## Main Features

- **Projects:** Search by title, description or technology, and filter by technology. Both filters apply together. The content comes from `src/data/projects.json`.
- **Search:** Find portfolio pages by title, description or keyword.
- **GitHub:** View my public profile and recently updated repositories using the GitHub API. A failed request displays an error, a retry button and a direct profile link.
- **Contact:** Send an enquiry through FormSubmit or use the direct email link. Test messages from both the local and published sites arrived in my inbox.
- **Portfolio FAQ:** Choose a question or type an English keyword to see a preset answer about my background and work. It is not an AI chatbot or live messaging service. The conversation clears when the page is reopened or refreshed.
- **Post Feed:** Create and delete local posts, attach a small image, add comments and toggle likes. Saved changes remain after a refresh in the same browser and site address.
- **Backup and restore:** Export local posts and restore missing entries from a validated JSON backup.
- **Home and navigation:** A short GSAP entrance animation respects reduced motion. The site also includes a theme switch, URL hash navigation and a scrollable menu on smaller screens.
- **Other pages:** Education, experience, academic interests, galleries, blog and local analytics.

### Local Post Backup and Restore

The Post Feed can export posts, images, comments and likes in a JSON file containing an application identifier, backup version and export date.

The importer accepts files up to 5 MB. It checks the JSON format, application identifier, supported version, export date, post structure and missing or duplicate post IDs. A valid backup is shown in a preview before any content is saved.

The preview shows how many posts would be added or skipped. Confirming adds missing posts and keeps existing posts with matching IDs. Cancelling clears the preview without saving. Different versions of the same post are not combined.

The merged posts are saved to browser storage before Redux is updated. If saving fails, the page displays an error and keeps the current feed.

This feature supports manual recovery and transfer using an exported file. It does not provide cloud storage or automatic synchronisation. Localhost and GitHub Pages use separate browser storage.

## Project Structure

```text
.
├── .github/workflows/        GitHub Actions deployment workflow
├── docs/                    Evaluation notes
├── src/
│   ├── App.tsx              Layout, navigation and theme
│   ├── main.tsx             React entry point and Redux provider
│   ├── components/          Pages and shared UI
│   ├── data/projects.json   Project descriptions and technologies
│   ├── lib/                 Navigation, analytics, storage and backup functions
│   ├── store/               Redux store and slices
│   ├── assets/              Images and other assets
│   └── styles/              Shared styles
├── server/                  Express prototype from Phase 1
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

`main.tsx` starts the React app and connects it to the Redux store. `App.tsx` reads the page from the URL hash, manages the theme and loads secondary pages when they are opened. Shared buttons, cards and inputs are in `src/components/ui/`.

The post feed keeps the displayed posts in Redux. `src/lib/postStorage.ts` reads and writes posts in `localStorage`. `src/lib/postBackup.ts` exports, validates and merges backups. `PostFeed.tsx` connects these functions to the interface.

The Express prototype in `server/` is retained from Phase 1. The current portfolio runs without it.

## Run the Project Locally

Open a terminal in the project folder and run:

```bash
npm ci
npm run dev
```

Open the local address printed by Vite.

To run the TypeScript check and create a production build:

```bash
npm run check
```

Vite writes the production files to `build/`.

## Deployment

- [Live portfolio](https://jialin-tu.github.io/digital-portfolio/)
- [GitHub repository](https://github.com/Jialin-Tu/digital-portfolio)

The GitHub Actions workflow runs when changes are pushed to `main`. It installs dependencies with `npm ci`, runs the TypeScript check and creates a production build. Deployment runs after the build job succeeds and publishes the generated files to GitHub Pages.

I verified the first successful deployment by running the workflow manually. Later pushes also triggered successful deployments automatically.

## Evaluation

Methods, results and limitations are recorded in [docs/evaluation.md](docs/evaluation.md).

I completed manual checks of project search and filtering, contact delivery, GitHub API failure and retry, reduced motion, local post interactions and backup restoration. I also followed the recruiter and lecturer scenarios myself. Small-screen checks used Microsoft Edge device emulation at a viewport width of 390 pixels.

ChatGPT reviewed the backup code and traced validation, preview, merging and saving using examples from my browser tests. This was not an independent peer review or a formal inspection meeting.

Type checking and production builds passed. GitHub Actions also completed successful deployments. On the published site, I checked the Vue.js project filter, contact delivery and backup import and restoration.

The checks cover selected cases. Physical phone testing, independent visitor testing and several failure cases remain outstanding.

## Known Limitations

- Post Feed data belongs to the current browser and site address. Other visitors cannot see it, and clearing site data removes it unless a separate backup has been kept.
- Backup restoration skips existing post IDs. It does not combine comments or likes from different versions of the same post.
- Imported image values are checked as strings. Their encoding and URLs are not fully validated.
- Oversized backups, invalid export dates, duplicate IDs within a backup and storage-full errors have not been manually tested.
- The FAQ matches preset English keywords, so some questions may need to be rephrased or selected from the suggested list.
- Changes to `projects.json` require a new build and deployment.
- Contact delivery depends on FormSubmit. Successful test messages do not guarantee continuous availability.
- GitHub timeout and rate-limit handling have not been separately tested.
- The personas are fictional planning tools. The scenario walkthroughs were my own checks, not sessions with actual recruiters or lecturers.
- Small-screen checks used browser emulation. The portfolio has not been tested on a physical phone.
- The team project description needs more detail about my individual contribution.

## AI Assistance

I used ChatGPT to help explain code, suggest changes, troubleshoot errors and prepare documentation. It also reviewed project files and performed the backup code walkthrough. The evaluation notes distinguish this assistance from the browser tests I carried out.

## Author

Jialin Tu  
Master's Student in Software Engineering  
University of Limerick, Ireland

- [GitHub](https://github.com/Jialin-Tu)
- [LinkedIn](https://www.linkedin.com/in/jialin-tu-9a1218400/)