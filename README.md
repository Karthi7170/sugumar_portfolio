Next.js Cinematic Portfolio (Next + React + TypeScript)

What was created
- A Next.js + TypeScript project scaffold under next-portfolio/
- Components: Navbar, Hero (scroll-driven GSAP effect), Projects, About, Footer
- Styles: CSS Modules and a global stylesheet
- The uploaded hero video was copied to public/videos/hero.mp4 and is used by the Hero component

Important notes
- The files are scaffolded but dependencies are not installed automatically. To run locally, run npm/yarn install then start the dev server.

Quick start
1. Open a terminal in next-portfolio:
   cd C:\Users\karth\OneDrive\Desktop\projects\Sugumar\portfolio\next-portfolio

2. Install dependencies:
   npm install

3. Run the dev server:
   npm run dev

4. Open http://localhost:3000 in your browser.

Technical details
- Hero animation uses GSAP + ScrollTrigger (dynamically imported in the Hero component to avoid SSR issues). The scroll animation is scrubbed (follows scroll progress) and animates a 3D rotation (rotationY), a scale (zoom) and an x-translation so the face moves toward the right while zooming in.
- The video is autoplayed, muted, looped and uses object-fit: cover.
- The effect respects prefers-reduced-motion and won't run if the user prefers reduced motion.

Next steps (I can do any of these):
- Tweak animation strengths/curves to match the uploaded footage precisely.
- Replace placeholder project thumbnails with your real media.
- Add project detail pages and video lightbox.
- Optimize video encoding / add responsive sources (mp4 / webm) and poster image.
- Deploy to Vercel and wire a custom domain.
