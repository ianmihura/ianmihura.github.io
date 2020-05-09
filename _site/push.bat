CALL bundle exec jekyll build
CALL git add .
CALL git commit -m "commit"
CALL git push origin gh-pages
echo "------------------------------"
echo "---- GH-PAGES BRANCH DONE ----"
echo "--- MOVING TO MASTER BRANCH --"
echo "------------------------------"
CALL cd _sites
CALL git add .
CALL git commit -m "commit"
CALL git push origin master
pause