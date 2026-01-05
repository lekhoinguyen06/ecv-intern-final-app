ECV Intern Final Project Application

Repository structure

Useful scripts

To deploy on ec2
New: first clone the project, go to /backend, run bash ./run.sh
Update: pm2 restart ecv-intern-web-server 

To build locally (update on server will run build, therefore you don't need to build before commit), go to root 
Build all, commit and push
bash ./build.sh -a 
Build backend, commit and push
bash ./build.sh -b -c -p -m "feat: new feature" 