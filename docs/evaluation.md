# Phase 2 Evaluation

## Project Search and Filtering

### Method

I carried out manual functional checks after moving the project content into a JSON file and adding search and technology filters.

### Results

| Check | Expected result | Actual result | Result |
| --- | --- | --- | --- |
| Open Projects without filters | Show all four projects. | All four projects were displayed. | Pass |
| Search for `attendance` | Show the Face Recognition Attendance System. | The expected project was displayed. | Pass |
| Clear the search and select `Vue.js` | Show three projects. | Three matching projects were displayed. | Pass |
| Search for `attendance` while `Vue.js` is selected | Show no matching projects. | The empty-results message was displayed. | Pass |
| Select Clear filters | Restore all four projects. | All projects were displayed again. | Pass |
| Run `npm run build` | Generate the production files without a build error. | Vite completed the build successfully. | Pass |

### Notes

The project content is now stored in `src/data/projects.json`. The page combines the search term and selected technology, so a project must match both conditions.

These checks were carried out locally. They do not yet confirm that the deployed website works correctly.

The JSON file is included during the build. Changes to its content require a new build and deployment.

## Type Checking and Dependency Review

I added a TypeScript configuration and a separate type-checking command. The first check found five errors in two files.

I replaced `replaceAll` in the analytics page with a regular expression that works with the ES2020 configuration. I also corrected the Recharts
import by removing the version number from the module name. After these changes, the type check passed.

The dependency audit reported a high-severity issue affecting Vite. Running `npm audit fix` updated Vite from 6.4.3 to 6.4.5. A second audit reported no known vulnerabilities.

| Check | Actual result |
| --- | --- |
| `npm run typecheck` | Passed without errors. |
| `npm audit` after the update | Reported 0 known vulnerabilities. |
| `npm run check` | Type checking and production build both passed. |

The audit checks dependencies against known advisories. It does not prove that the application has no security problems.

## Contact Form

The original contact form only logged the input to the browser console. I replaced this with a request to FormSubmit and activated the receiving email address.

I submitted a test message through the local website and confirmed that it arrived in my inbox. Type checking and the production build also passed.

The form now includes a sending state, submission feedback and a direct email link. Error handling has been added, but the failure case still needs to be tested.

FormSubmit is a third-party service, so message delivery depends on its availability. I will repeat the delivery test after deployment.

## Home Page Animation

I added a short GSAP entrance animation to the home page. The introduction and cards appear in sequence.

I tested the reduced-motion setting using the Drawing panel in Microsoft Edge developer tools.

| Setting | Observed result |
| --- | --- |
| `prefers-reduced-motion: reduce` | No entrance animation played. The content remained visible. |
| No emulation | The entrance animation played again. |

The animation is disabled when reduced motion is requested. It is also cleaned up when the visitor leaves the home page.

## Local Post Feed

I tested the feed without starting the Express server. I created a post with an image, added a comment, and checked that I could like and unlike the post. The saved changes were still there after refreshing the page and after leaving and reopening the feed.

I also checked deletion. Cancelling kept the post, and confirming removed it. The deleted post stayed gone after a refresh.

These checks were done on the local website. I still need to check the same flow after deployment.

## GitHub Pages Deployment

I ran the deployment workflow for commit `017d062`. GitHub Actions reported that both the build and deployment succeeded.

I opened the published site directly at `#projects` and selected Vue.js in the technology filter. The page showed three projects, which matched the expected result.

After deployment, I sent a test message from the live Contact page and confirmed that it arrived in my inbox.

I then pushed commit `7e6d8ff` with the updated deployment and contact test notes. This triggered the workflow automatically. The run succeeded in 38 seconds, confirming that a push to main could check, build and deploy the site.

## Recruiter Scenario Walkthrough

I reviewed the published website using the recruiter scenario. I started on the home page, selected View Projects, filtered by Vue.js, read a project description and then found the Contact page.

I could find each action and complete the task. The project information made the purpose, technologies and my contribution clear.

This was my own walkthrough using the persona. A recruiter has not yet tested the website, so feedback from another person would help check these findings.

## Lecturer Scenario Walkthrough

I checked the published website and followed the GitHub link to the portfolio repository. I could find the Phase 1 and Phase 2 sections, personas and feedback responses in the README.

I also found the evaluation notes and successful deployment records in GitHub Actions. These gave me a way to check the development work against the website.

This was my own walkthrough using the lecturer persona.

## GitHub API Error Handling

I blocked requests to api.github.com using Microsoft Edge developer tools. The page displayed an error message and a Try again button. After removing the block, I selected Try again and the profile and repositories loaded successfully.

This check was carried out on the local website.

## Small-Screen Layout Check

I used Microsoft Edge device emulation with a viewport width of 390 pixels to check Home, navigation, Projects, Contact, Post Feed and GitHub. The content stayed within the viewport and the controls remained usable. I could scroll the expanded navigation menu to reach its final item.

The native technology dropdown extended beyond the simulated viewport when open. After closing it, the page layout stayed within the screen. This check used desktop browser emulation. Testing on a physical phone would provide further evidence.

### Local post backup and restore

I tested the backup and restore feature using a local post containing text, an image, a comment and a like. Exporting produced a JSON backup. Importing it while the original post still existed showed zero new posts and one existing post to skip. Confirming the import did not create a duplicate. After deleting the original post, importing the same backup restored its text, image, comment and like. The restored content remained after refreshing the page.

I also tested files with a different application identifier, an unsupported backup version, incomplete post data and invalid JSON syntax. Each file produced an explanatory error message and left the existing posts unchanged.

During testing, I noticed that the feedback message appeared below the entire post form and was easy to miss. I moved it above the backup controls and added a coloured background and border. This made the result easier to notice near the import button.

## Backup Restore Code Walkthrough

On 12 November 2026, I used an AI-assisted code walkthrough to trace the restore flow across `src/lib/postBackup.ts`, `src/lib/postStorage.ts` and `src/components/PostFeed.tsx`. This was a code review supported by the manual tests above, rather than a formal multi-person inspection.

| Step | Code checked | Finding |
| --- | --- | --- |
| Read and validate | `readPostBackup` and `isPost` | The file size is checked before reading. JSON parsing, application identifier, version, export date, post fields, comments, likes and post IDs are checked before a preview is accepted. |
| Preview | `selectBackup` | A valid backup is stored in `pendingBackup`. This step does not call `savePosts` or update the saved feed. |
| Cancel | `cancelImport` | The pending backup is cleared without writing posts. |
| Merge | `confirmImport` and `mergeBackupPosts` | Confirmation merges against the current feed. Existing IDs are skipped, new entries are added and posts are sorted by creation date. |
| Save | `commitPosts` and `savePosts` | Browser storage is written before Redux is updated. A storage exception enters the error handler before the feed update. |

I traced two examples: one existing post plus a backup with the same ID leaves one post; an empty feed plus the same backup restores one post. Invalid files stop before the preview and save stages. These traces agree with the manual results recorded above.

The review checks control flow, but it does not replace running failure tests. Storage-full errors, files over the size limit, invalid export dates and duplicate IDs within a backup have not yet been tested manually. The current image check accepts a string; it does not verify the image encoding or restrict imported image URLs.

## Published Backup Feature Check

Commit `e095f0f` triggered GitHub Actions run 5, which completed successfully in 42 seconds. On the published site, I confirmed that backup import, preview and restoration worked and that an invalid JSON file displayed an error near the backup controls. Localhost and GitHub Pages use separate browser storage, so the exported backup was used to transfer the test post to the published site.
