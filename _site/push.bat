echo $ bundle exec jekyll build
CALL bundle exec jekyll build
echo $ git add .
CALL git add .
echo $ git commit
CALL git commit -m "commit"
echo git push origin gh-pages
CALL git push origin gh-pages
echo #### gh-pages branch DONE
echo #### Moving to master branch
CALL cd _site
echo #### Currently on ./_site
echo $ git add .
CALL git add .
echo $ git commit
CALL git commit -m "commit"
echo git push origin master
CALL git push origin master
echo #### master branch DONE
CALL cd ..
echo #### Currently on ./
pause