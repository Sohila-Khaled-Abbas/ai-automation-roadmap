CREATE TABLE `roadmapProjects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(96) NOT NULL,
	`moduleId` varchar(64) NOT NULL,
	`route` varchar(64) NOT NULL,
	`level` varchar(96) NOT NULL,
	`title` varchar(255) NOT NULL,
	`summary` text NOT NULL,
	`recipeJson` text NOT NULL,
	`proof` text NOT NULL,
	`templateLabel` varchar(255) NOT NULL,
	`templateUrl` varchar(1024) NOT NULL,
	`provider` varchar(160) NOT NULL,
	`source` varchar(160) NOT NULL,
	`sortOrder` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `roadmapProjects_id` PRIMARY KEY(`id`),
	CONSTRAINT `roadmapProjects_slug_unique` UNIQUE(`slug`)
);
