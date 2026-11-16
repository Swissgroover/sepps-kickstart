# Website content update
- [x] Update navigation, homepage, club, kit, registration, contact and footer as supplied.
- [x] Add the training page and direct section links without changing form submission.
- [x] Verify desktop/mobile layouts, navigation, section links and existing form validation (320, 390, 722 and 1280px); training policy tests pass and automatic build is OK.

Email delivery was not retested: the preview has no Web3Forms configuration; the existing form fields, validation and sending code were not changed.

# Homepage supporters
- [x] Add the supplied logos in one stable-ID list and a light-card strip before the footer.
- [x] Verify 30 px/s motion, pause/resume, logo loading, reduced-motion scrolling and no page overflow at 390 and 757px; all eight focused tests pass.

# Supporter deployment fix
- [x] Replace Lovable-only logo URLs with real public files and remove pause/resume controls.
- [x] All six local image requests return 200 on direct load and reload; continuous motion, reduced motion and mobile layout pass. Live Vercel deployment needs redeploying and was not accessed.