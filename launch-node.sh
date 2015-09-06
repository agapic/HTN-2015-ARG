export NODE_ENV=production

cd bank-terminal
npm start >> /var/log/bt 2> /var/log/bterror & disown

cd ../splash
PORT=80 npm start >> /var/log/splash 2> /var/log/splasherror & disown
