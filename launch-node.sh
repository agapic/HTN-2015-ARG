export NODE_ENV=production

cd bank-terminal
npm start &

cd ../splash
PORT=80 npm start &
