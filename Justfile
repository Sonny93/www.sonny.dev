dev:
	@-docker compose down
	@pnpm run dev

prod:
	@docker compose pull
	@docker compose up -d --build --wait

down:
	@-docker compose down
	@-docker compose -f dev.compose.yml down

release:
	@npx release-it

format:
	@pnpm run format
