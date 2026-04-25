⭐ Branch Workflow (Quick Reference)
main → Live site
stage‑2 → Development
preview → Temporary build branch for testing

How to work:
Build on stage‑2  
All new features, realms, layout changes, and CSS updates happen here.

Preview using preview  
When you want to see your work as a real website:

Merge stage‑2 → preview

Switch GitHub Pages to build from preview

Visit the site to test changes

Return to live site  
When finished previewing:

Switch GitHub Pages back to main

Leave preview ready for next testing cycle

Simple rule:
stage‑2 = build  
preview = test  
main = publish

Mapping list: 
.site-footer        → .footer
.footer-icons       → .footer-icons
.footer-backtotop   → .footer-top
.realm-day        → .realm-day   (unchanged)
.day-gradient     → .day-gradient
.day-haze         → .day-haze
.day-particles    → .day-particles
.day-sunbeam      → .day-sunbeam
.day-cloud        → .day-cloud
.day-cloud-1      → .day-cloud-1
.day-cloud-2      → .day-cloud-2
