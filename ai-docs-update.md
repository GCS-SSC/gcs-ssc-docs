# AI Docs Update Workflow

Use this prompt from the `gcs-ssc-docs` repo:

```text
Update these docs from the latest GCS-SSC app changes.

Source app repo: /home/omar/Code/gcs-ssc
Docs repo: /home/omar/Code/gcs-ssc-docs
Upstream app commits: https://github.com/GCS-SSC/gcs-ssc/commits/main/

Workflow:
1. In the docs repo, identify the timestamp/hash of the last docs commit.
2. In the app repo, find every commit on main after that docs commit timestamp.
3. Review the app commits sequentially, oldest to newest. Do not review all commits at once.
4. After each commit, decide whether docs need updates. If yes, update the relevant English and French docs before moving to the next commit.
5. When all commits are processed, review the full docs diff for consistency, stale wording, broken flow, and sidebar/navigation gaps.
6. Run validation:
   - git diff --check
   - bun install --frozen-lockfile if dependencies are missing
   - bun run docs:build
7. Fix any validation issues.
8. Commit the docs changes with a clear message.
9. Push the docs repo to origin/main.
10. Confirm the GitHub Pages deployment workflow started from the push and wait for it to complete.

Important constraints:
- Do not batch all source commits into one review pass. Process them sequentially.
- Keep English and French docs aligned.
- Do not commit ignored build artifacts like node_modules or .vitepress/dist.
- If a source commit is seed-only, test-only, or internal-only and does not affect docs, note that and continue.
- Final response should include the docs commit hash, validation result, push result, and Pages deployment status.
```
