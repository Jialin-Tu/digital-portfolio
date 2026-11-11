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