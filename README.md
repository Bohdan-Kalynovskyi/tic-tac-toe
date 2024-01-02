## Development

0. Install **NodeJs** v16+ and **npm** v7+ or currently `yarn` is preferred
0. Edit `/client/src/config.ts` which is gitignored
1. Install npm packages `yarn install`
1. Install db tables `npm run init`
2. Run development server `npm start`
3. Install packages for client `cd client && yarn install`
4. Run development server for client `npm start`
6. Open browser at `http://localhost:3000`


## Production

0. Install **NodeJs** v16+ and **yarn**
0. Edit `/client/src/config.ts` which is gitignored
1. Install npm packages `yarn install`
1. Install db tables `npm run init`
2. Install packages for client `cd client && yarn install`
3. Build client `npm run build`
4. Start server `cd .. && nohup npm start &`
