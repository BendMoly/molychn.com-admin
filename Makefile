run:
	pm2 start ecosystem.config.js
push:
	scp -r ./server/* root@47.75.185.174:/root/www/admin/
clean:
	rm -rf ./server/public/*
